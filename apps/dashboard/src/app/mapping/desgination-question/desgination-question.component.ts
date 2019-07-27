import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import {
  MatPaginator,
  MatSort,
  MatTableDataSource,
  MatDialog
} from '@angular/material';
import { WebService, UiService, LocalService } from '@workshop/core-data';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { SelectionModel } from '@angular/cdk/collections';
import { DeleteComponent } from '@workshop/common-ui';

export interface QuestionDetails {
  question_id: number;
  question_name: string;
}

export interface RoundDetails {
  seq: number;
  round_id: number;
  round_name: string;
  question_details?: QuestionDetails[];
}

export interface DesignationQuestionMapping {
  company_id: number;
  id: number;
  cs_id: number;
  location_name: string;
  designation_id: number;
  designation_code: string;
  designation_name: string;
  department_id: number;
  department_code: string;
  department_name: string;
  no_of_round: number;
  round_details?: RoundDetails[];
}

@Component({
  selector: 'app-desgination-question',
  templateUrl: './desgination-question.component.html',
  styleUrls: ['./desgination-question.component.scss']
})
export class DesginationQuestionComponent implements OnInit {
  constructor(
    public pageTitle: Title,
    public web: WebService,
    public ui: UiService,
    public local: LocalService,
    public fb: FormBuilder,
    public dialog: MatDialog
  ) {}

  get roundsArray() {
    return this.designationQuestionList.get('round_details') as FormArray;
  }
  deleteArray: any[];
  header = 'Desgination Question Mapping';
  isViewVisible = true;
  isCreateVisible = false;
  isStillLoading = false;
  isSave = false;
  isUpdate = false;
  dataSourceDetails: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = [
    'select',
    'sno',
    'costCenter',
    'designation',
    'department',
    'noOfRounds',
    'roundName',
    'action'
  ];
  clearValue = '';
  designationQuestionList: FormGroup;
  costCenterList: any = [];
  departmentList: any = [];
  designationList: any = [];
  questionList: any = [];
  isProgressing = false;
  roundNameList: any = [];
  roundNumber: any = [];
  inputList: any = [];
  roundId: any = [];
  // displayedInsideColumns: string[] = ['seq', 'round_name', 'question'];
  displayedInsideColumns: string[] = ['round_name', 'question'];
  panelOpenState = false;
  roundDetails: any[] = [];
  isQuestion = false;
  company_id = this.local.getCompany_id();
  selection = new SelectionModel<any>(true, []);
  questionDetails: any = [];
  designationQuestionDetails = {
    id: '',
    cs_id: '',
    designation_id: '',
    department_id: '',
    no_of_round: ''
  };

  noOfRounds: any = [];

  rListArray = [];
  designationData: any = [];

  isInput = false;
  ngOnInit() {
    this.ui.authenticatorUser();
    this.pageTitle.setTitle('Desgination Question Mapping');
    this.getDesignationMapping();
    this.getCostCenter();
    this.getDepartmentList();
    this.getDesignationList();
    this.getQuestionList();

    this.designationQuestionList = this.fb.group({
      company_id: this.company_id,
      cs_id: [],
      designation_id: [],
      department_id: [],
      no_of_round: [],
      round_details: this.fb.array([this.createRoundArray()])
    });
  }

  createRoundArray() {
    return this.fb.group({
      round_id: [],
      question_id: []
    });
  }

  applyFilter(filterValue: string) {
    this.dataSourceDetails.filter = filterValue.trim().toLowerCase();
  }

  clearSearch = () => {
    this.clearValue = '';
    this.dataSourceDetails.filter = '';
  };

  getCostCenter() {
    const request = {
      company_id: this.company_id
    };
    this.web.post('Locations/ajax_get_location_by_company', request).subscribe(
      data => {
        if (data.status) {
          const temp = data.response;
          const cData = [];
          for (const i of temp) {
            cData.push({
              cs_id: i.id,
              location: i.location
            });
          }
          this.costCenterList = cData;
        }
      },
      error => {
        this.ui.snackbarPop('Something went wrong', '', 'Error');
      }
    );
  }

  getDepartmentList() {
    const request = {
      company_id: this.company_id
    };

    this.web.post('Department/get_department_by_company', request).subscribe(
      data => {
        if (data.status) {
          const temp = [];
          for (const i of data.response) {
            temp.push({
              department_id: i.id,
              department_name: i.department_name
            });
          }
          this.departmentList = temp;
        }
      },
      error => {}
    );
  }

  getDesignationList() {
    const request = {
      company_id: this.company_id
    };
    this.web.post('Designation/get_designation_by_company', request).subscribe(
      data => {
        if (data.status) {
          const temp = [];
          for (const i of data.Response) {
            temp.push({
              designation_id: i.id,
              designation_name: i.designation_name
            });
          }
          this.designationList = temp;
        }
      },
      error => {}
    );
  }

  getRoundNameList(event) {
    const val = event.value;
    let roundNamesData: any[];
    const interviewNames = [];
    const request = {
      department_id: val
    };

    this.web
      .post('Designation_question_mapping2/ajax_get_round_details', request)
      .subscribe(
        data => {
          if (data.status) {
            roundNamesData = data.response;
            for (const i of roundNamesData) {
              interviewNames.push({
                interview_round_id: i.interview_round_id,
                selected: false,
                round_name: i.round_name
              });
            }
            this.roundNameList = interviewNames;
            this.designationQuestionDetails.no_of_round = this.roundNameList.length;
            if (this.roundNameList.length > 0) {
              this.isInput = true;
            } else {
              this.ui.snackbarPop(
                'There is no rounds available, Change the Department',
                'Retry',
                'Error'
              );
            }
          } else {
          }
        },
        error => {}
      );
  }

  getQuestionList() {
    let questionData: any = [];
    const request = {
      company_id: this.company_id
    };
    this.web
      .post(
        'Interview_question_bank/ajax_get_interview_question_by_company',
        request
      )
      .subscribe(data => {
        if (data.status) {
          questionData = data.response;
          for (const i of questionData) {
            this.questionList.push({
              question_id: i.id,
              question_name: i.interview_question
            });
          }
        }
      });
  }

  getDesignationMapping() {
    this.isStillLoading = true;
    const designationQustionMaping: any = [];
    let count = 1;
    const request = {
      company_id: this.company_id
    };
    this.web
      .post('Designation_question_mapping2/ajax_get_question_details', request)
      .subscribe(
        data => {
          if (data.status) {
            const designationData = data.response;
            for (const i of designationData) {
              designationQustionMaping.push({
                sno: count,
                id: i.id,
                location: i.location,
                cs_id: i.cs_id,
                designation_id: i.designation_id,
                designation_name: i.designation_name,
                department_id: i.department_id,
                department_name: i.department_name,
                no_of_round: i.no_of_round,
                round_details: i.round_details
              });
              count++;
            }
            this.dataSourceDetails = new MatTableDataSource(
              designationQustionMaping
            );
            this.dataSourceDetails.paginator = this.paginator;
            this.dataSourceDetails.sort = this.sort;
            this.isStillLoading = false;
          }
        },
        error => {
          this.ui.snackbarPop('Something went wrong', '', 'Error');
        }
      );
  }

  addDesignationQuestion() {
    this.header = 'Add Desgination Question Mapping';
    this.isViewVisible = false;
    this.isCreateVisible = true;
    this.isSave = true;
    this.isUpdate = false;
    this.designationQuestionList = this.fb.group({
      company_id: this.company_id,
      cs_id: [],
      designation_id: [],
      department_id: [],
      no_of_round: [],
      round_details: this.fb.array([])
    });
  }

  closeCreate() {
    this.header = 'Desgination Question Mapping';
    this.isViewVisible = true;
    this.isCreateVisible = false;
  }

  roundNameFilter(event) {
    const value = event.value;
    const temp = [];
    for (const i of this.roundNameList) {
      if (i.interview_round_id === value) {
        i.selected = true;
      }
      temp.push(i);
    }
    this.roundNameList = temp;
  }

  addRoundDetails(event) {
    this.noOfRounds = 0;
    const val = event.target.value;
    console.log(val);
    if (val > this.roundNameList.length) {
      this.ui.snackbarPop(
        `There is only ${this.roundNameList.length} Rounds`,
        'Retry',
        'Error'
      );
      return false;
    }

    this.noOfRounds = val;
    this.roundsArray.controls = [];
    for (let i = 0; i < val; i++) {
      this.roundsArray.push(this.createRoundArray());
    }
  }
  saveMapping(isUpdatevalue) {
    const value = this.designationQuestionList.value;
    if (
      value.cs_id === '' ||
      value.cs_id === undefined ||
      value.cs_id === null
    ) {
      this.ui.snackbarPop('Please select cost center', 'Retry', 'Error');
      return false;
    }
    if (
      value.designation_id === undefined ||
      value.designation_id === '' ||
      value.designation_id === null
    ) {
      this.ui.snackbarPop('Please select Designation', 'Retry', 'Error');
      return false;
    }
    if (
      value.department_id === undefined ||
      value.department_id === '' ||
      value.department_id === null
    ) {
      this.ui.snackbarPop('Please select Department', 'Retry', 'Error');
      return false;
    }
    if (
      value.no_of_round === undefined ||
      value.no_of_round === '' ||
      value.no_of_round === null
    ) {
      this.ui.snackbarPop('Please select No of round', 'Retry', 'Error');
      return false;
    }
    // if (
    //   value.round_details.length < 1 ||
    //   value.round_details === [] ||
    //   value.round_details === null
    // ) {
    //   this.ui.snackbarPop('Please select Round Details', 'Retry', 'Error');
    //   return false;
    // }

    // for (const xRDetails of value.round_details) {
    //   console.log(xRDetails.round_id);

    //   if (
    //     xRDetails.round_id === undefined ||
    //     xRDetails.round_id === '' ||
    //     xRDetails.round_id === null
    //   ) {
    //     this.ui.snackbarPop('Please select Rounds', 'Retry', 'Error');
    //     // return false;
    //   }

    //   if (
    //     (xRDetails.question_id =
    //       undefined ||
    //       xRDetails.question_id === '' ||
    //       xRDetails.question_id === null)
    //   ) {
    //     this.ui.snackbarPop('Please select Question', 'Retry', 'Error');
    //     // return false;
    //   }
    // }
    let url = '';

    if (isUpdatevalue) {
      url = 'Designation_question_mapping2/ajax_update_interview_round_details';
    } else {
      url = 'Designation_question_mapping2/ajax_insert_interview_round_details';
      id: value.id ? value.id : '';
    }

    this.isProgressing = true;
    const request = value;
    this.web.post(url, request).subscribe(data => {
      if (data.status) {
        this.ui.snackbarPop(
          'Successfully Designation & Question Mapped',
          '',
          'Success'
        );
        this.getDesignationMapping();
        this.header = 'Desgination Question Mapping';
        this.isCreateVisible = false;
        this.isViewVisible = true;
        this.isProgressing = false;
      } else {
        this.ui.snackbarPop(data.message, '', 'Warning');
        this.isCreateVisible = true;
        this.isViewVisible = false;
        this.isProgressing = false;
        return false;
      }
    });
  }

  editDesignationQuestion(value) {
    this.header = 'Update Desgination Question Mapping';
    this.isViewVisible = false;
    this.isCreateVisible = true;
    this.isSave = false;
    this.isUpdate = true;
    this.getRoundNameList(value.department_id);
    this.designationQuestionList.patchValue({
      company_id: this.company_id,
      id: value.id,
      cs_id: value.cs_id,
      designation_id: value.designation_id,
      department_id: value.department_id,
      no_of_round: value.no_of_round,
      round_details: this.fb.array([this.createRoundArray()])
    });
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    let numRows;
    if (numSelected) {
      numRows = this.dataSourceDetails.data.length;
    }
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSourceDetails.data.forEach(row => this.selection.select(row));
  }

  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${
      this.selection.isSelected(row) ? 'deselect' : 'select'
    } row ${row.id + 1}`;
  }

  openMultipleDelete() {
    this.deleteArray = [];
    let data: any = [];
    data = this.selection;
    if (data._selected) {
      for (const x of data._selected) {
        this.deleteArray.push({
          id: x.id,
          code: x.location,
          name: x.designation_name
        });
      }
    }
    this.dialogBox(this.deleteArray);
  }
  openSingleDelete(value) {
    this.deleteArray = [];
    this.deleteArray.push({
      id: value.id,
      code: value.location,
      name: value.designation_name
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
          first: 'Cost center',
          second: 'Designation',
          third: 'Action'
        }
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.length > 0) {
          this.deleteMapping(result);
          this.selection = new SelectionModel<any>(true, []);
        } else {
          this.selection = new SelectionModel<any>(true, []);
          this.ui.snackbarPop(
            'There is no data available to delete',
            '',
            'Error'
          );
        }
      } else {
        this.selection = new SelectionModel<any>(true, []);
      }
    });
  }
  deleteMapping(val) {
    const request = {
      company_id: this.company_id,
      id: val.map(obj => obj.id)
    };
    this.web
      .post(
        'Designation_question_mapping2/ajax_delete_designation_question_mapping',
        request
      )
      .subscribe(
        data => {
          if (data.status) {
            this.ui.snackbarPop('Successfully Mapping deleted', '', 'Success');
            this.getDesignationMapping();
            this.selection = new SelectionModel<any>(true, []);
          } else {
            this.ui.snackbarPop(data.message, '', 'Error');
          }
        },
        error => {
          this.ui.snackbarPop('Something went wrong', '', 'Error');
        }
      );
  }
}
