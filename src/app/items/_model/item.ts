// export interface Item {
//   name: string;
//   createdDate: Date;
//   isComplete: boolean;
// }

export class Item {
  id: string;
  createdDate: Date;
  isComplete: boolean;

  constructor(public name: string) {
    this.id = Math.random().toString(36).substr(2, 9);
    this.createdDate = new Date();
    this.isComplete = false;
  }
}
