import { guid, ID } from '@datorama/akita';
import { Item } from '../../model/item';

export type Listy = {
  id: ID,
  name: string,
  lastUpdated: Date
  items: Item[]
};

export function createList({name}: Partial<Listy>) {
  return {
    id: guid(),
    name: name,
    lastUpdated: new Date(),
    items: []
  };
}
