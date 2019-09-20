import { NgModule } from '@angular/core';
import { ListsComponent } from './lists.component';
import { Route, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ListsAddComponent } from './add/lists-add.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

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
    RouterModule.forChild(routes)
  ]
})
export class ListsModule {
}
