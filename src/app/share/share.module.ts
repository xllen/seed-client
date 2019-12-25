import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// ng-zorro组件按需引用
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { TranslateModule } from '@ngx-translate/core';

const nzModule = [
  NzMenuModule,
  NzLayoutModule,
  NzIconModule,
];

@NgModule({
  declarations: [
  ],
  imports: [
    TranslateModule.forChild(),
    CommonModule,
    ...nzModule,
  ],
  exports: [
    TranslateModule,
    CommonModule,
    ...nzModule,
  ],
  providers: [],
})
export class ShareModule { }
