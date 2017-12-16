import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatProgressSpinnerModule, MatToolbarModule } from '@angular/material';
import { Store } from '@ngrx/store';

import { AppComponent } from './app.component';
import { NavBarComponent } from './core/nav-bar/nav-bar.component';
import { FooterComponent } from './core/footer/footer.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { Platform } from '@angular/cdk/platform';
import { MaterialModule } from './shared/material.module';

describe('AppComponent', () => {
  const storeStub = {
    dispatch() { }
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
      providers: [
        { provide: Store, useValue: storeStub },
      ]
    });
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
