/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1584519215411_1208';


  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  config.middleware = [];

  config.passportGithub = {
    key: '2ab48886a8712142e99e',
    secret: '254d5a309466e20c3db973e5c97a20ffb32aa14e',
    callbackURL: 'https://book.c37.ltd/#/home',
    // proxy: false,
  };

  config.mysql = {
    client: {
      host: '120.55.70.96',
      port: '3306',
      user: 'root',
      password: 'C37Csq5211314...',
      database: 'book_system'
    },
    app: true,
    agent: false
  }

  config.cluster = {
    listen: {
      path: '',
      port: 7004,
      hostname: '127.0.0.1',
    }
  };

  // 解决跨域问题
  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true,
    },
    domainWhiteList: ['http://localhost:3000', 'http://192.168.42.59:3000', 'http://192.168.42.26:3000', 'http://localhost:8080','https://book.c37.ltd']
  }

  config.cors = {
    // origin: 'http://localhost:3000',
    credentials: true,
    allowMethods: 'GET, HEAD, PUT, POST, UPDATE, DELETE, PATCH, OPTIONS'
  }

  return {
    ...config,
    ...userConfig,
  };
};
