import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ListsService } from '../lists/lists.service';
import { List } from '../lists/_model/list';
import { Item } from '../model/item';

@Component({
  selector: 'items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemsComponent implements OnInit {
  list: List;
  form: FormGroup;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private listsService: ListsService) {
  }

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      if (data.list === undefined) {
        this.router.navigate(['/']);
      }

      this.form = new FormGroup({
        name: new FormControl('', Validators.required),
      });
      this.list = data.list;
    });
  }

  submit(): void {
    const date = new Date();
    const newItem: Item = {
      name: this.form.value.name,
      createdDate: date,
      isComplete: false
    };
    this.listsService.addItemToList(newItem, this.list);
    this.form.reset();
  }

  removeItem(item: Item): void {
    this.listsService.removeItemFromList(item, this.list);
  }
}
