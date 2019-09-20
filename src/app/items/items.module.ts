import { NgModule } from '@angular/core';
import { ItemsComponent } from './items.component';
import { Route, RouterModule } from '@angular/router';
import { ItemsResolver } from './items.resolver';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

const routes: Route[] = [
  {path: '', component: ItemsComponent, resolve: {list: ItemsResolver}}
];

@NgModule({
  declarations: [
    ItemsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    ItemsResolver
  ]
})
export class ItemsModule {
}
