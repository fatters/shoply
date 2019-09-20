import { List } from '../lists/_model/list';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ListsService } from '../lists/lists.service';
import { Injectable } from '@angular/core';
import { filter, map, take } from 'rxjs/operators';

@Injectable()
export class ItemsResolver implements Resolve<List> {

  constructor(private listsService: ListsService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<List> | Promise<List> | List {
    const id = route.params.id;
    console.log(id);
    return this.listsService.lists$.pipe(take(1), map((items) => items.filter((item) => item.id === id)[0]));
  }
}
