const workbox = require('workbox-build');

console.log('Generating SW started');

workbox.generateSW({
  globDirectory: 'build/',
  globPatterns: ['**/*.{html,css,js,jpg,jpeg,png}'],
  swDest: 'build/sw.js',
});

console.log('Generating SW Ended');
