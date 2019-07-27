import { Directive } from '@angular/core'
import { FormControl, Validator } from '@angular/forms'

@Directive({
  selector: '[isEmail] [ngModel]'
})
export class EmailDirective {}
