declare var module: NodeModule;

declare var require: NodeRequire;

interface electron {
  ipcRenderer: IpcRenderer,
  remote: {
    getGlobal: (name: string) => any
  }
}

interface IpcRenderer {
  on(channel: string, listener: (event: any, ...args: any[]) => void): this;

  once(channel: string, listener: (event: any, ...args: any[]) => void): this;

  removeAllListener(channel?: string): this;

  removeListener(channel: string, listener: Function): this;

  send(channel: string, ...args: any[]): void;

  sendSync(channel: string, ...args: any[]): void;
}
