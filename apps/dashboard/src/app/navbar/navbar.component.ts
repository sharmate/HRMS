import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService, LocalService } from '@workshop/core-data';

export interface SubMenuList {
  id?: number;
  menu_name?: string;
  menu_icon?: string;
  order_no?: number;
  aurl?: string;
}

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  constructor(
    private router: Router,
    private cookie: CookieService,
    private local: LocalService
  ) {}
  @Output()
  logout: EventEmitter<any> = new EventEmitter();
  isToggled = false;
  menuLinks: SubMenuList[] = [
    {
      id: 10,
      menu_name: 'Company',
      menu_icon: 'drafts',
      order_no: 10,
      aurl: 'master/company'
    },
    {
      id: 6,
      menu_name: 'Cost Center',
      menu_icon: 'place',
      order_no: 6,
      aurl: 'master/cost-center'
    },
    {
      id: 2,
      menu_name: 'Department',
      menu_icon: 'account_balance',
      order_no: 2,
      aurl: 'master/department'
    },
    {
      id: 3,
      menu_name: 'Designation',
      menu_icon: 'people',
      order_no: 3,
      aurl: 'master/designation'
    },
    {
      id: 1,
      menu_name: 'Employee List',
      menu_icon: 'person',
      order_no: 1,
      aurl: 'master/employee_list'
    },
    {
      id: 8,
      menu_name: 'Round Name Master',
      menu_icon: 'notes',
      order_no: 8,
      aurl: 'master/interview_round_name'
    },
    {
      id: 9,
      menu_name: 'Question',
      menu_icon: 'question_answer',
      order_no: 9,
      aurl: 'master/question'
    },

    {
      id: 11,
      menu_name: 'Designation-Question',
      menu_icon: 'drafts',
      order_no: 11,
      aurl: 'mapping/designation_question_mapping'
    },
    // {
    //   id: 12,
    //   menu_name: 'Employee-Round',
    //   menu_icon: 'person',
    //   order_no: 12,
    //   aurl: 'mapping/employee_round_mapping'
    // },
    {
      id: 12,
      menu_name: 'Costcenter-Department ',
      menu_icon: 'person_pin',
      order_no: 12,
      aurl: 'mapping/costcenter_department_mapping'
    },
    {
      id: 4,
      menu_name: 'Candidates',
      menu_icon: 'school',
      order_no: 4,
      aurl: 'master/candidates'
    },
    {
      id: 5,
      menu_name: 'Candidate Form',
      menu_icon: 'assignment',
      order_no: 5,
      aurl: 'master/candidate_form'
    }

    // {
    //   id: 6,
    //   menu_name: 'Interview Round',
    //   menu_icon: 'work',
    //   order_no: 6,
    //   aurl: 'master/interview_round'
    // },
    // {
    //   id: 7,
    //   menu_name: 'Document List',
    //   menu_icon: 'drafts',
    //   order_no: 7,
    //   aurl: 'master/document'
    // },
  ];
  companyName = '';
  userName = '';
  userCode = '';
  isMouseEnter = false;

  ngOnInit() {
    this.getName();
  }

  getName() {
    const x = this.local.getUserDetails();
    this.userName = `${x.first_name ? x.first_name : ''} ${
      x.last_name ? x.last_name : ''
    }`;
  }

  mouserEvent() {
    this.isMouseEnter = true;
  }

  logoutEvent() {
    this.logout.emit(this.logout);
  }

  openNav() {
    document.getElementById('mySidenav').style.width = '280px';
  }

  closeNav() {
    document.getElementById('mySidenav').style.width = '70px';
  }
}
