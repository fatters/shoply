import { List } from '../lists/_model/list';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { AppService } from '../app.service';
import { Observable, of } from 'rxjs';

@Injectable()
export class ItemsResolver implements Resolve<List> {

  constructor(private appService: AppService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    const id = route.params.id;
    return of();
    // return this.listQuery.selectAll({filterBy: (entity) => entity.id === id}).pipe(first());
  }
}
