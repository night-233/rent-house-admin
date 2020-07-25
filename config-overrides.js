const { override, addWebpackAlias, fixBabelImports, addLessLoader, addDecoratorsLegacy, overrideDevServer, addWebpackExternals  } = require('customize-cra');
const path = require('path')

const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const mockIp = '10.0.5.199:13000/mock';
const IP = 'rent-house.touchfish.top';
// const IP = 'localhost:8080';

const addProxy = () => (configFunction) => {
  configFunction.proxy = {
    '/mock': {
      target: `http://${mockIp}/`, // 接口域名
      pathRewrite: { '^/mock': '/11' },
      secure: true, // 如果是https接口，需要配置这个参数
      changeOrigin: true
    },
    '/dev': {
      target: `http://${IP}/`, // 接口域名
      pathRewrite: { '^/dev': '/' },
      secure: false, // 如果是https接口，需要配置这个参数
      changeOrigin: true
    },
     '/baiduApi': {
        target: `http://api.map.baidu.com/`, // 接口域名
         pathRewrite: { '^/baiduApi': '/' },
         secure: false, // 如果是https接口，需要配置这个参数
         changeOrigin: true
    }
  };

  return configFunction;
};

// 查看打包后各包大小
const addAnalyzer = () => config => {
    if (process.env.ANALYZER) {
        config.plugins.push(new BundleAnalyzerPlugin());
    }

    return config;
};

module.exports = {
  webpack: override(
    addWebpackAlias({
      "@": path.resolve(__dirname, 'src'),
      "@views": path.resolve(__dirname, 'src/views'),
      "@utils": path.resolve(__dirname, 'src/utils'),
      "@apis": path.resolve(__dirname, 'src/apis'),
      "@assets": path.resolve(__dirname, 'src/assets'),
      "@views-client": path.resolve(__dirname, 'src/views-client'),
      "@base": path.resolve(__dirname, 'src/base'),
      "@components": path.resolve(__dirname, 'src/components'),
      "@store": path.resolve(__dirname, 'src/store'),
    }),
    fixBabelImports('import', {
      libraryName: 'antd',
      libraryDirectory: 'es',
      style: true
    }),
    addDecoratorsLegacy(),

    addLessLoader({
        javascriptEnabled: true,
        //下面这行很特殊，这里是更改主题的关键，这里我只更改了主色，当然还可以更改其他的，下面会详细写出。
        modifyVars: {
          "@primary-color": "#51c6cf", // 全局主色
          // "@link-color": "#1890ff", // 链接色
          "@success-color": "#51c6cf", // 成功色
          "@warning-color": "#f16d7a", // 警告色
          "@error-color": "#f5222d", // 错误色
          // "@font-size-base": "14px", // 主字号
          // "@heading-color": "rgba(0, 0, 0, 0.85)", // 标题色
          // "@text-color": "rgba(0, 0, 0, 0.65)", // 主文本色
          // "@text-color-secondary ": "rgba(0, 0, 0, .45)", // 次文本色
          // "@disabled-color ": "rgba(0, 0, 0, .25)", // 失效色
          "@border-radius-base": "8px", // 组件/浮层圆角
          // "@border-color-base": "#d9d9d9", // 边框色
          // "@box-shadow-base": "0 2px 8px rgba(0, 0, 0, 0.15)" // 浮层阴影
        },

    }),
    addWebpackExternals({
        'BMap': 'BMap',
        'BMapLib':'BMapLib'
    })
  ),
  devServer: overrideDevServer(
    addProxy(),
    addAnalyzer()
  )
}
