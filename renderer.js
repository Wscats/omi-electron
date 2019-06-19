// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const { WeElement, define, html, h, render } = require('omi');
require('./components/addDir/addDir')
render(
    html`
      <add-dir />
    `,
    "body"
);
const chokidar = require('chokidar');

const watcher = chokidar.watch('./test', {
    ignored: /[\/\\]\./, persistent: true
});

const log = console.log.bind(console);

watcher
    .on('add', function (path) { log('File', path, 'has been added'); })
    .on('addDir', function (path) { log('Directory', path, 'has been added'); })
    .on('change', function (path) { log('File', path, 'has been changed'); })
    .on('unlink', function (path) { log('File', path, 'has been removed'); })
    .on('unlinkDir', function (path) { log('Directory', path, 'has been removed'); })
    .on('error', function (error) { log('Error happened', error); })
    .on('ready', function () { log('Initial scan complete. Ready for changes.'); })
    .on('raw', function (event, path, details) { log('Raw event info:', event, path, details); })