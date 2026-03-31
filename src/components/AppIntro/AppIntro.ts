/**
 * AppIntro component - displays introduction text and author link.
 */
import { WeElement, define, h } from 'omi';

class AppIntro extends WeElement {
  render(): unknown {
    return h('div', null,
      h('p', { class: 'app-intro' },
        'To get started, click the green button above and listen your development folder where you need to write .omi or .eno documents, edit src/',
        h('code', null, '*.omi'),
        ' or ',
        h('code', null, '*.eno'),
        ' and save, a JS file will be created in the same directory.',
      ),
      h('p', { class: 'app-intro' },
        '在开始前，我们需要点击上方绿色按钮来监听您的开发文件夹，并添加或修改后缀为 src/',
        h('code', null, '*.omi'),
        ' or ',
        h('code', null, '*.eno'),
        ' 的文件，保存之后会在同级目录生成一份被处理的JS文件。',
      ),
      h('a', { href: 'https://github.com/Wscats', target: '_blank' }, 'Author: @Eno Yao'),
    );
  }
}

AppIntro.css = `.app-intro{font-size:large}p{padding:0 20px}a{text-decoration:none}code{color:${Math.random() > 0.5 ? 'red' : 'blue'}}`;

define('app-intro', AppIntro);
