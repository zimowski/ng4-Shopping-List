import { Injectable } from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {NavigationStart, Router} from '@angular/router';
import {Alert, AlertType} from '../models/alert.model';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class AlertService {
  private subject = new Subject<Alert>();
  private keepAfterRouteChange = false;

  constructor(private router: Router) {
    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        if (this.keepAfterRouteChange) {
          this.keepAfterRouteChange = false;
        } else {
          this.clear();
        }
      }
    });
  }

  getAlert(): Observable<any> {
    return this.subject.asObservable();
  }

  positive(title: string, message: string, keepAfterRouteChange = false) {
    this.alert(AlertType.Success, title, message, keepAfterRouteChange);
  }

  negative(title: string, message: string, keepAfterRouteChange = false) {
    this.alert(AlertType.Error, title, message, keepAfterRouteChange);
  }

  info(title: string, message: string, keepAfterRouteChange = false) {
    this.alert(AlertType.Info, title, message, keepAfterRouteChange);
  }

  warning(title: string, message: string, keepAfterRouteChange = false) {
    this.alert(AlertType.Warning, title, message, keepAfterRouteChange);
  }

  alert(type: AlertType, title: string, message: string, keepAfterRouteChange = false) {
    this.keepAfterRouteChange = keepAfterRouteChange;
    this.subject.next(<Alert>{ type: type, title: title, message: message });
  }

  clear() {
    this.subject.next();
  }
}
