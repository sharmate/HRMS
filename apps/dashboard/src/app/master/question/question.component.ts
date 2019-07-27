import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormControl } from '@angular/forms';
import {
  MatPaginator,
  MatSort,
  MatTableDataSource,
  MatDialog
} from '@angular/material';
import {
  WebService,
  UiService,
  Question,
  LocalService
} from '@workshop/core-data';
import { SelectionModel } from '@angular/cdk/collections';
import { DeleteComponent } from '@workshop/common-ui';

export interface Question {
  designation_id: number;
  designationCode: string;
  designationName: string;
}
@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
  providers: [WebService, UiService]
})
export class QuestionComponent implements OnInit {
  constructor(
    public pageTitle: Title,
    public web: WebService,
    public ui: UiService,
    public local: LocalService,
    public dialog: MatDialog
  ) {}
  header = 'Question Master';
  isViewVisible = true;
  isCreateVisible = false;
  isStillLoading = false;
  isSave = false;
  designationList = [];
  selection = new SelectionModel<Question>(true, []);
  dataSource: MatTableDataSource<Question>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  interviewRoundQuestionList: any = [];
  deleteArray: any = [];
  isProgressing = false;
  displayedColumns: string[] = [
    'select',
    'sno',
    'question',
    'designationList',
    'action'
  ];
  company_id = this.local.getCompany_id();
  desgination = new FormControl();

  clearValue = '';

  ngOnInit() {
    this.ui.authenticatorUser();
    this.pageTitle.setTitle('Question Master');
    this.getDesignationList();
    this.getQuestions();
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
    this.header = 'Question Master';
  }

  selectAllValue(val) {
    if (val._selected) {
      this.desgination.setValue(this.designationList);
      val._selected = true;
    }
    if (val._selected == false) {
      this.desgination.setValue([]);
    }
  }

  getDesignationList() {
    const request = {
      company_id: this.company_id
    };
    this.web.post('Designation/get_designation_by_company', request).subscribe(
      data => {
        if (data.status) {
          this.designationList = data.Response;
        }
      },
      error => {}
    );
  }

  getQuestions() {
    this.header = 'Interview Question Bank Master';
    this.isStillLoading = true;
    let questionData: any;
    const questionNames = [];
    let count = 1;
    const request = {
      company_id: this.company_id
    };
    this.web
      .post(
        'Interview_question_bank/ajax_get_interview_question_by_company',
        request
      )
      .subscribe(
        data => {
          if (data.status) {
            questionData = data.response;
            for (const i of questionData) {
              const designationData = i.designation;
              const desg = [];
              for (const j of designationData) {
                desg.push({
                  desginationId: j.designation_id,
                  desginationCode: j.designation_code,
                  questionName: j.designation_name
                });
              }
              questionNames.push({
                sno: count,
                id: i.id,
                interviewQuestion: i.interview_question,
                desgDetails: desg
              });
              count++;
            }
            this.dataSource = new MatTableDataSource(questionNames);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            this.isStillLoading = false;
          } else {
            this.ui.snackbarPop(data.message, '', 'Error');
            this.isStillLoading = false;
          }
        },
        error => {
          this.ui.snackbarPop('Something went wrong', 'Retry', 'Error');
          this.isStillLoading = false;
        }
      );
  }

  addQuestion() {
    this.header = 'Add Questions';
    this.isViewVisible = false;
    this.isCreateVisible = true;
    this.isSave = true;
    this.interviewRoundQuestionList = {
      interview_question: '',
      designation_id: []
    };
  }

  saveInterviewRoundQuestion() {
    this.isProgressing = true;
    const desgId: any[] = this.interviewRoundQuestionList.designation_id;

    const request = {
      company_id: this.company_id,
      interview_question: this.interviewRoundQuestionList.interview_question,
      designation_id: desgId
    };
    this.web
      .post('Interview_question_bank/ajax_insert_interview_question', request)
      .subscribe(
        data => {
          if (data.status) {
            this.ui.snackbarPop('Successfully added', '', 'Success');
            this.isCreateVisible = false;
            this.isViewVisible = true;
            this.isProgressing = false;
            this.getQuestions();
          } else {
            this.ui.snackbarPop(data.message, 'Retry', 'Error');
            this.isProgressing = false;
          }
        },
        error => {
          this.ui.snackbarPop('Something went wrong', 'Retry', 'Error');
          this.isCreateVisible = false;
          this.isViewVisible = true;
          this.isProgressing = false;
          return false;
        }
      );
  }

  editQuestion(val) {
    this.header = 'Update Interview Question';
    this.isViewVisible = false;
    this.isCreateVisible = true;
    this.isSave = false;
    this.interviewRoundQuestionList = {
      interview_round_id: val.id,
      interview_question: val.interviewQuestion,
      designation_id: val.desgDetails.map(obj => obj.desginationId)
    };
  }

  updateInterviewQuestion() {
    this.isProgressing = true;
    const request = {
      company_id: this.company_id,
      id: this.interviewRoundQuestionList.interview_round_id,
      interview_question: this.interviewRoundQuestionList.interview_question,
      designation_id: this.interviewRoundQuestionList.designation_id
    };
    this.web
      .post('Interview_question_bank/ajax_update_interview_question', request)
      .subscribe(
        data => {
          if (data.status) {
            this.ui.snackbarPop('successfully updated', '', 'Success');
            this.header = 'Interview Round Question Master';
            this.getQuestions();
            this.isCreateVisible = false;
            this.isViewVisible = true;
            this.isProgressing = false;
            this.isSave = true;
          } else {
            this.ui.snackbarPop(data.message, '', 'Error');
            this.isProgressing = false;
          }
        },
        error => {
          this.ui.snackbarPop('Something went wrong', '', 'Error');
          this.isCreateVisible = false;
          this.isViewVisible = true;
          this.isProgressing = false;
          return false;
        }
      );
  }

  deleteQuestion(row) {
    const request = {
      company_id: this.company_id,
      id: row.map(obj => obj.id)
    };
    this.web
      .post('Interview_question_bank/ajax_delete_interview_question', request)
      .subscribe(
        data => {
          this.ui.snackbarPop('Successfully deleted', '', 'Success');
          this.getQuestions();
        },
        error => {
          this.ui.snackbarPop('Something went wrong', '', 'Error');
        }
      );
  }
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    let numRows;
    if (numSelected) {
      numRows = this.dataSource.data.length;
      return numSelected === numRows;
    }
  }
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach(row => this.selection.select(row));
  }
  checkboxLabel(row?: Question): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${
      this.selection.isSelected(row) ? 'deselect' : 'select'
    } row ${row.interview_question_id + 1}`;
  }
  openMultipleDelete() {
    this.deleteArray = [];
    let data: any = [];
    data = this.selection;
    if (data._selected) {
      for (const x of data._selected) {
        this.deleteArray.push({
          id: x.id,
          name: x.interviewQuestion
        });
      }
      this.dialogBox(this.deleteArray);
    }
  }
  openSingleDelete(value) {
    this.deleteArray = [];
    this.deleteArray.push({
      id: value.id,
      name: value.interviewQuestion
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
          second: 'Interview Question',
          third: 'Action'
        }
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.length > 0) {
          this.deleteQuestion(result);
          this.selection = new SelectionModel<Question>(true, []);
        } else {
          this.selection = new SelectionModel<Question>(true, []);
          this.ui.snackbarPop(
            'There is no data available to delete',
            '',
            'Error'
          );
        }
      } else {
        this.selection = new SelectionModel<Question>(true, []);
      }
    });
  }
}
