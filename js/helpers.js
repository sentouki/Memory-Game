function updateNumOfMatchedCards(num) {
  document.getElementById("matched_cards").innerHTML = num;
}

function updateScore(num) {
  document.getElementById("score").innerHTML = num > 0 ? num : 0;
}

function updateHighscore(num) {
  document.getElementById("highscore").innerHTML = num > 0 ? num : 0;
}

function saveHighscore(num) {
  document.cookie = `highscore=${num}; max-age=31536000`;
  updateHighscore(num);
}

function getHighscore() {
  return parseCookie(document.cookie).highscore;
}

function parseCookie(cookie) {
  let cookieObj = {};
  cookie.split(";").forEach(c => {
    var keyValuePair = c.split("=");
    cookieObj[keyValuePair[0]] = keyValuePair[1];
  })
  return cookieObj;
}