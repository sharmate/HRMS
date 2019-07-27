import { Component, OnInit } from '@angular/core';
import { WebService, UiService, LocalService } from '@workshop/core-data';
@Component({
  selector: 'app-db',
  templateUrl: './db.component.html',
  styleUrls: ['./db.component.scss']
})
export class DbComponent implements OnInit {
  dashboardList: any = [];
  company_id = this.local.getCompany_id();
  isProgressing = false;
  constructor(
    private web: WebService,
    private ui: UiService,
    private local: LocalService
  ) {}
  ngOnInit() {
    this.getDashboard();
  }

  getDashboard() {
    this.isProgressing = true;
    const request = {
      company_id: this.company_id,
      employee_id: localStorage.getItem('employee_id')
    };
    this.web
      .post('Dashboard/ajax_get_dashboard_record', request)
      .subscribe(data => {
        if (data.status) {
          this.dashboardList = data.response;
          this.isProgressing = false;
        } else {
          this.isProgressing = false;
        }
      });
  }
}
