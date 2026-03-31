/**
 * AppOmi component - main application shell with logo, title, and child components.
 */
import { WeElement, define, h } from 'omi';
import '../AddFolder/AddFolder';
import '../AppIntro/AppIntro';

class AppOmi extends WeElement {
  private bool: boolean = true;

  /** Toggle language and open marketplace link. */
  private clickHandler = (): void => {
    this.bool = !this.bool;
    this.update();
    window.open('https://marketplace.visualstudio.com/items?itemName=Wscats.omi-snippets');
  };

  render(): unknown {
    return h('div', { class: 'app' },
      h('header', { class: 'app-header' },
        h('img', {
          src: './src/components/AppOmi/logo.svg',
          onClick: this.clickHandler,
          class: 'app-logo',
          alt: 'logo',
        }),
        h('h1', { class: 'app-title' }, this.bool ? 'Welcome to Omie' : '欢迎使用Omie'),
      ),
      h('add-folder', null),
      h('app-intro', null),
    );
  }

  /** Start title toggle interval on component mount. */
  install(): void {
    setInterval(() => {
      this.bool = !this.bool;
      this.update();
    }, 2500);
  }
}

AppOmi.css = `.app{text-align:center}.app-logo{animation:app-logo-spin infinite 20s linear;height:80px}.app-header{background-color:#222;height:150px;padding:20px;color:white}.app-title{font-size:1.5em}.app-logo{cursor:pointer}@keyframes app-logo-spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`;

define('app-omi', AppOmi);
