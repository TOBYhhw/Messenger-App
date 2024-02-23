# Real-Time Messenger

这是一个实时聊天程序，采用以下技术栈：

- [Next.js](https://nextjs.org)
- [TypeScript](https://www.typescriptlang.org)
- [Tailwind CSS](https://tailwindcss.com)
- [MongoDB](https://www.mongodb.com)
- [Prisma](https://www.prisma.io)
- [Pusher](https://pusher.com)
- [NextAuth](https://next-auth.js.org)

## 已完成的功能

主要功能:

- 使用 Pusher 进行实时消息传递
- 消息通知和警报
- Tailwind 设计打造时尚 UI
- Tailwind 动画和过渡效果
- 对所有设备的全面响应
- 使用 NextAuth 进行凭证身份验证
- 谷歌身份验证集成
- Github 身份验证集成
- 使用 Cloudinary CDN 上传文件和图像
- 使用 react-hook-form 进行客户端表单验证和处理
- 使用 react-toast 处理服务器错误
- 消息已读回执
- 用户在线/离线状态
- 群组聊天和一对一消息传递
- 消息附件和文件共享
- 用户配置文件定制和设置
- 在路由处理程序 (app/api) 中编写 POST、GET 和 DELETE 路由
- 通过直接访问数据库来获取服务器 React 组件中的数据（没有 API！）
- 在实时环境中处理服务器和子组件之间的关系
- 创建和管理聊天室和频道

## Node 环境

**Node version 18.x**

## 快速开始

要开始使用这个项目，请按照以下步骤操作：

### 克隆项目到本地:

```shell
git clone https://github.com/TOBYhhw/Messenger-App.git
```

### 安装依赖:

```shell
npm install
```

### 设置 .env file

```js
DATABASE_URL=
NEXTAUTH_SECRET=

NEXT_PUBLIC_PUSHER_APP_KEY=
PUSHER_APP_ID=
PUSHER_SECRET=

NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=

GITHUB_ID=
GITHUB_SECRET=

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
```

### 设置 Prisma

```shell
npx prisma db push

```

### Start the app

```shell
npm run dev
```

## 可用命令

使用 npm 运行命令 npm run [command]

| 命令  | 描述                   |
| :---- | :--------------------- |
| `dev` | 启动应用程序的开发实例 |

> 欢迎开始使用这个实时聊天程序，探索更多功能并与其他用户进行实时交流!!!!
