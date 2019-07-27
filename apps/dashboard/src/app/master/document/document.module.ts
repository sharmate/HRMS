import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { MaterialModule } from '@workshop/material'

import { DocumentRoutingModule } from './document-routing.module'
import { DocumentComponent } from './document.component'

@NgModule({
  declarations: [DocumentComponent],
  imports: [CommonModule, FormsModule, MaterialModule, DocumentRoutingModule],
  exports: [DocumentComponent],
  entryComponents: [DocumentComponent]
})
export class DocumentModule {}
