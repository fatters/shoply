import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { List } from './_model/list';
import { AppService } from '../app.service';
import { faCopy, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ListStore } from './state/list.store';
import { ListQuery } from './state/list.query';
import { Listy } from './state/list.model';

@Component({
  selector: 'lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListsComponent implements OnInit {
  lists$: Observable<Listy[]>;
  animationState = 'inactive';
  faTrash = faTrash;
  faCopy = faCopy;

  constructor(private appService: AppService,
              private listStore: ListStore,
              private listQuery: ListQuery) {
  }

  ngOnInit(): void {
    this.lists$ = this.listQuery.selectAll();
  }

  addList(): void {
    this.animationState = 'active';
  }

  copyList(list: Listy): void {
    alert('coming soon');
    // const copiedList = {...list};
    // copiedList.id = 'created';
    // this.appService.addList(copiedList);
  }

  removeList(id: string): void {
    this.appService.removeListNew(id);
  }
}
