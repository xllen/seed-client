import { Injectable } from '@angular/core';
import { Observable, from, of } from 'rxjs';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';

/**
 * 消息通知弹框公用服务
 * 可根据需求自行添加
 */
@Injectable()
export class Dialog {

  constructor(private modelService: NzModalService) {}

  confirm(message: string, title: string): Observable<boolean> {
    const observable$ = Observable.create((observer) => {
      this.modelService.confirm({
        nzTitle: title,
        nzContent: message,
        nzOnCancel: () => observer.next(false),
        nzOnOk: () => observer.next(true)
      });
    });
    return observable$;
  }
}
