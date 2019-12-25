import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { TranslateService } from '@ngx-translate/core';
import { HttpErrorResponse } from '@angular/common/http';

import { en_US, zh_CN, NzI18nService } from 'ng-zorro-antd/i18n';
import { LoggerFactory } from './logger-factory';

@Injectable()
export class StartUpService {
  private readonly supportLangs = ['zh-CN', 'en-US'];
  private readonly defaultLang = 'zh-CN';

  constructor(
    private config: ConfigService,
    private translate: TranslateService,
    private nzI18n: NzI18nService,
    private loggerFactory: LoggerFactory
  ) {}

  /**
   * 系统启动前， 读取配置文件设置相关服务
   * @param url 配置文件路径
   */
  public load(url?: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.config.setConfigUrl(url);
      this.config.load().subscribe(() => {
        // 配置logger
        this.loggerFactory.setconfig();
        const logger = this.loggerFactory.getLogger('StartUpService');

        // 设置语言环境
        let lang = this.config.instant('lang');

        if (!lang || this.isNotSupportLang(lang)) {
          lang = this.defaultLang;
        }

        if (lang === this.supportLangs[0]) {
          this.nzI18n.setLocale(zh_CN);
        } else {
          this.nzI18n.setLocale(en_US);
        }

        this.translate.use(lang);

        logger.info(`current language is ${lang}`);
        logger.info(`client startup success!`);
        resolve();
      }, (error: HttpErrorResponse) => {
        reject(error);
      });
    });
  }

  private isNotSupportLang(lang: string) {
    return !this.supportLangs.includes(lang);
  }
}
