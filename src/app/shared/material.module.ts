import { NgModule } from '@angular/core';
import { MdButtonModule,
         MdCardModule,
         MdFormFieldModule,
         MdIconModule,
         MdInputModule,
         MdSelectModule,
         MdToolbarModule, 
         MdTooltipModule,
        } from '@angular/material';

const materialModules = [
  MdButtonModule,
  MdCardModule,
  MdFormFieldModule,
  MdIconModule,
  MdInputModule,
  MdSelectModule,
  MdToolbarModule,
  MdTooltipModule,
];

@NgModule({
  imports: materialModules,
  exports: materialModules,
})
export class MaterialModule { }
