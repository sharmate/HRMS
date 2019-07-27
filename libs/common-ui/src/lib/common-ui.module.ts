import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoaderComponent } from './loader/loader.component';
import { DeleteComponent } from './delete/delete.component';
import { MaterialModule } from '@workshop/material';
import { PrintComponent } from './print/print.component';
import { DataComponentComponent } from './data-component/data-component.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([]),
    MaterialModule
  ],
  declarations: [
    LoaderComponent,
    DeleteComponent,
    PrintComponent,
    DataComponentComponent
  ],
  exports: [
    LoaderComponent,
    DeleteComponent,
    PrintComponent,
    DataComponentComponent
  ]
})
export class CommonUiModule {}
