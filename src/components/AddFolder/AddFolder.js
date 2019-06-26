const fs = require("fs");

const omil = require("omil");

const chokidar = require("chokidar");

const prettier = require("prettier");

const os = require("os");

class addFolder extends WeElement {
  constructor(...args) {
    super(...args);

    this.watchFolderRef = e => {
      this.input = e;
    };
  }

  render() {
    return h(
      "div",
      {
        class: "app-omil"
      },
      this.data.lists.map((item, index) => {
        return h(
          "button",
          {
            onClick: this.handle.bind(this, index),
            class: "weui-btn weui-btn_primary",
            style: "width: 250px;"
          },
          item.title
        );
      }),
      h("input", {
        type: "file",
        ref: this.watchFolderRef,
        webkitdirectory: true,
        onChange: this.getDirectory.bind(this)
      })
    );
  }

  install() {
    this.data = {
      lists: [
        {
          title: "Listen Folder/监听文件夹"
        }
      ],
      title: "Install Omi Snippets!",
      index: 0
    };
  }

  handle(index) {
    this.data.index = index;

    switch (index) {
      case 0:
        this.input.click();
        break;

      default:
        break;
    }
  }

  watchFolder({ path }) {
    const watcher = chokidar.watch(path, {
      ignored: /[\/\\]\./,
      persistent: true
    });
    const log = console.log.bind(console);
    watcher
      .on("add", function(path) {
        log("File", path, "has been added");
      })
      .on("addDir", function(path) {
        log("Directory", path, "has been added");
      })
      .on("change", function(path) {
        log("File", path, "has been changed");
      })
      .on("unlink", function(path) {
        log("File", path, "has been removed");
      })
      .on("unlinkDir", function(path) {
        log("Directory", path, "has been removed");
      })
      .on("error", function(error) {
        log("Error happened", error);
      })
      .on("ready", function() {
        log("Initial scan complete. Ready for changes.");
      })
      .on(
        "raw",
        function(event, path, details) {
          log("Raw event info:", event, path, details);
          this.convertFile({
            event,
            path,
            details
          });
        }.bind(this)
      );
  }

  convertFile({ event, path, details }) {
    const _self = this;

    if (os.platform() === "win32") {
      path = details.watchedPath;
    }

    const type = details.type || "file";
    const suffix = this.fileType(path);

    if (type === "file") {
      switch (suffix) {
        case ".omi":
        case ".eno":
          const source = this.readFileContext(path);
          omil({
            type: "extension",
            options: null,
            source,

            callback(data) {
              console.log(data, this);

              _self.writeJsFileContext(path, data);
            }
          });

        default:
          break;
      }
    }
  }

  fileType(filename) {
    const index1 = filename.lastIndexOf(".");
    const index2 = filename.length;
    const type = filename.substring(index1, index2);
    return type;
  }

  readFileContext(path) {
    return fs.readFileSync(path).toString();
  }

  getDirectory(e) {
    if (e.target.files[0]) {
      const path = e.target.files[0].path;
      this.watchFolder({
        path
      });
      this.data.lists[this.data.index].title = "Listen success!/监听成功！";
      this.update();
    }
  }

  writeJsFileContext(path, data) {
    path = this.handleFilePath(path, 4);
    const code = prettier.format(data, {
      parser: "babel"
    });
    fs.writeFile(`${path}.js`, code, () => {
      console.log("write success");
    });
  }

  handleFilePath(path, length) {
    return (path = path.substring(0, path.length - length));
  }

  omiSnippets() {
    window.open(
      "https://marketplace.visualstudio.com/items?itemName=Wscats.omi-snippets"
    );
  }
}

addFolder.css = `.app-omil{margin-top:20px}.weui-btn:after{content:" ";width:200%;height:200%;position:absolute;top:0;left:0;-webkit-transform:scale(0.5);transform:scale(0.5);-webkit-transform-origin:0 0;transform-origin:0 0;box-sizing:border-box;border-radius:10px}.weui-btn{position:relative;display:block;margin-left:auto;margin-right:auto;padding-left:14px;padding-right:14px;box-sizing:border-box;font-size:18px;text-align:center;text-decoration:none;color:#FFFFFF;line-height:2.55555556;border-radius:3px;-webkit-tap-highlight-color:transparent;overflow:hidden;border-width:0;width:100%;border-width:0;outline:0;-webkit-appearance:none}button{background-color:#58bc58;cursor:pointer}input{display:none}`;
define("add-folder", addFolder);
