class appIntro extends WeElement {
  render() {
    return h(
      "div",
      null,
      h(
        "p",
        {
          class: "app-intro"
        },
        "To get started, click the green button above and listen your development folder where you need to write .omi or .eno documents, edit src/",
        h("code", null, "*.omi"),
        " or ",
        h("code", null, "*.eno"),
        " and save, a JS file will be created in the same directory."
      ),
      h(
        "p",
        {
          class: "app-intro"
        },
        "\u5728\u5F00\u59CB\u524D\uFF0C\u6211\u4EEC\u9700\u8981\u70B9\u51FB\u4E0A\u65B9\u7EFF\u8272\u6309\u94AE\u6765\u76D1\u542C\u60A8\u7684\u5F00\u53D1\u6587\u4EF6\u5939\uFF0C\u5E76\u6DFB\u52A0\u6216\u4FEE\u6539\u540E\u7F00\u4E3A src/",
        h("code", null, "*.omi"),
        " or ",
        h("code", null, "*.eno"),
        " \u7684\u6587\u4EF6\uFF0C\u4FDD\u5B58\u4E4B\u540E\u4F1A\u5728\u540C\u7EA7\u76EE\u5F55\u751F\u6210\u4E00\u4EFD\u88AB\u5904\u7406\u7684JS\u6587\u4EF6\u3002"
      ),
      h(
        "a",
        {
          href: "https://github.com/Wscats",
          target: "_blank"
        },
        "Author: @Eno Yao"
      )
    );
  }
}

appIntro.css =
  `.app-intro{font-size:large}p{padding:0 20px}a{text-decoration:none}` +
  `code{color: ${Math.random() > 0.5 ? "red" : "blue"}}`;
define("app-intro", appIntro);
