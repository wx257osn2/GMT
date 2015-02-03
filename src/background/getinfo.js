var port = chrome.extension.connect({name: "NPT4GP"});
function getData(){
  var image = document.getElementsByClassName("art-image");
  if(image && image.length)image = image[1];
  else image = document.getElementById("playingAlbumArt");
  port.postMessage({capture_status: 0,title: document.getElementById("playerSongTitle").innerHTML,artist: document.getElementById("player-artist").innerHTML,album: document.getElementsByClassName("player-album")[0].innerHTML,image: image.src});
}
getData();
timerID = setInterval("getData()",1000);