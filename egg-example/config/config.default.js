/* eslint valid-jsdoc: "off" */

"use strict";

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
  config.keys = appInfo.name + "_1562681745995_107";

  // 配置模版
  config.view = {
    defaultViewEngine: "nunjucks",
    mapping: {
      ".tpl": "nunjucks",
    },
  };
  config.multipart = {
    //mode: "file",
    //whitelist: [ '.png' ], // 覆盖整个白名单，只允许上传 '.png' 格式
  };
  config.bodyParser = {
    jsonLimit: "5mb",
    formLimit: "5mb",
  };
  config.news = {
    serverUrl: "https://wen-xiong.github.io/api/data/react-native/checkVersion.json",
  };

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
