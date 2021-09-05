const modal = document.getElementById("myModal");
const close = document.getElementsByClassName("modal_close")[0];

close.onclick = function() {
  console.log("close modal!")
  modal.style.display = "none";
}

function openModal() {
  console.log("open modal!")
  modal.style.display = "block";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    console.log("clicked outside of modal!")
    modal.style.display = "none";
  }
}