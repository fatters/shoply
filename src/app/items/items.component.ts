import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Item } from './_model/item';
import { AppService } from '../app.service';
import { Subject } from 'rxjs';
import { List } from '../lists/_model/list';
import { takeUntil } from 'rxjs/operators';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemsComponent implements OnInit, OnDestroy {
  list: List;
  items: Item[];
  completeItems: Item[];
  form: FormGroup;
  faTrash = faTrash;
  private unsubscribe$ = new Subject();

  constructor(private route: ActivatedRoute,
              private router: Router,
              private appService: AppService) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required)
    });
    this.appService.stateChanged.pipe(takeUntil(this.unsubscribe$)).subscribe(() => {
      this.list = this.appService.getListById(this.route.snapshot.params.id);
      this.items = this.list.items.filter((item) => !item.isComplete);
      this.completeItems = this.list.items.filter((item) => item.isComplete);
    });
  }

  submit(): void {
    const item = new Item(this.form.value.name);
    this.appService.addItemToList(item, this.list);
    this.form.reset();
  }

  removeItem(item: Item): void {
    this.appService.changeItemState(item, this.list, !item.isComplete);
  }

  deleteItem(item: Item): void {
    this.appService.deleteItem(item, this.list);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
