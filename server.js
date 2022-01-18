const express = require('express');
const path = require('path');
var expressStaticGzip = require('express-static-gzip');

const app = express();

app.use('/api', (req, res) => {
  res.send('Hello World');
});

app.use(
  '/',
  expressStaticGzip(path.join(__dirname, 'frontend', 'build'), {
    enableBrotli: true,
    orderPreference: ['br', 'gz'],
  })
);

app.get('/*', function (req, res) {
  let file = path.join(__dirname, 'frontend', 'build');

  if (req.acceptsEncodings('br')) {
    res.set('Content-Encoding', 'br');
    file = path.join(file, 'index.html.br');
  } else if (req.acceptsEncodings('gzip')) {
    res.set('Content-Encoding', 'gzip');
    file = path.join(file, 'index.html.gz');
  } else {
    file = path.join(file, 'index.html');
  }

  res.set('Content-Type', 'text/html');
  res.sendFile(file);
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Expense tracker server started at ${port}`);
});
