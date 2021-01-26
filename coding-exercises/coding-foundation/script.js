function myFunction() {
  var h = document.getElementById("boxes");
  h.innerHTML= "";
  var x = document.getElementById("inputNumber").value;
  for (var i = 0; i < x; i++){
  h.insertAdjacentHTML("beforeend", "<div class='material-icons'>cloud</div>");
}}
