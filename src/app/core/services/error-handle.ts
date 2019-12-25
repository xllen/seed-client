import { Injectable, ErrorHandler } from '@angular/core';
import { ILogger, LoggerFactory } from './logger-factory';

/**
 * 全局异常捕获
 */
@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  private logger: ILogger;

  constructor(
    loggerFactory: LoggerFactory
  ) {
    this.logger = loggerFactory.getLogger('GlobalErrorHandler');
  }

  handleError(error: any): void {
    this.logger.fatal(error.message);
    this.logger.fatal(error.stack);
  }
}
