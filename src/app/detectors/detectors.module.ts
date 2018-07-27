import { NgModule } from '@angular/core';

import { BlurDetectorDirective } from './blur-detector/blur-detector.directive';
import { CloseDetectorDirective } from './close-detector/close-detector.directive';
import { FocusDetectorDirective } from './focus-detector/focus-detector.directive';
import { OpenDetectorDirective } from './open-detector/open-detector.directive';

@NgModule({
  declarations: [
    BlurDetectorDirective,
    CloseDetectorDirective,
    FocusDetectorDirective,
    OpenDetectorDirective,
  ],
})
export class DetectorsModule { }
