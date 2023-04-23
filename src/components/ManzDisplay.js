class ManzDisplay extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get styles() {
    return /* css */`
      :host {
        --size: var(--panel-size);
      }

      svg {
        width: calc(var(--size) / 2);
        height: calc(var(--size) / 2);
        translate: 50% 50%;
      }

      text {
        fill: red;
        font-family: EnterCommand, monospace;
        font-size: 3rem;
        letter-spacing: 6px;
        user-select: none;
      }
    `;
  }

  connectedCallback() {
    this.render();
    document.addEventListener("SET_PERSONALITY", (ev) => this.setPersonality(ev.detail.type));
  }

  setPersonality(type) {
    this.shadowRoot.querySelector("textPath").textContent = type.toUpperCase();
  }

  render() {
    this.shadowRoot.innerHTML = /* html */`
    <style>${ManzDisplay.styles}</style>
    <svg viewBox="0 0 250 250">
      <path id="curve" fill="transparent" d="M 0 250 C 135 250 250 135 250 0 Q 0 0 0 0" />
      <text>
        <textPath startOffset="195" text-anchor="middle" baseline-shift="20" xlink:href="#curve">MANZ9000</textPath>
      </text>
    </svg>`;
  }
}

customElements.define("manz-display", ManzDisplay);
