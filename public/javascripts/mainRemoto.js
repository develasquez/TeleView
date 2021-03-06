var isFullScreen = false;
var socket = {};
var canal = 0;
var MOVIE = "Movie";
var pause = 'pauseVideo';
var play = 'playVideo';


var embedUrl = "https://open.spotify.com/embed?uri=spotify:user:spotify:playlist:";
var playListPattern = "open.spotify.com";


var createSpotifyPlaylist = function(playListUrl) {
    socket.emit('spotifyList', embedUrl + playListUrl);
}


var moviesEndpoint = "http://hdfull.tv/ajax/search.php?q=";
getNombre = function(url) {
    var nombre = url.split("/")[url.split("/").length - 1].replace(".html", "").replace(/-/g, " ").toUpperCase();
    if (nombre.split("|").length > 0) {
        nombre = nombre.split("|")[nombre.split("|").length - 1];
    }
    return nombre
}
$(function() {
    socket = io();
    socket.emit('hideQr');
    socket.on("end", function(id) {
        playSong(JSON.stringify({
            id: {
                videoId: $("#" + id).next().attr("id")
            }
        }));
    });
    socket.on('spotifyList', function(spotifyHTML) {
        $(spotifyHTML).find(".track-row").each(function(i, e) {
            var dataArtists = $(e).attr("data-artists");
            var dataName = $(e).attr("data-name");
            var request = getYoutubeRequest(dataName + " " + dataArtists, '');
            request.execute(function(response) {
                setListItems([response.result.items[0]], function() {
                    monomer.hideLoading();
                    localStorage.setItem("resultsList", currentResults);
                });

            });
        });
    });
    socket.on('successImage', function(data) {
        var form = document.querySelectorAll('.box')[0];
        form.classList.remove('is-uploading');
    });

});

openMovie = function() {
    monomer.showDialog("#urlPelicula");
};

playMovie = function() {

    var urlPelicula = $("#txtUrlPelicula").val();
    socket.emit('video', urlPelicula);
    monomer.hideDialog("#urlPelicula");
}
setUrl = function(canal) {
    socket.emit('cambiarCanal', canal);
}
fullScreen = function() {
    socket.emit('fullScreen');
    if (!isFullScreen) {
        $("#mensajeFullScreen").text("Mostrar Cabecera");
        isFullScreen = true;
    } else {
        $("#mensajeFullScreen").text("Ocultar Cabecera");
        isFullScreen = false;
    }
}
var videoState = "play";
stopVideo = function() {
    var acctio = videoState === "play" ? pause : play;
    $(".controlTitle").text(videoState);
    $(".controlDetalle").text(videoState + " video");
    socket.emit('toggleYoutube', acctio);
    videoState = videoState === "play" ? "pause" : "play";
    iconTo = videoState === "play" ? "icon-pause" : "icon-play";
    monomer.icon.to(".control", "icon-" + videoState, iconTo);
}
var canales = [];


listItem = function(data) {
    return [
        '<a href="javascript:void(0)"  onClick="setUrl(\'' + data.nombre + '\')">',
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



var apiKey = 'AIzaSyAucyHu26je9-g2tW-7F-sQdfKX55xtl8c';
var currentPlayer = {};
var currentResults = [];
var currentOptionPressed = {};
var selectedlista = {};
var listas = [];

function init() {

    try {
        gapi.client.setApiKey(apiKey);
        gapi.client.load('youtube', 'v3', function(a, b, c) {
            currentPlayer = localStorage.getItem("currentPlayer");
            if (currentPlayer) {
                setListItems(localStorage.getItem("resultsList"), function() {
                    if ($('#info li').length < 20) {
                        buscarVideos(nextPageToken);
                    } else {
                        monomer.hideLoading();
                        localStorage.setItem("resultsList", currentResults);
                    }
                });
            }
        });

        $.get("https://ext.juicedev.me/MonkiTV/Canales.json", function(data) {
            
            canales = data;
            for (c in canales) {
                try {
                    var obj = {
                        canal: "http://ext.juicedev.me/MonkiTV/#Canal-" + canales[c].nombre.replace(/ /g, "_") + "-" + canales[c].nombre.replace(/ /g, "_") + "-2.0.21",
                        nombre: canales[c].nombre,
                        img: canales[c].css.replace("background: url(", "").replace(")", "").replace("http:","https:")
                    }
                    $("#canales").append(listItem(obj));
                } catch (ex) {}
            }
        });


    } catch (ex) {
        console.log(ex);
    }
}



$(function() {
    $(".share").on("click", function(){
        $("#file").click();
    })
    $("#txtBuscar").on("keypress", function(evt) {
        if (evt.charCode == 13) {
            $("#btnBuscar").click();
        }
    });
    $("#txtBuscarMovies").on("keypress", function(evt) {
        if (evt.charCode == 13) {
            $("#btnBuscarMovies").click();
        }
    });
    listas = localStorage.getItem("listas") || [];
    actualizarListas();
    $(".content").on("scroll", function(a, b) {
        if ((a.currentTarget.scrollHeight - $(".content").height()) == a.currentTarget.scrollTop) {
            buscarVideos(nextPageToken);
        }
    });

    (function(e, t, n) {
        var r = e.querySelectorAll("html")[0];
        r.className = r.className.replace(/(^|\s)no-js(\s|$)/, "$1js$2")
    })(document, window, 0);
    'use strict';

    ;
    (function(document, window, index) {
        // feature detection for drag&drop upload
        var isAdvancedUpload = function() {

            var div = document.createElement('div');
            return true; //((('draggable' in div) || ('ondragstart' in div && 'ondrop' in div)) && 'FormData' in window && 'FileReader' in window) || ;
        }();


        // applying the effect for every form
        var forms = document.querySelectorAll('.box');
        Array.prototype.forEach.call(forms, function(form) {
            var input = form.querySelector('input[type="file"]'),
                label = form.querySelector('label'),
                errorMsg = form.querySelector('.box__error span'),
                restart = form.querySelectorAll('.box__restart'),
                droppedFiles = false,
                showFiles = function(files) {
                    label.textContent = files.length > 1 ? (input.getAttribute('data-multiple-caption') || '').replace('{count}', files.length) : files[0].name;
                },
                triggerFormSubmit = function() {
                    var event = document.createEvent('HTMLEvents');
                    event.initEvent('submit', true, false);
                    form.dispatchEvent(event);
                };

            // letting the server side to know we are going to make an Ajax request
            var ajaxFlag = document.createElement('input');
            ajaxFlag.setAttribute('type', 'hidden');
            ajaxFlag.setAttribute('name', 'ajax');
            ajaxFlag.setAttribute('value', 1);
            form.appendChild(ajaxFlag);

            // automatically submit the form on file select
            input.addEventListener('change', function(e) {
                showFiles(e.target.files);


                triggerFormSubmit();


            });

            // drag&drop files if the feature is available
            if (isAdvancedUpload) {

                form.classList.add('has-advanced-upload'); // letting the CSS part to know drag&drop is supported by the browser

                ['drag', 'dragstart', 'dragend', 'dragover', 'dragenter', 'dragleave', 'drop'].forEach(function(event) {
                    form.addEventListener(event, function(e) {
                        // preventing the unwanted behaviours
                        e.preventDefault();
                        e.stopPropagation();
                    });
                });
                ['dragover', 'dragenter'].forEach(function(event) {
                    $("body").on(event,function(){
                       form.classList.add('is-dragover'); 
                    });
                    form.addEventListener(event, function() {
                        form.classList.add('is-dragover');
                    });
                });
                ['dragleave', 'dragend', 'drop'].forEach(function(event) {
                    form.addEventListener(event, function() {
                        form.classList.remove('is-dragover');
                    });
                });
                form.addEventListener('drop', function(e) {
                    droppedFiles = e.dataTransfer.files; // the files that were dropped
                    showFiles(droppedFiles);


                    triggerFormSubmit();

                });
            }


            // if the form was submitted
            form.addEventListener('submit', function(e) {

                // preventing the duplicate submissions if the current one is in progress
                if (form.classList.contains('is-uploading')) return false;

                form.classList.add('is-uploading');
                form.classList.remove('is-error');

                if (isAdvancedUpload) // ajax file upload for modern browsers
                {
                    e.preventDefault();

                    // gathering the form data
                    var ajaxData = new FormData(form);
                    droppedFiles = droppedFiles || file.files;
                    if (droppedFiles) {
                        Array.prototype.forEach.call(droppedFiles, function(file) {
                            socket.emit('image', file);
                        });
                        droppedFiles = false;
                        $("#file").val("");
                    }

                    //send by socket
                    
                } else // fallback Ajax solution upload for older browsers
                {
                    var iframeName = 'uploadiframe' + new Date().getTime(),
                        iframe = document.createElement('iframe');

                    $iframe = $('<iframe name="' + iframeName + '" style="display: none;"></iframe>');

                    iframe.setAttribute('name', iframeName);
                    iframe.style.display = 'none';

                    document.body.appendChild(iframe);
                    form.setAttribute('target', iframeName);

                    iframe.addEventListener('load', function() {
                        var data = JSON.parse(iframe.contentDocument.body.innerHTML);
                        form.classList.remove('is-uploading')
                        form.classList.add(data.success == true ? 'is-success' : 'is-error')
                        form.removeAttribute('target');
                        if (!data.success) errorMsg.textContent = data.error;
                        iframe.parentNode.removeChild(iframe);
                    });
                }
            });


            // restart the form if has a state of error/success
            Array.prototype.forEach.call(restart, function(entry) {
                entry.addEventListener('click', function(e) {
                    e.preventDefault();
                    form.classList.remove('is-error', 'is-success');
                    input.click();
                });
            });

            // Firefox focus bug fix for file input
            input.addEventListener('focus', function() {
                input.classList.add('has-focus');
            });
            input.addEventListener('blur', function() {
                input.classList.remove('has-focus');
            });

        });
    }(document, window, 0));
})
var nextPageToken = '';
var listItemY = function(data) {
    return [
        '<li>',
        '<div>',
        '<div class="test_box fab z-d1">',
        '<img src="' + data.snippet.thumbnails.high.url + '" alt="' + data.snippet.title + '"> ',
        '</div>',
        '</div>',
        '<div>',
        '<div>',
        '<h3>' + data.snippet.title + '</h3>',
        '</div>',
        '<span class="expand-config button-right icon-ellipsis-v icon-1x icon-black trackOptions" target=".configMenu">',
        '</span>',
        '</div>',
        '</li>',
    ].join("\n");
};
var listItemM = function(data) {
    return [
        '<li>',
        '<div>',
        '<div class="test_box fab z-d1">',
        '<img src="' + data.image + '" alt="' + data.title + '"> ',
        '</div>',
        '</div>',
        '<div>',
        '<div>',
        '<h3>' + data.title + '</h3>',
        '</div>',
        //'<span class="expand-config button-right icon-ellipsis-v icon-1x icon-black trackOptions" target=".configMenu">',
        '</span>',
        '</div>',
        '</li>',
    ].join("\n");
};
var resp = {};

function getVideoDetails(item, _fun) {
    var videoId = item.id.videoId;
    gapi.client.youtube.videos.list({
            id: videoId,
            part: 'contentDetails'
        })
        .execute(function(response) {
            _fun(item, response, 0)

        })
}


function playSong(item) {
    localStorage.setItem("currentPlayer", item);
    var video = JSON.parse(item).id.videoId;
    //var nuevaUrl = "https://www.youtube.com/embed/" + video + "?&autoplay=true&hd=1&quality=high&version=3&vq=highres&enablejsapi=1";
    setUrl(video);
}

var totalItemsToList = 0;
var currentItemProcessing = 0;

function setListItems(items, _fun) {
    currentItemProcessing = 0;
    totalItemsToList = items.length;
    for (var item in items) {
        item = items[item];
        if (typeof(item) != "function") {
            currentResults.push(item)
            if (item.id.videoId) {
                getVideoDetails(item, function(item, response, time) {

                    currentItemProcessing++;
                    if (item) {
                        var newVideo = $(listItemY(item));
                        $(newVideo).attr("id", item.id.videoId).data("data", JSON.stringify(item))
                        $(newVideo).delegate("img, h3", "click", function(a, b, c) {
                            playSong($(a.originalEvent.currentTarget).data("data"));
                        });
                        $(newVideo).delegate(".trackOptions", "click", function(a, b, c) {
                            currentOptionPressed = $(a.originalEvent.currentTarget).data("data");
                        });
                        $("#info").append(newVideo);
                    }
                    if (currentItemProcessing == totalItemsToList) {
                        monomer.__init();
                        monomer.__setAspect();
                        _fun();

                    }
                })
            } else if (item.id.channelId || item.id.playlistId) {
                currentItemProcessing++;
            }
        };
    }
}

function getYoutubeRequest(q, PageToken) {
    return gapi.client.youtube.search.list({
        q: q,
        part: 'snippet',
        type: 'video',
        maxResults: 20,
        pageToken: PageToken
    });
}



function buscarVideos(PageToken) {
    if ($("#txtBuscar").val() == "") {
        return false;
    }

    if (!PageToken) {
        PageToken = '';
        $('#info').html("");
        currentResults = [];
        totalItemsToList = 0;
        monomer.showLoading();
    }
    var q = $('#txtBuscar').val();

    if (q.indexOf(playListPattern) > -1) {
        createSpotifyPlaylist(q.split("/")[q.split("/").length - 1]);
        return;
    }

    var request = getYoutubeRequest(q, PageToken);

    request.execute(function(response) {
        try {
            nextPageToken = response.nextPageToken;
            setListItems(response.result.items, function() {
                if ($('#info li').length < 20) {
                    buscarVideos(nextPageToken);
                } else {
                    monomer.hideLoading();
                    localStorage.setItem("resultsList", currentResults);
                }
            });

        } catch (ex) {

        }

    });
}

function actualizarListasPopup() {
    try {
        $("#ListasReprododuccionLst").html("");
        for (var i = 0; i < listas.length; i++) {
            var newLi = $("<li>").text(listas[i].nombreLista).
            on("click", function(evt) {
                var nombre = $(this).text();
                agregarALista(nombre, currentItemProcessing);
                monomer.hideDialog();
            })
            $("#ListasReprododuccionLst").append(newLi);
        }
        monomer.refresh();
    } catch (ex) {}
}

function actualizarListas() {
    actualizarListasPage();
    actualizarListasPopup();
}

function actualizarListasPage() {
    //Actualiza en pagina
    $("#dvListas").html("");
    for (var i = 0; i < listas.length; i++) {
        try {
            var thelist = localStorage.getItem(listas[i].nombreLista);
            var imagenes = [];
            for (var j = 0; j < thelist.length; j++) {
                if (j < 4) {
                    imagenes.push(thelist[j].snippet.thumbnails.high.url);
                }
            }
            var newListItem = $(htmlLista(listas[i].nombreLista, imagenes))
                .data("data", JSON.stringify(listas[i]))
                .on("click", function() {
                    selectedlista = $(this).data("data");
                    $('#info').html("");
                    currentResults = localStorage.getItem(selectedlista.nombreLista);
                    localStorage.setItem("resultsList", currentResults);
                    setListItems(currentResults, function() {
                        monomer.pageShow('#busqueda');
                    })
                })
            $("#dvListas").append(newListItem);
        } catch (ex) {

        }
    }
}

function buscarPeliculas() {
    var q = $("#txtBuscarMovies").val();
    $.ajax(moviesEndpoint + q)
        .done(function(data) {
            if (data.length == 0 && data.meta !== MOVIE) {
                return;
            }
            data = JSON.parse(data);
            $.each(data, function(index, item) {
                var newVideo = $(listItemM(item));
                $(newVideo).data("data", JSON.stringify(item))
                $(newVideo).on("click", function(a) {

                    var permlalink = JSON.parse($(a.originalEvent.currentTarget).data("data")).permalink;
                    $.ajax(permlalink)
                        .done(function(theHtml) {
                            eval($(theHtml).find("script:contains('embeds')").text());
                            var latinas = $(theHtml).find(".embed-selector[style*='lat.png']")
                            $.each(latinas, function(i, e) {
                                var peli = {};
                                peli.videoId = $(el).prev().find(".embed-container").data("videoid");
                                peli.titlec = $(el).text().replace(/\s+/g, '').split(":")[3].replace("Enlaceexterno", "")
                            })

                        })

                });
                $("#Movies").append(newVideo);
            })
        })
}