# helloworld-wanglin

一个零第三方依赖的 Node.js Hello World 网站：浏览器访问显示问候语和当前服务器时间，可本地运行，也可部署到 Vercel。

## 项目结构

```
helloworld-wanglin/
├── package.json        # 项目元信息与启动脚本（start: node server.js）
├── server.js           # 本地 Node.js HTTP 服务器（本地开发用）
├── api/
│   └── index.js        # Vercel 服务端函数（线上部署用）
├── lib/
│   └── page.js         # 页面渲染与服务器时间（本地/线上共用）
├── vercel.json         # Vercel 路由：把根路径导向 /api/index
├── .gitignore
└── README.md
```

## 功能

1. 页面显示：`Hello World！我是王淋，我的第一个AI开发的网站`
2. 页面显示当前服务器时间（每次刷新实时更新）

> 改署名：只改 `lib/page.js` 顶部的 `OWNER_NAME = '王淋'` 一处即可。

## 一、本地运行（无需 npm install，零依赖）

```bash
cd helloworld-wanglin
node server.js
```

浏览器打开 http://localhost:3000 。关闭服务按 `Ctrl + C`。

## 二、推送到 GitHub（仓库：asdfwl/helloworld-wanglin）

> 注意 owner 是 `asdfwl`（不是 `asdf`）。仓库地址：
> https://github.com/asdfwl/helloworld-wanglin.git

```bash
cd helloworld-wanglin
git init
git add -A
git commit -m "Initial commit: Hello World Node.js website"
git branch -M main
git remote add origin https://github.com/asdfwl/helloworld-wanglin.git
git push -u origin main
```

若本地已初始化过，只需先修正远程地址再推送：

```bash
git remote set-url origin https://github.com/asdfwl/helloworld-wanglin.git
git push -u origin main
```

推送认证：已安装 Git Credential Manager / gh 登录时会弹出浏览器授权；命令行场景可用 GitHub Personal Access Token（`ghp_...`）作为密码，不能填账号登录密码。

## 三、部署到 Vercel（消除截图中的 No Deployment）

截图含义：域名 DNS 配置正常（Valid Configuration），但项目还没有“生产部署”，所以自定义域名显示 No Deployment。二选一让它上线：

### 方式 A：Git 自动部署（推荐，以后 push 即更新）

1. 登录 https://vercel.com → 新建/打开项目 → Import Git Repository，选择 `asdfwl/helloworld-wanglin`
2. Framework Preset 选 `Other`（无构建命令，Output 留空）
3. 点 Deploy；首次部署成功后，之后 `git push` 到 `main` 会自动重新部署生产
4. 在 Settings → Domains 里确认 `helloworld-wl-drj3.vercel.app` 与自定义域名 `wanglin1.rangzijigenghao.online` 都指向该生产部署；若域名仍显示 No Deployment，点该域名右侧的 Refresh / 重新关联到最新生产部署

### 方式 B：命令行直接发布到生产

```bash
cd helloworld-wanglin
npx vercel --login          # 首次按提示浏览器登录
npx vercel --prod           # 直接发布生产；成功后输出线上 URL
```

## 四、国内访问备注

`*.vercel.app` 在国内网络可能出现解析超时（DNS 污染），属网络层面、非代码问题；长期稳定访问优先使用已绑定的自定义域名 `wanglin1.rangzijigenghao.online`，并确保该域名 CNAME/A 记录按 Vercel 提示正确指向。

## 技术说明

- 本地 `server.js` 用 Node 内置 `http` 模块，不依赖任何 npm 包。
- Vercel 是 Serverless 运行时、不常驻进程，因此线上由 `api/index.js` 导出处理函数，`vercel.json` 将请求路由到它；两者共用 `lib/page.js`，页面保持一致。
- 服务器时间取服务端 `new Date()`，客户端看到的是部署服务器所在时区时间。
