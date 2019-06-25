const fs = require("fs");

const omil = require("omil");

const chokidar = require("chokidar");

const prettier = require("prettier");

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
      null,
      h(
        "div",
        {
          id: "container"
        },
        this.data.lists.map((item, index) => {
          return h(
            "div",
            {
              onClick: this.handle.bind(this, index)
            },
            item.title
          );
        })
      ),
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
          title: "监听目录"
        },
        {
          title: "新建组件"
        }
      ]
    };
  }

  handle(index) {
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
    console.log({
      event,
      path,
      details
    });

    const _self = this;

    const type = details.type;
    const suffix = this.fileType(path);
    const source = this.readFileContext(path);

    if (type === "file") {
      switch (suffix) {
        case ".omi":
        case ".eno":
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
    const path = e.target.files[0].path;
    this.watchFolder({
      path
    });
    console.log(e.target.files[0].path);
  }

  writeJsFileContext(path, data) {
    path = this.handleFilePath(path, 4);
    console.log(path);
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
}

addFolder.css = `*{margin:0;padding:0}#container{display:flex}#container div{background-color:#58bc58;color:white;flex:1;text-align:center;height:50px;line-height:50px;border:1px solid #666666}input{display:none}`;
define("add-folder", addFolder);
