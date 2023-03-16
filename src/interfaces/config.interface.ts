export interface IConfig {
  readonly env: string;
  readonly isProd: boolean;
  readonly baseDir: string;
  logPath: string;
  crossDomain: {
    allowedOrigins: string | string[];
    allowedReferer: string | string[];
  };
  [propName: string]: any;
}
