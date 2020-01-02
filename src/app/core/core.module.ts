import { NgModule, Optional, SkipSelf, APP_INITIALIZER, ErrorHandler } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';

import { MenuService } from './services/menu.service';
import { ConfigService } from './services/config.service';
import { StartUpService } from './services/startup.service';
import { LoggerFactory } from './services/logger-factory';
import { GlobalErrorHandler } from './services/error-handle';
import { IpcRendererService } from './services/ipc-renderer.service';
import { AuthGuard } from './services/router-strategy/auth-guard.service';
import { DeactivateGuard } from './services/router-strategy/deactivate-guard.service';
import { Dialog } from '../share/services/dialog.service';
import { PreloadStrategy } from './services/router-strategy/preload-strategy.service';

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
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler
    },
    AuthGuard,
    DeactivateGuard,
    PreloadStrategy,
    MenuService,
    ConfigService,
    StartUpService,
    LoggerFactory,
    IpcRendererService,
    Dialog,
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
