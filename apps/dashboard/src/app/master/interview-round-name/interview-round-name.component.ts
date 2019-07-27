import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormControl } from '@angular/forms';
import {
  MatPaginator,
  MatSort,
  MatTableDataSource,
  MatDialog
} from '@angular/material';
import { WebService, UiService, LocalService } from '@workshop/core-data';
import { SelectionModel } from '@angular/cdk/collections';
import { DeleteComponent } from '@workshop/common-ui';

export interface RoundName {
  department_id: number;
  departmentCode: string;
  departmentName: string;
}

@Component({
  selector: 'app-interview-round-name',
  templateUrl: './interview-round-name.component.html',
  styleUrls: ['./interview-round-name.component.scss'],
  providers: [WebService, UiService]
})
export class InterviewRoundNameComponent implements OnInit {
  constructor(
    public pageTitle: Title,
    public web: WebService,
    public ui: UiService,
    public local: LocalService,
    public dialog: MatDialog
  ) {}
  header = 'Interview Round Name Master';
  isViewVisible = true;
  isCreateVisible = false;
  isStillLoading = false;
  isProgressing = false;
  isSave = false;
  departmentList = [];
  deleteArray: any = [];
  selection = new SelectionModel<RoundName>(true, []);
  dataSource: MatTableDataSource<RoundName>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  interviewRoundNameList: any = {};
  displayedColumns: string[] = [
    'select',
    'sno',
    'roundName',
    'departmentList',
    'action'
  ];
  company_id = this.local.getCompany_id();
  departments = new FormControl();

  clearValue = '';

  ngOnInit() {
    this.ui.authenticatorUser();
    this.pageTitle.setTitle('Interview Round Name');
    this.getInterviewNameList();
    this.getDepartmentList();
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  clearSearch = () => {
    this.clearValue = '';
    this.dataSource.filter = '';
  };

  closeCreate() {
    this.isViewVisible = true;
    this.isCreateVisible = false;
    this.header = 'Interview Round Name Master';
  }

  selectAllValue(val) {
    const selectedValue = this.departmentList;
    if (val._selected) {
      this.departments.setValue(selectedValue);
      val._selected = true;
    }

    if (val._selected == false) {
      this.departments.setValue([]);
    }
  }
  getDepartmentList() {
    const request = {
      company_id: this.company_id
    };
    this.web.post('Department/get_department_by_company', request).subscribe(
      data => {
        if (data.status) {
          this.departmentList = data.response;
        }
      },
      error => {}
    );
  }

  getInterviewNameList() {
    this.header = 'Interview Round Name Master';
    let roundNamesData: any;
    this.isStillLoading = true;
    const interviewNames = [];
    let count = 1;
    const request = {
      company_id: this.company_id
    };
    this.web
      .post(
        'Interview_round_name_master/ajax_get_interview_master_by_company',
        request
      )
      .subscribe(
        data => {
          if (data.status) {
            roundNamesData = data.response;
            for (const i of roundNamesData) {
              const departmentData = i.department_list;
              const depts = [];
              for (const j of departmentData) {
                depts.push({
                  departmentId: j.department_id,
                  departmentCode: j.department_code,
                  departmentName: j.department_name
                });
              }
              interviewNames.push({
                sno: count,
                id: i.id,
                roundName: i.name,
                deptDetails: depts
              });
              count++;
            }
            this.dataSource = new MatTableDataSource(interviewNames);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            this.isStillLoading = false;
          } else {
            this.isStillLoading = false;
          }
        },
        error => {
          this.ui.snackbarPop('Something went wrong', '', 'Error');
        }
      );
  }

  addInterviewName() {
    this.header = 'Add Interview Round Name';
    this.isViewVisible = false;
    this.isCreateVisible = true;
    this.isSave = true;
    this.interviewRoundNameList = {
      interview_round_name: '',
      department_id: []
    };
  }

  saveInterviewRoundName() {
    const deptId = this.interviewRoundNameList.department_id;

    if (
      this.interviewRoundNameList.interview_round_name === undefined ||
      this.interviewRoundNameList.interview_round_name === ''
    ) {
      this.ui.snackbarPop(
        'Interview Round Name should not be Blank',
        'Retry',
        'Error'
      );
      return false;
    }

    if (
      this.interviewRoundNameList.department_id.length === undefined ||
      this.interviewRoundNameList.department_id.length < 1
    ) {
      this.ui.snackbarPop(
        'Department Name should not be Blank',
        'Retry',
        'Error'
      );
      return false;
    }
    this.isProgressing = true;
    const request = {
      company_id: this.company_id,
      interview_round_name: this.interviewRoundNameList.interview_round_name,
      department_id: deptId
    };
    this.web
      .post('Interview_round_name_master/ajax_insert_interview_master', request)
      .subscribe(
        data => {
          if (data.status) {
            this.ui.snackbarPop('Successfully added', '', 'Success');
            this.getInterviewNameList();
            this.isCreateVisible = false;
            this.isViewVisible = true;
            this.isProgressing = false;
          } else {
            this.ui.snackbarPop(data.message, 'Retry', 'Error');
            this.isProgressing = false;
            return false;
          }
        },
        error => {
          this.ui.snackbarPop('Something went wrong', 'Retry', 'Error');
          this.isCreateVisible = true;
          this.isProgressing = false;
          this.isViewVisible = false;
          return false;
        }
      );
  }

  editRoundName(val) {
    this.header = 'Update Interview Round Name';
    this.isViewVisible = false;
    this.isCreateVisible = true;
    this.isSave = false;
    this.interviewRoundNameList = {
      interview_round_id: val.id,
      interview_round_name: val.roundName,
      department_id: val.deptDetails.map(obj => obj.departmentId)
    };
  }

  updateInterviewName() {
    if (
      this.interviewRoundNameList.interview_round_name === undefined ||
      this.interviewRoundNameList.interview_round_name === ''
    ) {
      this.ui.snackbarPop(
        'Interview Round Name should not be Blank',
        'Retry',
        'Error'
      );
      return false;
    }

    if (
      this.interviewRoundNameList.department_id === undefined ||
      this.interviewRoundNameList.department_id === ''
    ) {
      this.ui.snackbarPop(
        'Department Name should not be Blank',
        'Retry',
        'Error'
      );
      return false;
    }
    const request = {
      company_id: this.company_id,
      interview_round_id: this.interviewRoundNameList.interview_round_id,
      interview_round_name: this.interviewRoundNameList.interview_round_name,
      department_id: this.interviewRoundNameList.department_id
    };
    this.web
      .post('Interview_round_name_master/ajax_update_interview_master', request)
      .subscribe(
        data => {
          if (data.status) {
            this.ui.snackbarPop('successfully updated', '', 'Success');
            this.header = 'Interview Round Name Master';
            this.isSave = true;
            this.getInterviewNameList();
            this.isCreateVisible = false;
            this.isViewVisible = true;
            this.isProgressing = false;
          } else {
            this.ui.snackbarPop(data.message, 'Retry', 'Error');
            this.isProgressing = false;
            return false;
          }
        },
        error => {
          this.ui.snackbarPop('Something went wrong', '', 'Error');
          this.isCreateVisible = true;
          this.isProgressing = false;
          this.isViewVisible = false;
          return false;
        }
      );
  }

  deleteRoundName(row) {
    const request = {
      company_id: this.company_id,
      id: row.map(obj => obj.id)
    };
    this.web
      .post(
        'Interview_round_name_master/ajax_delete_interview_round_master',
        request
      )
      .subscribe(
        data => {
          this.ui.snackbarPop('Successfully deleted', '', 'Success');
          this.getInterviewNameList();
          this.selection = new SelectionModel<RoundName>(true, []);
        },
        error => {
          this.ui.snackbarPop('Something went wrong', '', 'Error');
        }
      );
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    if (numSelected) {
      const numRows = this.dataSource.data.length;
      return numSelected === numRows;
    }
  }

  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach(row => this.selection.select(row));
  }

  checkboxLabel(row?: RoundName): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${
      this.selection.isSelected(row) ? 'deselect' : 'select'
    } row ${row.department_id + 1}`;
  }

  openMultipleDelete() {
    this.deleteArray = [];
    let data: any = [];
    data = this.selection;
    if (data._selected) {
      for (const x of data._selected) {
        this.deleteArray.push({
          id: x.id,
          name: x.roundName
        });
      }
      this.dialogBox(this.deleteArray);
    }
  }
  openSingleDelete(value) {
    this.deleteArray = [];
    this.deleteArray.push({
      id: value.id,
      name: value.roundName
    });
    this.dialogBox(this.deleteArray);
  }

  dialogBox(value) {
    const dialogRef = this.dialog.open(DeleteComponent, {
      width: '600px',
      maxHeight: '600px',
      data: {
        details: value,
        headers: {
          second: 'Round Name',
          third: 'Action'
        }
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.length > 0) {
          this.deleteRoundName(result);
          this.selection = new SelectionModel<RoundName>(true, []);
        } else {
          this.selection = new SelectionModel<RoundName>(true, []);
          this.ui.snackbarPop(
            'There is no data available to delete',
            '',
            'Error'
          );
        }
      } else {
        this.selection = new SelectionModel<RoundName>(true, []);
      }
    });
  }
}
