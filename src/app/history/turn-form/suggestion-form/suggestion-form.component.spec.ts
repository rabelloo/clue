import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule, MatFormFieldModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { ErrorMessagesDirective } from '../../../shared/error-messages/error-messages.directive';
import { SuggestionFormComponent } from './suggestion-form.component';
import { TurnFormComponent } from '../turn-form.component';
import { Suggestion } from './suggestion';

describe('SuggestionFormComponent', () => {
  let component: SuggestionFormComponent;
  let fixture: ComponentFixture<SuggestionFormComponent>;

  const turnFormStub = {
    form: {
      addControl() {}
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ErrorMessagesDirective,
        SuggestionFormComponent,
      ],
      imports: [
        MatFormFieldModule,
        MatSelectModule,
        NoopAnimationsModule,
        ReactiveFormsModule,
      ],
      providers: [
        { provide: TurnFormComponent, useValue: turnFormStub }
      ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuggestionFormComponent);
    component = fixture.componentInstance;
    component.rooms = [];
    component.suspects = [];
    component.weapons = [];
    component.suggestion = {} as Suggestion;
  });

  it('should be created', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
