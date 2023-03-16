import * as path from 'path';
import * as extend from 'extend';
import { IConfig } from '@interfaces/config.interface';
import baseConfig from './base.config';
import { Logger } from '@nestjs/common';

class Config {
  static instance: IConfig;

  static getInstance(): IConfig {
    if (!Config.instance) {
      Config.instance = getConfig();
    }
    return Config.instance;
  }
}

function getConfig() {
  const env = (process.env.WCloud_Env || 'local').toLowerCase();
  const config: any = {
    env,
    baseDir: path.resolve(__dirname, '..', '..'),
    isProd: env === 'Product' || env === 'prod',
  };
  const envPath = path.resolve(__dirname, `./env/${config.env}.config`);
  try {
    const tempConfig = extend(config, baseConfig(config));
    extend(config, require(envPath).default(tempConfig));
  } catch (err) {
    Logger.error(`Config error: ${err}`);
  }
  Logger.log(`Config init: ${JSON.stringify(config)}`, Config.name);
  return config;
}

export default Config.getInstance();
