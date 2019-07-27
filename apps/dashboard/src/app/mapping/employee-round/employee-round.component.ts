import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { WebService, UiService, LocalService } from '@workshop/core-data';
import { FormControl, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { SelectionModel } from '@angular/cdk/collections';

export interface RoundDetails {
  roundId: number;
  roundName: string;
}

export interface Departments {
  departmentId: number;
  departmentName: string;
  roundDetails: RoundDetails[];
}
export interface locations {
  csId: number;
  departments: Departments[];
}

export interface EmployeeRoundMapping {
  employeeId: number;
  employeeName: string;
  locations: locations[];
}

@Component({
  selector: 'app-employee-round',
  templateUrl: './employee-round.component.html',
  styleUrls: ['./employee-round.component.scss']
})
export class EmployeeRoundComponent implements OnInit {
  constructor(
    public pageTitle: Title,
    public web: WebService,
    public ui: UiService,
    public local: LocalService,
    public fb: FormBuilder
  ) {}

  header = 'Employee Round Mapping';
  selection = new SelectionModel<EmployeeRoundMapping>(true, []);
  dataSource: MatTableDataSource<EmployeeRoundMapping>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  isViewVisible = true;
  isCreateVisible = false;
  isSave = false;
  isUpdate = false;
  isViewDepartment = false;
  panelOpenState = false;
  isStillLoading = false;
  employeeList: any = [];
  costCenterList: any = [];
  departmentList: any = [];
  roundNameList: any = [];
  costCenterData: any = [];
  departmentData: any = [];
  roundNameData: any = [];
  ccArray = [];
  deptArray = [];
  roundArray = [];
  company_id = this.local.getCompany_id();

  displayedColumns: string[] = [
    'select',
    'sno',
    'employee_name',
    'cost_centers',
    'action'
  ];

  departmentColumns: string[] = ['departments', 'rounds'];
  employeeRoundList: any = {};

  mappingForm: any = new FormGroup({
    employee_id: new FormControl(''),
    cost_centers: new FormArray([this.createCostcenter()])
  });

  costcenters = [];

  createCostcenter(): FormGroup {
    return this.fb.group({
      cost_center_id: new FormControl(''),
      departments: new FormArray([this.createDept()])
    });
  }

  createDept() {
    return this.fb.group({
      department_id: new FormControl(''),
      round_ids: new FormControl('')
    });
  }

  ngOnInit() {
    this.pageTitle.setTitle('Employee Round Mapping');
    this.getEmployeeMapping();
    this.getEmployeeList();
    this.getCostCenterList();
    this.getDepartmentList();
    this.getRoundList();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  getEmployeeList() {
    const request = {
      company_id: this.company_id
    };
    this.web
      .post('Employeedetails/ajax_get_employeedetails_by_comp', request)
      .subscribe(
        data => {
          this.employeeList = data.response.map(obj => {
            return {
              id: obj.id,
              name: `${obj.first_name ? obj.first_name : ''} ${
                obj.last_name ? obj.last_name : ''
              }`
            };
          });
        },
        error => {}
      );
  }

  getCostCenterList() {
    const request = {
      company_id: this.company_id
    };
    this.web.post('Locations/ajax_get_location_by_company', request).subscribe(
      data => {
        if (data.status) {
          this.costCenterList = data.response.map(obj => {
            return {
              id: obj.location_name,
              name: obj.location
            };
          });
        }
      },
      error => {}
    );
  }

  getDepartmentList() {
    const request = {
      company_id: this.company_id
    };
    this.web.post('Department/get_department_by_company', request).subscribe(
      data => {
        if (data.status) {
          this.departmentList = data.response.map(obj => {
            return {
              id: obj.id,
              name: obj.department_name
            };
          });
        }
      },
      error => {
        this.ui.snackbarPop('Something went wrong', '', 'Error');
      }
    );
  }

  getRoundList() {
    const request = {
      company_id: this.company_id
    };
    this.web
      .post(
        'Interview_round_name_master/ajax_get_interview_master_by_company',
        request
      )
      .subscribe(data => {
        if (data.status) {
          this.roundNameList = data.response.map(obj => {
            return {
              id: obj.id,
              name: obj.name
            };
          });
        }
      });
  }

  getEmployeeMapping() {
    this.isStillLoading = true;
    let count = 1;
    this.isStillLoading = true;
    let employeeMappingData: any[];
    const mappingData: any[] = [];
    this.header = 'Add Employee Mapping';
    const request = {
      company_id: this.company_id
    };

    this.web
      .post(
        'Employee_master_mapping/ajax_view_employee_master_mapping',
        request
      )
      .subscribe(
        data => {
          if (data.status) {
            employeeMappingData = data.response;
            for (const i of employeeMappingData) {
              const costcenterData = [];
              for (const j of i.cost_centers) {
                const departmentsData = [];
                for (const k of j.departments) {
                  const roundsData = [];
                  for (const x of k.round_ids) {
                    roundsData.push({
                      name: x.name,
                      round_id: x.round_id
                    });
                  }

                  departmentsData.push({
                    department_id: k.department_id,
                    department_name: k.department_name,
                    round_ids: roundsData
                  });
                }

                costcenterData.push({
                  cost_center_id: j.cost_center_id,
                  location: j.location,
                  departments: departmentsData
                });
              }

              mappingData.push({
                sno: count,
                id: i.id,
                employee_id: i.employee_id,
                first_name: i.first_name ? i.first_name : '',
                middle_name: i.middle_name ? i.middle_name : '',
                last_name: i.last_name ? i.last_name : '',
                employee_name: `${i.first_name ? i.first_name : ''} ${
                  i.middle_name ? i.middle_name : ''
                } ${i.last_name ? i.last_name : ''}`,
                cost_centers: costcenterData
              });
              count++;
            }
            this.dataSource = new MatTableDataSource(mappingData);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            this.isStillLoading = false;
          } else {
            this.ui.snackbarPop(data.message, '', 'Warning');
          }
        },
        error => {}
      );
  }
  selectedCostCenter(event) {
    this.ccArray = event.value;
    const inputData = [];
    for (const i of this.ccArray) {
      inputData.push({
        cId: i,
        dList: this.departmentList
      });
    }
    this.departmentData = inputData;
    // let temp = []
    // for (const i of this.ccArray) {
    //   temp.push({
    //     cost_center_id: i
    //   })
    // }
    // this.costcenters = temp
  }

  selectedDepartment(event, index) {
    const iValue = event.option.value;
    if (event.option.selected) {
      this.deptArray.push(iValue);
    } else {
      this.deptArray.splice(this.deptArray.findIndex(obj => obj.id == iValue));
    }
    const temp = [];
    for (const i of this.deptArray) {
      temp.push({
        depArr: i,
        rList: this.roundNameList
      });
    }
    this.roundNameData = temp;

    const iTem = [];
    iTem.push({
      cost_center_id: index,
      department: this.deptArray
    });
  }

  selectedRound(event) {
    // const iValue = event.source.value
    // if (event.checked) {
    //   this.roundArray.push(iValue)
    // } else {
    //   this.roundArray.splice(this.deptArray.findIndex(obj => obj.id == iValue))
    // }
  }

  addEmployeeMapping() {
    this.isViewVisible = false;
    this.isCreateVisible = true;
    this.header = 'Add Employee Round Mapping';
    this.ccArray = [];
    this.deptArray = [];
    this.roundArray = [];
    // this.mappingForm = new FormGroup({
    //   employee_id: new FormControl(''),
    //   cost_centers: new FormArray([this.createCostcenter()])
    // })

    // createCostcenter(): FormGroup {
    //   return this.fb.group({
    //     cost_center_id: new FormControl(''),
    //     departments: new FormArray([this.createDept()])
    //   })
    // }

    // createDept() {
    //   return this.fb.group({
    //     department_id: new FormControl(''),
    //     round_ids: new FormControl('')
    //   })
    // }

    this.employeeRoundList = {
      employee_id: ''
    };
  }

  saveMapping() {
    const request = {
      employee_id: this.employeeRoundList.employee_id
    };
    // const mappingValue = this.mappingForm.value
  }

  closeCreate() {
    this.isCreateVisible = false;
    this.isViewVisible = true;
    this.header = 'Employee Round Mapping';
    this.ccArray = [];
    this.deptArray = [];
    this.roundArray = [];
  }

  viewEmployeeRound() {}
  editMapping() {}

  deleteMapping() {}

  multipleDelete() {}
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

  checkboxLabel(row?: EmployeeRoundMapping): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${1}`;
  }
}
