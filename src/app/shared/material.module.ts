import { NgModule } from '@angular/core';
import { MdButtonModule,
         MdCardModule,
         MdExpansionModule,
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
  MdExpansionModule,
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
