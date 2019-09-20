import { NgModule } from '@angular/core';
import { ListsComponent } from './lists.component';
import { Route, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ListsService } from './lists.service';
import { ListsAddComponent } from './add/lists-add.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    ListsService
  ]
})
export class ListsModule {
}
