import { resolve } from 'path';

export default (config) => {
  config.logPath = resolve(__dirname, '../../../public/log');
  config.database = {
    type: 'mysql',
    // host: 'localhost',
    host: '127.0.0.1',
    port: 3306,
    username: 'root',
    password: '123456',
    database: 'lnest_test',
    entities: [`${config.baseDir}/**/*.entity`],
    maxQueryExecutionTime: 1500,
    timezone: 'Z',
    synchronize: true,
    autoLoadEntities: true,
  };
  config.csp = false; // 在使用fastify-swagger和helmet时有CSP冲突，非生产关闭
  return config;
};
