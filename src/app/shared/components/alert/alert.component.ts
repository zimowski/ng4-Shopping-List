import { Component, OnInit } from '@angular/core';
import {Alert, AlertType} from '../../models/alert.model';
import {AlertService} from '../../services/alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {
  alerts: Alert[] = [];

  constructor(private alertService: AlertService) { }

  ngOnInit() {
    this.alertService
      .getAlert()
      .subscribe(
        (alert: Alert) => {
          if (!alert) {
            this.alerts = [];
            return;
          }
          this.alerts.push(alert);
        }
      );
  }

  removeAlert(alert: Alert) {
    this.alerts = this.alerts
      .filter(x => x !== alert);
  }

  cssClass(alert: Alert) {
    if (!alert) {
      return;
    }

    switch (alert.type) {
      case AlertType.Success:
        return 'positive';
      case AlertType.Error:
        return 'negative';
      case AlertType.Info:
        return '';
      case AlertType.Warning:
        return 'warning';
    }
  }
}
