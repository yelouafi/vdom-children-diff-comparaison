import diffObserver from "./utils";
var snabbdom = require("snabbdom");
var patch = snabbdom.init([
  require("snabbdom/modules/class").default,
  require("snabbdom/modules/props").default,
  require("snabbdom/modules/style").default,
  require("snabbdom/modules/eventlisteners").default,
  require("snabbdom/modules/dataset").default
]);
var h = require("snabbdom/h").default;

function render(sequence) {
  return h("div", {}, [
    h("h2", {}, "snabbdom"),
    h(
      "div.seq.snabbdom-seq",
      {},
      sequence.map(it =>
        h(
          "div.box",
          {
            key: it,
            dataset: { key: it }
          },
          it
        )
      )
    )
  ]);
}

var vnode, obsDiff;

export default function snabbdomRender(sequence, parent) {
  if (!vnode) {
    vnode = render(sequence);
    const node = document.createElement("div");
    parent.appendChild(node);
    vnode = patch(node, vnode);
    obsDiff = diffObserver(".snabbdom-seq");
    obsDiff();
  } else {
    vnode = patch(vnode, render(sequence));
  }
}
