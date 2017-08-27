import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {ListModel} from '../models/list.model';
import {ListService} from './list.service';

@Injectable()
export class DetailResolveService implements Resolve<ListModel> {
  constructor(private ShoppingListService: ListService) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.ShoppingListService.get(route.params['id']);
  }
}
