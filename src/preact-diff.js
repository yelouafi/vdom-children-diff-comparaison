/* @jsx h */
import { h, render, Component } from "preact";
import diffObserver from "./utils";

class Diff extends Component {
  componentDidMount() {
    this.diffObs = diffObserver(".preact-seq");
    this.diffObs();
  }

  render() {
    return (
      <div>
        <h2>preact</h2>
        <div className="seq preact-seq">
          {this.props.sequence.map(it =>
            <div key={it} data-key={it} className="box">
              {it}
            </div>
          )}
        </div>
      </div>
    );
  }
}

let root;
export default function renderDiff(sequence, parentDOM) {
  root = render(<Diff sequence={sequence} />, parentDOM, root);
}
