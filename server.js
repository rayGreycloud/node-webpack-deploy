const express = require('express');
const path = require('path');
const app = express();

// Only use webpack if in development not production
if (process.env.NODE_ENV !== 'production') {
  // Only import if needed
  const webpackMiddleware = require('webpack-dev-middleware');
  const webpack = require('webpack');
  const webpackConfig = require('./webpack.config.js');

  // In development use webpack
  app.use(webpackMiddleware(webpack(webpackConfig)));
} else {
  // In production open dist directory
  app.use(express.static('dist'));
  // Catch-all route to respond with dist/index.html
  // Needed for react-router so browser history works
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
  })
}

app.listen(3000, () => console.log('Listening on port 3000'));
