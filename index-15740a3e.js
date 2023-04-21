(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const a of e)if(a.type==="childList")for(const s of a.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&r(s)}).observe(document,{childList:!0,subtree:!0});function o(e){const a={};return e.integrity&&(a.integrity=e.integrity),e.referrerPolicy&&(a.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?a.credentials="include":e.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function r(e){if(e.ep)return;e.ep=!0;const a=o(e);fetch(e.href,a)}})();const u=50,v=(i,t)=>{const o=r=>t.textContent=r;for(let r=0;r<i.length+1;r++){const e=r*u;setTimeout(()=>o(i.substring(0,r)),e)}};class n extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}static get styles(){return`
      :host {
        position: absolute;
      }

      :host(.top) { top: 0; }

      :host(.left) {
        left: 0;
        transform: translateX(-35px) rotate(-90deg);
      }

      :host(.right) {
        right: 0;
        transform: translateX(35px) rotate(90deg);
      }

      :host(.bottom) {
        bottom: 0;
        transform: rotate(180deg);
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
    `}connectedCallback(){this.render()}render(){this.shadowRoot.innerHTML=`
    <style>${n.styles}</style>
    <div class="container">
      <div class="flap"></div>
    </div>`}}customElements.define("manz-flap",n);class d extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}static get styles(){return`
      :host {
        --size: var(--panel-size);
      }

      .container {
        width: var(--size);
        height: var(--size);
        background: gold;
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
      }
    `}connectedCallback(){this.render(),document.addEventListener("SET_PERSONALITY",t=>this.setPersonality(t.detail.type))}setPersonality(t){this.shadowRoot.querySelector("textPath").textContent=t.toUpperCase()}render(){this.shadowRoot.innerHTML=`
    <style>${d.styles}</style>
    <svg viewBox="0 0 250 250">
      <path id="curve" fill="transparent" d="M 0 250 C 135 250 250 135 250 0 Q 0 0 0 0" />
      <text>
        <textPath startOffset="195" text-anchor="middle" baseline-shift="20" xlink:href="#curve">MANZ9000</textPath>
      </text>
    </svg>`}}customElements.define("manz-display",d);class c extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}static get styles(){return`
      :host {
        --size: var(--visor-size);

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
    `}moveVisor(){const t=this.shadowRoot.querySelector(".visor"),o=-90+Math.random()*180;t.animate([{rotate:`${o}deg`}],{duration:550,fill:"forwards"})}connectedCallback(){this.render(),setInterval(()=>this.moveVisor(),5e3)}render(){this.shadowRoot.innerHTML=`
    <style>${c.styles}</style>
    <div class="container">
      <div class="visor">

      </div>
    </div>`}}customElements.define("manz-visor",c);class l extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}static get styles(){return`
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
    `}moveEye(){const t=this.shadowRoot.querySelector(".eye"),o=-16+Math.random()*32,r=-16+Math.random()*32;t.animate([{translate:`${o}px ${r}px`}],{duration:400,fill:"forwards"})}moveScreen(){const t=this.shadowRoot.querySelector(".screen"),o=-32+Math.random()*64,r=-32+Math.random()*64;t.animate([{translate:`${o}px ${r}px`}],{duration:250,fill:"forwards"})}connectedCallback(){this.render(),setInterval(()=>this.moveEye(),3e3)}render(){this.shadowRoot.innerHTML=`
    <style>${l.styles}</style>
    <div class="screen">
      <div class="eye"></div>
    </div>`}}customElements.define("manz-eye",l);class p extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}static get styles(){return`
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

    `}connectedCallback(){this.render()}render(){this.shadowRoot.innerHTML=`
    <style>${p.styles}</style>
    <div class="circle">
      <manz-display></manz-display>
      <manz-visor></manz-visor>
      <manz-eye></manz-eye>
      <div class="screw screw-1"></div>
      <div class="screw screw-2"></div>
      <div class="screw screw-3"></div>
      <div class="screw screw-4"></div>
    </div>`}}customElements.define("manz-panel",p);const m=document.createElement("template");m.innerHTML=`
  <div class="dialog">
    <p class="reply">En respuesta a <span></span>:</p>
    <p class="message"></p>
  </div>`;class h extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}init(){const t=this.shadowRoot.querySelector(".dialog-container");new WebSocket("ws://localhost:9000").addEventListener("message",r=>{const e=m.content.cloneNode(!0),{type:a,message:s,username:f}=JSON.parse(r.data);e.querySelector(".reply span").textContent=f;const g=e.querySelector(".message");v(s,g),this.setPersonality(a),t.innerHTML="",t.appendChild(e)})}static get styles(){return`
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
        width: 80%;
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

    `}connectedCallback(){this.render(),this.init()}setPersonality(t){const o=new CustomEvent("SET_PERSONALITY",{detail:{type:t},composed:!0,bubbles:!0});this.dispatchEvent(o)}render(){this.shadowRoot.innerHTML=`
    <style>${h.styles}</style>
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
    </div>`}}customElements.define("manz9000-bot",h);
