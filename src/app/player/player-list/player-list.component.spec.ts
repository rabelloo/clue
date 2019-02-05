import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatCardModule,
  MatFormFieldModule,
  MatIconModule,
  MatSelectModule,
} from '@angular/material';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';

import { PlayerFormComponent } from '../player-form/player-form.component';
import { PlayerListComponent } from './player-list.component';

describe('PlayerListComponent', () => {
  let component: PlayerListComponent;
  let fixture: ComponentFixture<PlayerListComponent>;

  const storeStub = {
    dispatch() {},
    select() {},
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PlayerFormComponent, PlayerListComponent],
      imports: [
        MatCardModule,
        MatIconModule,
        MatFormFieldModule,
        MatSelectModule,
        ReactiveFormsModule,
      ],
      providers: [{ provide: Store, useValue: storeStub }],
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerListComponent);
    component = fixture.componentInstance;
    component.playerCount = of(1);
  });

  it('should be created', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
