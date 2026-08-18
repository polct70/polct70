# 个人网站模板（Next.js + Tailwind + Supabase）

快速说明：
- 技术栈：Next.js + Tailwind CSS + Supabase
- 功能：右上角头像 -> 展开编辑个人信息（保存到 profiles）；主页含随写/工作/兴趣三页，每页可增删条目（保存到 items 表）
- 运行与部署见下

本地运行
1. 复制 .env.example 为 .env.local 并填入你的 Supabase 值：
   - NEXT_PUBLIC_SUPABASE_URL
   - NEXT_PUBLIC_SUPABASE_ANON_KEY

2. 在 Supabase 控制台创建项目并在 SQL Editor 中运行 supabase.sql（创建 profiles 与 items 表）。

3. 安装依赖并运行：
   npm install
   npm run dev
   然后打开 http://localhost:3000

Supabase 注意事项
- 在 Supabase/Auth -> Settings 开启 Email 登录（魔法链接）
- 推荐启用 RLS 并为 items 表写入/读取策略（示例脚本未启用 RLS）
- 若需要头像上传，可创建 storage bucket (avatars)，并在 profiles.avatar_url 中保存公开 URL

部署与域名（简要）
- 推到 GitHub，Vercel 导入仓库并添加环境变量（NEXT_PUBLIC_SUPABASE_*）
- 在 Vercel 中添加自定义域并按指引配置 DNS

安全建议
- 生产环境启用 RLS，限制非 owner 不能修改 items；只允许 owner 操作属于自己的行
