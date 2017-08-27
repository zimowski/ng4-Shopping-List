import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { LoaderComponent } from './components/loader/loader.component';
import {SuiModule} from 'ng2-semantic-ui';
import { AlertComponent } from './components/alert/alert.component';
import {AlertService} from './services/alert.service';

@NgModule({
  imports: [
    CommonModule,
    SuiModule
  ],
  exports: [
    HeaderComponent,
    LoaderComponent,
    AlertComponent
  ],
  declarations: [
    HeaderComponent,
    LoaderComponent,
    AlertComponent
  ],
  providers: [
    AlertService
  ]
})
export class SharedModule { }
