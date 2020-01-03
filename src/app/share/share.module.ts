import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';

// ng-zorro组件按需引用
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule } from 'ng-zorro-antd/modal';

// 公用服务
import { Dialog } from './services/dialog.service';

const nzModule = [
  NzMenuModule,
  NzLayoutModule,
  NzIconModule,
  NzModalModule
];

@NgModule({
  declarations: [
  ],
  imports: [
    TranslateModule.forChild(),
    CommonModule,
    ...nzModule
  ],
  exports: [
    TranslateModule,
    CommonModule,
    ...nzModule
  ],
  providers: [
    Dialog
  ],
})
export class ShareModule { }
