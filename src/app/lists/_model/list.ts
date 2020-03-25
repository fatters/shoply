import { Item } from '../../items/_model/item';

// export interface List {
//   id: string;
//   name: string;
//   createdDate: Date;
//   lastUpdatedDate: Date;
//   items: Item[];
// }

export class List {
  id: string;
  createdDate: Date;

  constructor(public name: string,
              public lastUpdatedDate: Date,
              public items: Item[]) {
    this.id = Math.random().toString(36).substr(2, 9);
    this.createdDate = new Date();
  }
}
