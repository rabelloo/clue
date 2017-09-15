import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisproveFormComponent } from './disprove-form.component';

describe('DisproveFormComponent', () => {
  let component: DisproveFormComponent;
  let fixture: ComponentFixture<DisproveFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisproveFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisproveFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
