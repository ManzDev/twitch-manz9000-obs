const CHAR = "'";
const COLORS = ["red", "orange", "yellow", "green"];

class ManzMeter extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get styles() {
    return /* css */`
      :host {
        --size: var(--panel-size);

        position: absolute;
      }

      svg {
        width: calc(var(--size) / 2);
        height: calc(var(--size) / 2);
        translate: -50% -50%;
        font-size: 42px;
        font-weight: bold;
      }

      svg text tspan {
        font-family: "Rektec";
        pointer-events: none;
        user-select: none;
      }

      svg text tspan.red.on { fill: #db1b1b; filter: drop-shadow(0 0 10px #db1b1b); }
      svg text tspan.orange.on { fill: #e46c22; filter: drop-shadow(0 0 10px #e46c22); }
      svg text tspan.yellow.on { fill: #d3b020; filter: drop-shadow(0 0 10px #d3b020); }
      svg text tspan.green.on { fill: #67d320; filter: drop-shadow(0 0 10px #67d320); }

      svg text tspan.red { fill: #410a0a; transition: fill 0.3s ease; }
      svg text tspan.orange { fill: #381a07; transition: fill 0.3s ease; }
      svg text tspan.yellow { fill: #3b3008; transition: fill 0.3s ease; }
      svg text tspan.green { fill: #172f07; transition: fill 0.3s ease; }
    `;
  }

  connectedCallback() {
    this.render();
    document.addEventListener("SET_EVIL", (ev) => this.setMeter(ev.detail.evil));
  }

  createMeter() {
    const meter = [];

    for (let i = 0; i < 20; i++) {
      const colorIndex = Math.floor(i / 5);
      const color = COLORS[colorIndex];
      meter.push(`<tspan class="${color}">${CHAR}</tspan>`);
    }

    return meter.join("");
  }

  setMeter(percent) {
    const index = Math.floor((percent * 19) / 100);
    this.resetMeter();
    this.enableMeterAt(index);
  }

  resetMeter() {
    const texts = [...this.shadowRoot.querySelectorAll("tspan")];
    texts.forEach(tspan => tspan.classList.remove("on"));
  }

  enableMeterAt(index) {
    const texts = [...this.shadowRoot.querySelectorAll("tspan")];
    for (let i = index + (19 - index); i >= (19 - index); i--) {
      const tspan = texts[i];
      const time = (19 - i) * 250;
      setTimeout(() => tspan.classList.add("on"), time);
    }
  }

  render() {
    this.shadowRoot.innerHTML = /* html */`
    <style>${ManzMeter.styles}</style>
    <svg viewBox="0 0 250 250">
      <path id="curve" fill="transparent" d="M 250 0 C 115 0 0 115 0 250 Q 250 250 250 250" />
      <text textLength="350">
        <textPath startOffset="195" text-anchor="middle" baseline-shift="10" xlink:href="#curve">
          ${this.createMeter()}
        </textPath>
      </text>
    </svg>`;
  }
}

customElements.define("manz-meter", ManzMeter);
