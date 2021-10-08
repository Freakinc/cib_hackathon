import { types as t, getRoot, Instance, getSnapshot, applySnapshot, flow } from 'mobx-state-tree';
import api from '../api';
import { RootInstance } from './Root';

export type AlertArgs = {
  title: string;
  message?: string | null;
  type: 'error' | 'success';
  stay?: boolean;
};

export type ConfirmationArgs = {
  title: string;
  onConfirm: () => void;
  onCancel?: () => void;
};

export const zoneTypes = ['unknown', 'room', 'conf', 'kitchen', 'floor', 'building', 'open_space', 'hall'];

export const ZoneItem = t.model('Zone', {
  id: t.number,
  parent_id: t.maybeNull(t.number),
  name: t.string,
  json: t.string,
  type: t.optional(t.enumeration('Type', zoneTypes), 'unknown'),
});

export const Zones = t
  .model('Zones', {
    items: t.optional(t.array(ZoneItem), []),
    state: t.optional(t.enumeration('State', ['pending', 'done', 'error']), 'pending'),
    florId: t.optional(t.number, 0),
  })
  .actions((self) => {
    const {
      ui: {
        alert: { setAlert },
      },
    } = getRoot<RootInstance>(self);
    return {
      load: flow(function* () {
        if (self.items.length > 0) {
          return;
        }
        self.state = 'pending';
        try {
          const data = yield api.get({ method: 'zones/list' });
          self.items = data;
          setAlert({ type: 'success', title: 'Схема этажа загружена' });

          self.state = 'done';
        } catch (error) {
          self.state = 'error';
          setAlert({ type: 'error', title: 'Ошибка при загрузке плана этажа', message: error.message });
        }
      }),
    };
  })
  .views((self) => {
    return {
      get building() {
        return self.items.find((item) => item.type === 'building');
      },
      get floors() {
        return self.items.filter((item) => item.type === 'floor');
      },
      floorZones(floorId: number) {
        const zoneItems = [];

        const getItem = (id: number) => {
          const items = self.items.filter((item) => item.parent_id === id);
          if (items.length > 0) {
            zoneItems.push(...items);
            items.forEach((item) => getItem(item.id));
          }
        };
        getItem(floorId);
        // console.log('zoneItems', zoneItems);
        return zoneItems;
      },
    };
  })
  .views((self) => ({
    floorByZone({ zoneName, zoneId }: { zoneName?: string; zoneId?: number }) {
      // console.log('--- zone name', zoneName);

      const zone = zoneName
        ? self.items.find((item) => item.name === zoneName)
        : self.items.find((item) => item.id === zoneId);
      // console.log('--- zone', zone);
      const getFloor = (zoneId: number) => {
        const zoneItem = self.items.find((parent) => parent.id === zoneId);
        // console.log('===== zoneItem', zoneItem);
        if (zoneItem.type === 'floor') {
          return zoneItem;
        } else {
          getFloor(zoneItem.parent_id);
        }
      };
      const floor = getFloor(zone.parent_id);
      const floorIndex = self.floors.findIndex((e) => e.name === floor.name);
      return { zone, floor: floorIndex };
    },
  }));

export type ZoneItemInstance = Instance<typeof ZoneItem>;
export type ZonesInstance = Instance<typeof Zones>;
