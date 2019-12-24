import { NgModule } from '@angular/core';

// ng-zorro组件按需引用
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NZ_I18N, zh_CN } from 'ng-zorro-antd/i18n';

import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';

registerLocaleData(zh);

const nzModule = [
  NzMenuModule,
  NzLayoutModule,
  NzIconModule
];

@NgModule({
  declarations: [
  ],
  imports: [
    ...nzModule
  ],
  exports: [
    ...nzModule
  ],
  providers: [{ provide: NZ_I18N, useValue: zh_CN }],
})
export class ShareModule { }
