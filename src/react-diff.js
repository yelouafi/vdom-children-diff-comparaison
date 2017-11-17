import React from "react";
import { render } from "react-dom";
import diffObserver from "./utils";

class Diff extends React.Component {
  componentDidMount() {
    this.diffObs = diffObserver(".react-seq");
    this.diffObs();
  }

  render() {
    return (
      <div>
        <h2>react</h2>
        <div className="seq react-seq">
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

export default function renderDiff(sequence, parentDOM) {
  render(<Diff sequence={sequence} />, parentDOM);
}
