import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MenuItemModel } from 'src/app/share/model/menu-item.model';
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs';
import { shareReplay, map } from 'rxjs/operators';

@Injectable()
export class MenuService {
  private _menus: Observable<MenuItemModel[]>;

  get menus() {
    return this._menus;
  }

  constructor(private httpClient: HttpClient) {
  }

  getMenus(): Observable<MenuItemModel[]> {
    this._menus = this.httpClient
          .get<MenuItemModel[]>('./assets/menu.json')
          .pipe(shareReplay());
    return this._menus;
  }
}
