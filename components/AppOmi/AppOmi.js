var _class, _temp;

require("../AddFolder/AddFolder.js");

const appOmi = ((_temp = _class = class appOmi extends WeElement {
  render() {
    return h("div", null, h("add-folder", null));
  }

  install() {
    this.data = {
      title: "omi"
    };
  }
}),
(_class.css = `null`),
_temp);
define("app-omi", appOmi);
