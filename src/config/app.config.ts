import { Injectable } from '@angular/core';
declare let process: any;
@Injectable()
export class AppConfig {
  public apiBaseUrlLocal: string;
  public apiBaseUrl: string;
  constructor() {
    this.apiBaseUrl = AppConfig._readString('API_URL', 'https://api.legendcity.ru/');
    // this.apiBaseUrl = AppConfig._readString('API_URL', 'http://legend.youweb.su/');
    console.log('Loaded config');
  }
  private static _readString(key: string, defaultValue?: string): string {
    const v = process.env[key];
    return v === undefined ? defaultValue : String(v);
  }
}
