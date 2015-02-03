var token;
var secret;
function save_options(){
  localStorage["format"] = document.getElementById("format").value;
  localStorage["_s"] = "true";
  var status = document.getElementById("status");
  status.innerHTML = "Options Saved.";
}

function restore_options(){
  var format = localStorage["format"];
      document.getElementById("status").innerHTML = "OK";
  if(!format)format = "{0} - {1} (from {2})  {3} {4}";
  document.getElementById("format").value = format;
}
document.addEventListener('DOMContentLoaded', restore_options);
document.querySelector('#save').addEventListener('click', save_options);
