/* @jsx h */
import { h, mount, patch } from "petit-dom";

var libs = [];

var currentStep = -1;
var lastInput = "";
var currentInput = "";

function updateInput(input) {
  lastInput = currentInput;
  currentInput = input;
}

const steps = [
  "36",
  "3678",
  "7836",
  "3678",
  "123678",
  "12345678",
  "a0123456789b",
  "12345678",
  "12378456",
  "12345678",
  "6ab127cd8",
  "1278",
  "890"
];

var vnode = render();
document.querySelector(".app").appendChild(mount(vnode));

function update() {
  const oldVnode = vnode;
  vnode = render();
  patch(vnode, oldVnode);
  const value = currentInput.split("").filter(s => s).map(s => s.trim());
  libs.forEach(({ render, node }) => render(value, node));
  lastInput = currentInput;
}

function toggleAutoTest() {
  if (currentStep >= 0) {
    currentStep = -1;
    currentInput = "";
  } else {
    currentStep = 0;
    currentInput = steps[currentStep];
  }
  update();
}

function nextStep() {
  if (currentStep < steps.length - 1) {
    currentStep++;
    currentInput = steps[currentStep];
  }
  update();
}

function render() {
  const isAutoTest = currentStep >= 0;
  const edit =
    currentInput !== lastInput
      ? `'${lastInput}' ➔ '${currentInput}'`
      : "No edit";

  return (
    <div>
      <input
        placeholder="e.g. 12345"
        disabled={isAutoTest}
        value={currentInput}
        oninput={e => (currentInput = e.target.value)}
      />
      <button disabled={isAutoTest} onclick={update}>
        Patch!
      </button>
      <button onclick={toggleAutoTest}>
        {isAutoTest ? "Abort predefined test" : "Start predefined test"}
      </button>
      <p>
        {"Current step : "}
        {edit}
      </p>
      {isAutoTest
        ? <button disabled={currentStep >= steps.length - 1} onclick={nextStep}>
            Next
          </button>
        : null}
    </div>
  );
}

const $root = document.querySelector(".libs");

function register(name, render) {
  const lib = { name, render };
  libs.push(lib);
  const node = document.createElement("div");
  node.id = name;
  $root.appendChild(node);
  lib.node = node;
}

register("react", require("./react-diff").default);
register("preact", require("./preact-diff").default);
register("snabbdom", require("./snabbdom-diff").default);
register("petit-dom", require("./petit-dom-diff").default);
register("inferno", require("./inferno-diff").default);
update();
