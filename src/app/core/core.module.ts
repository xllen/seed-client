import { NgModule, Optional, SkipSelf, APP_INITIALIZER } from '@angular/core';

import { MenuService } from './services/menu.service';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { ConfigService } from './services/config.service';
import { StartUpService } from './services/startup.service';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './i18n/', '.json');
}

export function StartUpServiceFactory(startup: StartUpService) {
  return () => startup.load('./assets/config.json')
    .catch((error) => console.error(error.message));
}

@NgModule({
  imports: [
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  exports: [
    TranslateModule
  ],
  providers: [
    MenuService,
    ConfigService,
    StartUpService,
    {
      provide: APP_INITIALIZER,
      useFactory: StartUpServiceFactory,
      deps: [StartUpService],
      multi: true
    }
  ]
})

export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded, Import it in the AppModule only');
    }
  }
}
