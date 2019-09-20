import { Item } from '../../model/item';

export interface List {
  id: string;
  name: string;
  createdDate: Date;
  lastUpdatedDate: Date;
  items: Item[];
}
