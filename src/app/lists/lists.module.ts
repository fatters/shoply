import { NgModule } from '@angular/core';
import { ListsComponent } from './lists.component';
import { Route, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ListsAddComponent } from './add/lists-add.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

const routes: Route[] = [
  {path: '', component: ListsComponent}
];

@NgModule({
  declarations: [
    ListsComponent,
    ListsAddComponent
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
export class ListsModule {
}
