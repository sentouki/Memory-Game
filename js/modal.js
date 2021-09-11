const modal = document.getElementById("myModal");
const close = document.getElementsByClassName("modal_close")[0];
const closeButton = document.getElementsByClassName("modal_close_button")[0];
const restartButton = document.getElementsByClassName("modal_restart_button")[0];

let modalOpen = false;

// When the user clicks anywhere outside of the modal, close it
// window.onclick = function(event) {
//   if (event.target == modal) {
//     modalOpen = false;
//     console.log("clicked outside of modal!")
//     hideModal();
//   }
// }

function openModal() {
  showModal();
  modalOpened()
}

function closeModal() {
  hideModal();
  modalClosed();
}

function restartAndCloseModal() {
  hideModal();
  restartGame();
  modalClosed();
}

function restart() {
  restartGame();
}

function hideModal() {
  modal.style.display = "none";
}

function showModal() {
  modal.style.display = "block";
}

// Activate clicking on canvas after 1 second
function modalClosed() {
  setTimeout(() => {
    modalOpen = false;
  }, 1000)
}

function modalOpened() {
  modalOpen = true;
}