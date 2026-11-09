// api/index.js —— Vercel 服务端函数（Serverless Function）
// Vercel 不会常驻 http.createServer 进程，因此线上用本函数返回页面；
// 本地开发仍使用根目录的 server.js。两者共用 lib/page.js 渲染逻辑。
const { renderPage } = require('../lib/page');

module.exports = (req, res) => {
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.statusCode = 200;
  res.end(renderPage());
};
