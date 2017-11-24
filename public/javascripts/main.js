//jwplayer.key = "EHq+jIbRBPIR3wc5YyWUY4ZJch1b0AFUno8mPa2CHfc="
//phimhnckkaofkllcoledjilakgbeohli
//https://chrome.google.com/webstore/detail/tv-y-radios-de-chile/phimhnckkaofkllcoledjilakgbeohli
var canal = 0;
var youtube = false;
var move = true;
var fullScreen = false;
var enableRandom = true;
var backgroundTimeout = null;

function changeBackgroud(secons) {
    return setInterval(function() {
        $("#tele").css({
            "background": "url('https://picsum.photos/1920/1080/?random&r=" + parseInt(Math.random() * 1000) + "')"
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
setUrl = function(p_canal) {
    var iframe = "<iframe  id=\"ifTV\" width=\"600\" height=\"385\" scrolling=\"no\" frameborder=\"0\" scrolling=\"no\" allowtransparency=\"true\" marginwidth=\"0\" marginheight=\"0\"  class=\"aspect_16_9\"></iframe>";
    $("#tele").html("");
    var source = "";
    if (typeof(p_canal) == "number") {
        canal = p_canal;
        localStorage.setItem("canal", canal);
        source = ""; //canales[canal][0];
        youtube = false;
        $("#tele").append($(iframe).attr("src", source));
        $(".canal").text(getNombre("")); //canales[canal][0]
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
        hideQr();
        document.location.href = "/video/" + encodeURIComponent(videoUrl);
    });
    socket.on('tele', function(videoUrl) {
        hideQr();
        document.location.href = "/";
    });
    /* setInterval(function(){
         if(move == false){
             toFullScreen()
         }else{
             showHeader();
         }
         move = false;
     },3000)*/
    $("#btnShowBarr").click(function() {
        showHeader();
    });
    $(document).mouseover(function() {
        move = true;
    })
    canal = parseInt(localStorage.getItem("canal")) || 0;
    for (c in canales) {
        try {
            var obj = {
                canal: c,
                nombre: getNombre(canales[c][0]).replace(/ /g, '_'),
                img: canales[c][1]
            }
            $("#canales").append(listItem(obj));
        } catch (ex) {}
    }
    setUrl(canal);
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

canales = [
    /*    ["http://mdstrm.com/live-stream/525431f81bc42c4539000057?jsapi=true&autoplay=true&v=1.52.12&ref=mdstrm.com#TVN|1.52.12|TVN","https://pbs.twimg.com/profile_images/2609853665/47fv7lbglyncfopqx1ox_400x400.jpeg"],
        ["http://ext.juicedev.me/TV/index.html#Canal_13|1.52.12|Canal 13","http://ext.juicedev.me/TV/logos/13.png"],
        ["http://ext.juicedev.me/TV/index.html#Canal_13C|1.52.12|13C","http://ext.juicedev.me/TV/logos/13c.png"],
        ["http://ext.juicedev.me/MonkiTV.2.0.2/#Canal-CHV-CHV-2.0.7","http://ext.juicedev.me/TV/logos/chv-2015.png"],
        ["http://ext.juicedev.me/TV/index.html#Mega|1.52.12|Mega","http://ext.juicedev.me/TV/logos/mega2015.png"],
        ["http://ext.juicedev.me/TV/index.html#CNN_Chile|1.52.12|CNN Chile","http://ext.juicedev.me/TV/logos/cnnchile.png"],
        ["http://ext.juicedev.me/TV/index.html#UCV|1.52.12|UCV","http://ext.juicedev.me/TV/logos/ucv-2.png"],
        ["http://ext.juicedev.me/TV/index.html#La_Red|1.52.12|La Red","http://ext.juicedev.me/TV/logos/lared.png"],
        ["http://ext.juicedev.me/TV/index.html#ETC_TV|1.52.12|ETC TV","http://ext.juicedev.me/TV/logos/etc.png"],
        ["http://ext.juicedev.me/TV/index.html#CDO_Basico|1.52.12|CDO Básico","http://ext.juicedev.me/TV/logos/cdo_2.png"],
        ["http://ext.juicedev.me/TV/index.html#Vive|1.52.12|Vive","http://ext.juicedev.me/TV/logos/vive.png"],
        ["http://ext.juicedev.me/TV/index.html#Arica_TV|1.52.12|Arica TV","http://ext.juicedev.me/TV/logos/aricatv.png"],
        ["http://ext.juicedev.me/TV/index.html#Iquique_TV|1.52.12|Iquique TV","http://ext.juicedev.me/TV/logos/iquiquetv.png"],
        ["http://ext.juicedev.me/TV/index.html#Antofagasta_TV|1.52.12|Antofagasta TV","http://ext.juicedev.me/TV/logos/antofagastatv.png"],
        ["http://ext.juicedev.me/TV/index.html#Digital_Channel_TV|1.52.12|Digital Channel TV","http://ext.juicedev.me/TV/logos/dch.png"],
        ["http://ext.juicedev.me/TV/index.html#Vive_Chile_Antofagasta|1.52.12|Vive Chile Antofagasta","http://ext.juicedev.me/TV/logos/vivechileantof.png"],
        ["http://ext.juicedev.me/TV/index.html#Mas_Television|1.52.12|Mas Televisión","http://ext.juicedev.me/TV/logos/mastelevision.png"],
        ["http://ext.juicedev.me/TV/index.html#Vive_Chile_Elqui|1.52.12|Vive Chile Elqui","http://ext.juicedev.me/TV/logos/vive_elqui.png"],
        ["http://ext.juicedev.me/TV/index.html#VTV_Valle_Television|1.52.12|VTV Valle Televisión","http://ext.juicedev.me/TV/logos/vtv.png"],
        ["http://ext.juicedev.me/TV/index.html#Agro_TV|1.52.12|Agro TV","http://ext.juicedev.me/TV/logos/agrotv.png"],
        ["http://ext.juicedev.me/TV/index.html#Quinta_Vision|1.52.12|Quinta Visión","http://ext.juicedev.me/TV/logos/quintavision.png"],
        ["http://ext.juicedev.me/TV/index.html#TV_Senado|1.52.12|TV Senado","http://ext.juicedev.me/TV/logos/tvsenado-3.png"],
        ["http://ext.juicedev.me/TV/index.html#Camara_de_Diputados_TV|1.52.12|Camara de Diputados TV","http://ext.juicedev.me/TV/logos/cdtv.png"],
        ["http://ext.juicedev.me/TV/index.html#Canal_2_San_Antonio|1.52.12|Canal 2 San Antonio","http://ext.juicedev.me/TV/logos/canal_2.png"],
        ["http://ext.juicedev.me/TV/index.html#Senal_UC|1.52.12|Señal UC","http://ext.juicedev.me/TV/logos/senaluc.png"],
        ["http://ext.juicedev.me/TV/index.html#TVO_San_Vicente|1.52.12|TVO San Vicente","http://ext.juicedev.me/TV/logos/tvo.png"],
        ["http://ext.juicedev.me/TV/index.html#Inet_TV_Digital|1.52.12|Inet TV Digital","http://ext.juicedev.me/TV/logos/inet.png"],
        ["http://ext.juicedev.me/TV/index.html#Canal_CDN_Curico|1.52.12|Canal CDN Curicó","http://ext.juicedev.me/TV/logos/cdn-curico.png"],
        ["http://ext.juicedev.me/TV/index.html#CampusTV_Universidad_de_Talca|1.52.12|CampusTV - Universidad de Talca","http://ext.juicedev.me/TV/logos/campustv.png"],
        ["http://ext.juicedev.me/TV/index.html#Canal_21_Chillan|1.52.12|Canal 21 Chillán","http://ext.juicedev.me/TV/logos/canal21.png"],
        ["http://ext.juicedev.me/TV/index.html#TVU|1.52.12|TVU","http://ext.juicedev.me/TV/logos/tvu.png"],
        ["http://ext.juicedev.me/TV/index.html#Canal_9_Bio_Bio_Television|1.52.12|Canal 9 Bío Bío Televisión","http://ext.juicedev.me/TV/logos/canal9.png"],
        ["http://ext.juicedev.me/TV/index.html#TEC_TV_Temuco|1.52.12|TEC TV Temuco","http://ext.juicedev.me/TV/logos/tec.png"],
        ["http://ext.juicedev.me/TV/index.html#UATV_Temuco|1.52.12|UATV Temuco","http://ext.juicedev.me/TV/logos/uatv.png"],
        ["http://ext.juicedev.me/TV/index.html#UFRO_Vision|1.52.12|UFRO Visión","http://ext.juicedev.me/TV/logos/ufro.png"],
        ["http://ext.juicedev.me/TV/index.html#ATV_Valdivia|1.52.12|ATV Valdivia","http://ext.juicedev.me/TV/logos/atv.png"],
        ["http://ext.juicedev.me/TV/index.html#Canal_5_LRC|1.52.12|Canal 5 LRC","http://ext.juicedev.me/TV/logos/Canal5.png"],
        ["http://ext.juicedev.me/TV/index.html#Telesur_AysenTV|1.52.12|Telesur AysénTV","http://ext.juicedev.me/TV/logos/telesur_aysen.png"],
        ["http://ext.juicedev.me/TV/index.html#El_Pinguino_TV|1.52.12|El Pingüino TV","http://ext.juicedev.me/TV/logos/ep.png"],
        ["http://ext.juicedev.me/TV/index.html#ITV_Patagonia|1.52.12|ITV Patagonia","http://ext.juicedev.me/TV/logos/itv.png"],
        ["http://ext.juicedev.me/TV/index.html#UMAG_TV|1.52.12|UMAG TV","http://ext.juicedev.me/TV/logos/umag-tv.png"],
        ["http://ext.juicedev.me/TV/index.html#BBC_One|1.52.12|BBC One","http://ext.juicedev.me/TV/logos/bbcone.png"],
        ["http://ext.juicedev.me/TV/index.html#BBC_Two|1.52.12|BBC Two","http://ext.juicedev.me/TV/logos/bbctwo.png"],
        ["http://ext.juicedev.me/TV/index.html#BBC_World_News|1.52.12|BBC World News","http://ext.juicedev.me/TV/logos/bbcworldnews.png"],
        ["http://ext.juicedev.me/TV/index.html#Sky_News|1.52.12|Sky News","http://ext.juicedev.me/TV/logos/skynews.png"],
        ["http://ext.juicedev.me/TV/index.html#Aljazeera|1.52.12|Aljazeera","http://ext.juicedev.me/TV/logos/aljazeera.png"],
        ["http://ext.juicedev.me/TV/index.html#ABC|1.52.12|ABC","http://ext.juicedev.me/TV/logos/abc.png"],
        ["http://ext.juicedev.me/TV/index.html#CBS|1.52.12|CBS","http://ext.juicedev.me/TV/logos/cbs.png"],
        ["http://ext.juicedev.me/TV/index.html#CNN|1.52.12|CNN","http://ext.juicedev.me/TV/logos/cnn-2.png"],
        ["http://ext.juicedev.me/TV/index.html#Nasa_TV|1.52.12|Nasa TV","http://ext.juicedev.me/TV/logos/nasa.png"],
        ["http://ext.juicedev.me/TV/index.html#NBC|1.52.12|NBC","http://ext.juicedev.me/TV/logos/nbc.png"]
        ["http://ext.juicedev.me/TV/index.html#MSNBC|1.52.12|MSNBC","http://ext.juicedev.me/TV/logos/msnbc.png"],
        ["http://ext.juicedev.me/TV/index.html#America|1.52.12|América","http://ext.juicedev.me/TV/logos/america.png"],
        ["http://ext.juicedev.me/TV/index.html#C5N|1.52.12|C5N","http://ext.juicedev.me/TV/logos/c5n.png"],
        ["http://ext.juicedev.me/TV/index.html#Canal_26|1.52.12|Canal 26","http://ext.juicedev.me/TV/logos/canal26.png"],
        ["http://ext.juicedev.me/TV/index.html#El_Trece|1.52.12|El Trece","http://ext.juicedev.me/TV/logos/el-trece.png"],
        ["http://ext.juicedev.me/TV/index.html#Telefe|1.52.12|Telefe","http://ext.juicedev.me/TV/logos/telefe.png"],
        ["http://ext.juicedev.me/TV/index.html#TN|1.52.12|TN","http://ext.juicedev.me/TV/logos/tn_v2.png"],
        ["http://ext.juicedev.me/TV/index.html#TV_Publica_Argentina|1.52.12|TV Pública Argentina","http://ext.juicedev.me/TV/logos/tvpublica.png"],
        ["http://ext.juicedev.me/TV/index.html#Caracol_TV|1.52.12|Caracol TV","http://ext.juicedev.me/TV/logos/caracol.png"],
        ["http://ext.juicedev.me/TV/index.html#NTN24|1.52.12|NTN24","http://ext.juicedev.me/TV/logos/ntn.png"],
        ["http://ext.juicedev.me/TV/index.html#Globovision|1.52.12|Globovisión","http://ext.juicedev.me/TV/logos/globovision.png"],
        ["http://ext.juicedev.me/TV/index.html#TeleSur|1.52.12|TeleSur","http://ext.juicedev.me/TV/logos/telesur.png"],
        ["http://ext.juicedev.me/TV/index.html#France_24|1.52.12|France 24","http://ext.juicedev.me/TV/logos/france24.png"],
        ["http://ext.juicedev.me/TV/index.html#RT_Espanol|1.52.12|RT Español","http://ext.juicedev.me/TV/logos/rt.png"],
        ["http://ext.juicedev.me/TV/index.html#Antena_3|1.52.12|Antena 3","http://ext.juicedev.me/TV/logos/antena3.png"],
        ["http://ext.juicedev.me/TV/index.html#Canal_Vasco|1.52.12|Canal Vasco","http://ext.juicedev.me/TV/logos/canal-vasco.png"],
        ["http://ext.juicedev.me/TV/index.html#Cuatro|1.52.12|Cuatro","http://ext.juicedev.me/TV/logos/cuatro.png"],
        ["http://ext.juicedev.me/TV/index.html#La_Sexta|1.52.12|La Sexta","http://ext.juicedev.me/TV/logos/lasexta.png"],
        ["http://ext.juicedev.me/TV/index.html#Arirang|1.52.12|Arirang","http://ext.juicedev.me/TV/logos/arirang.png"],
        ["http://ext.juicedev.me/TV/index.html#NHK_World|1.52.12|NHK World","http://ext.juicedev.me/TV/logos/nhkworld.png"],
        ["http://tvpor-internet.com/Cine-Latino-en-vivo.html","http://i627.photobucket.com/albums/tt354/jugo_xD/canales/tv.png"],
        ["http://tvpor-internet.com/Canal-Golden-en-vivo.html","http://i627.photobucket.com/albums/tt354/jugo_xD/canales/tv.png"],
        ["http://tvpor-internet.com/fox-channel.html","http://i627.photobucket.com/albums/tt354/jugo_xD/canales/tv.png"],
        ["http://tvpor-internet.com/warner-en-vivo.html","http://i627.photobucket.com/albums/tt354/jugo_xD/canales/tv.png"],
        ["http://tvpor-internet.com/canal-sony-en-vivo.html","http://i627.photobucket.com/albums/tt354/jugo_xD/canales/tv.png"],
        ["http://tvpor-internet.com/Cinemax-en-vivo.html","http://i627.photobucket.com/albums/tt354/jugo_xD/canales/tv.png"],
        ["http://tvpor-internet.com/Filme-Zone-en-vivo.html","http://i627.photobucket.com/albums/tt354/jugo_xD/canales/tv.png"],
        ["http://tvpor-internet.com/hbo-en-vivo.html","http://i627.photobucket.com/albums/tt354/jugo_xD/canales/tv.png"],
        ["http://tvpor-internet.com/cinecanal-en-vivo.html","http://i627.photobucket.com/albums/tt354/jugo_xD/canales/tv.png"],
        ["http://tvpor-internet.com/tnt-latino-en-vivo.html","http://i627.photobucket.com/albums/tt354/jugo_xD/canales/tv.png"],
        ["http://tvpor-internet.com/Peliculas-de-Cantinflas-en-vivo.html","http://i627.photobucket.com/albums/tt354/jugo_xD/canales/tv.png"],
        ["http://tvpor-internet.com/Movie-City-en-vivo.html","http://i627.photobucket.com/albums/tt354/jugo_xD/canales/tv.png"],
        ["http://tvpor-internet.com/peliuclas-de-terror-en-vivo.html","http://i627.photobucket.com/albums/tt354/jugo_xD/canales/tv.png"],
        ["http://tvpor-internet.com/peliculas-de-horror-en-vivo.html","http://i627.photobucket.com/albums/tt354/jugo_xD/canales/tv.png"],
        ["http://tvpor-internet.com/space-en-vivo.html","http://i627.photobucket.com/albums/tt354/jugo_xD/canales/tv.png"],
        ["http://tvpor-internet.com/mundo-fox-en-vivo.html","http://i627.photobucket.com/albums/tt354/jugo_xD/canales/tv.png"],
        ["http://tvpor-internet.com/La-Familia-Monsters-en-vivo.html","http://i627.photobucket.com/albums/tt354/jugo_xD/canales/tv.png"],
        ["http://tvpor-internet.com/los-anos-maravillosos-en-vivo.html","http://i627.photobucket.com/albums/tt354/jugo_xD/canales/tv.png"],
        ["http://tvpor-internet.com/candy-en-vivo.html","http://i627.photobucket.com/albums/tt354/jugo_xD/canales/tv.png"],
        ["http://tvpor-internet.com/disney-junior-en-vivo.html","http://i627.photobucket.com/albums/tt354/jugo_xD/canales/tv.png"],
        ["http://tvpor-internet.com/discovery-science-en-vivo.html","http://i627.photobucket.com/albums/tt354/jugo_xD/canales/tv.png"],
        ["http://tvpor-internet.com/Tooncast-en-vivo.html","http://i627.photobucket.com/albums/tt354/jugo_xD/canales/tv.png"],
        ["http://tvpor-internet.com/south-park-en-vivo.html","http://i627.photobucket.com/albums/tt354/jugo_xD/canales/tv.png"],
        ["http://tvpor-internet.com/cnn-en-espanol-en-vivo.html","http://i627.photobucket.com/albums/tt354/jugo_xD/canales/tv.png"],
        ["http://tvpor-internet.com/walt-disney-en-vivo.html","http://i627.photobucket.com/albums/tt354/jugo_xD/canales/tv.png"],
        ["http://tvpor-internet.com/cartoon-network-en-vivo.html","http://i627.photobucket.com/albums/tt354/jugo_xD/canales/tv.png"],
        ["http://tvpor-internet.com/disney-channel-en-vivo.html","http://i627.photobucket.com/albums/tt354/jugo_xD/canales/tv.png"],
        ["http://tvpor-internet.com/nickelodeon-en-vivo.html","http://i627.photobucket.com/albums/tt354/jugo_xD/canales/tv.png"],
        ["http://tvpor-internet.com/disney-xd-en-vivo.html","http://i627.photobucket.com/albums/tt354/jugo_xD/canales/tv.png"],
        ["http://limaenvivo.com/2012/07/futurama.html","http://i627.photobucket.com/albums/tt354/jugo_xD/canales/tv.png"],
        ["http://tvpor-internet.com/El-Chavo-del-8-en-vivo.html","http://i627.photobucket.com/albums/tt354/jugo_xD/canales/tv.png"],
        ["http://tvpor-internet.com/discovery-kids-en-vivo.html","http://i627.photobucket.com/albums/tt354/jugo_xD/canales/tv.png"],
        ["http://tvpor-internet.com/mundo-fox-en-vivo.html","http://i627.photobucket.com/albums/tt354/jugo_xD/canales/tv.png"],
        ["http://tvpor-internet.com/TvChile-en-vivo.html","http://i627.photobucket.com/albums/tt354/jugo_xD/canales/tv.png"],
        ["http://vaughnlive.tv/embed/video/mega_animeshd?viewers=true&watermark=left&autoplay=true","http://i627.photobucket.com/albums/tt354/jugo_xD/canales/tv.png"],
        ["http://tvpor-internet.com/naruto-shipuden-en-vivo.html","http://i627.photobucket.com/albums/tt354/jugo_xD/canales/tv.png"],
        ["http://tvpor-internet.com/goku1.html","http://i627.photobucket.com/albums/tt354/jugo_xD/canales/tv.png"],
        ["http://tvpor-internet.com/los-caballeros-del-zodiaco-en-vivo.html","http://i627.photobucket.com/albums/tt354/jugo_xD/canales/tv.png"],
        ["http://tvpor-internet.com/discovery-science-en-vivo.html","http://i627.photobucket.com/albums/tt354/jugo_xD/canales/tv.png"],
        ["http://tvpor-internet.com/Pokemon-en-vivo.html","http://i627.photobucket.com/albums/tt354/jugo_xD/canales/tv.png"],
        ["http://tvpor-internet.com/Natgeo-en-vivo.html","http://i627.photobucket.com/albums/tt354/jugo_xD/canales/tv.png"],
        ["http://tvpor-internet.com/tlnovelas-en-vivo.html","http://i627.photobucket.com/albums/tt354/jugo_xD/canales/tv.png"],
        ["http://tvpor-internet.com/ATV-en-vivo.html","http://i627.photobucket.com/albums/tt354/jugo_xD/canales/tv.png"],
        ["http://tvpor-internet.com/America-Television-en-vivo.html","http://i627.photobucket.com/albums/tt354/jugo_xD/canales/tv.png"],
        ["http://tvpor-internet.com/Frecuencia-Latina-en-vivo.html","http://i627.photobucket.com/albums/tt354/jugo_xD/canales/tv.png"],
        ["http://tvpor-internet.com/cmd-en-vivo.html","http://i627.photobucket.com/albums/tt354/jugo_xD/canales/tv.png"],
        ["http://tvpor-internet.com/Espn-en-vivo.html","http://i627.photobucket.com/albums/tt354/jugo_xD/canales/tv.png"],
        ["http://tvpor-internet.com/wwe-latino-en-vivo.html","http://i627.photobucket.com/albums/tt354/jugo_xD/canales/tv.png"],
        ["http://tvpor-internet.com/history-latino-en-vivo.html","http://i627.photobucket.com/albums/tt354/jugo_xD/canales/tv.png"],
        ["http://tvpor-internet.com/discovery-latino-en-vivo.html","http://i627.photobucket.com/albums/tt354/jugo_xD/canales/tv.png"],
        ["http://tvpor-internet.com/mtv-latino-en-vivo.html","http://i627.photobucket.com/albums/tt354/jugo_xD/canales/tv.png"],
        ["http://tvpor-internet.com/Canal-Caracol-en-vivo.html","http://i627.photobucket.com/albums/tt354/jugo_xD/canales/tv.png"],
        ["http://www.limaenvivo.com/2012/07/rcn-colombia-en-vivo.html","http://i627.photobucket.com/albums/tt354/jugo_xD/canales/tv.png"],
        ["http://tvpor-internet.com/venevision-en-vivo.html","http://i627.photobucket.com/albums/tt354/jugo_xD/canales/tv.png"],
        ["http://tvpor-internet.com/Telemundo-en-vivo.html","http://i627.photobucket.com/albums/tt354/jugo_xD/canales/tv.png"],
        ["http://tvpor-internet.com/Univision-en-vivo.html","http://i627.photobucket.com/albums/tt354/jugo_xD/canales/tv.png"],
        ["http://tvpor-internet.com/telefe-en-vivo.html","http://i627.photobucket.com/albums/tt354/jugo_xD/canales/tv.png"],
        ["http://tvpor-internet.com/el-trece-en-vivo.html","http://i627.photobucket.com/albums/tt354/jugo_xD/canales/tv.png"],
        ["http://tvpor-internet.com/ALF-en-vivo.html","http://i627.photobucket.com/albums/tt354/jugo_xD/canales/tv.png"],
        ["http://tvpor-internet.com/aye-en-vivo.html","http://i627.photobucket.com/albums/tt354/jugo_xD/canales/tv.png"],
        ["http://tvpor-internet.com/Telehit-en-vivo.html","http://i627.photobucket.com/albums/tt354/jugo_xD/canales/tv.png"],*/
]


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