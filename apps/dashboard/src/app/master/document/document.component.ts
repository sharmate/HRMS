import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { UiService, WebService, LocalService } from '@workshop/core-data';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

export interface document {
  document_id: number;
  employeeName: string;
  email: string;
  documentListNo: number;
}

const documentHardData = [
  {
    document_id: 1,
    employeeName: 'Ravi Sharma',
    email: 'ravik4254@hmail.com',
    documentListNo: 4
  },
  {
    document_id: 2,
    employeeName: 'Mani',
    email: 'mani@hmail.com',
    documentListNo: 6
  },
  {
    document_id: 3,
    employeeName: 'Arun',
    email: 'arun@hmail.com',
    documentListNo: 7
  },
  {
    document_id: 4,
    employeeName: 'Rahul',
    email: 'rahul@hmail.com',
    documentListNo: 7
  }
];

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.scss'],
  providers: [WebService, UiService, LocalService]
})
export class DocumentComponent implements OnInit {
  constructor(
    private titlePage: Title,
    private ui: UiService,
    private web: WebService,
    private local: LocalService
  ) {}
  company_id: any = this.local.getCompany_id();
  employeeName: any;
  email: any;
  designation: any;
  documentListNo: any;
  documentList: any = [];
  empDetailsList: any = [];
  selectedEmpDetails = '';

  favoriteSeason = '';
  empDetails = [{ id: 0, name: 'Employee' }, { id: 1, name: 'Candidate' }];

  candidate: [
    { id: 0; name: 'Ravi' },
    { id: 1; name: 'Mani' },
    { id: 2; name: 'Arun' },
    { id: 3; name: 'Raunak' },
    { id: 4; name: 'Sarvesh' }
  ];
  selectedCadidate = '';

  dataSource: MatTableDataSource<document>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  header = 'Document Master';
  isStillLoading = false;
  isViewVisible = true;
  isCreateVisible = false;
  isSave = false;

  displayedColumns: string[] = ['sno', 'employeeName', 'email', 'action'];

  selectedID: any;

  employeeData;
  myFiles: string[] = [];
  sendBase64: any;

  FileDetails: any = [];
  isFileName = false;
  fileName = '';
  fileType = '';

  changeValue(val) {
    this.selectedID = val;
    if (val == '0') {
      const request = {
        company_id: this.company_id
      };
      this.web
        .post('Employeedetails/ajax_get_employeedetails_by_comp', request)
        .subscribe(
          data => {
            if (data.status) {
              const emp = data.response;
              const temp = [];
              for (const i of emp) {
                temp.push({
                  id: i.id,
                  name: `${i.firstName} ${i.lastName}`
                });
              }
              this.employeeData = temp;
            }
          },
          error => {
            this.ui.snackbarPop('Something went wrong', '', 'Error');
          }
        );
    } else if (val == '1') {
      const request = {
        company_id: this.company_id
      };
      this.web
        .post('Candidatedetails/ajax_get_candidate_details_by_company', request)
        .subscribe(
          data => {
            if (data.status) {
              const emp = data.response;
              const temp = [];
              for (const i of emp) {
                temp.push({
                  id: i.id,
                  name: i.candidate_name
                });
              }
              this.employeeData = temp;
            }
          },
          error => {
            this.ui.snackbarPop('Something went wrong', '', 'Error');
          }
        );
    }
  }

  ngOnInit() {
    this.ui.authenticatorUser();
    this.titlePage.setTitle('Document List');
    this.getDocumentList();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getDocumentList() {
    const documentData: any = documentHardData;
    const documents = [];
    let count = 1;
    const request = {
      company_id: this.company_id
    };
    for (const i of documentData) {
      documents.push({
        sno: count,
        employeeName: i.employeeName,
        email: i.email
      });
      count++;
    }
    this.dataSource = new MatTableDataSource(documents);
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  addDocument() {
    this.isViewVisible = false;
    this.isCreateVisible = true;
    this.header = 'Upload Ducument';
    this.isSave = true;
    this.documentList = {
      employeeName: '',
      email: '',
      documentListNo: ''
    };
  }

  uploadFile(event) {
    const file = event.target.files[0];
    if (file) {
      this.isFileName = true;
      this.fileName = this.ui.getFileName(file.name);
      this.fileType = this.ui.getFileExtension(file.name);
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onloadend = () => {
        this.sendBase64 = fileReader.result;
      };
    }
  }

  creaseBase64() {
    const request = {
      company_id: this.company_id,
      base64: this.sendBase64,
      file_type: this.fileType,
      file_name: this.fileName,
      attachment: `${this.fileName}.${this.fileType}`
    };
    this.web.post('Employeedoc/base64save', request).subscribe(
      data => {
        if (data.status) {
          this.FileDetails = data.response;
        }
      },
      error => {
        this.ui.snackbarPop('File not added', 'Retry', 'Error');
      }
    );
  }
  closeCreate() {
    this.isViewVisible = true;
    this.isCreateVisible = false;
    this.header = 'Document Master';
  }
  viewDocument(row) {}
  editDocument(row) {}

  saveDocument() {}

  uploadDocument() {
    const request = {
      company_id: this.company_id,
      user_type: this.documentList.name,
      document_list: this.documentList.documentListName,
      file_upload: this.FileDetails
    };
    this.web.post('Employeedoc/ajax_insert_employeedetails', request).subscribe(
      data => {
        if (data.staus) {
          this.ui.snackbarPop('Document Uploaded Succesfully', '', 'Success');
        } else {
          this.ui.snackbarPop(data.message, '', 'Warning');
        }
      },
      error => {
        this.ui.snackbarPop('Something went wrong', '', 'Error');
      }
    );
  }
  deleteDocument(row) {}
}
