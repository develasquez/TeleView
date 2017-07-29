var isFullScreen = false;
var socket ={};
var canal = 0;
var MOVIE = "Movie";
var moviesEndpoint = "http://hdfull.tv/ajax/search.php?q=";
    getNombre = function(url){
      var nombre = url.split("/")[url.split("/").length -1].replace(".html","").replace(/-/g," ").toUpperCase();
      if(nombre.split("|").length > 0){
        nombre = nombre.split("|")[nombre.split("|").length -1];
      }
      return nombre
    }
    $(function(){
        socket =  io();
        socket.emit('hideQr');
        for (c in canales){
            try{
            var obj ={
                canal: c,
                nombre :getNombre(canales[c][0]),
                img : canales[c][1]
            }    
            $("#canales").append(listItem(obj));
        }catch(ex){}
        }

      });
    
    
    setUrl = function(canal){
        socket.emit('cambiarCanal', canal);
    }
    fullScreen= function(){
            socket.emit('fullScreen');
            if(!isFullScreen){
              $("#mensajeFullScreen").text("Mostrar Cabecera");
              isFullScreen = true;
            }else{
              $("#mensajeFullScreen").text("Ocultar Cabecera");
              isFullScreen = false;
            }
        }
canales = [
    ["http://mdstrm.com/live-stream/525431f81bc42c4539000057?jsapi=true&autoplay=true&v=1.52.12&ref=mdstrm.com#TVN|1.52.12|TVN","https://pbs.twimg.com/profile_images/2609853665/47fv7lbglyncfopqx1ox_400x400.jpeg"],
    ["http://ext.juicedev.me/TV/index.html#Canal_13|1.52.12|Canal 13","http://ext.juicedev.me/TV/logos/13.png"],
    ["http://ext.juicedev.me/TV/index.html#Canal_13C|1.52.12|13C","http://ext.juicedev.me/TV/logos/13c.png"],
    ["http://ext.juicedev.me/TV/index.html#CHV|1.52.12|CHV","http://ext.juicedev.me/TV/logos/chv-2015.png"],
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
    ["http://tvpor-internet.com/Telehit-en-vivo.html","http://i627.photobucket.com/albums/tt354/jugo_xD/canales/tv.png"],
  ]


listItem = function(data){
    return [
        '<a href="javascript:void(0)"  onClick="setUrl('+ data.canal+')">',
        '          <li>',
        '            <div>',
        '              <div class="test_box fab z-d1">',
        '                <img src="'+ data.img+'">',
        '              </div>',
        '            </div>',
        '            <div>',
        '              <div>',
        '                <h3>'+data.nombre+'</h3>',
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

  try{
    gapi.client.setApiKey(apiKey);
    gapi.client.load('youtube', 'v3', function(a,b,c) {
      currentPlayer = localStorage.getItem("currentPlayer");
      if(currentPlayer){
          setListItems(localStorage.getItem("resultsList"),function () {
          if($('#info li').length < 20){
            buscarVideos(nextPageToken);
          }
          else{ 
              monomer.hideLoading();
              localStorage.setItem("resultsList",currentResults);
         }
       });
      }
    })
  }catch(ex){
    console.log(ex);
  }
}

 $(function(){
      $("#txtBuscar").on("keypress",function(evt){
        if(evt.charCode == 13){
          $("#btnBuscar").click();
        }
      });
      $("#txtBuscarMovies").on("keypress",function(evt){
        if(evt.charCode == 13){
          $("#btnBuscarMovies").click();
        }
      });
      listas = localStorage.getItem("listas") || [];
      actualizarListas();
      $(".content").on("scroll",function (a,b) {
        if((a.currentTarget.scrollHeight - $(".content").height())== a.currentTarget.scrollTop ){
          buscarVideos(nextPageToken);
        }
      });
})
    var nextPageToken = '';
      var listItemY = function(data){
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
        var listItemM = function(data){
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

      function getVideoDetails (item, _fun) {
        var videoId = item.id.videoId;
        gapi.client.youtube.videos.list({
          id:videoId,
          part: 'contentDetails'
        })
        .execute(function(response) {
        _fun(item, response, 0)

        })
      }
      
      
      function playSong(item){
        localStorage.setItem("currentPlayer",item);
        var video = JSON.parse(item).id.videoId;
        var nuevaUrl = "https://www.youtube.com/embed/" + video + "?&autoplay=true&hd=1&quality=high&version=3&vq=highres&enablejsapi=1";
        setUrl(nuevaUrl);
      }
      
      var totalItemsToList = 0;
      var currentItemProcessing = 0;
      function setListItems (items,_fun) {
        currentItemProcessing = 0;
        totalItemsToList = items.length;
        for(var item in items){ 
          item = items[item];
          if(typeof(item)!= "function"){
            currentResults.push(item)
            if(item.id.videoId){
              getVideoDetails(item, function (item,response, time) {
           
                currentItemProcessing++;
                if(item){
                  var newVideo = $(listItemY(item));
                  $(newVideo).attr("id",item.id.videoId).data("data",JSON.stringify(item))
                  $(newVideo).delegate( "img, h3", "click", function(a,b,c) {
                      playSong($(a.originalEvent.currentTarget).data("data"));
                  });
                  $(newVideo).delegate( ".trackOptions", "click", function(a,b,c) {
                      currentOptionPressed = $(a.originalEvent.currentTarget).data("data");
                  });          
                  $(el).append(newVideo);
                }
                if(currentItemProcessing == totalItemsToList){
                    monomer.__init();
                    monomer.__setAspect();
                  _fun();

                }
              })
            }else if(item.id.channelId || item.id.playlistId){
              currentItemProcessing++;
            }
          };
          }
        }

    function buscarVideos(PageToken) {
        if($("#txtBuscar").val() == ""){
          return false;
        }

        if(!PageToken){
          PageToken = '';
          $('#info').html("");
          currentResults = [];
          totalItemsToList = 0;
          monomer.showLoading();
        }
        var q = $('#txtBuscar').val();
        var request = gapi.client.youtube.search.list({
              q: q,
              part: 'snippet',
              type:'video',
              maxResults:20,
              pageToken:PageToken
            });
        
            request.execute(function(response) {
              try{
                nextPageToken = response.nextPageToken;
                setListItems(response.result.items,function () {
                  if($('#info li').length < 20){
                    buscarVideos(nextPageToken);
                  }
                  else{ 
                    monomer.hideLoading();
                    localStorage.setItem("resultsList",currentResults);
                  }
                });

            }catch(ex){

            }

            });
    }
    function actualizarListasPopup () {
        try{
          $("#ListasReprododuccionLst").html("");
          for (var i = 0; i < listas.length; i++) {
              var newLi = $("<li>").text(listas[i].nombreLista).
                          on("click",function (evt) {
                            var nombre = $(this).text();
                            agregarALista(nombre,currentItemProcessing);
                            monomer.hideDialog();
                          })
              $("#ListasReprododuccionLst").append(newLi);
            }
          monomer.refresh();
        }catch(ex){}
    }
    function actualizarListas(){
          actualizarListasPage();
          actualizarListasPopup();
    }
    function actualizarListasPage () {
          //Actualiza en pagina
          $("#dvListas").html("");
          for (var i = 0; i < listas.length; i++) {
            try{
              var thelist = localStorage.getItem(listas[i].nombreLista);
              var imagenes = [];
              for (var j = 0; j < thelist.length; j++) {
                  if(j<4){
                    imagenes.push(thelist[j].snippet.thumbnails.high.url);
                  }
              }
              var newListItem = $(htmlLista(listas[i].nombreLista,imagenes))
                                .data("data",JSON.stringify(listas[i]))
                                .on("click",function () {
                                  selectedlista = $(this).data("data");
                                  $('#info').html("");
                                  currentResults = localStorage.getItem(selectedlista.nombreLista);
                                  localStorage.setItem("resultsList",currentResults);
                                  setListItems(currentResults,function () {
                                  monomer.pageShow('#busqueda');
                                  })
                                })
              $("#dvListas").append(newListItem);
            }catch(ex){

            }
          }
    }
    function buscarPeliculas () {
        var q = $("#txtBuscarMovies").val();
        $.ajax(moviesEndpoint + q)
            .done(function (data) {
                if(data.length == 0 && data.meta !== MOVIE){
                    return;
                }
                data = JSON.parse(data);
                $.each(data,function(index,item){
                    var newVideo = $(listItemM(item));
                    $(newVideo).data("data",JSON.stringify(item))
                    $(newVideo).on("click", function(a) {
                        debugger;
                        var permlalink= JSON.parse($(a.originalEvent.currentTarget).data("data")).permalink;
                        $.ajax(permlalink)
                        .done(function(theHtml){
                            eval($(theHtml).find("script:contains('embeds')").text());
                            var latinas = $(theHtml).find(".embed-selector[style*='lat.png']")
                            $.each(latinas,function(i,e){
                                var peli ={};
                                var peli.videoId = $(el).prev().find(".embed-container").data("videoid"); 
                                var peli.titlec = $(el).text().replace(/\s+/g,'').split(":")[3].replace("Enlaceexterno","")
                            })
                            debugger;
                        })
                        
                    });          
                    $("#Movies").append(newVideo);
                })
            })   
    }
