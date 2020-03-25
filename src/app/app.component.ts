import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {

  constructor(private swUpdate: SwUpdate) {

    this.swUpdate.available.subscribe(() => {
      if (confirm('Update Available. Refresh the page now to update the cache.')) {
        document.location.reload();
      } else {
        console.log('continue with the older version');
      }
    });

    setInterval(() =>  {
      this.swUpdate.checkForUpdate();
    }, 21600);
  }

  private updateApp(): void {
    document.location.reload();
  }
}
