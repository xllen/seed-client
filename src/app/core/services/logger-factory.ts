import { Injectable } from '@angular/core';
import { JL } from 'jsnlog';
import { environment } from 'src/environments/environment';

export interface ILogger {
  /**
   * 追踪信息（发布模式下不会记录）
   * @param logObject 日志对象
   */
  trace(logObject: any): void;

  /**
   * 调试信息（发布模式下不会记录）
   * @param logObject 日志对象
   */
  debug(logObject: any): void;

  /**
   * 信息
   * @param logObject 日志对象
   */
  info(logObject: any): void;

  /**
   * 警告
   * @param logObject 日志对象
   */
  warn(logObject: any): void;

  /**
   * 错误
   * @param logObject 日志对象
   */
  error(logObject: any): void;

  /**
   * 严重错误
   * @param logObject 日志对象
   */
  fatal(logObject: any): void;
}

class MockLogger implements ILogger {
  trace(logObject): void {}
  debug(logObject): void {}
  info(logObject): void {}
  warn(logObject): void {}
  error(logObject): void {}
  fatal(logObject): void {}
}

class MainProcessAppender implements JL.JSNLogAppender {
  private logger: ILogger;

  constructor() {
    this.logger = new MockLogger();
  }

  setOptions(options: JL.JSNLogAppenderOptions): JL.JSNLogAppender {
    return this;
  }

  public log(level: string, msg: string, meta: any, callback: () => void, levelNbr: number, message: string, loggerName: string): void {
    // TODO 需要优化
    this.logger[level](`[${loggerName}] ${message}`);
  }
  private isElectron() {
    return window && window['process'] && window['process']['type'] === 'renderer';
  }
}

@Injectable()
export class LoggerFactory {
  private appenders: JL.JSNLogAppender[] = [];

  setconfig(logSvrUrl?: string): void {
    JL.setOptions({
      requestId: 'seed-client',
      enabled: true
    });

    const consoleAppender = JL.createConsoleAppender('consoleAppender');
    this.appenders.push(consoleAppender);

    const mainProcessAppender = new MainProcessAppender();
    this.appenders.push(mainProcessAppender);

    if (environment.production && logSvrUrl) {
      const ajaxAppender = JL.createAjaxAppender('ajaxAppender');
      ajaxAppender.setOptions({
        url: logSvrUrl
      });
      this.appenders.push(ajaxAppender);
    }
    JL().setOptions({
      appenders: this.appenders
    });
  }

  getLogger(categoryName: string = 'app') {
    return JL(categoryName);
  }
}
