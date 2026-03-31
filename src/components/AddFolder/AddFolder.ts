/**
 * AddFolder component - folder watcher for .omi/.eno file compilation.
 */
import { WeElement, define, h } from 'omi';
import * as fs from 'fs';
import * as os from 'os';
import omil from 'omil';
import chokidar from 'chokidar';
import prettier from 'prettier';

/** List item for the folder watcher UI. */
interface ListItem {
  title: string;
}

/** Component data shape. */
interface AddFolderData {
  lists: ListItem[];
  title: string;
  index: number;
}

/** Omil compilation callback result. */
interface OmilResult {
  status: string;
  allScript: string;
}

class AddFolder extends WeElement<Record<string, unknown>, AddFolderData> {
  private input!: HTMLInputElement;

  /** Ref callback for the hidden file input. */
  private watchFolderRef = (e: HTMLInputElement): void => {
    this.input = e;
  };

  render(): unknown {
    return h('div', { class: 'app-omil' },
      this.data.lists.map((item: ListItem, index: number) => {
        return h('button', {
          onClick: this.handle.bind(this, index),
          class: 'weui-btn weui-btn_primary',
          style: 'width: 250px;',
        }, item.title);
      }),
      h('input', {
        type: 'file',
        ref: this.watchFolderRef,
        webkitdirectory: true,
        onChange: this.getDirectory.bind(this),
      }),
    );
  }

  /** Initialize component data. */
  install(): void {
    this.data = {
      lists: [{ title: 'Listen Folder/监听文件夹' }],
      title: 'Install Omi Snippets!',
      index: 0,
    };
  }

  /** Handle button click by index. */
  handle(index: number): void {
    this.data.index = index;
    switch (index) {
      case 0:
        this.input.click();
        break;
      default:
        break;
    }
  }

  /** Start watching a directory for file changes. */
  watchFolder({ path: dirPath }: { path: string }): void {
    const watcher = chokidar.watch(dirPath, {
      ignored: /[\/\\]\./,
      persistent: true,
    });
    const log = console.log.bind(console);

    watcher
      .on('add', (p: string) => log('File', p, 'has been added'))
      .on('addDir', (p: string) => log('Directory', p, 'has been added'))
      .on('change', (p: string) => log('File', p, 'has been changed'))
      .on('unlink', (p: string) => log('File', p, 'has been removed'))
      .on('unlinkDir', (p: string) => log('Directory', p, 'has been removed'))
      .on('error', (error: Error) => log('Error happened', error))
      .on('ready', () => log('Initial scan complete. Ready for changes.'))
      .on('raw', (event: string, p: string, details: Record<string, unknown>) => {
        log('Raw event info:', event, p, details);
        this.convertFile({ event, path: p, details });
      });
  }

  /** Compile .omi/.eno files when detected by the watcher. */
  convertFile({ event, path: filePath, details }: {
    event: string;
    path: string;
    details: Record<string, unknown>;
  }): void {
    let resolvedPath = filePath;
    if (os.platform() === 'win32') {
      resolvedPath = details.watchedPath as string;
    }

    const type = (details.type as string) || 'file';
    const suffix = this.getFileExtension(resolvedPath);

    if (type === 'file' && (suffix === '.omi' || suffix === '.eno')) {
      const source = this.readFileContent(resolvedPath);
      omil({
        type: 'extension',
        options: null,
        source,
        callback: (data: OmilResult) => {
          console.log(data);
          this.writeJsFile(resolvedPath, data.allScript);
        },
      });
    }
  }

  /** Extract file extension from a filename. */
  getFileExtension(filename: string): string {
    const dotIndex = filename.lastIndexOf('.');
    return filename.substring(dotIndex);
  }

  /** Read file contents synchronously. */
  readFileContent(filePath: string): string {
    return fs.readFileSync(filePath).toString();
  }

  /** Handle directory selection from the file input. */
  getDirectory(e: Event): void {
    const target = e.target as HTMLInputElement;
    if (target.files?.[0]) {
      const filePath = (target.files[0] as any).path as string;
      this.watchFolder({ path: filePath });
      this.data.lists[this.data.index].title = 'Listen success!/监听成功！';
      this.update();
    }
  }

  /** Write compiled JS output to a file. */
  writeJsFile(filePath: string, data: string): void {
    const basePath = filePath.substring(0, filePath.length - 4);
    const code = prettier.format(data, { parser: 'babel' });
    fs.writeFile(`${basePath}.js`, code, () => {
      console.log('write success');
    });
  }
}

AddFolder.css = `.app-omil{margin-top:20px}.weui-btn:after{content:" ";width:200%;height:200%;position:absolute;top:0;left:0;transform:scale(0.5);transform-origin:0 0;box-sizing:border-box;border-radius:10px}.weui-btn{position:relative;display:block;margin-left:auto;margin-right:auto;padding-left:14px;padding-right:14px;box-sizing:border-box;font-size:18px;text-align:center;text-decoration:none;color:#FFFFFF;line-height:2.55555556;border-radius:3px;-webkit-tap-highlight-color:transparent;overflow:hidden;border-width:0;width:100%;border-width:0;outline:0;-webkit-appearance:none}button{background-color:#58bc58;cursor:pointer}input{display:none}`;

define('add-folder', AddFolder);
