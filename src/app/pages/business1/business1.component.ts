import { Component, OnInit } from '@angular/core';
import { IDeactivate } from 'src/app/core/services/router-strategy/deactivate.interface';
import { Dialog } from 'src/app/share/services/dialog.service';

@Component({
  selector: 'app-business1',
  templateUrl: './business1.component.html',
  styleUrls: ['./business1.component.less']
})
export class Business1Component implements OnInit, IDeactivate {

  constructor(private dialog: Dialog) { }

  ngOnInit() {
  }

  canDeactivate() {
    const message = '是否确认离开？';
    const tip = '提示';
    return this.dialog.confirm(message, tip);
  }
}
