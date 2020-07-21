const path = require('path')
const resolve = dir => path.join(__dirname, dir)
const isProduction = ['production'].includes(process.env.NODE_ENV)

module.exports = {
  // 基本路径
  publicPath: '/github-actions-demo',// vue-cli3.3+新版本使用
  // 输出文件目录
  outputDir: 'dist',
  // eslint-loader 是否在保存的时候检查
  lintOnSave: false,
  // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
  assetsDir: 'static',
  // 以多页模式构建应用程序。
  pages: undefined,
  // 是否使用包含运行时编译器的 Vue 构建版本
  runtimeCompiler: true,
  // 默认babel-loader忽略mode_modules，这里可增加例外的依赖包名
  transpileDependencies: [],
  // 是否为 Babel 或 TypeScript 使用 thread-loader。该选项在系统的 CPU 有多于一个内核时自动启用，仅作用于生产构建，在适当的时候开启几个子进程去并发的执行压缩
  parallel: require('os').cpus().length > 1,
  // 生产环境是否生成 sourceMap 文件，一般情况不建议打开
  productionSourceMap: false,

  // webpack配置
  //对内部的 webpack 配置进行更细粒度的修改 https://github.com/neutrinojs/webpack-chain see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
  chainWebpack: config => {
    /**
     * 删除懒加载模块的prefetch，降低带宽压力
     * https://cli.vuejs.org/zh/guide/html-and-static-assets.html#prefetch
     * 而且预渲染时生成的prefetch标签是modern版本的，低版本浏览器是不需要的
     */
    //config.plugins.delete('prefetch');
    // 添加别名
    config.resolve.alias.set('@', resolve('src'));
    config
      .plugin('html')
      .tap((args) => {
        args[0].title = 'github-actions-demo';
        return args;
      });
  },
  // 调整 webpack 配置 https://cli.vuejs.org/zh/guide/webpack.html#%E7%AE%80%E5%8D%95%E7%9A%84%E9%85%8D%E7%BD%AE%E6%96%B9%E5%BC%8F
  configureWebpack: config => {
    
  },
  css: {
    // 启用 CSS modules
    modules: false,
    // 是否使用css分离插件
    extract: isProduction,
    // 开启 CSS source maps，一般不建议开启
    sourceMap: false,
    // css预设器配置项
    loaderOptions: {}
  },
  // webpack-dev-server 相关配置 https://webpack.js.org/configuration/dev-server/
  devServer: {
    host: 'localhost',
    port: 8082, // 端口号
    https: false, // https:{type:Boolean}
    open: true, //配置自动启动浏览器  
    hotOnly: true, // 热更新
    proxy: {}
  },

  // 第三方插件配置 https://www.npmjs.com/package/vue-cli-plugin-style-resources-loader
  pluginOptions: {

  }
};