import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class LocalService {
  constructor() {}
  getUserDetails() {
    return JSON.parse(localStorage.getItem('user_data'))
  }

  getCompany_id() {
    return localStorage.getItem('company_id')
      ? localStorage.getItem('company_id')
      : ''
  }

  getEmpId() {
    return localStorage.getItem('employee_id')
      ? localStorage.getItem('employee_id')
      : ''
  }

  getEmpRole() {
    return localStorage.getItem('role') ? localStorage.getItem('role') : ''
  }

  getUserName() {
    return `${
      this.getUserDetails()
        ? `${this.getUserDetails().first_name} ${
            this.getUserDetails().last_name
          }`
        : ''
    }`
  }

  getUserRole() {
    return `${
      this.getUserDetails() ? `${this.getUserDetails().user_role}` : ''
    }`
  }
}
