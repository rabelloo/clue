import { enableProdMode, NgModuleRef } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { bootloader, hmrModule } from '@angularclass/hmr';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

const bootstrap = () => platformBrowserDynamic().bootstrapModule(AppModule).catch(err => console.log(err));

if (module['hot']) {
  bootloader(() =>
    bootstrap()
      .then((ngModuleRef: NgModuleRef<AppModule>) =>
        hmrModule(ngModuleRef, module)
      )
  );
} else {
  bootstrap();
}
