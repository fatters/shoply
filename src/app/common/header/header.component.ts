import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'shoply-header',
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
}
