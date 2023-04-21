import "./ManzDisplay.js";
import "./ManzVisor.js";
import "./ManzEye.js";

class ManzPanel extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get styles() {
    return /* css */`
      :host {
        --size: var(--panel-size);
        --border-color: #888;
      }

      .circle {
        width: var(--size);
        height: var(--size);
        background-image: conic-gradient(
          transparent 0 0.25turn,
          #000 0.25turn 0.50turn,
          transparent 0.50turn 0.75turn,
          #3d3d3d 0.75turn 1turn
        );
        border-radius: 50%;
        border: 2px solid var(--border-color);

        display: grid;
        place-items: center;
        position: relative;
      }

      .circle::before,
      .circle::after {
        content: "";
        display: block;
        width: 2px;
        height: 100%;
        background: var(--border-color);
        position: absolute;
      }

      .circle::after {
        width: 100%;
        height: 2px;
      }

      :is(manz-visor, manz-eye) {
        position: absolute;
      }

      manz-eye {
        z-index: 5;
      }

      .screw {
        --size: 10px;
        --border-color: #4a4a4a;

        width: var(--size);
        height: var(--size);
        background: grey;
        border: 1px solid var(--border-color);
        border-radius: 50%;
        z-index: 5;

        position: absolute;
        display: grid;
        place-items: center;
      }

      .screw::before,
      .screw::after {
        content: "";
        display: inline-block;
        background: var(--border-color);
        width: 70%;
        height: 15%;
        position: absolute;
      }

      .screw::after {
        width: 15%;
        height: 70%;
      }

      .screw-1 {
        bottom: 12px;
        transform: translateX(-12px);
      }

      .screw-2 {
        left: 12px;
        transform: translateY(12px);
      }

      .screw-3 {
        right: 12px;
        transform: translateY(-12px);
      }

      .screw-4 {
        top: 12px;
        transform: translateX(12px);
      }

    `;
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = /* html */`
    <style>${ManzPanel.styles}</style>
    <div class="circle">
      <manz-display></manz-display>
      <manz-visor></manz-visor>
      <manz-eye></manz-eye>
      <div class="screw screw-1"></div>
      <div class="screw screw-2"></div>
      <div class="screw screw-3"></div>
      <div class="screw screw-4"></div>
    </div>`;
  }
}

customElements.define("manz-panel", ManzPanel);
