import { Component, OnInit } from '@angular/core';
import { AlertService } from '../services/alert.service';
import { Alert, AlertType } from '../models/alert.model';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  alerts: Alert[] = [];

  constructor(private alertService: AlertService) { }

  ngOnInit() {
    this.alertService.getAlert().subscribe((alert: Alert) => {
      if (!alert) {
        // Clear alerts
        this.alerts = [];
        return;
      }

      // Add alert
      this.alerts.push(alert);
    });
  }

  removeAlert(alert: Alert) {
    this.alerts = this.alerts.filter(x => x !== alert);
}

getAlertType(alert: Alert) {
    if (!alert) {
        return;
    }

    // return css class based on alert type
    switch (alert.type) {
        case AlertType.Success:
            return 'success';
        case AlertType.Error:
            return 'danger';
        case AlertType.Info:
            return 'info';
        case AlertType.Warning:
            return 'warning';
    }
}

}
