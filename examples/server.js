const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackConfig = require('./webpack.config');

const app = express();
const webpackCompiler = webpack(webpackConfig);

app.use(webpackDevMiddleware(webpackCompiler, {
  publicPath: webpackConfig.output.publicPath,
  noInfo: true,
  stats: {
    colors: true
  }
}));
app.use(webpackHotMiddleware(webpackCompiler));

app.use(express.static(__dirname));

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server listening on port ${port}, press Ctrl+C to stop.`);
});
