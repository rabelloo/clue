import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule, MatIconModule, MatInputModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { DisproveFormComponent } from './disprove-form/disprove-form.component';
import { ErrorMessagesDirective } from '../../shared/error-messages/error-messages.directive';
import { SuggestionFormComponent } from './suggestion-form/suggestion-form.component';
import { Turn } from './turn';
import { TurnFormComponent } from './turn-form.component';

describe('TurnComponent', () => {
  let component: TurnFormComponent;
  let fixture: ComponentFixture<TurnFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DisproveFormComponent,
        ErrorMessagesDirective,
        SuggestionFormComponent,
        TurnFormComponent,
      ],
      imports: [
        MatInputModule,
        MatIconModule,
        MatSelectModule,
        ReactiveFormsModule,
        NoopAnimationsModule,
      ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TurnFormComponent);
    component = fixture.componentInstance;
    component.players = [];
    component.turn = { disprove: {}, suggestion: {} } as Turn;
    component.rooms = [];
    component.suspects = [];
    component.weapons = [];
  });
  
  it('should be created', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
