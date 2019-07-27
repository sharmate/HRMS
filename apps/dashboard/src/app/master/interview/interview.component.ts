import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import {
  WebService,
  UiService,
  Interview,
  LocalService
} from '@workshop/core-data';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-interview',
  templateUrl: './interview.component.html',
  styleUrls: ['./interview.component.scss'],
  providers: [WebService, UiService, LocalService]
})
export class InterviewComponent implements OnInit {
  constructor(
    private pageTitle: Title,
    private web: WebService,
    private ui: UiService,
    private local: LocalService
  ) {}

  header = 'Interview Master';
  isViewVisible = true;
  isCreateVisible = false;
  isCandidateVisible = false;
  isStillLoading = false;
  isSave = false;
  viewCandidateData: any;
  dataSource: MatTableDataSource<Interview>;
  pageSize = [5, 10, 25, 100];
  displayedColumns: string[] = [
    'sno',
    'candidateName',
    'candidateGender',
    'candidateContact',
    'candidateEmail',
    'departmentName',
    'designationName',
    'approvalStatus',
    'action'
  ];
  employeeList: any = [];
  departmentList: any = [];
  selectedDept = '';
  selectedCurrentEmp = '';
  selectedNextEmp = '';
  selectedCandidate = '';

  createCandidateData: any = {};

  candidateDetails = {
    candidateName: '',
    candidateMobile: '',
    candidateEmail: ''
  };

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  candidateList = [];

  company_id = this.local.getCompany_id();

  ngOnInit() {
    this.ui.authenticatorUser();
    this.pageTitle.setTitle('Interview Master');
    this.getInterviewList();
    this.getDepartmentList();
    this.getcandidateList();
  }

  approvalStatusCheck(name) {
    return this.ui.getCandidateApproval(name);
  }

  closeCreate() {
    this.header = `Interview Master`;
    this.isViewVisible = true;
    this.isCreateVisible = false;
    this.isCandidateVisible = false;
  }

  getDepartmentList() {
    const request = {
      company_id: this.company_id
    };
    const deptData = [];
    this.web.post('Department/get_department_by_company', request).subscribe(
      data => {
        if (data.status) {
          this.departmentList = [];
          for (const i of data.response) {
            deptData.push({
              id: i.id,
              departmentName: i.department_name
            });
          }
          this.departmentList = deptData;
        }
      },
      error => {}
    );
  }

  getInterviewList() {
    const interviews = [];
    let interviewData: any = [];
    let count = 1;
    const request = {
      company_id: this.company_id
    };
    this.web
      .post(
        'Interview_round/ajax_get_interview_round_model_by_company',
        request
      )
      .subscribe(data => {
        if (data.status) {
          interviewData = data.response;
          interviewData = this.ui.removeDuplicates(
            interviewData,
            'candidate_id'
          );

          for (const i of interviewData) {
            interviews.push({
              sno: count,
              id: i.id,
              candidateId: i.candidate_id,
              candidateName: i.candidate_name,
              candidateGender: this.ui.getGender(i.gender),
              candidateContact: i.mobile_no,
              candidateEmail: i.candidate_email,
              departmentName: i.department_name,
              roundNo: i.round_no,
              feedback: i.feedback,
              currentEmployee: `${i.employee_first_name} ${
                i.employee_last_name
              }`,
              nextEmployee: `${i.next_emp_firstname} ${i.next_emp_lastname}`,
              designationName: i.designation_name,
              approvalStatus: this.ui.getCandidateApproval(i.approval_status)
            });
            count++;
          }
          this.dataSource = new MatTableDataSource(interviews);

          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  viewInterviewDetails(row) {
    this.header = `Interview Details`;
    this.isViewVisible = false;
    this.isCreateVisible = false;
    this.isCandidateVisible = true;
    const request = {
      company_id: this.company_id
    };

    this.web
      .post(
        'Interview_round/ajax_get_interview_round_model_by_company',
        request
      )
      .subscribe(
        data => {
          if (data.status) {
            this.viewCandidateData = data.response.filter(v => {
              return row.candidateId == v.candidate_id;
            });
            for (const i of this.viewCandidateData) {
              (this.candidateDetails.candidateName = i.candidate_name),
                (this.candidateDetails.candidateMobile = i.mobile_no);
              this.candidateDetails.candidateEmail = i.aadhar_no;
            }
          }
        },
        error => {}
      );
  }
  getcandidateList() {
    let candidateData: any;
    const candidates = [];
    let count = 1;
    const request = {
      company_id: this.company_id
    };
    this.web
      .post('Candidatedetails/ajax_get_candidate_details_by_company', request)
      .subscribe(
        data => {
          if (data.status) {
            candidateData = data.response;
            for (const i of candidateData) {
              candidates.push({
                id: i.id,
                sno: count,
                candidateName: i.candidate_name,
                contact: i.mobile_no,
                candidateEmail: i.candidate_email,
                address: i.address,
                designation: i.designation_name
              });
              count++;
            }
            this.candidateList = candidates;
          }
        },
        error => {
          this.ui.snackbarPop('Something went wrong', '', 'Error');
        }
      );
  }

  getEmployee(value) {
    const request = {
      company_id: this.company_id,
      department_id: value
    };
    this.web
      .post('Interview_round/ajax_get_employee_by_department', request)
      .subscribe(
        data => {
          if (data.status) {
            const tempLocal = data.response;
            const temp = [];
            const tempData = this.ui.removeDuplicates(tempLocal, 'employee_id');
            for (const i of tempData) {
              temp.push({
                id: i.employee_id,
                name: `${i.firstName} ${i.lastName}`
              });
            }
            this.employeeList = temp;
          }
        },
        error => {}
      );
  }

  addInterview() {
    this.header = `Interview Details`;
    this.isViewVisible = false;
    this.isCreateVisible = true;
    this.isCandidateVisible = false;
    this.createCandidateData = {
      numberOfRounds: '',
      departmentId: '',
      interviewTakenByCurrent: '',
      interviewTakenByCurrentId: '',
      interviewTakenByNext: '',
      interviewTakenByNextId: '',
      candidateId: '',
      roundNo: '',
      approvalStatus: '',
      feedback: ''
    };
  }

  saveInterview() {
    const request = {
      company_id: this.company_id,
      department_id: this.createCandidateData.departmentId,
      interview_taken_by_id: this.createCandidateData.interviewTakenByCurrentId,
      interview_taken_by_id_next: this.createCandidateData
        .interviewTakenByNextId,
      interviewer_id: this.createCandidateData.candidateId,
      round_no: this.createCandidateData.roundNo,
      no_of_round: this.createCandidateData.numberOfRounds,
      approval_status: this.createCandidateData.approvalStatus
    };
    this.web
      .post('Interview_round/ajax_insert_interview_round_model', request)
      .subscribe(data => {}, error => {});
  }

  editInterview(row) {}

  deleteInterview(row) {
    const deleteId = row.id;
    const request = {
      company_id: this.company_id,
      id: [deleteId]
    };
    this.web
      .post('Interview_round/ajax_delete_interview_round', request)
      .subscribe(
        data => {
          if (data.status) {
            this.ui.snackbarPop('Successfully deleted', '', 'Success');
          }
        },
        error => {
          this.ui.snackbarPop('Something went wrong', 'Retry', 'Error');
        }
      );
  }
}
