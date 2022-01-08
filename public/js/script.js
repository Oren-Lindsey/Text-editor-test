var toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'],
  ['blockquote', 'code-block'],
  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
  [{ 'font': [] }],
  ['link'],
  ['clean']
];

var quill = new Quill('#editor', {
  modules: {
    toolbar: toolbarOptions
  },
  theme: 'snow'
});

delete HtmlSanitizer.AllowedTags['img']
delete HtmlSanitizer.AllowedTags['video']
function sanitize() {
  var bodyContent = document.querySelector('.ql-editor').innerHTML;
  console.log(bodyContent);
  var cleanBodyContent = HtmlSanitizer.SanitizeHtml(bodyContent);
  console.log(cleanBodyContent);
  return cleanBodyContent;
}

function getCurrentVal() {
  fetch('https://text-editor-test.s40.repl.co/api/current-value')
    .then(response => response.json())
    .then(data => updatePage(data))
}

function updatePage(data) {
  console.log(data);
  var div = document.getElementById('currentData');
  div.innerHTML += data.currentValue;
}

function submitData() {
  clean = sanitize();
  const data = {"content": clean};
  console.log(data);
  fetch('https://text-editor-test.s40.repl.co/api/current-value', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  })
}