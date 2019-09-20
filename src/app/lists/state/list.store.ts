import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Listy } from './list.model';
import { Injectable } from '@angular/core';

export interface ListState extends EntityState<Listy> {
}

const initialState = {};

@Injectable({
  providedIn: 'root'
})
@StoreConfig({ name: 'lists' })
export class ListStore extends EntityStore<ListState, Listy> {

  constructor() {
    super(initialState);
    this.loadFromStorage();
  }

  loadFromStorage(): void {
    const data = localStorage.getItem('lists');
    if (data) {
      this._setState(() => JSON.parse(data));
    }
  }
}
