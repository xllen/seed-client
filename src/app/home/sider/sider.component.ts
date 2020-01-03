import { Component, OnInit, Input } from '@angular/core';
import { MenuItemModel } from 'src/app/share/model/menu-item.model';
import { Router, NavigationEnd } from '@angular/router';
import { filter, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-sider',
  templateUrl: './sider.component.html',
  styleUrls: ['./sider.component.less']
})
export class SiderComponent implements OnInit {

  @Input() menus: MenuItemModel[];
  constructor(
    private router: Router) { }

  ngOnInit() {
  }

  async nav(data) {
    const routeId = this.router.url;
    if (routeId === data) {
      await this.router.navigateByUrl('');
      this.router.navigate([data]);
    }
  }
}
