import { List } from '../lists/_model/list';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { AppService } from '../app.service';
import { first } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ListQuery } from '../lists/state/list.query';

@Injectable()
export class ItemsResolver implements Resolve<List> {

  constructor(private appService: AppService,
              private listQuery: ListQuery) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    const id = route.params.id;
    return this.listQuery.selectAll({filterBy: (entity) => entity.id === id}).pipe(first());
  }
}
