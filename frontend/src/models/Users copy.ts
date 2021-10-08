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

export const UserItem = t.model('UserItem', {
  id: t.number,
  name: t.string,
  zoneId: t.number,
});

export const Users = t
  .model('Users', {
    items: t.optional(t.array(UserItem), []),
    state: t.optional(t.enumeration('State', ['pending', 'done', 'error']), 'pending'),
  })
  .actions((self) => {
    const {
      ui: {
        alert: { setAlert },
      },
    } = getRoot<RootInstance>(self);
    return {
      load: flow(function* () {
        self.state = 'pending';
        try {
          const data = yield api.get({ method: 'users/list' });
          self.items = data;
          setAlert({ type: 'success', title: 'Пользователи загружены' });
          self.state = 'done';
        } catch (error) {
          console.error(error);
          self.state = 'error';
          setAlert({ type: 'error', title: 'Ошибка при загрузке списка пользователей', message: error.message });
        }
      }),
    };
  });

export type UserItemInstance = Instance<typeof UserItem>;
export type UserInstance = Instance<typeof Users>;
