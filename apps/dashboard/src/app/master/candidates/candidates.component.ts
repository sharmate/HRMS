import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import {
  MatPaginator,
  MatSort,
  MatTableDataSource,
  MatDialog
} from '@angular/material';
import { WebService, UiService, LocalService } from '@workshop/core-data';
import { SelectionModel } from '@angular/cdk/collections';
import { DeleteComponent } from '@workshop/common-ui';

export interface candidate {
  candidate_id: number;
  candidate_name: string;
  contact: number;
  candidate_email: string;
  address: string;
  designation: string;
}

@Component({
  selector: 'app-candidates',
  templateUrl: './candidates.component.html',
  styleUrls: ['./candidates.component.scss'],
  providers: [WebService, UiService]
})
export class CandidatesComponent implements OnInit {
  constructor(
    private pageTitle: Title,
    private web: WebService,
    private ui: UiService,
    private local: LocalService,
    public dialog: MatDialog
  ) {}
  header = 'Candidate List';
  selection = new SelectionModel<candidate>(true, []);
  dataSource: MatTableDataSource<candidate>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  candidateList: any = {};
  deleteArray: any = [];
  isViewAllCandidate = true;
  isViewCandidate = false;
  isStillLoading = false;
  url = '../../assets/images/user.png';
  tmpFile = '../../assets/images/pdf.png';
  displayedColumns: string[] = [
    'select',
    'sno',
    'candidateName',
    'contact',
    'candidateEmail',
    'address',
    'designation',
    'action'
  ];
  company_id = this.local.getCompany_id();
  singlecandidateDetails: any = [];
  singlecandidateData: any = {};
  imageUrl = '';

  clearValue = '';
  tmpFileUrl = '';
  printData: any = [];
  printPage = false;
  printTitle = '';

  listData = [];
  ngOnInit() {
    this.ui.authenticatorUser();
    this.pageTitle.setTitle('Candidate List');
    this.getcandidateList();
  }

  onPrint() {
    this.printPage = true;
    this.header = 'Candidate List';
    this.printData = this.listData;
  }

  printCompleted() {
    this.printPage = false;
  }

  getcandidateList() {
    this.isStillLoading = true;
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
                imageUrl: i.image_name,
                fileUrl: i.uploadfile_name,
                candidateName: `${i.firstName ? i.firstName : ''} ${
                  i.middleName ? i.middleName : ''
                } ${i.lastName ? i.lastName : ''}`,
                contact: i.contact,
                candidateEmail: i.email,
                address: i.address,
                designation: i.designation_name,
                gender: i.gender,
                CandidateAddress: i.address,
                city: i.city_name,
                state: i.state_name,
                pincode: i.pin_code,
                panCard: i.pan_card,
                adhaar: i.aadhar_no,
                dob: i.date_of_birth
              });
              count++;
            }
            this.isStillLoading = false;
            this.listToExport(candidates);
            this.dataSource = new MatTableDataSource(candidates);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
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

  clearSearch = () => {
    this.clearValue = '';
    this.dataSource.filter = '';
  };
  viewCandidate(val) {
    this.isViewAllCandidate = false;
    this.isViewCandidate = true;
    this.imageUrl = val.imageUrl;
    this.tmpFileUrl = val.fileUrl;
    this.header = 'Candidate Detail';
    this.singlecandidateData = {
      imageUrl: val.imageUrl,
      candidateName: val.candidateName,
      contact: val.contact,
      candidateEmail: val.candidateEmail,
      designation: val.designation,
      address: val.CandidateAddress,
      gender: val.gender,
      city: val.city,
      state: val.state,
      adhaar: val.adhaar,
      pincode: val.pincode,
      panCard: val.panCard,
      dob: val.dob
    };
  }

  deleteCandidate(val) {
    const request = {
      company_id: this.company_id,
      id: val.map(obj => obj.id)
    };
    this.web.post('Candidatedetails/ajax_delete_candidate', request).subscribe(
      data => {
        if (data.status) {
          this.ui.snackbarPop(data.message, '', 'Success');
          this.ui.snackbarPop('Successfully Candidate deleted', '', 'Success');
        } else {
          this.ui.snackbarPop(data.message, '', 'Error');
        }
        this.getcandidateList();
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

  checkboxLabel(row?: candidate): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${
      this.selection.isSelected(row) ? 'deselect' : 'select'
    } row ${row.candidate_id + 1}`;
  }

  BackCandidate() {
    this.isViewAllCandidate = true;
    this.isViewCandidate = false;
    this.header = 'Candidate List';
    this.getcandidateList();
  }

  listToExport(value) {
    this.listData = [];
    for (const i of value) {
      this.listData.push({
        candidate_name: i.candidateName,
        contact: i.contact,
        dob: i.dob,
        gender: i.gender,
        email: i.candidateEmail,
        designation: i.designation,
        address: i.address,
        city: i.city,
        state: i.state
      });
    }
  }

  openMultipleDelete() {
    this.deleteArray = [];
    let data: any = [];
    data = this.selection;
    if (data._selected) {
      for (const x of data._selected) {
        this.deleteArray.push({
          id: x.id,
          name: x.candidateName,
          code: x.designation
        });
      }
      this.dialogBox(this.deleteArray);
    }
  }
  openSingleDelete(value) {
    this.deleteArray = [];
    this.deleteArray.push({
      id: value.id,
      name: value.candidateName,
      code: value.designation
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
          first: 'Candidate Name',
          second: 'Designation',
          third: 'Action'
        }
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.length > 0) {
        this.deleteCandidate(result);
      }
    });
  }
}
