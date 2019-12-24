import { Component, OnInit, Input } from '@angular/core';
import { MenuItemModel } from 'src/app/share/model/menu-item.model';

@Component({
  selector: 'app-sider',
  templateUrl: './sider.component.html',
  styleUrls: ['./sider.component.less']
})
export class SiderComponent implements OnInit {

  @Input() menus: MenuItemModel[];
  constructor() { }

  ngOnInit() {
  }

}
