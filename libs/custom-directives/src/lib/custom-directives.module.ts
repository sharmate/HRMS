import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { EmailDirective } from './directives/emailvalidator.directive'
import { PhoneDirective } from './directives/phonevalidator.directive'
import { PinvalidatorDirective } from './directives/pinvalidator.directive'
import { NameOnlyDirective } from './directives/name-only.directive'
import { NumberOnlyDirective } from './directives/number-only.directive'
import { AlphanumericDirective } from './directives/alphanumeric.directive'

@NgModule({
  imports: [CommonModule],
  declarations: [
    EmailDirective,
    PhoneDirective,
    PinvalidatorDirective,
    NameOnlyDirective,
    NumberOnlyDirective,
    AlphanumericDirective
  ],
  exports: [
    EmailDirective,
    PhoneDirective,
    PinvalidatorDirective,
    NameOnlyDirective,
    NumberOnlyDirective,
    AlphanumericDirective
  ]
})
export class CustomDirectivesModule {}
