import { Directive, ElementRef, HostListener, HostBinding } from '@angular/core'
import { NgModel } from '@angular/forms'

@Directive({
  selector: '[isPhoneNumber] [ngModel]'
})
export class PhoneDirective {
  constructor(public control: NgModel, public el: ElementRef) {}
  regEx = /^[(]{0,1}[0-9]{3}[)\.\- ]{0,1}[0-9]{3}[\.\- ]{0,1}[0-9]{4}$/
  checkValid = false
  @HostBinding('class.invalid')
  get invalid() {
    return this.checkValid ? null : this.control.invalid
  }

  @HostListener('blur')
  onBlur() {
    this.checkValid = this.regEx.test(this.control.value)
  }

  private highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = 'red'
  }
}

// checkPhoneNumber() {
//   const regEx = /^[(]{0,1}[0-9]{3}[)\.\- ]{0,1}[0-9]{3}[\.\- ]{0,1}[0-9]{4}$/
//   const checkValid = regEx.test(this.control.value)
//   if (checkValid) {
//     return this.control.valid
//   } else {
//     return this.control.invalid
//   }
// }

// @HostListener()
// validator: ValidatorFn
// constructor(private element: ElementRef, private ngModel: NgModel) {}

// validate(control: FormControl) {
//   return this.validator(control)
// }
// isPhoneNumber() {
//   return (control: FormControl) => {
//     // const regEx = /^\s*(?:\+?(\d{1,3}))?[- (]*(\d{3})[- )]*(\d{3})[- ]*(\d{4})(?: *[x/#]{1}(\d+))?\s*/
//     const regEx = /^[(]{0,1}[0-9]{3}[)\.\- ]{0,1}[0-9]{3}[\.\- ]{0,1}[0-9]{4}$/
//     const isValid = regEx.test(control.value)
//     if (isValid) {
//       return null
//     } else {
//       return {
//         isPhoneNumber: {
//           valid: false
//         }
//       }
//     }
//   }
// }

// <!-- <div>
//   <mat-form-field>
//     <input type="text" [(ngModel)]="textValue" isPhoneNumber>
//     <p class="invalid">Please enter Valid number</p>
//   </mat-form-field>
// </div> -->
