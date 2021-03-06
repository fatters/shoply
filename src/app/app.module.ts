import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { Route, RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderModule } from './common/header/header.module';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

const routes: Route[] = [
  {path: '', loadChildren: () => import('./lists/lists.module').then(m => m.ListsModule)},
  {path: 'items/:id', loadChildren: () => import('./items/items.module').then(m => m.ItemsModule)}
];

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    HeaderModule,
    RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' }),
    SweetAlert2Module.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
