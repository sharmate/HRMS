import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import {
  MatPaginator,
  MatSort,
  MatTableDataSource,
  MatDialog
} from '@angular/material';
import { WebService, UiService, LocalService } from '@workshop/core-data';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { SelectionModel } from '@angular/cdk/collections';
import { DeleteComponent } from '@workshop/common-ui';

@Component({
  selector: 'app-costcenter-department',
  templateUrl: './costcenter-department.component.html',
  styleUrls: ['./costcenter-department.component.scss']
})
export class CostcenterDepartmentComponent implements OnInit {
  constructor(
    public pageTitle: Title,
    public web: WebService,
    public ui: UiService,
    public local: LocalService,
    public fb: FormBuilder,
    public dialog: MatDialog
  ) {}
  isProgressing = false;
  isCreateVisible = false;
  isViewvisible = true;
  isSave = false;
  isUpdate = false;
  header = 'Costcenter Department Mapping';
  isViewVisible = true;
  isStillLoading = false;
  company_id = this.local.getCompany_id();
  costCenterList: any = [];
  departmentList: any = [];
  dataSource: MatTableDataSource<any>;
  selection = new SelectionModel<any>(true, []);
  deleteArray: any = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = [
    'select',
    'sno',
    'costCenter',
    'department',
    'action'
  ];
  mappingForm: FormGroup;
  updateId = '';

  clearValue = '';

  ngOnInit() {
    this.ui.authenticatorUser();
    this.pageTitle.setTitle('Costcenter Department Mapping');
    this.getCostCenter();
    this.getDepartmentList();
    this.getCcDeptMapping();

    this.mappingForm = this.fb.group({
      id: this.updateId,
      company_id: this.company_id,
      costcenter_id: [],
      department_id: []
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  clearSearch = () => {
    this.clearValue = '';
    this.dataSource.filter = '';
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
              id: i.id,
              name: i.location
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
              id: i.id,
              name: i.department_name
            });
          }
          this.departmentList = temp;
        }
      },
      error => {}
    );
  }

  getCcDeptMapping() {
    this.isStillLoading = true;
    let count = 1;
    const mData = [];
    const request = {
      company_id: this.company_id
    };

    this.web
      .post(
        'Cost_Center_Department_Mapping/ajax_view_cost_center_department_mapping',
        request
      )
      .subscribe(
        data => {
          if (data.status) {
            const mappingData = data.response;
            for (const i of mappingData) {
              const departmentData = i.departments;
              const depts = [];
              for (const j of departmentData) {
                depts.push({
                  department_id: j.department_id,
                  department_name: j.department_name
                });
              }
              mData.push({
                id: i.id,
                sno: count,
                costcenter_id: i.costcenter_id,
                costcenter_name: i.location,
                department: depts
              });
              count++;
            }
            this.dataSource = new MatTableDataSource(mData);

            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            this.isStillLoading = false;
          } else {
            this.ui.snackbarPop(data.message, 'Retry', 'Error');
            this.isStillLoading = false;
          }
        },
        error => {
          this.ui.snackbarPop('Something went wrong', '', 'Error');
          this.isStillLoading = false;
        }
      );
  }

  closeCreate() {
    this.header = 'Costcenter Department Mapping';
    this.isViewVisible = true;
    this.isCreateVisible = false;
  }

  addMapping() {
    this.header = 'Add Costcenter Department Mapping';
    this.isViewVisible = false;
    this.isCreateVisible = true;
    this.isSave = true;
    this.isUpdate = false;
    this.mappingForm = this.fb.group({
      id: this.updateId,
      company_id: this.company_id,
      costcenter_id: [],
      department_id: []
    });
  }

  saveMapping(isUpdateValue, id) {
    const value = this.mappingForm.value;
    if (value.costcenter_id === undefined || value.costcenter_id === '') {
      this.ui.snackbarPop('Please select cost center', 'Retry', 'Error');
      return false;
    }
    if (value.department_id.length < 1 || value.department_id == []) {
      this.ui.snackbarPop('Please select Department', 'Retry', 'Error');
      return false;
    }

    let url = '';

    if (isUpdateValue) {
      url =
        'Cost_Center_Department_Mapping/ajax_update_cost_center_department_mapping';
    } else {
      url =
        'Cost_Center_Department_Mapping/ajax_save_cost_center_department_mapping';
    }
    this.isProgressing = true;
    const request = value;
    this.web.post(url, request).subscribe(data => {
      if (data.status) {
        this.ui.snackbarPop(
          'Successfully Costcenter & Department Mapped',
          '',
          'Success'
        );
        this.getCcDeptMapping();
        this.header = 'Costcenter Department Mapping';
        this.isCreateVisible = false;
        this.isViewVisible = true;
        this.isProgressing = false;
      } else {
        this.ui.snackbarPop(data.message, '', 'Warning');
        this.isProgressing = false;
        return false;
      }
    });
  }

  editMapping(value) {
    this.updateId = value.id;
    const dept = value.department.map(obj => obj.department_id);
    this.header = 'Update Costcenter Department Mapping';
    this.isViewVisible = false;
    this.isCreateVisible = true;
    this.isSave = false;
    this.isUpdate = true;
    this.mappingForm.setValue({
      id: this.updateId,
      company_id: this.company_id,
      costcenter_id: value.costcenter_id,
      department_id: dept
    });
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
          code: x.costcenter_name,
          name: ''
        });
      }
    }
    this.dialogBox(this.deleteArray);
  }

  openSingleDelete(value) {
    this.deleteArray = [];
    this.deleteArray.push({
      id: value.id,
      code: value.costcenter_name,
      name: ''
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
          // second: 'Department',
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

  deleteMapping(value) {
    const request = {
      company_id: this.company_id,
      id: value.map(obj => obj.id)
    };

    this.web
      .post(
        'Cost_Center_Department_Mapping/ajax_delete_cost_center_department_mapping',
        request
      )
      .subscribe(
        data => {
          if (data.status) {
            this.ui.snackbarPop('Successfully Mapping deleted', '', 'Success');
            this.getCcDeptMapping();
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
