import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { List } from './_model/list';
import { AppService } from '../app.service';
import { faCopy, faTrash } from '@fortawesome/free-solid-svg-icons';
import { takeUntil } from 'rxjs/operators';

@Component({
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListsComponent implements OnInit, OnDestroy {
  lists: List[];
  animationState = 'inactive';
  faTrash = faTrash;
  faCopy = faCopy;
  private unsubscribe$ = new Subject();

  constructor(private appService: AppService) {
  }

  ngOnInit(): void {
    this.appService.stateChanged.pipe(takeUntil(this.unsubscribe$)).subscribe((state) => {
      this.lists = state.shoppingLists;
    });
  }

  addList(): void {
    this.animationState = 'active';
  }

  copyList(list: List): void {
    const copiedList = new List(list.name, new Date(), list.items);
    this.appService.addList(copiedList);
  }

  removeList(list: List): void {
    this.appService.removeList(list.id);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
