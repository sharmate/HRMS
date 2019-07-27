import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { WebService, UiService, LocalService } from '@workshop/core-data';
import { Router } from '@angular/router';

@Component({
  selector: 'app-candidate-form',
  templateUrl: './candidate-form.component.html',
  styleUrls: ['./candidate-form.component.scss']
})
export class CandidateFormComponent implements OnInit {
  constructor(
    private web: WebService,
    private ui: UiService,
    private pageTitle: Title,
    private local: LocalService,
    private router: Router
  ) {}

  candidateList: any = {};
  stateList: any = [];
  cityList: any = [];
  selectedState = '';
  selectedCity = '';
  company_id = this.local.getCompany_id();
  header = 'Candidate Form';
  isProgressing: boolean;
  gender = [
    { id: 0, name: 'Male' },
    { id: 1, name: 'Female' },
    { id: 2, name: 'Others' }
  ];

  selectedGender = '';
  url = '../../assets/images/user.png';
  sendBase64: any;

  FileDetails: any = '';
  isFileName = false;
  fileName = '';
  fileType = '';

  sendBaseFile64: any;

  FileDetails1: any = '';
  isFileName1 = false;
  fileName1 = '';
  fileType1 = '';
  FileUrl = '';
  imageUrl = '';
  fileUrl = '';

  vFirstName = this.ui.firstname;
  vMiddleName = this.ui.middlename;
  vLastName = this.ui.lastname;
  vEmail = this.ui.email;
  vMobile = this.ui.mobile;
  vPincode = this.ui.pincode;
  vAdhaar = this.ui.adhaar;
  vPan = this.ui.panNumber;

  checkLastname = () => this.ui.getErrorLastname();
  checkMiddlename = () => this.ui.getErrorMiddlename();
  checkFirstname = () => this.ui.getErrorFirstname();
  checkEmail = () => this.ui.getErrorEmail();
  checkMobile = () => this.ui.getErrorMobile();
  checkPincode = () => this.ui.getErrorPincode();
  checkAdhaar = () => this.ui.getErrorAdhaar();
  checkPan = () => this.ui.getErrorPanNumber();

  uploadImage(event) {
    const file = event.target.files[0];
    if (file) {
      this.isFileName = true;
      this.fileName = this.ui.getFileName(file.name);
      this.fileType = this.ui.getFileExtension(file.name);
      const myFile: FileReader = new FileReader();
      myFile.onloadend = e => {
        this.sendBase64 = myFile.result;
        this.url = this.sendBase64;
        this.createBase64();
      };

      myFile.readAsDataURL(file);
    }
  }

  createBase64() {
    const request = {
      company_id: this.company_id,
      base64: this.sendBase64,
      file_type: this.fileType,
      file_name: this.fileName,
      attachment: `${this.fileName}.${this.fileType}`
    };
    this.web.post('Candidatedetails/base64save', request).subscribe(
      data => {
        if (data.status) {
          this.FileDetails = data.response;
          this.imageUrl = data.url;
        }
      },
      error => {
        this.ui.snackbarPop('File not added', 'Retry', 'Error');
      }
    );
  }

  onUploadFile(fileData) {
    const file1 = fileData.target.files[0];
    if (file1) {
      this.isFileName1 = true;
      this.fileName1 = this.ui.getFileName(file1.name);
      this.fileType1 = this.ui.getFileExtension(file1.name);
      const myFile1: FileReader = new FileReader();
      myFile1.onloadend = e => {
        this.sendBaseFile64 = myFile1.result;
        this.FileUrl = this.sendBaseFile64;
        this.createBase64File();
      };

      myFile1.readAsDataURL(file1);
    } else {
      this.ui.snackbarPop('File Accept only pdf', 'Retry', 'Error');
    }
  }

  createBase64File() {
    const request = {
      company_id: this.company_id,
      base64: this.sendBaseFile64,
      file_type: this.fileType1,
      file_name: this.fileName1,
      attachment: `${this.fileName1}.${this.fileType1}`
    };
    this.web.post('Candidatedetails/base64save', request).subscribe(
      data => {
        if (data.status) {
          this.FileDetails1 = data.response;
          this.fileUrl = data.url;
        }
      },
      error => {
        this.ui.snackbarPop('File not added', 'Retry', 'Error');
      }
    );
  }

  ngOnInit() {
    this.ui.authenticatorUser();
    this.pageTitle.setTitle('Candidate Form');
    this.getState();
    this.candidateList = {
      firstName: '',
      middleName: '',
      lastName: '',
      email: '',
      contact: '',
      gender: '',
      designation: '',
      address: '',
      state: '',
      city: '',
      pin: '',
      adhaar: '',
      pan: ''
    };
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
        }
      },
      error => {}
    );
  }
  resetCandidate() {
    this.candidateList = {};
  }

  saveCandidate() {
    if (
      this.candidateList.firstName === '' ||
      this.candidateList.firstName === undefined
    ) {
      this.ui.snackbarPop('Please Enter First Name', 'Retry', 'Error');
      return false;
    }
    if (
      this.candidateList.lastName === '' ||
      this.candidateList.lastName === undefined
    ) {
      this.ui.snackbarPop('Please Enter Last Name', 'Retry', 'Error');
      return false;
    }
    if (
      this.candidateList.email === '' ||
      this.candidateList.email === undefined
    ) {
      this.ui.snackbarPop('Please Enter Email', 'Retry', 'Error');
      return false;
    }
    if (
      this.candidateList.contact === '' ||
      this.candidateList.contact === undefined
    ) {
      this.ui.snackbarPop('Please Enter Contact', 'Retry', 'Error');
      return false;
    }

    if (
      this.candidateList.gender === '' ||
      this.candidateList.gender === undefined
    ) {
      this.ui.snackbarPop('Please Enter Gender', 'Retry', 'Error');
      return false;
    }

    if (
      this.candidateList.designation === '' ||
      this.candidateList.designation === undefined
    ) {
      this.ui.snackbarPop('Please Enter Designation', 'Retry', 'Error');
      return false;
    }
    if (
      this.candidateList.address === '' ||
      this.candidateList.address === undefined
    ) {
      this.ui.snackbarPop('Please Enter Address', 'Retry', 'Error');
      return false;
    }
    if (
      this.candidateList.state === '' ||
      this.candidateList.state === undefined
    ) {
      this.ui.snackbarPop('Please Enter State', 'Retry', 'Error');
      return false;
    }
    if (
      this.candidateList.city === '' ||
      this.candidateList.city === undefined
    ) {
      this.ui.snackbarPop('Please Enter City', 'Retry', 'Error');
      return false;
    }

    if (this.candidateList.pin === '' || this.candidateList.pin === undefined) {
      this.ui.snackbarPop('Please Enter Pincode', 'Retry', 'Error');
      return false;
    }
    if (this.candidateList.dob === '' || this.candidateList.dob === undefined) {
      this.ui.snackbarPop('Please Enter Date Of Birth', 'Retry', 'Error');
      return false;
    }
    if (
      this.candidateList.adhaar === '' ||
      this.candidateList.adhaar === undefined
    ) {
      this.ui.snackbarPop('Please Enter Adhaar No', 'Retry', 'Error');
      return false;
    }
    if (this.candidateList.pan === '' || this.candidateList.pan === undefined) {
      this.ui.snackbarPop('Please Enter Pan', 'Retry', 'Error');
      return false;
    }
    this.isProgressing = true;

    const fd = new FormData();
    fd.append('image', this.fileName, this.fileName);
    const request = {
      company_id: this.company_id,
      firstName: this.candidateList.firstName,
      middleName: this.candidateList.middleName,
      lastName: this.candidateList.lastName,
      gender: this.candidateList.gender,
      email: this.candidateList.email,
      designation_name: this.candidateList.designation,
      country: 101,
      state: this.candidateList.state,
      city: this.candidateList.city,
      contact: this.candidateList.contact,
      address: this.candidateList.address,
      pin_code: this.candidateList.pin,
      date_of_birth: this.ui.getDate(this.candidateList.dob),
      aadhar_no: this.candidateList.adhaar,
      pan_card: this.candidateList.pan,
      image: [
        {
          image_url: this.imageUrl,
          image_name: this.fileName,
          image: this.FileDetails,
          image_type: this.fileType
        }
      ],
      uploadfile: [
        {
          uploadfile_url: this.fileUrl,
          uploadfile_name: this.fileName1,
          uploadfile: this.FileDetails1,
          uploadfile_type: this.fileType1
        }
      ]
    };
    this.web.post('Candidatedetails/ajax_insert_candidate', request).subscribe(
      data => {
        if (data.staus) {
          this.ui.snackbarPop('Candidate Succesfully  Added', '', 'Success');
          this.isProgressing = false;
        } else {
          this.ui.snackbarPop(data.message, '', 'Warning');
          this.isProgressing = false;
        }
      },
      error => {
        this.ui.snackbarPop('Something went wrong', '', 'Error');
        this.isProgressing = false;
      }
    );
    this.resetCandidate();
  }
}
