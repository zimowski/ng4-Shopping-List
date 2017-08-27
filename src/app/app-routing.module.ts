import {NgModule} from '@angular/core';
import {Route, RouterModule} from '@angular/router';
import {ListComponent} from './shopping-list/components/list/list.component';

const ROUTES: Route[] = [
  { path: '', component: <any>ListComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(ROUTES)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
