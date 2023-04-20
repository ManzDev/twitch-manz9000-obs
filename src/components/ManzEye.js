class ManzEye extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get styles() {
    return /* css */`
      :host {
      }

      .screen {
        --factor: 2.25;

        width: calc(var(--size) / var(--factor));
        height: calc(var(--size) / var(--factor));
        background: #000;
        border-radius: 50%;
        display: grid;
        place-items: center;
      }

      .eye {
        --factor: 4;

        width: calc(var(--size) / var(--factor));
        height: calc(var(--size) / var(--factor));
        background: #000;
        /*border: calc(var(--size) / 10) solid #bf0000;*/
        border-radius: 50%;
      }

      /*
      .eye {
        background-image: repeating-conic-gradient(gold 0 5%, transparent 5% 8%);
        filter: drop-shadow(0 0 10px #e4c410cc);
      }
      */

      /*
      .eye {
        background-image: radial-gradient(black 0 5%, red 14% 35%, black 75% 100%);
        filter: drop-shadow(0 0 10px darkred);
      }
      */

      .eye {
        background-image: radial-gradient(#500 0 20%, red 35% 60%, black 75% 100%);
        filter:
        drop-shadow(0 0 10px darkred)
        drop-shadow(0 0 10px darkred);
      }
    `;
  }

  moveEye() {
    const eye = this.shadowRoot.querySelector(".eye");

    const x = -16 + Math.random() * 32;
    const y = -16 + Math.random() * 32;
    eye.animate([{ translate: `${x}px ${y}px` }], { duration: 400, fill: "forwards" });
  }

  moveScreen() {
    const eye = this.shadowRoot.querySelector(".screen");

    const x = -32 + Math.random() * 64;
    const y = -32 + Math.random() * 64;
    eye.animate([{ translate: `${x}px ${y}px` }], { duration: 250, fill: "forwards" });
  }

  connectedCallback() {
    this.render();

    setInterval(() => this.moveEye(), 3000);
    // setInterval(() => this.moveScreen(), 1500);
  }

  render() {
    this.shadowRoot.innerHTML = /* html */`
    <style>${ManzEye.styles}</style>
    <div class="screen">
      <div class="eye"></div>
    </div>`;
  }
}

customElements.define("manz-eye", ManzEye);
