// lib/page.js —— 本地服务器 server.js 与 Vercel 服务端函数 api/index.js 共用的页面渲染
// 只维护这一处，保证本地与线上页面完全一致。

// 【署名】如需改名，只改这里的字符串即可
const OWNER_NAME = '王淋';

// 把 Date 格式化为 YYYY-MM-DD HH:mm:ss（服务器本地时间）
function formatServerTime(now = new Date()) {
  const pad = (n) => String(n).padStart(2, '0');
  const datePart = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
  const timePart = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
  return `${datePart} ${timePart}`;
}

// 渲染完整 HTML；每次请求都用“当前时间”生成，刷新页面时间会更新
function renderPage(now = new Date()) {
  const serverTime = formatServerTime(now);
  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>我的第一个 AI 开发的网站</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: "Microsoft YaHei", "PingFang SC", "Helvetica Neue", Arial, sans-serif;
      min-height: 100vh;
      display: flex; align-items: center; justify-content: center;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 20px;
    }
    .card {
      background: #fff; border-radius: 16px;
      box-shadow: 0 20px 60px rgba(0,0,0,.3);
      padding: 48px 40px; max-width: 640px; width: 100%; text-align: center;
    }
    h1 { font-size: 26px; line-height: 1.6; color: #2d2d2d; margin-bottom: 24px; }
    .highlight { color: #667eea; font-weight: bold; }
    .time-label { font-size: 16px; color: #888; margin-bottom: 8px; }
    .time-value {
      font-size: 32px; font-weight: bold; color: #333;
      font-variant-numeric: tabular-nums; letter-spacing: 1px;
    }
  </style>
</head>
<body>
  <div class="card">
    <h1>Hello World！我是<span class="highlight">${OWNER_NAME}</span>，我的第一个AI开发的网站</h1>
    <p class="time-label">当前服务器时间：</p>
    <p class="time-value">${serverTime}</p>
  </div>
</body>
</html>`;
}

module.exports = { OWNER_NAME, formatServerTime, renderPage };
