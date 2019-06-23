require("../AddFolder/AddFolder.js");

require("../HOC/HOC.js");

class appOmi extends WeElement {
  render() {
    return h(
      "div",
      null,
      h("add-folder", null),
      h(this.data.title),
      h("omi-hoc", null)
    );
  }

  install() {
    this.data = {
      title: "omi-hoc"
    };
  }
}

appOmi.css = `
p{
    color: red;
}
`;
define("app-omi", appOmi);
