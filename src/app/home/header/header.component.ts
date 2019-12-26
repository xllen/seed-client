import { Component, OnInit, Output } from '@angular/core';
import { EventEmitter } from 'protractor';
import { IpcRendererService } from 'src/app/core/services/ipc-renderer.service';
import { EventTpye } from 'src/app/core/services/ipc-event-type.constant';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {

  constructor(
    private ipcRenderer: IpcRendererService
  ) { }

  ngOnInit() {
  }

  closeApp() {
    this.ipcRenderer.send(EventTpye.EXIT_APP);
  }
}
