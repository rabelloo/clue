import { NgModule } from '@angular/core';
import { MdButtonModule,
         MdCardModule,
         MdFormFieldModule,
         MdIconModule,
         MdInputModule,
         MdSelectModule,
         MdToolbarModule } from '@angular/material';

const materialModules = [
  MdButtonModule,
  MdCardModule,
  MdFormFieldModule,
  MdIconModule,
  MdInputModule,
  MdSelectModule,
  MdToolbarModule,
];

@NgModule({
  imports: materialModules,
  exports: materialModules,
})
export class MaterialModule { }
