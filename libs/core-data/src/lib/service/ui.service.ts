import { Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarConfig,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition
} from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import { LocalService } from './local.service';
import { CookieService } from './cookie.service';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class UiService {
  constructor(
    public snackBar: MatSnackBar,
    private local: LocalService,
    private cookie: CookieService,
    private router: Router
  ) {}

  gender = [
    { id: 0, name: 'Male' },
    { id: 1, name: 'Female' },
    { id: 2, name: 'Others' }
  ];

  maritalStatusList = [{ id: 0, name: 'Married' }, { id: 1, name: 'Single' }];

  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  validateEmail = new FormControl('', [Validators.required, Validators.email]);
  validatePassword = new FormControl('', [
    Validators.required,
    Validators.minLength(8),
    Validators.pattern(
      '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^ws]).{8,}$'
    )
  ]);

  email = new FormControl('', [Validators.required, Validators.email]);

  firstname = new FormControl('', [
    Validators.required,
    Validators.pattern('^[A-Za-z]+$')
  ]);

  middlename = new FormControl('', [Validators.pattern('^[A-Za-z]+$')]);

  lastname = new FormControl('', [
    Validators.required,
    Validators.pattern('^[A-Za-z]+$')
  ]);

  mobile = new FormControl('', [
    Validators.required,
    Validators.pattern('^[1-9][0-9]{0,100}$')
  ]);
  genderValidation = new FormControl('', [Validators.required]);
  dob = new FormControl('', [Validators.required]);
  address = new FormControl('', [Validators.required]);
  altMobile = new FormControl('', [Validators.pattern('^[1-9][0-9]{0,100}$')]);
  adhaar = new FormControl('', [
    Validators.required,
    Validators.pattern('^[1-9][0-9]{0,100}$')
  ]);
  pincode = new FormControl('', [
    Validators.required,
    Validators.pattern('^[1-9][0-9]{0,100}$')
  ]);

  bankAccount = new FormControl('', [
    Validators.required,
    Validators.pattern('^[1-9][0-9]{0,100}$')
  ]);
  bankIFSC = new FormControl('', [
    Validators.required,
    Validators.pattern('^[A-Za-z]{4}0[A-Z0-9a-z]{6}$')
  ]);
  panNumber = new FormControl('', [
    Validators.required,
    Validators.pattern('^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$')
  ]);

  gstNumber = new FormControl('', [
    Validators.required,
    Validators.pattern(
      '^[0-9]{2}[a-z]{4}([a-z]{1}|[0-9]{1}).[0-9]{3}[a-z]([a-z]|[0-9]){3}$'
    )
  ]);

  spousename = new FormControl('', [Validators.pattern('^[A-Za-z]+$')]);
  spousemobile = new FormControl('', [
    Validators.pattern('^[1-9][0-9]{0,100}$')
  ]);
  spouseEmail = new FormControl('', [Validators.email]);
  fatherName = new FormControl('', [Validators.pattern('^[A-Za-z]+$')]);
  fatherMobile = new FormControl('', [
    Validators.pattern('^[1-9][0-9]{0,100}$')
  ]);
  fatherEmail = new FormControl('', [Validators.email]);

  motherName = new FormControl('', [Validators.pattern('^[A-Za-z]+$')]);
  motherMobile = new FormControl('', [
    Validators.pattern('^[1-9][0-9]{0,100}$')
  ]);
  motherEmail = new FormControl('', [Validators.email]);
  nominee = new FormControl('', [Validators.pattern('^[A-Za-z]+$')]);

  bloodGroupList = [
    { id: '0', name: 'A+' },
    { id: 1, name: 'A-' },
    { id: 2, name: 'B+' },
    { id: 3, name: 'AB+' },
    { id: 4, name: 'AB-' },
    { id: 5, name: 'O+' },
    { id: 6, name: 'O-' }
  ];
  limitedBy: any = [
    {
      id: 0,
      name: 'Shares'
    },
    {
      id: 1,
      name: 'Guarantee'
    },
    {
      id: 2,
      name: 'Others'
    }
  ];

  companyNature: any = [
    {
      id: 0,
      name: 'Public'
    },
    {
      id: 1,
      name: 'Private'
    },
    {
      id: 2,
      name: 'Private Limited'
    },
    {
      id: 3,
      name: 'LLP'
    },
    {
      id: 4,
      name: 'Branch'
    },
    {
      id: 5,
      name: 'Foreign Company'
    },
    {
      id: 6,
      name: 'Individual'
    },
    {
      id: 7,
      name: 'Others'
    }
  ];

  authenticatorUser() {
    if (
      localStorage.getItem('email') === '' ||
      localStorage.getItem('email') === undefined ||
      localStorage.getItem('email') === null ||
      localStorage.getItem('password') === '' ||
      localStorage.getItem('password') === undefined ||
      localStorage.getItem('password') === null
    ) {
      this.router.navigateByUrl('/login');
    }
  }

  snackbarPop(msg, action, customClass) {
    const config = new MatSnackBarConfig();
    config.verticalPosition = this.verticalPosition;
    config.horizontalPosition = this.horizontalPosition;
    config.duration = 3000;
    config.panelClass = customClass;
    this.snackBar.open(msg, action ? action : '', config);
  }

  getDate(event) {
    if (event === '0000-00-00') {
      return '';
    }
    if (event) {
      const temp = new Date(event);
      const yy = temp.getFullYear();
      const mm =
        temp.getMonth().toString().length < 2
          ? `0${temp.getMonth() + 1}`
          : `${temp.getMonth() + 1}`;
      const dd =
        temp.getDate().toString().length < 2
          ? `0${temp.getDate()}`
          : `${temp.getDate()}`;
      return `${yy}-${mm}-${dd}`;
    } else {
      return '';
    }
  }

  getGender(val) {
    switch (val) {
      case '0':
        return 'Male';
        break;
      case '1':
        return 'Female';
        break;
      default:
        return 'other';
    }
  }

  getNatureOfCompany(val) {
    switch (val) {
      case '0':
        return 'Public';
        break;
      case '1':
        return 'Private';
        break;
      case '2':
        return 'Private Limited';
        break;
      case '3':
        return 'LLP';
        break;
      case '4':
        return 'Branch';
        break;
      case '5':
        return 'Foreign Company';
        break;
      case '6':
        return 'Individual';
        break;
      default:
        return 'Others';
    }
  }

  getLimitedByCompany(val) {
    switch (val) {
      case '0':
        return 'Shares';
        break;
      case '1':
        return 'Guarantee';
        break;
      case '2':
        return 'Others';
        break;
      default:
        return '';
    }
  }

  getBlood(val) {
    switch (val) {
      case '0':
        return 'A+';
        break;
      case '1':
        return 'A-';
        break;
      case '2':
        return 'B+';
        break;
      case '3':
        return 'AB+';
        break;
      case '4':
        return 'AB-';
        break;
      case '5':
        return 'O+';
        break;
      case '6':
        return 'O-';
        break;
      default:
        return '';
    }
  }

  getMaritalStatus(val) {
    switch (val) {
      case '0':
        return 'Single';
        break;
      case '1':
        return 'Married';
        break;
      default:
        return '';
    }
  }

  getCandidateApproval(val) {
    switch (val) {
      case '0':
        return 'Next-Round';
        break;
      case '1':
        return 'Approved';
        break;
      case '2':
        return 'Hold';
        break;
      case '3':
        return 'Rejected';
        break;
      case '4':
        return 'Black-List';
        break;
      default:
        return '';
    }
  }

  getEmailError() {
    return this.validateEmail.hasError('required')
      ? 'You must enter a mail'
      : this.validateEmail.hasError('email')
      ? 'Enter a valid email'
      : '';
  }

  getPasswordError() {
    return this.validatePassword.hasError('required')
      ? 'Password is required'
      : this.validatePassword.hasError('pattern')
      ? 'Enter the valid password'
      : '';
  }

  getFileExtension(value: string) {
    return value.split('.').pop();
  }

  getFileName(value: string) {
    return value.substring(0, value.lastIndexOf('.'));
  }
  removeDuplicates(myArr, prop) {
    return myArr.filter((obj, pos, arr) => {
      return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
    });
  }

  getErrorEmail() {
    if (this.email.hasError('required')) {
      return 'Email is required';
    } else if (this.email.hasError('email')) {
      return 'Enter valid Email';
    }
  }

  getErrorFirstname() {
    if (this.firstname.hasError('required')) {
      return 'First Name is required';
    } else if (this.firstname.hasError('pattern')) {
      return 'Enter valid First Name';
    }
  }
  getErrorMiddlename() {
    if (this.middlename.hasError('pattern')) {
      return 'Enter valid Middle Name';
    }
  }

  getErrorLastname() {
    if (this.lastname.hasError('required')) {
      return 'Last Name is required';
    } else if (this.lastname.hasError('pattern')) {
      return 'Enter valid Last Name';
    }
  }

  getErrorGender() {
    if (this.genderValidation.hasError('required')) {
      return 'Last Name is required';
    }
  }

  getErrordob() {
    if (this.dob.hasError('required')) {
      return 'Date Of Birth is required';
    }
  }

  getErrorAddress() {
    if (this.address.hasError('required')) {
      return 'Address is required';
    }
  }
  getErrorMobile() {
    if (this.mobile.hasError('required')) {
      return 'Mobile Number is required';
    } else if (this.mobile.hasError('pattern')) {
      return 'Enter valid Mobile Number';
    }
  }
  getErrorAltMobile() {
    if (this.altMobile.hasError('required')) {
      return 'Alternative Mobile Number is required';
    } else if (this.altMobile.hasError('pattern')) {
      return 'Enter valid Alternative Mobile Number';
    }
  }
  getErrorAdhaar() {
    if (this.adhaar.hasError('required')) {
      return 'Adhaar Number is required';
    } else if (this.adhaar.hasError('pattern')) {
      return 'Enter valid Adhaar Number';
    }
  }

  getErrorPincode() {
    if (this.pincode.hasError('required')) {
      return 'Pincode Number is required';
    } else if (this.pincode.hasError('pattern')) {
      return 'Enter valid Pincode Number';
    }
  }

  getErrorGst() {
    if (this.gstNumber.hasError('required')) {
      return 'GST Number Number is required';
    } else if (this.gstNumber.hasError('pattern')) {
      return 'Enter valid GST Number';
    }
  }

  getErrorBankAccount() {
    if (this.bankAccount.hasError('required')) {
      return 'Bank Account Number is required';
    } else if (this.bankAccount.hasError('pattern')) {
      return 'Enter valid Bank Account Number';
    }
  }

  getErrorBankIFSC() {
    if (this.bankIFSC.hasError('required')) {
      return 'Bank IFSC is required';
    } else if (this.bankIFSC.hasError('pattern')) {
      return 'Enter valid Bank IFSC Number';
    }
  }
  getErrorPanNumber() {
    if (this.panNumber.hasError('required')) {
      return 'Pan Number is required';
    } else if (this.panNumber.hasError('pattern')) {
      return 'Enter valid Pan Number';
    }
  }

  getErrorSpouseName() {
    if (this.spousename.hasError('pattern')) {
      return 'Enter valid Spouse Name';
    }
  }
  getErrorSpouseMobile() {
    if (this.spousemobile.hasError('pattern')) {
      return 'Enter valid Spouse Contact';
    }
  }
  getErrorSpouseEmail() {
    if (this.spouseEmail.hasError('required')) {
      return 'Spouse Email is required';
    } else if (this.spouseEmail.hasError('email')) {
      return 'Spouse Enter valid Email';
    }
  }
  getErrorFatherName() {
    if (this.fatherName.hasError('pattern')) {
      return 'Enter valid Father Name';
    }
  }
  getErrorFatherMobile() {
    if (this.fatherMobile.hasError('pattern')) {
      return 'Enter valid Father Contact';
    }
  }

  getErrorFatherEmail() {
    if (this.fatherEmail.hasError('email')) {
      return 'Enter valid Father Email';
    }
  }
  getErrorMotherName() {
    if (this.motherName.hasError('pattern')) {
      return 'Enter valid Mother Name';
    }
  }
  getErrorMotherMobile() {
    if (this.motherMobile.hasError('pattern')) {
      return 'Enter valid Mother Contact';
    }
  }

  getErrorMotherEmail() {
    if (this.motherEmail.hasError('email')) {
      return 'Enter valid Mother Email';
    }
  }
  getErrorNomineeName() {
    if (this.nominee.hasError('pattern')) {
      return 'Enter valid Nominee Name';
    }
  }
}
