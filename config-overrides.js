const { override, addWebpackAlias, fixBabelImports, addDecoratorsLegacy, overrideDevServer } = require('customize-cra');
const path = require('path')


const mockIp = '10.0.5.199:13000/mock';
const IP = 'house.touchfish.top';

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
    }
  };

  return configFunction;
}

module.exports = {
  webpack: override(
    addWebpackAlias({
      "@": path.resolve(__dirname, 'src'),
      "@views": path.resolve(__dirname, 'src/views'),
      "@utils": path.resolve(__dirname, 'src/utils'),
      "@apis": path.resolve(__dirname, 'src/apis'),
      "@assets": path.resolve(__dirname, 'src/assets')
    }),
    fixBabelImports('import', {
      libraryName: 'antd',
      libraryDirectory: 'es',
      style: 'css',
    }),
    addDecoratorsLegacy(),
  ),
  devServer: overrideDevServer(
    addProxy()
  )
}