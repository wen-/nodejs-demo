const Service = require('egg').Service;

class NewsService extends Service {
  async list(page = 1) {
    // read config
    const { serverUrl } = this.config.news;

    // use build-in http client to GET hacker-news api
    const { data: res } = await this.ctx.curl(serverUrl, {
      dataType: 'json',
    });
    return res.data;
  }
}

module.exports = NewsService;
