import { Injectable } from '@angular/core';
import { Item } from './model/item';
import { ListStore } from './lists/state/list.store';
import { createList, Listy } from './lists/state/list.model';
import { ListQuery } from './lists/state/list.query';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private listStore: ListStore,
              private listQuery: ListQuery) {
  }

  addListNew(name: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      try {
        this.listStore.add(createList({name: name}));
        resolve(true);
      } catch {
        reject(false);
      }
    });
  }

  removeListNew(id: string): void {
    this.listStore.remove(id);
  }

  addItemToList(item: Item[], list: Listy): void {
    this.listStore.update(list.id, () => ({items: [...list.items, ...item]}));
  }

  removeItemFromList(item: Item, list: Listy): void {
    const index = list.items.indexOf(item);
    console.log(index);
    this.listStore.update(list.id, () => ({items: [...list.items.slice(0, index), ...list.items.slice(index + 1, list.items.length)]}));
  }
}
