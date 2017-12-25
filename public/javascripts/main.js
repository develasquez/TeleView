//jwplayer.key = "EHq+jIbRBPIR3wc5YyWUY4ZJch1b0AFUno8mPa2CHfc="
//phimhnckkaofkllcoledjilakgbeohli
//https://chrome.google.com/webstore/detail/tv-y-radios-de-chile/phimhnckkaofkllcoledjilakgbeohli
var canal = 0;
var youtube = false;
var move = true;
var fullScreen = false;
var enableRandom = true;
var backgroundTimeout = null;
var peer = null;


function changeBackgroud(secons) {
    return setInterval(function() {
        $("#tele").css({
            "background": "url('https://picsum.photos/1920/1080/?random&r=" + parseInt(Math.random() * 1000) + "')",
            "background-size": "auto 100%",
            "background-repeat": "no-repeat",
            "background-position": "center"
        });

    }, secons * 1000);
}

function toggleFullScreen() {

    if (!$(".header").hasClass("fullScreen")) {
        $(".header").addClass("fullScreen");
        setTimeout(function() {
            $("#btnShowBarr").show();
        }, 1000)


        _header.height = 0;
        fullScreen = true;
    } else {
        $("#btnShowBarr").hide();
        $(".header").removeClass("fullScreen");

        fullScreen = false;
        _header.height = 72;
    }
    var video = document.getElementsByTagName("video")[0];
    video.webkitRequestFullScreen();
}

function showHeader() {
    $("#btnShowBarr").hide();
    $(".header").removeClass("fullScreen");

    fullScreen = false;
    _header.height = 72;

}

function toFullScreen() {
    $(".header").addClass("fullScreen");
    setTimeout(function() {
        $("#btnShowBarr").show();
    }, 1000)
    fullScreen = true;
    _header.height = 0;
}

showQr = function() {
    monomer.showDialog("#popupQr");
}
hideQr = function() {
    monomer.hideDialog("#popupQr");
}



getNombre = function(url) {
    var nombre = url.split("/")[url.split("/").length - 1].replace(".html", "").replace(/-/g, " ").toUpperCase();
    if (nombre.split("|").length > 0) {
        nombre = nombre.split("|")[nombre.split("|").length - 1];
    }
    return nombre
}

function getQueryParams(url) {
    for (var e = {}, t = (url || window.location.href).slice((url || window.location.href).replace("#", "").indexOf("?") + 1).split("&"), n = void 0, r = 0; r < t.length; r++) n = t[r].split("="), e[n[0]] = n[1];
    return e
}
setUrl = function(p_canal) {
    var iframe = "<iframe  id=\"ifTV\" width=\"600\" height=\"385\" scrolling=\"no\" frameborder=\"0\" scrolling=\"no\" allowtransparency=\"true\" marginwidth=\"0\" marginheight=\"0\"  class=\"aspect_16_9\"></iframe>";
    $("#tele").html("");
    var source = "";
    debugger;
    if (typeof(p_canal) == "number") {
        canal = p_canal;
        localStorage.setItem("canal", canal);
        debugger;
        source = canales[canal][0];
        youtube = false;
        $("#tele").append($(iframe).attr("src", source));
        $(".canal").text(getNombre(canales[canal][0]));
        monomer.__setAspect();
    } else {

        if (p_canal.indexOf("http") > -1) {
            $("#tele").append($("video").attr("src", p_canal));
            monomer.__setAspect();
        } else {

            youtube = true;
            $("#tele").append($("<div class=\"aspect_16_9\">").attr("id", "player"));
            player = new YT.Player('player', {
                height: window.innerHeight,
                width: _window.width,
                videoId: p_canal,
                events: {
                    'onReady': function(event) {
                        event.target.playVideo();
                    },
                    'onStateChange': function(event) {
                        if (event.data == YT.PlayerState.ENDED) {
                            socket.emit("end", player.getVideoData().video_id);
                        }
                    }
                }
            });
        }



    }



    toFullScreen();
}
var player;
var socket;
$(function() {
    showQr();

    // 2. This code loads the IFrame Player API code asynchronously.
    var tag = document.createElement('script');

    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    backgroundTimeout = changeBackgroud(60);
    socket = io();
    socket.on('cambiarCanal', function(canal) {
        hideQr();
        debugger;
        setUrl(canal)
    });
    socket.on('image', function(image) {

        var arrayBufferView = new Uint8Array(image);
        var blob = new Blob([arrayBufferView], {
            type: "image/jpeg"
        });
        var urlCreator = window.URL || window.webkitURL;
        var imageUrl = urlCreator.createObjectURL(blob);

        clearInterval(backgroundTimeout)
        backgroundTimeout = changeBackgroud(300);
        $("#tele").html("");
        $("#tele").css({
            "background": "url('" + imageUrl + "')",
            "background-size": "auto 100%",
            "background-repeat": "no-repeat",
            "background-position": "center"
        });
        socket.emit('successImage', {});

    });
    socket.on('cast', function(image) {
        $("#tele").html("");
        $("#tele").css({
            "background": "url('" + image.img + "')",
            "background-size": "auto 100%",
            "background-repeat": "no-repeat",
            "background-position": "center"
        });
    });
    socket.on('toggleYoutube', function(acction) {
        hideQr();
        var video = document.getElementsByTagName("video")[0];
        if (!video) {

            var iframe = document.getElementsByTagName("iframe")[0].contentWindow;
            iframe.postMessage('{"event":"command","func":"' + acction + '","args":""}', '*');
        } else {
            if (!video.paused) {
                video.pause();
            } else {
                video.play();
            }
        }

    });
    socket.on('fullScreen', function() {
        toggleFullScreen();
    });
    socket.on('hideQr', function() {
        hideQr();
    });


    socket.on('video', function(videoUrl) {
        if (videoUrl.indexOf("youtube") > 0) {
            setUrl(getQueryParams(videoUrl).v);
            return;
        }

        hideQr();
        setUrl(videoUrl);
    });
    socket.on('tele', function(videoUrl) {
        hideQr();
        document.location.href = "/";
    });
    $.get("https://ext.juicedev.me/MonkiTV/Canales.json", function(data) {
        canales = data;
    });
    $("#btnShowBarr").click(function() {
        showHeader();
    });
    $(document).mouseover(function() {
        move = true;
    })

    $("#anterior").click(function() {
        if (canal > 0) {
            canal--;
            setUrl(canal);
        }
    });
    $("#siguiente").click(function() {
        if (canal < canales.length) {
            canal++;
            setUrl(canal);
        }
    });
    setInterval(function() {
        var height = _window.height - _header.height;
        $("#ifTV").width("100%").height(height).css("max-height", height + "px");
    }, 500);
})

canales = [];

listItem = function(data) {
    return [
        '<a href="javascript:void(0)"  onClick="setUrl(' + data.canal + ')">',
        '          <li>',
        '            <div>',
        '              <div class="test_box fab z-d1">',
        '                <img src="' + data.img + '">',
        '              </div>',
        '            </div>',
        '            <div>',
        '              <div>',
        '                <h3>' + data.nombre + '</h3>',
        '              </div>',
        '            </div>',
        '          </li>',
        '        </a>'
    ].join("\n");
}