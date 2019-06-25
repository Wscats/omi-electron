const fs = require("fs");

const chokidar = require("chokidar");

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
      .on("raw", function(event, path, details) {
        log("Raw event info:", event, path, details);
      });
  }

  getDirectory(e) {
    const path = e.target.files[0].path;
    this.watchFolder({
      path
    });
    console.log(e.target.files[0].path);
  }
}

addFolder.css = `*{margin:0;padding:0}#container{display:flex}#container div{background-color:#58bc58;color:white;flex:1;text-align:center;height:50px;line-height:50px;border:1px solid #666666}input{display:none}`;
define("add-folder", addFolder);
