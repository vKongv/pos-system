const { injectBabelPlugin } = require('react-app-rewired');
const rewireLess = require('react-app-rewire-less');

module.exports = function override(config, env) {
  config = injectBabelPlugin(['import', { libraryName: 'antd', libraryDirectory: 'es', style: 'css' }], config); // change importing css to less
  config = rewireLess.withLoaderOptions({
    modifyVars: {
      '@primary-color': '#00b9c6',
      '@layout-trigger-background': '#3F5D5F',
      '@layout-header-background': '#00b9c6',
      '@layout-footer-background': 'transparent',
      '@layout-sider-background': 'transparent'
    }
  })(config, env);
  return config;
};
