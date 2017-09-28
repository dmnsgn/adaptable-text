require("babel-polyfill");
const AdaptableText = require("../");

let adapted0;
let adapted1;

// Utils
const loadStyle = (href, callback) => {
  const head = document.getElementsByTagName("head")[0];
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.type = "text/css";
  link.href = href;
  link.onload = callback;
  head.appendChild(link);
};

loadStyle("test/index.css", () => {
  // Create example dom tree
  const wrapper = document.createElement("div");
  wrapper.id = "wrapper";
  wrapper.innerHTML = `
  <h1>AdaptableText</h1>
  <p>> Resize me to test</p>
  <div class="example example--0">
    <h2>=> HTMLElement with &lt;br&gt; tag</h2>
    <div class="element">Lorem ipsum dolor sit amet, consectetur adipisicing elit.<br>Debitis eum officiis architecto recusandae excepturi totam expedita beatae.</div>
    <div class="element">Lorem ipsum dolor sit amet, consectetur adipisicing elit.<br>Debitis eum officiis architecto recusandae excepturi totam expedita beatae.</div>
  </div>

  <div class="example example--1">
    <h2>=> HTMLElement with minFontSize: 10</h2>
    <div class="element">Lorem ipsum dolor sit amet, consectetue hic illo.</div>
    <div class="element">Lorem ipsum dolor sit amet, consectetue hic illo.</div>
  </div>

  <div class="example example--2">
    <h2>=> HTMLTextAreaElement</h2>
    <textarea class="editableElement" autofocus></textarea>
  </div>

  <div class="example example--3">
    <h2>=> HTMLTextAreaElement with div</h2>
    <textarea class="editableElement" autofocus></textarea>
    <div class="element"></div>
  </div>
  `;
  document.body.appendChild(wrapper);

  // Init
  // example--0
  adapted0 = new AdaptableText(document.querySelector(".example--0 .element"));
  adapted0.init();

  // example--1
  adapted1 = new AdaptableText(document.querySelector(".example--1 .element"), {
    step: 0.1,
    minFontSize: 10
  });
  adapted1.init();
  adapted1.adapt();

  // example--2
  const editableElement2 = document.querySelector(".example--2 .editableElement");
  const adapted2 = new AdaptableText(editableElement2);
  adapted2.init();
  editableElement2.addEventListener("keyup", function() {
    adapted2.adapt();
  });

  // example--3
  const editableElement3 = document.querySelector(".example--3 .editableElement");
  const el3 = document.querySelector(".example--3 .element");

  const adapted3 = new AdaptableText(editableElement3);
  const elementAdapted3 = new AdaptableText(el3);
  adapted3.init();
  elementAdapted3.init();

  editableElement3.addEventListener("keyup", function() {
    adapted3.adapt();
    el3.textContent = this.value;
    elementAdapted3.adapt();
  });

  // Adapt
  const adapt = () => {
    adapted0.setWidth();
    adapted0.adapt();
    adapted1.setWidth();
    adapted1.adapt();
  };

  // Listen for a resize event
  window.addEventListener("resize", adapt);

  // Kick off
  requestIdleCallback(() => {
    adapt();
  });
});

