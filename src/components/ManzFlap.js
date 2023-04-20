class ManzFlap extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get styles() {
    return /* css */`
      :host {
        position: absolute;
      }

      :host(.top) { top: 0; }

      :host(.left) {
        left: 0;
        translate: -35px;
        rotate: -90deg;
      }

      :host(.right) {
        right: 0;
        rotate: 90deg;
        translate: 35px;
      }

      :host(.bottom) {
        bottom: 0;
        rotate: 180deg;
      }

      .container {
        --offset: 2px;
        --color: #333;

        filter:
          drop-shadow(calc(var(--offset) * -1) 0 0 var(--color))
          drop-shadow(0 calc(var(--offset) * -1) 0 var(--color))
          drop-shadow(var(--offset) 0 0 var(--color))
          drop-shadow(0 var(--offset) 0 var(--color));
          /* drop-shadow(0 0 10px indigo); */
      }

      .flap {
        width: 85px;
        height: 15px;
        background: var(--fancy-gradient);
        clip-path: polygon(0 0, 100% 0, 75% 100%, 25% 100%);
        box-shadow: 0 10px 5px 5px #0003 inset;
      }
    `;
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = /* html */`
    <style>${ManzFlap.styles}</style>
    <div class="container">
      <div class="flap"></div>
    </div>`;
  }
}

customElements.define("manz-flap", ManzFlap);
