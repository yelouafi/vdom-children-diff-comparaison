/* @jsx h */
import { h, mount, patch } from "petit-dom";
import diffObserver from "./utils";

function render(sequence) {
  return (
    <div>
      <h2>petit-dom</h2>
      <div className="seq petit-dom-seq">
        {sequence.map(it =>
          <div key={it} data-key={it} className="box">
            {it}
          </div>
        )}
      </div>
    </div>
  );
}

var vnode, obsDiff;

export default function petitDomRender(sequence, parent) {
  if (!vnode) {
    vnode = render(sequence);
    parent.appendChild(mount(vnode));
    obsDiff = diffObserver(".petit-dom-seq");
    obsDiff();
  } else {
    const vnode2 = render(sequence);
    patch(vnode2, vnode);
    vnode = vnode2;
  }
}
