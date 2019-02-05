import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatExpansionModule,
  MatFormFieldModule,
  MatIconModule,
  MatSelectModule,
} from '@angular/material';
import { Store } from '@ngrx/store';
import { ErrorMessagesDirective } from '../error-messages/error-messages.directive';
import { HistoryComponent } from './history.component';
import { RoundComponent } from './round/round.component';
import { DisproveFormComponent } from './turn-form/disprove-form/disprove-form.component';
import { SuggestionFormComponent } from './turn-form/suggestion-form/suggestion-form.component';
import { TurnFormComponent } from './turn-form/turn-form.component';

describe('HistoryComponent', () => {
  let component: HistoryComponent;
  let fixture: ComponentFixture<HistoryComponent>;

  const storeStub = {
    dispatch() {},
    select() {},
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DisproveFormComponent,
        ErrorMessagesDirective,
        HistoryComponent,
        RoundComponent,
        TurnFormComponent,
        SuggestionFormComponent,
      ],
      imports: [
        MatExpansionModule,
        MatFormFieldModule,
        MatIconModule,
        MatSelectModule,
        ReactiveFormsModule,
      ],
      providers: [{ provide: Store, useValue: storeStub }],
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryComponent);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
