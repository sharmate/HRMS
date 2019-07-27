import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { WebService, UiService, LocalService } from '@workshop/core-data';
import { MatDialog } from '@angular/material';
import { DeleteComponent } from '@workshop/common-ui';

export interface costCenter {
  sno: number;
  location: string;
  gst_no: string;
  address: string;
  state: string;
  city: string;
  pincode: number;
}

@Component({
  selector: 'app-cost-center',
  templateUrl: './cost-center.component.html',
  styleUrls: ['./cost-center.component.scss'],
  providers: [WebService, UiService]
})
export class CostCenterComponent implements OnInit {
  constructor(
    public pageTitle: Title,
    public web: WebService,
    public ui: UiService,
    public local: LocalService,
    public dialog: MatDialog
  ) {}
  isProgressing = false;
  selection = new SelectionModel<costCenter>(true, []);
  dataSource: MatTableDataSource<costCenter>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  header = 'Cost Center Master';
  isViewVisible = true;
  isCreateVisible = false;
  isStillLoading = false;
  isSave = false;
  costCenterList: any = {};
  deleteArray: any = [];

  displayedColumns: string[] = [
    'select',
    'sno',
    'location',
    'GST_Number',
    'address',
    'state',
    'city',
    'pincode',
    'action'
  ];
  clearValue = '';
  company_id = this.local.getCompany_id();
  stateList: any = [];
  cityList: any = [];
  selectedState = '';
  selectedCity = '';

  ngOnInit() {
    this.ui.authenticatorUser();
    this.getState();
    this.pageTitle.setTitle('Cost Center');
    this.getCostCenterList();
  }
  clearSearch = () => {
    this.clearValue = '';
    this.dataSource.filter = '';
  };

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  getState() {
    const request = {
      country_id: '101'
    };
    this.web.post('Candidatedetails/ajax_get_state_by_id', request).subscribe(
      data => {
        if (data.status) {
          this.stateList = data.response;
        }
      },
      error => {}
    );
  }
  getCityList(id) {
    const request = {
      state_id: id
    };
    this.web.post('Candidatedetails/ajax_get_city_state_id', request).subscribe(
      data => {
        if (data.status) {
          this.cityList = data.response;
          console.log(this.cityList);
        }
      },
      error => {}
    );
  }
  getCostCenterList() {
    let costCenterData: any;
    const costCenters = [];
    let count = 1;
    const request = {
      company_id: this.company_id
    };
    this.web.post('Locations/ajax_get_location_by_company', request).subscribe(
      data => {
        if (data.status) {
          costCenterData = data.response;
          console.log(costCenterData);
          for (const i of costCenterData) {
            costCenters.push({
              sno: count,
              id: i.id,
              location: i.location,
              gstNo: i.gst_no,
              address: i.address,
              pincode: i.pincode,
              state: i.state,
              stateName: i.state_name,
              city: i.city,
              cityName: i.city_name
            });
            count++;
          }

          this.dataSource = new MatTableDataSource(costCenters);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.isStillLoading = false;
        } else {
        }
      },
      error => {
        this.ui.snackbarPop('Something went wrong', '', 'Error');
      }
    );
  }
  addCostCenter() {
    this.isViewVisible = false;
    this.isCreateVisible = true;
    this.header = 'Add Cost Center';
    this.isSave = true;
    this.costCenterList = {
      company_id: '',
      location: '',
      gst_no: '',
      address: '',
      state: '',
      city: '',
      pincode: ''
    };
  }
  saveCostCenter(url) {
    if (
      this.costCenterList.location === '' ||
      this.costCenterList.location === undefined
    ) {
      this.ui.snackbarPop('Please Enter Location', 'Retry', 'Error');
      return false;
    }
    if (
      this.costCenterList.gstNo === '' ||
      this.costCenterList.gstNo === undefined
    ) {
      this.ui.snackbarPop('Please Enter GST Number', 'Retry', 'Error');
      return false;
    }
    if (
      this.costCenterList.address === '' ||
      this.costCenterList.address === undefined
    ) {
      this.ui.snackbarPop('Please Enter Address', 'Retry', 'Error');
      return false;
    }
    if (
      this.costCenterList.pincode === '' ||
      this.costCenterList.pincode === undefined
    ) {
      this.ui.snackbarPop('Please Enter Pincode', 'Retry', 'Error');
      return false;
    }
    if (
      this.costCenterList.state === '' ||
      this.costCenterList.state === undefined
    ) {
      this.ui.snackbarPop('Please Enter State', 'Retry', 'Error');
      return false;
    }
    if (
      this.costCenterList.city === '' ||
      this.costCenterList.city === undefined
    ) {
      this.ui.snackbarPop('Please Enter City', 'Retry', 'Error');
      return false;
    }

    this.isProgressing = true;
    const request = {
      company_id: this.company_id,
      location: this.costCenterList.location,
      gst_no: this.costCenterList.gstNo,
      address: this.costCenterList.address,
      state: this.costCenterList.state,
      city: this.costCenterList.city,
      pincode: this.costCenterList.pincode
    };
    this.web.post(url, request).subscribe(
      data => {
        if (data.status) {
          this.ui.snackbarPop('Succesfull Cost Center added', '', 'Success');
          this.isViewVisible = true;
          this.isCreateVisible = false;
          this.header = 'Cost Center Master';
          this.isProgressing = false;
          this.getCostCenterList();
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
  closeCreate() {
    this.isViewVisible = true;
    this.isCreateVisible = false;
    this.header = 'Cost Center Master';
  }

  deleteCostCenter(val) {
    const request = {
      company_id: this.company_id,
      id: val.map(obj => obj.id)
    };
    this.web.post('Locations/ajax_delete_location', request).subscribe(
      data => {
        if (data.status) {
          this.ui.snackbarPop(
            'Successfully Cost Center deleted',
            '',
            'Success'
          );
          this.getCostCenterList();
          this.selection = new SelectionModel<costCenter>(true, []);
        } else {
          this.ui.snackbarPop(data.message, '', 'Error');
        }
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

  checkboxLabel(row?: costCenter): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${
      this.selection.isSelected(row) ? 'deselect' : 'select'
    } row ${row.sno + 1}`;
  }

  openMultiDelete() {
    this.deleteArray = [];
    let data: any = [];
    data = this.selection;
    if (data.selected) {
      for (const x of data.selected) {
        this.deleteArray.push({
          id: x.id,
          name: x.location,
          code: x.gstNo
        });
      }
    }
    this.dialogBox(this.deleteArray);
  }

  openSingleDelete(value) {
    this.deleteArray = [];
    this.deleteArray.push({
      id: value.id,
      name: value.location,
      code: value.gstNo
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
          first: 'GST Number',
          second: 'Location',
          third: 'Action'
        }
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.length > 0) {
          this.deleteCostCenter(result);
          this.selection = new SelectionModel<costCenter>(true, []);
        } else {
          this.selection = new SelectionModel<costCenter>(true, []);
          this.ui.snackbarPop(
            'There is no data available to delete',
            '',
            'Error'
          );
        }
      } else {
        this.selection = new SelectionModel<costCenter>(true, []);
      }
    });
  }
  editCostCenter(val) {
    console.log(val);
    this.isViewVisible = false;
    this.isCreateVisible = true;
    this.isSave = false;
    this.getCityList(val.state);
    this.header = 'Update Cost center';
    this.costCenterList = {
      id: val.id,
      location: val.location,
      gstNo: val.gstNo,
      address: val.address,
      pincode: val.pincode,
      state: val.state,
      city: val.city
    };
  }
  updateCostCenter() {
    this.isProgressing = true;
    const request = {
      company_id: this.company_id,
      id: this.costCenterList.id,
      location: this.costCenterList.location,
      gst_no: this.costCenterList.gstNo,
      address: this.costCenterList.address,
      state: this.costCenterList.state,
      city: this.costCenterList.city,
      pincode: this.costCenterList.pincode
    };
    this.web.post('Locations/ajax_update_location', request).subscribe(
      data => {
        if (data.status) {
          this.ui.snackbarPop('Succesfull Cost Center updated', '', 'Success');
          this.isViewVisible = true;
          this.isCreateVisible = false;
          this.header = 'Cost Center Master';
          this.isProgressing = false;
          this.getCostCenterList();
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
}
