import "./ManzVisor.js";

class ManzPanel extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get styles() {
    return /* css */`
      :host {
        --size: calc(var(--bot-width) / 1.45);
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
    `;
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = /* html */`
    <style>${ManzPanel.styles}</style>
    <div class="circle">
      <manz-visor></manz-visor>
    </div>`;
  }
}

customElements.define("manz-panel", ManzPanel);
