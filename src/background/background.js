var flag = false;
var title = "";
var artist = "";
var album = "";
var image = "";

var id_arr = Array();

function updatecheck(){
  var _s = localStorage["_s"];
  if(_s == "true"){
    flag = false;
    localStorage["_s"] = "false";
  }
}

function check_id(id){
  for(i = 0; i < id_arr.length; i++)if(id == id_arr[i])return true;
  return false;
}

function add_id(id){
  if(!check_id(id))id_arr[id_arr.length] = id;
}

function each_id(func){
  for(i = 0; i < id_arr.length; i++)func(id_arr[i]);
}

function postTweet(title,artist,album,image){
  alert("pre-format");
  var uptext = localStorage["format"].format(title,artist,album,image,"#NowPlaying");
  alert("pre-post");
  window.open("https://twitter.com/intent/tweet?original_referer=http%3A%2F%2Fbit.ly%2FI_Twitter&text=" + encodeURIComponent(uptext), null);
  alert("posted");
}

function set_icon(f,id){
  icon = "39n.png";
  if(f)icon = "39.png";
  chrome.pageAction.setIcon({'tabId': id, 'path': icon});
}
chrome.tabs.onUpdated.addListener(function(id, changeInfo, tab) {
  if (/^https:\/\/play\.google\.com\/music\/listen/.test(tab.url)) {
    add_id(id);
    set_icon(flag,id);
    chrome.pageAction.show(id);
  }
});
chrome.pageAction.onClicked.addListener(function(tab) {
  updatecheck();
  if(flag){
    postTweet(title,artist,album,image);
    flag = false;
    add_id(tab.id);
    each_id(function(id){
      set_icon(flag,id);
      chrome.pageAction.show(id);
    });
  }
});
chrome.extension.onConnect.addListener(function(port){
    updatecheck();
    if(port.name == "NPT4GP"){
      port.onMessage.addListener(function(msg){
        var st = msg.capture_status;
        var ti = "";
        var ar = "";
        var al = "";
        var im = "";
        if(st != 0){
          each_id(function(id){
            set_icon(0,id);
            chrome.pageAction.show(id);
          });
        }
        else{
          ti = msg.title;
          ar = msg.artist;
          al = msg.album;
          im = msg.image;
        }
        if(title != ti || artist != ar || album != al || image != im){
          title = ti;
          artist = ar;
          album = al;
          image = im;
          flag = true;
          each_id(function(id){
            set_icon(flag,id);
            chrome.pageAction.show(id);
          });
        }
      });
    }
  }
});

