import { WeElement, define, h } from "omi";

class componentName extends WeElement {
  render() {
    return h("div", null, h("p", null, this.data.title));
  }

  install() {
    this.data = {
      title: "omi"
    };
  }
}

componentName.css = `p{color:#58bc58}`;
define("component-name", componentName);
