/* @jsx createElement */
import Inferno from "inferno";
import createElement from "inferno-create-element";
import Component from "inferno-component";
import diffObserver from "./utils";

class Diff extends Component {
  componentDidMount() {
    this.diffObs = diffObserver(".inferno-seq");
    this.diffObs();
  }

  render() {
    return (
      <div>
        <h2>inferno</h2>
        <div className="seq inferno-seq">
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
  Inferno.render(<Diff sequence={sequence} />, parentDOM);
}
