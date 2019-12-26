import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';

declare var electron: electron;
/**
 * 与主进程间通讯服务
 */

export class ApiResponse {
  result: boolean;
  message: string;
  overload: boolean;
  data: any;
}

export class IpcResponse {
  event: any;
  args: any[];
}

class MockIpcRenderer implements IpcRenderer {
  on(channel: string, listener: (event: any, ...args: any[]) => void): this {
    return this;
  }

  once(channel: string, listener: (event: any, ...args: any[]) => void): this {
    return this;
  }

  removeAllListener(channel?: string): this {
    return this;
  }

  // tslint:disable-next-line:ban-types
  removeListener(channel: string, listener: Function): this {
    return this;
  }

  send(channel: string, ...args: any[]): void {}

  sendSync(channel: string, ...args: any[]): void {}
}

@Injectable()
export class IpcRendererService {
  private ipcRenderer: IpcRenderer;
  constructor() {
    if (this.isElectron()) {
      this.ipcRenderer = electron.ipcRenderer;
    } else {
      this.ipcRenderer = new MockIpcRenderer();
    }
  }

  on(channel: string): Observable<IpcResponse> {
    return Observable.create((observer: Observer<IpcResponse>) => {
      this.ipcRenderer.on(channel, (event, ...args) => {
        observer.next({ event, args });
      });
      return () => {
        this.ipcRenderer.removeAllListener(channel);
      };
    });
  }

  once(channel: string): Observable<IpcResponse> {
    return Observable.create((observer: Observer<IpcResponse>) => {
      this.ipcRenderer.on(channel, (event, ...args) => {
        observer.next({ event, args });
        observer.complete();
      });
    });
  }

  send(channel: string, ...args): void {
    return this.ipcRenderer.send(channel, args);
  }

  sendSync(channel: string, ...args): void {
    return this.ipcRenderer.sendSync(channel, args);
  }

  api(channel: string, ...args): Observable<ApiResponse> {
    this.ipcRenderer.send(channel, args);
    return Observable.create((observer: Observer<ApiResponse>) => {
      this.ipcRenderer.once(`${channel}_reply`, (event, response: ApiResponse) => {
        observer.next(response);
        observer.complete();
      });
      return () => {
        this.ipcRenderer.removeAllListener(`${channel}_reply`);
      };
    });
  }

  private isElectron() {
    return window && window['process'] && window['process']['type'] === 'renderer';
  }
}
