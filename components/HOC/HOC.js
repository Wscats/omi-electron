class omiHoc extends WeElement {
  render() {
    return h("add-folder", null);
  }

  install() {
    this.data = {
      title: "omi"
    };
  }
}

omiHoc.css = ``;
define("omi-hoc", omiHoc);
