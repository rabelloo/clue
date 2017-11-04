import { NgModule } from '@angular/core';
import { MatButtonModule,
         MatCardModule,
         MatExpansionModule,
         MatFormFieldModule,
         MatIconModule,
         MatInputModule,
         MatProgressSpinnerModule,
         MatSelectModule,
         MatToolbarModule,
         MatTooltipModule,
        } from '@angular/material';

const materialModules = [
  MatButtonModule,
  MatCardModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatToolbarModule,
  MatTooltipModule,
];

@NgModule({
  imports: materialModules,
  exports: materialModules,
})
export class MaterialModule { }
