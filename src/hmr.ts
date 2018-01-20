import { ApplicationRef } from '@angular/core';
import { ActionReducer } from '@ngrx/store';
import { createNewHosts, createInputTransfer, removeNgStyles } from '@angularclass/hmr';

export const metaReducers = [
  (reducer: ActionReducer<any>) =>
      (state: any, action: any) =>
          action.type === 'SET_ROOT_STATE'
              ? action.payload
              : reducer(state, action)
];

export abstract class HotModuleReloadModule {

  constructor(private appRef: ApplicationRef) { }

  hmrOnInit(store) {
    if (!store || !store.state) {
      return;
    }

    console.log('[HMR] store', store);

    if ('restoreInputValues' in store) {
      store.restoreInputValues();
    }

    this.appRef.tick();
    delete store.state;
    delete store.restoreInputValues;
  }

  hmrOnDestroy(store) {
    const cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);

    store.disposeOldHosts = createNewHosts(cmpLocation);
    store.restoreInputValues = createInputTransfer();
    removeNgStyles();
  }

  hmrAfterDestroy(store) {
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }

}
