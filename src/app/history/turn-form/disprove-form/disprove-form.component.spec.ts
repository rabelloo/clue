import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule, MatIconModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { Disprove } from './disprove';
import { DisproveFormComponent } from './disprove-form.component';
import { ErrorMessagesDirective } from '../../../shared/error-messages/error-messages.directive';
import { SuggestionFormComponent } from '../suggestion-form/suggestion-form.component';
import { TurnFormComponent } from '../turn-form.component';

import '../../../core/prototype-extensions/string-extensions';

describe('DisproveFormComponent', () => {
  let component: DisproveFormComponent;
  let fixture: ComponentFixture<DisproveFormComponent>;

  const turnFormStub = {
    form: {
      addControl() {}
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DisproveFormComponent,
        ErrorMessagesDirective,
        SuggestionFormComponent,
        TurnFormComponent,
      ],
      imports: [
        MatIconModule,
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
    fixture = TestBed.createComponent(DisproveFormComponent);
    component = fixture.componentInstance;
    component.players = [];
    component.disprove = {} as Disprove;
  });
  
  it('should be created', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
