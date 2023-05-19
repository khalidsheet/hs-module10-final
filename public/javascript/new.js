console.log('Hello World');

const simple = new SimpleMDE({
  element: document.getElementById('code'),
  forceSync: true,

  renderingConfig: {
    singleLineBreaks: false,
    codeSyntaxHighlighting: true,
  },
});

const contnet = document.getElementById('code');

if (contnet) {
  simple.codemirror.on('change', () => {
    contnet.value = simple.value();
  });
}

const renderCode = document.getElementById('renderCode');

if (renderCode) {
  const value = renderCode.innerHTML;
  renderCode.innerHTML = marked.parse(
    value.replace(/^[\u200B\u200C\u200D\u200E\u200F\uFEFF]/, ''),
  );
}
