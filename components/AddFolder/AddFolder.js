var _class, _temp;

const fs = require("fs");

const chokidar = require("chokidar");

const addFolder = ((_temp = _class = class addFolder extends WeElement {
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
        webkitdirectory: true,
        onChange: this.getDirectory
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
    const watcher = chokidar.watch("./tests", {
      ignored: /[\/\\]\./,
      persistent: true
    });
    console.log(watcher);
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

  handle(index) {
    console.log(index);

    switch (index) {
      case 0:
        this.watchFolder();
        break;

      default:
        break;
    }
  }

  watchFolder() {
    console.log(fs);
  }

  getDirectory(e) {
    console.log(e.target.value);
  }
}),
(_class.css = `*{margin:0;padding:0}#container{display:flex}#container div{background-color:#58bc58;color:white;flex:1;text-align:center;height:50px;line-height:50px;border:1px solid #666666}
`),
_temp);
define("add-folder", addFolder);
