const path = require('path');

export default {
  entry: "./src/renderer/index.js",
  outputPath: "./app/dist",
  define: {
    "$dirname": "__dirname"
  },
  env: {
    "development": {
      "extraBabelPlugins": [
        "dva-hmr"
      ]
    }
  },
  extraBabelPlugins: [
    ["import", { "libraryName": "antd", "libraryDirectory": "es", "style": "css" }]
  ],
  alias: {
    components: path.resolve(__dirname, 'src/renderer/components/'),
  },
  html: {
    template: './src/renderer/index.ejs',
  },
  disableDynamicImport: true,
  publicPath: '/',
  hash: true,
}
