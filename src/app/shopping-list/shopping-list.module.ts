import {NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './components/list/list.component';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../shared/shared.module';
import {SuiModule} from 'ng2-semantic-ui';
import {ReactiveFormsModule} from '@angular/forms';
import { TotalProgressbarComponent } from './components/total-progressbar/total-progressbar.component';
import { FormListComponent } from './components/form-list/form-list.component';
import { ListItemComponent } from './components/list-item/list-item.component';
import { DetailsComponent } from './components/details/details.component';
import { DetailsItemComponent } from './components/details-item/details-item.component';
import {ListService} from './services/list.service';
import {DetailResolveService} from './services/detail-resolve.service';
import { FormDetailsComponent } from './components/form-details/form-details.component';
import {ItemsService} from './services/items.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    SuiModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  declarations: [
    ListComponent,
    TotalProgressbarComponent,
    FormListComponent,
    ListItemComponent,
    DetailsComponent,
    DetailsItemComponent,
    FormDetailsComponent
  ],
  providers: [
    ListService,
    DetailResolveService,
    ItemsService
  ]
})
export class ShoppingListModule { }
