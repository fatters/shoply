import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { Listy } from './list.model';
import { ListState, ListStore } from './list.store';

@Injectable({
  providedIn: 'root'
})
export class ListQuery extends QueryEntity<ListState, Listy> {

  constructor(protected store: ListStore) {
    super(store);
    this.saveToStorage();
  }

  private saveToStorage(): void {
    this.select().subscribe((state) => {
      localStorage.setItem('lists', JSON.stringify(state));
    });
  }
}
