var toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'],
  ['blockquote', 'code-block'],
  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
  ['link'],
  ['clean']
];

var quill = new Quill('#editor', {
  modules: {
    toolbar: toolbarOptions
  },
  theme: 'snow',
  placeholder: 'Type the content here...'
});

var quill = new Quill('#titleEditor', {
  modules: {
    toolbar: toolbarOptions
  },
  theme: 'snow',
  placeholder: 'Type the title here...'
});

delete HtmlSanitizer.AllowedTags['img']
delete HtmlSanitizer.AllowedTags['video']
function sanitize() {
  var bodyContent = document.getElementsByClassName('ql-editor')[1].innerHTML;
  var titleContent = document.getElementsByClassName('ql-editor')[0].innerHTML;
  console.log(titleContent);
  console.log(bodyContent);
  var cleanBodyContent = HtmlSanitizer.SanitizeHtml(bodyContent);
  var cleanTitleContent = HtmlSanitizer.SanitizeHtml(titleContent);
  console.log(cleanBodyContent);
  var content = {'body':cleanBodyContent,'title':cleanTitleContent};
  return content
}

function getCurrentVal() {
  fetch('https://text-editor-test.s40.repl.co/api/current-value')
    .then(response => response.json())
    .then(data => updatePage(data))
}

function updatePage(data) {
  console.log(data.currentBody);
  var title = document.getElementById('currentData');
  title.innerHTML += data.currentTitle.currentContent;
  var content = document.getElementById('currentData');
  content.innerHTML += data.currentBody.currentContent;
}

function submitData() {
  clean = sanitize();
  bodyContent = clean.body
  titleContent = clean.title
  const data = {"content":bodyContent,"title":titleContent};
  console.log(data);
  fetch('https://text-editor-test.s40.repl.co/api/current-value', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  })
}