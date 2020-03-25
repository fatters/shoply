import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { Route, RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderModule } from './common/header/header.module';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { PwaService } from './common/pwa/pwa.service';

const routes: Route[] = [
  {path: '', loadChildren: './lists/lists.module#ListsModule'},
  {path: 'items/:id', loadChildren: './items/items.module#ItemsModule'}
];

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    HeaderModule,
    RouterModule.forRoot(routes),
    SweetAlert2Module.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    PwaService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
