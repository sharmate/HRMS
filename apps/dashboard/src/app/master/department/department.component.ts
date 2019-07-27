import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { WebService, UiService, LocalService } from '@workshop/core-data';
import { MatDialog } from '@angular/material';
import { DeleteComponent } from '@workshop/common-ui';

export interface department {
  department_id: number;
  departmentCode: string;
  departmentName: string;
}

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss'],
  providers: [WebService, UiService]
})
export class DepartmentComponent implements OnInit {
  constructor(
    public pageTitle: Title,
    public web: WebService,
    public ui: UiService,
    public local: LocalService,
    public dialog: MatDialog
  ) {}
  isProgressing = false;
  selection = new SelectionModel<department>(true, []);
  dataSource: MatTableDataSource<department>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  header = 'Department Master';
  isViewVisible = true;
  isCreateVisible = false;
  isStillLoading = false;
  isSave = false;
  departmentList: any = {};
  deleteArray: any = [];

  displayedColumns: string[] = [
    'select',
    'sno',
    'departmentCode',
    'departmentName',
    'action'
  ];

  deptId: any;
  company_id = this.local.getCompany_id();
  clearValue = '';

  ngOnInit() {
    this.ui.authenticatorUser();
    this.pageTitle.setTitle('Department');
    this.getDepartmentList();
  }
  clearSearch = () => {
    this.clearValue = '';
    this.dataSource.filter = '';
  };

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getDeptCode() {
    const request = {
      company_id: this.company_id
    };
    this.web
      .post('Department/ajax_generate_department_code', request)
      .subscribe(
        data => {
          if (data.status) {
            this.departmentList.departmentCode = data.response;
          } else {
            this.ui.snackbarPop(data.message, '', 'Error');
          }
        },
        error => {
          this.ui.snackbarPop('Something went wrong', '', 'Error');
        }
      );
  }

  getDepartmentList() {
    let departmentData: any;
    this.isStillLoading = true;
    const departments = [];
    let count = 1;
    const request = {
      company_id: this.company_id
    };
    this.web.post('Department/get_department_by_company', request).subscribe(
      data => {
        if (data.status) {
          departmentData = data.response;
          for (const i of departmentData) {
            departments.push({
              sno: count,
              id: i.id,
              departmentCode: i.department_code,
              departmentName: i.department_name
            });
            count++;
          }
          this.dataSource = new MatTableDataSource(departments);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.isStillLoading = false;
        } else {
          this.ui.snackbarPop(data.message, '', 'Error');
        }
      },
      error => {
        this.ui.snackbarPop('Something went wrong', '', 'Error');
      }
    );
  }

  addDepartment() {
    this.header = 'Add Department';
    this.isViewVisible = false;
    this.isCreateVisible = true;
    this.isSave = true;
    this.getDeptCode();
    this.departmentList = {
      departmentCode: this.departmentList.departmentCode,
      departmentName: ''
    };
  }

  saveDepartment(url) {
    if (
      this.departmentList.departmentCode === '' ||
      this.departmentList.departmentCode === undefined
    ) {
      this.ui.snackbarPop('Please Enter Department Code', 'Retry', 'Error');
      return false;
    }
    if (
      this.departmentList.departmentName === '' ||
      this.departmentList.departmentName === undefined
    ) {
      this.ui.snackbarPop('Please Enter Department Name', 'Retry', 'Error');
      return false;
    }

    this.isProgressing = true;
    const request = {
      company_id: this.company_id,
      department_code: this.departmentList.departmentCode,
      department_name: this.departmentList.departmentName
    };
    this.web.post(url, request).subscribe(
      data => {
        if (data.status) {
          this.ui.snackbarPop('Succesfull Department added', '', 'Success');
          this.isViewVisible = true;
          this.isCreateVisible = false;
          this.header = 'Department Master';
          this.isProgressing = false;
          this.getDepartmentList();
        } else {
          this.ui.snackbarPop(data.message, '', 'Error');
          this.isProgressing = false;
        }
      },
      error => {
        this.ui.snackbarPop('Something went wrong', '', 'Error');
        this.isProgressing = false;
      }
    );
  }

  editDepartment(val) {
    this.header = 'Update Department';
    this.isViewVisible = false;
    this.isCreateVisible = true;
    this.isSave = false;
    this.departmentList = {
      id: val.id,
      departmentCode: val.departmentCode,
      departmentName: val.departmentName
    };
  }

  updateDepartment() {
    if (
      this.departmentList.departmentCode === '' ||
      this.departmentList.departmentCode === undefined
    ) {
      this.ui.snackbarPop('Please Enter Department Code', 'Retry', 'Error');
      return false;
    }
    if (
      this.departmentList.departmentName === '' ||
      this.departmentList.departmentName === undefined
    ) {
      this.ui.snackbarPop('Please Enter Department Name', 'Retry', 'Error');
      return false;
    }

    this.isProgressing = true;
    const request = {
      company_id: this.company_id,
      id: this.departmentList.id,
      department_code: this.departmentList.departmentCode,
      department_name: this.departmentList.departmentName
    };
    this.web.post('Department/ajax_update_department', request).subscribe(
      data => {
        if (data.status) {
          this.ui.snackbarPop('Succesfull Department updated', '', 'Success');
          this.isViewVisible = true;
          this.isCreateVisible = false;
          this.isProgressing = false;
          this.header = 'Department Master';
          this.getDepartmentList();
        } else {
          this.ui.snackbarPop(data.message, '', 'Error');
          this.isProgressing = false;
        }
      },
      error => {
        this.ui.snackbarPop('Something went wrong', '', 'Error');
        this.isProgressing = false;
      }
    );
  }

  deleteDepartment(val) {
    const request = {
      company_id: this.company_id,
      id: val.map(obj => obj.id)
    };
    this.web.post('Department/ajax_delete_department', request).subscribe(
      data => {
        if (data.status) {
          this.ui.snackbarPop('Successfully Department deleted', '', 'Success');
          this.getDepartmentList();
          this.selection = new SelectionModel<department>(true, []);
        } else {
          this.ui.snackbarPop(data.message, '', 'Error');
        }
      },
      error => {
        this.ui.snackbarPop('Something went wrong', '', 'Error');
      }
    );
  }

  closeCreate() {
    this.isViewVisible = true;
    this.isCreateVisible = false;
    this.header = 'Department Master';
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

  checkboxLabel(row?: department): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${
      this.selection.isSelected(row) ? 'deselect' : 'select'
    } row ${row.department_id + 1}`;
  }

  openMultiDelete() {
    this.deleteArray = [];
    let data: any = [];
    data = this.selection;
    if (data.selected) {
      for (const x of data.selected) {
        this.deleteArray.push({
          id: x.id,
          name: x.departmentName,
          code: x.departmentCode
        });
      }
    }
    this.dialogBox(this.deleteArray);
  }

  openSingleDelete(value) {
    this.deleteArray = [];
    this.deleteArray.push({
      id: value.id,
      name: value.departmentName,
      code: value.departmentCode
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
          first: 'Department Code',
          second: 'Department Name',
          third: 'Action'
        }
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.length > 0) {
          this.deleteDepartment(result);
          this.selection = new SelectionModel<department>(true, []);
        } else {
          this.selection = new SelectionModel<department>(true, []);
          this.ui.snackbarPop(
            'There is no data available to delete',
            '',
            'Error'
          );
        }
      } else {
        this.selection = new SelectionModel<department>(true, []);
      }
    });
  }
}
