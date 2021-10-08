import { Instance, onSnapshot, types } from 'mobx-state-tree';
import { createContext, useContext } from 'react';
import { Users } from './Users';
import { Ui } from './Ui';
import { Zones } from './Zones';
import { Reports } from './Reports';

const RootModel = types.model({
  ui: Ui,
  zones: Zones,
  users: Users,
  reports: Reports,
});

const initialState = RootModel.create({
  ui: {},
  zones: {},
  users: {},
  reports: {},
});

export const rootStore = initialState;

onSnapshot(rootStore, (snapshot) => {
  console.log('Snapshot: ', snapshot);
});

export type RootInstance = Instance<typeof RootModel>;
const RootStoreContext = createContext<null | RootInstance>(null);

export const Provider = RootStoreContext.Provider;

export function useMst() {
  const store = useContext(RootStoreContext);
  if (store === null) {
    throw new Error('Store cannot be null, please add a context provider');
  }
  return store;
}
