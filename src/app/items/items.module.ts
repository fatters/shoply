import { NgModule } from '@angular/core';
import { ItemsComponent } from './items.component';
import { Route, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

const routes: Route[] = [
  {path: '', component: ItemsComponent}
];

@NgModule({
  declarations: [
    ItemsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    SweetAlert2Module
  ]
})
export class ItemsModule {
}
