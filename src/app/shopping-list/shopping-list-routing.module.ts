import {NgModule} from '@angular/core';
import {Route, RouterModule} from '@angular/router';
import {DetailResolveService} from './services/detail-resolve.service';
import {DetailsComponent} from './components/details/details.component';

const SHOPPING_ROUTES: Route[] = [
  {
    path: 'details/:id',
    component: <any>DetailsComponent,
    resolve: {
      shoppingList: DetailResolveService
    }
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(SHOPPING_ROUTES)
  ],
  exports: [
    RouterModule
  ]
})
export class ShoppingListRoutingModule {}
