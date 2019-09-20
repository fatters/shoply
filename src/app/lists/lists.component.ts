import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { List } from './_model/list';
import { ListsService } from './lists.service';

@Component({
  selector: 'lists',
  templateUrl: './lists.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListsComponent implements OnInit {
  lists$: Observable<List[]>;
  animationState = 'inactive';

  constructor(private listsService: ListsService,
              private changeDetector: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.lists$ = this.listsService.lists$;
  }

  addList(): void {
    this.animationState = 'active';
  }

  removeList(list: List): void {
    this.listsService.removeList(list);
    this.changeDetector.markForCheck();
  }
}
