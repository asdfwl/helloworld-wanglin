// server.js —— 本地 Node.js HTTP 服务器（零第三方依赖）
// 运行：node server.js ，浏览器打开 http://localhost:3000
const http = require('http');
const { renderPage } = require('./lib/page');

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  // 每次请求实时生成页面与服务器时间
  res.end(renderPage());
});

server.listen(PORT, () => {
  console.log(`服务器已启动: http://localhost:${PORT}`);
});
