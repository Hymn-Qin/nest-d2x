export default (config) => {
  config.database = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '123456',
    database: 'lnest_test',
    entities: [`${config.baseDir}/src/modules/*/entities/*`],
    maxQueryExecutionTime: 1500,
    timezone: 'Z',
  };
  return config;
};
