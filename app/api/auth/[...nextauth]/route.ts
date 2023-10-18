import bcrypt from "bcrypt"; //用于密码哈希
import NextAuth, { AuthOptions } from "next-auth"; //提供身份验证功能
import CredentialsProvider from "next-auth/providers/credentials"; //提供用户名密码认证方式
import GithubProvider from "next-auth/providers/github"; //提供社交媒体登录方式
import GoogleProvider from "next-auth/providers/google"; //提供社交媒体登录方式
import { PrismaAdapter } from "@next-auth/prisma-adapter"; //用于与 Prisma 数据库交互

import prisma from "@/app/libs/prismadb";

export const authOptions: AuthOptions = {
  // authOptions是NextAuth 的配置选项对象，用于指定身份验证策略和提供者
  adapter: PrismaAdapter(prisma), //指定了使用 Prisma 数据库适配器来存储用户会话数据
  providers: [
    //  分别配置了 GitHub 和 Google 登录提供者。它们需要 OAuth 客户端 ID 和密钥来启用第三方登录。
    //  这些凭证通常从对应的开发者平台注册应用程序时获得。
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    //配置基于用户名密码的 Credentials 提供者
    CredentialsProvider({
      //CredentialsProvider 配置了一个自定义认证提供者，使用户可以通过用户名和密码进行登录
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        //authorize 函数定义了认证逻辑，检查用户提供的用户名和密码是否与数据库中的数据匹配。如果匹配成功，返回用户信息，否则抛出错误
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials");
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user || !user?.hashedPassword) {
          throw new Error("Invalid credentials");
        }

        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );

        if (!isCorrectPassword) {
          throw new Error("Invalid credentials");
        }

        return user;
      },
    }),
  ],
  debug: process.env.NODE_ENV === "development", //根据应用程序的环境变量来确定是否启用调试模式。
  session: {
    //  session 配置:
    strategy: "jwt", // 指定了使用 JSON Web Tokens（JWT）来处理用户会话
  },
  //secret 配置:
  secret: process.env.NEXTAUTH_SECRET, //用于指定 NextAuth 的加密密钥，确保安全性。
};

const handler = NextAuth(authOptions); //创建了 NextAuth 处理程序

export { handler as GET, handler as POST }; //处理程序通过 handler 变量导出，可以在 Next.js 应用中使用它来处理身份验证请求
