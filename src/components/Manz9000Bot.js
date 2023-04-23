import { setTypewriter } from "../modules/setTypewriter.js";
import "./ManzFlap.js";
import "./ManzPanel.js";

const template = document.createElement("template");
template.innerHTML = /* html */`
  <div class="chat">
    <div class="username dialog">
      <img class="avatar" src="" alt="">
      <p class="name"></p>
      <p class="message"></p>
    </div>
    <div class="bot dialog">
      <p class="reply">En respuesta a <span></span>:</p>
      <p class="message"></p>
    </div>
  </div>`;

class Manz9000Bot extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  init() {
    const dialogContainer = this.shadowRoot.querySelector(".dialog-container");
    const socket = new WebSocket("ws://localhost:9000");
    socket.addEventListener("message", async (ev) => {
      const dialog = template.content.cloneNode((true));
      const { type, message, username, usernameMessage, evil } = JSON.parse(ev.data);

      const event = new CustomEvent("SET_EVIL", { composed: true, bubbles: true, detail: { evil } });
      this.dispatchEvent(event);

      dialog.querySelector(".reply span").textContent = username;
      const chatElement = dialog.querySelector(".chat");
      setTypewriter({ username, usernameMessage, message }, chatElement);
      // dialog.querySelector(".message").textContent = message;
      this.setPersonality(type);
      dialogContainer.innerHTML = "";
      dialogContainer.appendChild(dialog);
    });
  }

  static get styles() {
    return /* css */`
      :host {
        --bot-width: 350px;
        --bot-height: 350px;

        --panel-size: calc(var(--bot-width) / 1.25);
        --visor-size: calc(var(--bot-width) / 1.75);

        --fancy-gradient: linear-gradient(to top, #884ced, #ec1cce);
      }

      .container {
        display: grid;
        grid-template-columns: var(--bot-width) 1fr;
        grid-template-rows: 1fr;
        min-height: var(--bot-height);
        gap: 0 2em;
      }

      .manz-bot {
        width: var(--bot-width);
        height: var(--bot-height);
        background: linear-gradient(#808080, #333);
        /* box-shadow: -5px -5px 20px #0009 inset; */
        background: radial-gradient(circle, #aaa, #444 60%);
        border-radius: 50%;
        display: grid;
        place-items: center;
        position: relative;
        overflow: hidden;
      }

      .manz-bot::before,
      .manz-bot::after {
        content: "";
        display: block;
        background: radial-gradient(at 50% 50%, #30034a, #df15d5);
        width: 60px;
        height: 80px;
        border-radius: 50%;
        position: absolute;
        display: none;
      }

      .manz-bot::before {
        left: -32px;
      }

      .manz-bot::after {
        right: -32px;
      }

      :host(.afor) .eye {


        border-color: blue;
        filter: drop-shadow(0 0 10px blue);
        border-top-color: #000;

        /*
        border: 20px transparent solid;
        background: repeating-conic-gradient(from 0, blue, darkblue);
        filter: drop-shadow(0 0 10px blue);
        */
      }

      :host(.afor) .screen {
        border: 4px solid darkred;
      }

      .dialog-container {
        display: flex;
        flex-direction: column;
      }

      .dialog {
        display: inline-block;
        background: #fff;
        color: #000;
        font-family: EnterCommand;
        font-weight: bold;
        letter-spacing: -0.5px;
        font-size: 48px;
        padding: 0.75em 1em;
        box-sizing: border-box;
      }

      .dialog p {
        margin: 0;
      }

      .dialog .reply {
        color: #555;
      }

      .dialog .reply span {
        color: #731ecf;
      }

      .chat {
        max-width: 1180px;
        display: grid;
        gap: 20px;
      }

      .dialog.username {
        max-width: 600px;
        font-size: 32px;
        justify-self: end;
        background: #c1aee2;
        position: relative;
      }

      .dialog.username .name {
        color: #d3002e;
        font-size: 37px;
      }

      .dialog.username .avatar {
        position: absolute;
        left: -70px;
        border: 8px solid #c1aee2;
        background: #c1aee2;
        border-radius: 50%;
        box-shadow: 4px 4px 5px #0005;
      }

    `;
  }

  connectedCallback() {
    this.render();
    this.init();
  }

  setPersonality(type) {
    const event = new CustomEvent("SET_PERSONALITY", { detail: { type }, composed: true, bubbles: true });
    this.dispatchEvent(event);
  }

  render() {
    this.shadowRoot.innerHTML = /* html */`
    <style>${Manz9000Bot.styles}</style>
    <div class="container">
      <div class="bot-container">
        <div class="manz-bot">
          <manz-panel></manz-panel>
          <manz-flap class="top"></manz-flap>
          <manz-flap class="left"></manz-flap>
          <manz-flap class="right"></manz-flap>
          <manz-flap class="bottom"></manz-flap>
        </div>
      </div>
      <div class="dialog-container">
      </div>
    </div>`;
  }
}

customElements.define("manz9000-bot", Manz9000Bot);
