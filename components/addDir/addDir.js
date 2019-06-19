var _class, _temp;

const addDir = ((_temp = _class = class addDir extends WeElement {
  render() {
    return h(
      "div",
      {
        id: "container"
      },
      this.data.lists.map((item, index) => {
        return h("div", null, item.title);
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
}),
(_class.css = `*{margin:0;padding:0}#container{display:flex}#container div{background-color:#58bc58;color:white;flex:1;text-align:center;height:50px;line-height:50px;border:1px solid #666666}
`),
_temp);
define("add-dir", addDir);
