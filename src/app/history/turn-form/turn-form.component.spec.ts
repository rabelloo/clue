import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatIconModule,
  MatInputModule,
  MatSelectModule,
} from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ErrorMessagesDirective } from '../../error-messages/error-messages.directive';
import { DisproveFormComponent } from './disprove-form/disprove-form.component';
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
      ],
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
