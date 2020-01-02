import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanDeactivate} from '@angular/router';
import { Observable, of, Subject, merge } from 'rxjs';
import { IDeactivate } from './deactivate.interface';

@Injectable()
export class DeactivateGuard implements CanDeactivate<IDeactivate> {
  private cancel$ = new Subject<boolean>();

  constructor() {}

  cancel() {
    this.cancel$.next(false);
  }

  canDeactivate(
    component: IDeactivate,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {
    if (nextState && nextState.url.startsWith('/login')) {
      return true;
    } else {
      const deactivate$ = component.canDeactivate();
      if (typeof deactivate$ === 'boolean') {
        return deactivate$;
      } else if (deactivate$ instanceof Promise) {
        return deactivate$;
      } else {
        return merge(
          deactivate$,
          this.cancel$
        );
      }
    }
  }

}
