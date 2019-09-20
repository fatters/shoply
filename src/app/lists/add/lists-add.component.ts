import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { listsAddAnimations } from './lists-add.animations';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppService } from '../../app.service';

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

  constructor(private appService: AppService) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
    });
  }

  submit(): void {
    if (this.form.valid) {
      this.appService.addListNew(this.form.value.name).then(() => this.addSuccessful(), () => this.addFailed());
      this.form.reset();
    }
  }

  close(): void {
    this.onClose.emit('inactive');
  }

  private addSuccessful(): void {
    this.close();
  }

  private addFailed(): void {
    // todo: add failed
  }
}
