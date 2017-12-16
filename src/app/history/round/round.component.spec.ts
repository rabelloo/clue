import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule, MatIconModule, MatFormFieldModule, MatSelectModule } from '@angular/material';

import { DisproveFormComponent } from '../turn-form/disprove-form/disprove-form.component';
import { ErrorMessagesDirective } from '../../shared/error-messages/error-messages.directive';
import { RoundComponent } from './round.component';
import { SuggestionFormComponent } from '../turn-form/suggestion-form/suggestion-form.component';
import { TurnFormComponent } from '../turn-form/turn-form.component';
import { combineAll } from 'rxjs/operators/combineAll';

describe('RoundComponent', () => {
  let component: RoundComponent;
  let fixture: ComponentFixture<RoundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DisproveFormComponent,
        ErrorMessagesDirective,
        RoundComponent,
        SuggestionFormComponent,
        TurnFormComponent,
      ],
      imports: [
        MatExpansionModule,
        MatFormFieldModule,
        MatIconModule,
        MatSelectModule,
        ReactiveFormsModule,
      ],
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoundComponent);
    component = fixture.componentInstance;
    component.players = [];
    component.turns = [];
  });
  
  it('should be created', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
