import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Item } from '../model/item';
import { AppService } from '../app.service';
import { Listy } from '../lists/state/list.model';
import { ListQuery } from '../lists/state/list.query';
import { Observable } from 'rxjs';

@Component({
  selector: 'items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemsComponent implements OnInit {
  list$: Observable<Listy[]>;
  list: Listy;
  form: FormGroup;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private appService: AppService,
              private listQuery: ListQuery,
              private changeDetector: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params.id;
    this.list$ = this.listQuery.selectAll({filterBy: (entity) => entity.id === id});

    this.list$.subscribe((list) => {
      this.list = list[0];
    });

    this.route.data.subscribe((data) => {
      if (data.list === undefined) {
        this.router.navigate(['/']);
      }
      this.form = new FormGroup({
        name: new FormControl('', Validators.required),
      });

    });
  }

  submit(): void {
    const date = new Date();
    const newItem: Item = {
      name: this.form.value.name,
      createdDate: date,
      isComplete: false
    };
    this.appService.addItemToList([newItem], this.listQuery.getAll({filterBy: (entity) => entity.id === this.route.snapshot.params.id})[0]);
    this.form.reset();
  }

  removeItem(item: Item): void {
    this.appService.removeItemFromList(item, this.list);
  }
}
