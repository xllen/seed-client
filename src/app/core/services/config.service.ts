import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap, share, map } from 'rxjs/operators';

export interface IConfiguration {
  [configName: string]: string;
}

@Injectable()
export class ConfigService {
  private url: string;
  private isRetrieved = false;
  private configuration: IConfiguration;
  constructor(private http: HttpClient) {}

  // 异步获取配置
  public get(key: string): Observable<string>;
  public get(key: string[]): Observable<IConfiguration>;
  public get(key: any) {
    return this.load().pipe(
      map((config) => {
        if (key && typeof key === 'string') {
          return this.readConfig(config, key);
        } else if (key && key instanceof Array) {
          return this.readConfigs(config, key);
        }
      })
    );
  }

  // 同步获取配置
  public instant(key: string): string;
  public instant(key: string[]): IConfiguration;
  public instant(key: any) {
    if (key && typeof key === 'string') {
      return this.readConfig(this.configuration, key);
    } else if (key && key instanceof Array) {
      return this.readConfigs(this.configuration, key);
    }
  }

  public setConfigUrl(url: string) {
    this.url = url;
  }

  public load(): Observable<IConfiguration> {
    if (this.checkConfig()) {
      return this.retrieveConfig();
    } else {
      return of(this.configuration);
    }
  }

  private checkConfig() {
    return typeof this.configuration === 'undefined' && !this.isRetrieved;
  }

  private retrieveConfig(): Observable<IConfiguration> {
    return this.http.get<IConfiguration>(this.url).pipe(
      catchError((respnse: HttpErrorResponse) => {
        return of({});
      }),
      tap((res) => {
        this.configuration = res;
        this.isRetrieved = true;
      }),
      share()
    );
  }

  private readConfig(config: IConfiguration, key: string): string {
    let result = '';
    if (config && key) {
      const value = config[key];
      result = value || '';
    }
    return result;
  }

  private readConfigs(config: IConfiguration, keys: string[]): IConfiguration {
    const result: IConfiguration = {};
    if (config && keys && keys instanceof Array && keys.length > 0) {
      keys.forEach((key) => (result[key] = this.readConfig(config, key)));
    }
    return result;
  }
}
