/**
 * Renderer process entry point.
 * Initializes the Omi application in the Electron renderer.
 */
import { h, render } from 'omi';
import './components/AppOmi/AppOmi';

render(h('app-omi'), 'body');