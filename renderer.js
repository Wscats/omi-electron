// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const { WeElement, define, h, render } = require('omi');
require('./components/AppOmi/AppOmi')
render(h('app-omi'),'body');


