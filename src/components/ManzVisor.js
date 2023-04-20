class ManzVisor extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get styles() {
    return /* css */`
      :host {
        --size: calc(var(--bot-width) / 1.75);

        position: relative;
        z-index: 5;
      }

      .container {
        width: var(--size);
        height: var(--size);
        background: radial-gradient(#000 0 64%, var(--border-color) 73% 100%);
        border-radius: 50%;
        border: 2px solid var(--border-color);

        display: grid;
        place-items: center;
      }

      .visor {
        --factor: 0.9;

        width: calc(var(--size) * var(--factor));
        height: calc(var(--size) * var(--factor));
        background: #505050;
        background-image:
          radial-gradient(
            #505050 0 50%,
            transparent 50% 67%,
            #505050 67% 100%
          ),
          repeating-conic-gradient(
            #919191 0 1%,
            transparent 1.25% 1.75%,
            #919191 2% 2.5%
          );
        border-radius: 50%;

        display: grid;
        place-items: center;
      }
    `;
  }

  moveVisor() {
    const eye = this.shadowRoot.querySelector(".visor");

    const delta = -90 + Math.random() * 180;
    eye.animate([{ rotate: `${delta}deg` }], { duration: 550, fill: "forwards" });
  }

  connectedCallback() {
    this.render();

    setInterval(() => this.moveVisor(), 5000);
  }

  render() {
    this.shadowRoot.innerHTML = /* html */`
    <style>${ManzVisor.styles}</style>
    <div class="container">
      <div class="visor">

      </div>
    </div>`;
  }
}

customElements.define("manz-visor", ManzVisor);
