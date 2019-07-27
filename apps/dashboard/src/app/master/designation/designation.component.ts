import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { WebService, UiService, LocalService } from '@workshop/core-data';
import { SelectionModel } from '@angular/cdk/collections';
import { DeleteComponent } from '@workshop/common-ui';
import { MatDialog } from '@angular/material';

export interface designation {
  designation_id: number;
  designationCode: string;
  designationName: string;
}

@Component({
  selector: 'app-designation',
  templateUrl: './designation.component.html',
  styleUrls: ['./designation.component.scss'],
  providers: [WebService, UiService]
})
export class DesignationComponent implements OnInit {
  constructor(
    private pageTitle: Title,
    private web: WebService,
    private ui: UiService,
    private local: LocalService,
    public dialog: MatDialog
  ) {}
  selection = new SelectionModel<designation>(true, []);
  dataSource: MatTableDataSource<designation>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  header = 'Designation Master';
  isViewVisible = true;
  isCreateVisible = false;
  isProgressing = false;
  isStillLoading = false;
  isSave = false;
  designationList: any = {};
  deleteArray: any = [];

  displayedColumns: string[] = [
    'select',
    'sno',
    'designationCode',
    'designationName',
    'action'
  ];
  company_id = this.local.getCompany_id();
  clearValue = '';

  ngOnInit() {
    this.ui.authenticatorUser();
    this.pageTitle.setTitle('Designation');
    this.getDesignationList();
  }
  clearSearch = () => {
    this.clearValue = '';
    this.dataSource.filter = '';
  };

  getDesignationCode() {
    const request = {
      company_id: this.company_id
    };
    this.web
      .post('Designation/ajax_generate_designation_code', request)
      .subscribe(
        data => {
          if (data.status) {
            this.designationList.designationCode = data.response;
          } else {
            this.ui.snackbarPop(data.message, '', 'Error');
          }
        },
        error => {
          this.ui.snackbarPop('Something went wrong', '', 'Error');
        }
      );
  }

  getDesignationList() {
    this.isStillLoading = true;
    let designationData: any;
    const designations = [];
    let count = 1;
    const request = {
      company_id: this.company_id
    };
    this.web.post('Designation/get_designation_by_company', request).subscribe(
      data => {
        if (data.status) {
          designationData = data.Response;
          for (const i of designationData) {
            designations.push({
              sno: count,
              id: i.id,
              designationCode: i.designation_code,
              designationName: i.designation_name
            });
            count++;
          }
          this.dataSource = new MatTableDataSource(designations);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.isStillLoading = false;
        } else {
          this.ui.snackbarPop(data.message, '', 'Error');
          this.isStillLoading = false;
        }
      },
      error => {
        this.ui.snackbarPop('Something went wrong', '', 'Error');
      }
    );
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  addDesignation() {
    this.header = 'Add Designation';
    this.isViewVisible = false;
    this.isCreateVisible = true;
    this.isSave = true;
    this.getDesignationCode();
    this.designationList = {
      designationCode: this.designationList.designationCode,
      designationName: ''
    };
  }

  saveDesignation() {
    if (
      this.designationList.designationCode === '' ||
      this.designationList.designationCode === undefined
    ) {
      this.ui.snackbarPop('Please Enter Designation Code', 'Retry', 'Error');
      return false;
    }
    if (
      this.designationList.designationName === '' ||
      this.designationList.designationName === undefined
    ) {
      this.ui.snackbarPop('Please Enter Desgination Name', 'Retry', 'Error');
      return false;
    }

    this.isProgressing = true;
    const request = {
      company_id: this.company_id,
      designation_code: this.designationList.designationCode,
      designation_name: this.designationList.designationName
    };

    this.web.post('Designation/ajax_insert_designation', request).subscribe(
      data => {
        if (data.status) {
          this.ui.snackbarPop('Successfully Designation added', '', 'Success');
          this.isViewVisible = true;
          this.isCreateVisible = false;
          this.isProgressing = false;
          this.header = 'Designation Master';
          this.getDesignationList();
        } else {
          this.ui.snackbarPop(data.message, '', 'Error');
          this.isProgressing = false;
        }
      },
      error => {
        this.ui.snackbarPop('Something went wrong', '', 'Error');
        this.isViewVisible = true;
        this.isCreateVisible = false;
        this.isProgressing = false;
        return false;
      }
    );
  }

  editDesignation(val) {
    this.header = 'Update Designation';
    this.isViewVisible = false;
    this.isCreateVisible = true;
    this.isSave = false;
    this.designationList = {
      id: val.id,
      designationCode: val.designationCode,
      designationName: val.designationName
    };
  }

  updateDesignation() {
    if (
      this.designationList.designationCode === '' ||
      this.designationList.designationCode === undefined
    ) {
      this.ui.snackbarPop('Please Enter Designation Code', 'Retry', 'Error');
      return false;
    }
    if (
      this.designationList.designationName === '' ||
      this.designationList.designationName === undefined
    ) {
      this.ui.snackbarPop('Please Enter Designation Name', 'Retry', 'Error');
      return false;
    }
    this.isProgressing = true;
    const request = {
      company_id: this.company_id,
      id: this.designationList.id,
      designation_code: this.designationList.designationCode,
      designation_name: this.designationList.designationName
    };
    this.web.post('Designation/ajax_update_designation', request).subscribe(
      data => {
        if (data.status) {
          this.ui.snackbarPop(
            'Successfully Deisgnation Updated',
            '',
            'Success'
          );
          this.isViewVisible = true;
          this.isCreateVisible = false;
          this.isProgressing = false;
          this.header = 'Designation Master';
          this.getDesignationList();
        } else {
          this.ui.snackbarPop(data.message, '', 'Error');
          this.isProgressing = false;
        }
      },
      error => {
        this.ui.snackbarPop('Something went wrong', '', 'Error');
        this.isViewVisible = true;
        this.isCreateVisible = false;
        this.isProgressing = false;
      }
    );
  }

  closeCreate() {
    this.isViewVisible = true;
    this.isCreateVisible = false;
    this.header = 'Designation Master';
  }

  deleteDesignation(val) {
    const request = {
      company_id: this.company_id,
      id: val.map(obj => obj.id)
    };
    this.web.post('Designation/ajax_delete_designation', request).subscribe(
      data => {
        this.ui.snackbarPop('Successfully Designation deleted', '', 'Success');
        this.isViewVisible = true;
        this.isCreateVisible = false;
        this.header = 'Designation Master';
        this.getDesignationList();
        this.selection = new SelectionModel<designation>(true, []);
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
    }
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach(row => this.selection.select(row));
  }

  checkboxLabel(row?: designation): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${
      this.selection.isSelected(row) ? 'deselect' : 'select'
    } row ${row.designation_id + 1}`;
  }

  openMultiDelete() {
    this.deleteArray = [];
    let data: any = [];
    data = this.selection;
    if (data.selected) {
      for (const x of data.selected) {
        this.deleteArray.push({
          id: x.id,
          name: x.designationName,
          code: x.designationCode
        });
      }
    }
    this.dialogBox(this.deleteArray);
  }

  openSingleDelete(value) {
    this.deleteArray = [];
    this.deleteArray.push({
      id: value.id,
      name: value.designationName,
      code: value.designationCode
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
          first: 'Designation Code',
          second: 'Designation Name',
          third: 'Action'
        }
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.length > 0) {
          this.deleteDesignation(result);
          this.selection = new SelectionModel<designation>(true, []);
        } else {
          this.selection = new SelectionModel<designation>(true, []);
          this.ui.snackbarPop(
            'There is no data available to delete',
            '',
            'Error'
          );
        }
      } else {
        this.selection = new SelectionModel<designation>(true, []);
      }
    });
  }
}
