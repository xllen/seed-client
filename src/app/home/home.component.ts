import { Component, OnInit } from '@angular/core';
import { MenuService } from '../core/services/menu.service';
import { MenuItemModel } from '../share/model/menu-item.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less'],
})
export class HomeComponent implements OnInit {
  isCollapsed = false;

  menus: MenuItemModel[];
  constructor(
    private menuService: MenuService
  ) { }

  ngOnInit() {
    this.menuService.getMenus().subscribe((menu) => {
      this.menus = menu;
    });
  }

}
