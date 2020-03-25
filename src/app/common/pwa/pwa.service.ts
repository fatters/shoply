import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';

@Injectable()
export class PwaService {

  constructor(private swUpdate: SwUpdate) {
    this.swUpdate.available.subscribe(event => {
      this.swUpdate.activateUpdate().then(() => this.updateApp());
    });
  }

  private updateApp(): void {
    document.location.reload();
  }
}
