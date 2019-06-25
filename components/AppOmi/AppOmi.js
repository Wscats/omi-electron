require("../AddFolder/AddFolder.js");

require("../HOC/HOC.js");

class appOmi extends WeElement {
  render() {
    return h(
      "div",
      {
        name: "yao"
      },
      h("add-folder", null)
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
