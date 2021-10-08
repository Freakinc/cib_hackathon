import { types as t, getParent, getRoot, Instance, getSnapshot, applySnapshot, flow } from 'mobx-state-tree';
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

export const TimeReportsItem = t.model('TimeReportsItem', {
  entry_time: t.maybeNull(t.string),
  time_in_building: t.maybeNull(t.string),
  user_id: t.maybeNull(t.number),
});

export const TimeReports = t
  .model('TimeReports', {
    items: t.optional(t.array(TimeReportsItem), []),
    state: t.optional(t.enumeration('State', ['pending', 'done', 'error']), 'pending'),
  })
  .actions((self) => {
    const {
      ui: {
        alert: { setAlert },
      },
    } = getRoot<RootInstance>(self);

    return {
      load: flow(function* (id: string) {
        self.state = 'pending';
        try {
          const data = yield api.get({ method: 'generate/report-one/' + id });
          self.items = data.length > 0 ? data : [];
          setAlert({ type: 'success', title: 'Отчет по времени загружен' });

          self.state = 'done';
        } catch (error) {
          console.error(error);
          self.state = 'error';
          setAlert({ type: 'error', title: 'Ошибка при загрузке отчета по времени', message: error.message });
        }
      }),
    };
  });

export const ZoneReportsItem = t.model('ZoneReportsItem', {
  entry_day: t.string,
  time_spent: t.string,
  user_name: t.string,
  zone_name: t.string,
});

export const ZoneReports = t
  .model('ZoneReports', {
    items: t.optional(t.array(ZoneReportsItem), []),
    state: t.optional(t.enumeration('State', ['pending', 'done', 'error']), 'pending'),
  })
  .actions((self) => {
    const {
      ui: {
        alert: { setAlert },
      },
    } = getRoot<RootInstance>(self);

    return {
      load: flow(function* (id: string) {
        self.state = 'pending';
        try {
          const data = yield api.get({ method: 'generate/report-two/' + id });
          self.items = data.length > 0 ? data : [];
          setAlert({ type: 'success', title: 'Данные отчета по зонам загружены' });

          self.state = 'done';
        } catch (error) {
          console.error(error);
          self.state = 'error';
          setAlert({ type: 'error', title: 'Ошибка при загрузке отчета по зонам', message: error.message });
        }
      }),
    };
  });

export const TimeZoneReportsItem = t.model('TimeZoneReportsItem', {
  to_char: t.string,
  user_name: t.string,
  zone_name: t.string,
});

export const TimeZoneReports = t
  .model('TimeZoneReports', {
    items: t.optional(t.array(TimeZoneReportsItem), []),
    state: t.optional(t.enumeration('State', ['pending', 'done', 'error']), 'pending'),
  })
  .actions((self) => {
    const {
      ui: {
        alert: { setAlert },
      },
    } = getRoot<RootInstance>(self);

    return {
      load: flow(function* (id: string) {
        self.state = 'pending';
        try {
          const data = yield api.get({ method: 'generate/report-three/' + id });
          self.items = data.length > 0 ? data : [];
          setAlert({ type: 'success', title: 'Отчет по времени в зонах загружен' });

          self.state = 'done';
        } catch (error) {
          console.error(error);
          self.state = 'error';
          setAlert({ type: 'error', title: 'Ошибка при загрузке отчетов по времени в зонах', message: error.message });
        }
      }),
    };
  });

export const Reports = t
  .model('Reports', {
    timeZoneReport: t.optional(TimeZoneReports, {}),
    zoneReport: t.optional(ZoneReports, {}),
    timeReport: t.optional(TimeReports, {}),
  })
  .actions((self) => ({
    afterCreate() {
      console.log('after create');
      // self.timeZoneReport = TimeZoneReports.create();
      // self.timeReport = TimeReports.create();
      // self.zoneReport = ZoneReports.create();
      // self.timeReport = TimeReports.create()
      // self.timeReport = TimeReports.create()
      console.log(self.timeReport);
    },
  }));

export type ReportsInstance = Instance<typeof Reports>;
export type TimeZoneReportsInstance = Instance<typeof TimeZoneReports>;
export type ZoneReportsInstance = Instance<typeof ZoneReports>;
export type TimeReportsInstance = Instance<typeof TimeReports>;
