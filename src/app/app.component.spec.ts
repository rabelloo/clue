import { async, TestBed } from '@angular/core/testing';
import { MatProgressSpinnerModule, MatToolbarModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { SpinnerComponent } from './spinner/spinner.component';

describe('AppComponent', () => {
  const storeStub = {
    dispatch() {},
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatProgressSpinnerModule,
        MatToolbarModule,
        RouterTestingModule,
      ],
      declarations: [
        AppComponent,
        FooterComponent,
        NavBarComponent,
        SpinnerComponent,
      ],
      providers: [{ provide: Store, useValue: storeStub }],
    });
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
