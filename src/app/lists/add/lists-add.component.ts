import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { listsAddAnimations } from './lists-add.animations';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { List } from '../_model/list';
import { ListsService } from '../lists.service';

@Component({
  selector: 'lists-add',
  templateUrl: './lists-add.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./lists-add.component.scss'],
  animations: listsAddAnimations
})
export class ListsAddComponent implements OnInit {
  @Input() animationState;
  @Output() onClose = new EventEmitter<string>();
  form: FormGroup;

  constructor(private listsService: ListsService) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
    });
  }

  submit(): void {
    if (this.form.valid) {
      const date = new Date();
      const list: List = {
        id: this.generateRandomId(),
        name: this.form.value.name,
        createdDate: date,
        lastUpdatedDate: date,
        items: []
      };
      this.listsService.addList(list).then(() => this.addSuccessful(), () => this.addFailed);
      this.form.reset();
    }
  }

  close(): void {
    this.onClose.emit('inactive');
  }

  private addSuccessful(): void {
    console.log('was successsufl');
    this.close();
  }

  private addFailed(): void {
    // todo: add failed
  }

  private generateRandomId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}
