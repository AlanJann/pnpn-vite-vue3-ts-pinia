项目初始化插件

1.@types/node包
  在vite.config.ts配置路径别名@
  在vite.config.ts配置proxy跨域

2.eslint 包
  安装成功后：./node_modules/.bin/eslint --init 使用命令初始化

3.pinia 包
  放在modules里面统一导出

4.vue-router
  放在modules里面统一导出

5.@vueuse/core
  常用的useApi 接口

6.sass 安装
  初始化reset.scss

7.axios 安装
  封装axios文件index.ts
8.unplugin-vue-components
  自动导入components 组件

9.unplugin-auto-import
  自动导入文件

10.unplugin-vue-macros/vite
  宏，vue内置方法扩展，如：defineProps，该方法需要此插件

11.自动路由(两个插件配合使用)
  1.unplugin-vue-router 自动路由
  2.vite-plugin-vue-layouts 自动布局