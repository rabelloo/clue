import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnFormComponent } from './turn-form.component';

describe('TurnComponent', () => {
  let component: TurnFormComponent;
  let fixture: ComponentFixture<TurnFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TurnFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TurnFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
