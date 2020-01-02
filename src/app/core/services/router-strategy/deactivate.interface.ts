import { Observable } from 'rxjs';

export interface IDeactivate {
  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean;
}
