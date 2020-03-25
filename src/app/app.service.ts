import { Injectable } from '@angular/core';
import { Item } from './items/_model/item';
import { ObservableStore } from '@codewithdan/observable-store';
import { StoreState } from './store/store.state';
import { List } from './lists/_model/list';

export enum ListStoreActions {
  AddList = 'add_list',
  RemoveList = 'remove_list',
  AddItem = 'add_item',
  ChangeItem = 'change_item',
  RemoteItem = 'remove_item'
}

@Injectable({
  providedIn: 'root'
})
export class AppService extends ObservableStore<StoreState> {

  constructor() {
    super({trackStateHistory: true});
    const initialState = {
      shoppingLists: JSON.parse(localStorage.getItem('lists')) || []
    };
    this.setState(initialState, 'init_state');
  }

  getListById(id: string): List {
    const state = this.getState();
    return state.shoppingLists.find((list: List) => list.id === id);
  }

  addList(list: List): Promise<boolean> {
    return new Promise((resolve, reject) => {
      try {
        const state = this.getState();
        state.shoppingLists.push(list);
        this.setState({shoppingLists: state.shoppingLists}, ListStoreActions.AddList);
        localStorage.setItem('lists', JSON.stringify(state.shoppingLists));
        console.log(this.stateHistory);
        resolve(true);
      } catch {
        reject(false);
      }
    });
  }

  removeList(id: string): void {
    const state = this.getState();
    state.shoppingLists = state.shoppingLists.filter((list) => list.id !== id);

    this.setState({shoppingLists: state.shoppingLists}, ListStoreActions.RemoveList);
    localStorage.setItem('lists', JSON.stringify(state.shoppingLists));
  }

  addItemToList(item: Item, listToAddTo: List): void {
    const state = this.getState();
    const currentList = state.shoppingLists.find((list: List) => list.id === listToAddTo.id);
    currentList.items.push(item);

    this.setState({shoppingLists: state.shoppingLists}, ListStoreActions.AddItem);
    localStorage.setItem('lists', JSON.stringify(state.shoppingLists));
  }

  changeItemState(itemToChange: Item, listToChange: List, isComplete: boolean): void {
    const state = this.getState();
    const currentList = state.shoppingLists.find((list: List) => list.id === listToChange.id);
    const currentItem = currentList.items.find((item: Item) => item.id === itemToChange.id);
    currentItem.isComplete = isComplete;

    this.setState({shoppingLists: state.shoppingLists}, ListStoreActions.ChangeItem);
    localStorage.setItem('lists', JSON.stringify(state.shoppingLists));
  }

  deleteItem(itemToDelete: Item, listToChange: List): void {
    const state = this.getState();
    const currentList = state.shoppingLists.find((list: List) => list.id === listToChange.id);
    currentList.items = currentList.items.filter((item: Item) => item.id !== itemToDelete.id);

    this.setState({shoppingLists: state.shoppingLists}, ListStoreActions.RemoteItem);
    localStorage.setItem('lists', JSON.stringify(state.shoppingLists));
  }
}
