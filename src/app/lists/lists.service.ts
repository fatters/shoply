import { BehaviorSubject } from 'rxjs';
import { List } from './_model/list';
import { Item } from '../model/item';

const LOCAL_STORAGE_LISTS_KEY = 'lists';

export class ListsService {
  private lists = new BehaviorSubject<List[]>(this.getListsFromLocalStorage());
  lists$ = this.lists.asObservable();

  addList(list: List): Promise<boolean> {
    return new Promise((resolve, reject) => {
      try {
        const lists = this.lists.value;
        lists.push(list);
        this.lists.next(lists);
        this.setListsToLocalStorage();
        resolve(true);
      } catch {
        reject(false);
      }
    });
  }

  removeList(list: List): void {
    const lists = this.lists.value;
    const index = lists.indexOf(list);
    if (index !== -1) {
      lists.splice(index, 1);
      this.lists.next(lists);
      this.setListsToLocalStorage();
    }
  }

  addItemToList(item: Item, input: List): void {
    const lists = this.lists.value;
    const list = lists.filter((moo: List) => moo === input)[0];
    list.items.push(item);
    list.lastUpdatedDate = new Date();
    this.lists.next(lists);
    this.setListsToLocalStorage();
  }

  removeItemFromList(item: Item, listToRemoveFrom: List): void {
    const lists = this.lists.value;
    const list = lists.filter((moo: List) => moo === listToRemoveFrom)[0];
    const itemIndex = list.items.indexOf(item);
    if (itemIndex !== -1) {
      list.items.splice(itemIndex, 1);
      this.lists.next(lists);
      this.setListsToLocalStorage();
    }
  }

  private setListsToLocalStorage(): void {
    localStorage.setItem('lists', JSON.stringify(this.lists.value));
  }

  private getListsFromLocalStorage(): List[] {
    return JSON.parse(localStorage.getItem(LOCAL_STORAGE_LISTS_KEY)) || [];
  }
}
