
var load_content=$(".load_content");
var onSwitch=true;
var currentURL = window.location;
/////////////////////////////////////////////
/////////////// /*load file*/  Esta fucnión solo carga el archivo.
////////////////////////////////////////////
var load_file=function(elemento, file){  

      var elemento=$(elemento);

     elemento.load( file, function( response, status, xhr ) {
       
        console.log(this);

        $(this).hide().stop(true, true).fadeIn(1000, "swing");

        if ( status == "error" ) {
          var msg = "Lo sentimos hubo un error de carga.";
          console.log(msg);
          $( "#error" ).html( msg + xhr.status + " " + xhr.statusText );
        }
      });
  };
/////////////////////////////////////////////
/////////////// /*load page content*/
////////////////////////////////////////////

var load_page=function(seccion){  // esta función es encargada de cargar los datos, se ejecuta cada vez que cambia el hastag.

  
  $('body,html').animate({'scrollTop':0},0);  // hacemos el scroll hasta arriba
  
  seccion_anterior=seccion; //definimos la sección anterior, que nos va a servir para regresar a dicha sección.
  var btn;

  // load_file(".header","menu.php");
  console.log(seccion);

  if (seccion==undefined) {//establecemos que si la sección no está definida siempre sea inicio
    seccion="inicio";
  };

  console.log(seccion);

  // onWidthResize(menu_main_function,menu_main_remove_function, 768);

  // onScrollDown(menu_main_function,menu_main_remove_function, 320);


//////////////////////////////////////////////////////////////////////
//-------------------------- H A S H   -------------------------------
//////////////////////////////////////////////////////////////////////
  
  var location_search=currentURL.hash;// generamos esta variable que va a contener solo el # de la URL COMPLETA. 
  
  console.log("currentURL");
  console.log(currentURL);

///// CONTROL DE SECCIONES EN ONE PAGE / HOME:

  if (location_search == "#end_page" ) { // si la url cambia y es igual a end page, vamos a llevar el scroll hasta abajo y despues lo vamos a subir solo 470 px para que coincida con la sección de contaco.
    console.log("ºººººcontacto fin páginaººººº");

     $('body,html').delay(1000).animate({'scrollTop':9000},0,"easeOutQuart",function(){// mando hasya abajo el scroll.

       $(this).animate({'scrollTop':'-=470px'},2000,"easeOutQuart");// subo solo 470 px para quedar en la altura correca. 
        currentURL.hash="contacto_ready"; //cambiamos el valor del has para que podeamo refgresar inmediatamente a esta sección presionando el boton.

     });  
  };

  $(window).on('hashchange',function(){   // cuando el documento cambie de hashtag

      location_search=currentURL.hash;  //le asignamos el valor actual del hash a la variable 

      switch(location_search){ // asignamos una función para cada caso.
        case "#end_page":

          $('body,html').animate({'scrollTop':9000},0,"easeOutQuart",function(){// mando hasya abajo el scroll.
          $(this).animate({'scrollTop':'-=470px'},2000,"easeOutQuart");// subo solo 470 px para quedar en la altura correca. 
          currentURL.hash="contacto_ready";//cambiamos el valor del has para que podeamo refgresar inmediatamente a esta sección presionando el boton.

         });  
        break;

      }

  });

 

 /////////------------------ ASIGANCION DE LA FUNCION DE SEARCH POR MEDIO DEL URL.
   

  // demenuzamos el metodo get para optener las variables
    var searching=currentURL.search; // primero obtenemos la info del metodo get.
    searching = searching.replace('?',"");// le quitamos el signo de ?
    searching =searching.split('&');// creaamos una variablea por cada dato que esta separada por el simbolo &

    var url_data_s={};// generamos un array vacio.

    $.each(searching, function(key, value){//por cada elemento qu esta en el arreglo seraching 
        value =value.split('='); // creamos una arreglo por cada dato que esta sepadado por el signo = 
        url_data_s[value[0]]=value[1];//en un nuevo arreglo agregamos los valores key y value de el arreglo anterior.
        // seccion[keyin]
    });

    console.log(url_data_s["search"]);
    if (url_data_s["search"]!= undefined && url_data_s["search"]!="" ) { // si el key search es igual a vacio
      seccion="search";  //entonces la seccion sera search
      console.log("searchivon"); 
      console.log(url_data_s["search"]);
    };


  if (seccion==undefined) {
    seccion="inicio";
  };





/////////--------------- CONTROL PARA OCULTAR EL MENU CUANDO ESTA EN MOBIL


  console.log(seccion);
 
  console.log('--------- $(" .dropdown-toggle ").find("a")');
  console.log( $(" .dropdown-toggle li").find("a"));
    
  
      $(".navbar-collapse").collapse("hide");//escondemos el nava bar que es el menu
      $(".navbar-collapse").find("a").not(".dropdown-toggle").click(function(){ // en el div con clase navbar busca todos los elementos "a" ecepto los que tengan la clase doopdown y asiganeles la siguiente función.
      $(".navbar-collapse").collapse("hide");//escondemos el nava bar que es el menu
      $('body,html').animate({'scrollTop':0},3000,'easeOutQuart');  //hacemos el escroll hasta arriba

    });



//////////////////////////////////////////////////////////////////////
//----------------------- F I N  H A S H   ---------------------------
//////////////////////////////////////////////////////////////////////
console.log(seccion);

////////------ ASIGANCION DE FUNCIONES ESPECIFICAS PARA CADA SECCIÓN

  switch(seccion){
//////////////////////////////////////////////////////////////////////
//---------------------------------- I N I C I A R   -----------------
//////////////////////////////////////////////////////////////////////
    case "index":

      console.log("contacto");

      
    break;


    //////////////////////////////////////////////////////////////////////
//-------------------------  P R O D  U C  T O S   ----------------------------
//////////////////////////////////////////////////////////////////////
    case "productos":
    console.log("productos");
    console.log($("#cont_prin_prod"));
     load_file("#cont_prin_prod","external_html/catalogo/index.html");

    break;



      default:
        // console.log("test___");
      break;      

  }

} //fin load page


$(document).ready(function(){

        load_page(GLOBAL_GET_DATA.seccion);
        // console.log("contacto");
  var el = '.js-menu';
  var myMenu = cssCircleMenu(el);




    var overlayNav = $('.cd-overlay-nav'),
    overlayContent = $('.cd-overlay-content'),
    navigation = $('.cd-primary-nav'),
    toggleNav = $('.cd-nav-trigger');

  //inizialize navigation and content layers
  layerInit();
  $(window).on('resize', function(){
    window.requestAnimationFrame(layerInit);
  });

  //open/close the menu and cover layers
  toggleNav.on('click', function(){
    if(!toggleNav.hasClass('close-nav')) {
      //it means navigation is not visible yet - open it and animate navigation layer
      toggleNav.addClass('close-nav');
      
      overlayNav.children('span').velocity({
        translateZ: 0,
        scaleX: 1,
        scaleY: 1,
      }, 500, 'easeInCubic', function(){
        navigation.addClass('fade-in');
      });
    } else {
      //navigation is open - close it and remove navigation layer
      toggleNav.removeClass('close-nav');
      
      overlayContent.children('span').velocity({
        translateZ: 0,
        scaleX: 1,
        scaleY: 1,
      }, 500, 'easeInCubic', function(){
        navigation.removeClass('fade-in');
        
        overlayNav.children('span').velocity({
          translateZ: 0,
          scaleX: 0,
          scaleY: 0,
        }, 0);
        
        overlayContent.addClass('is-hidden').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
          overlayContent.children('span').velocity({
            translateZ: 0,
            scaleX: 0,
            scaleY: 0,
          }, 0, function(){overlayContent.removeClass('is-hidden')});
        });
        if($('html').hasClass('no-csstransitions')) {
          overlayContent.children('span').velocity({
            translateZ: 0,
            scaleX: 0,
            scaleY: 0,
          }, 0, function(){overlayContent.removeClass('is-hidden')});
        }
      });
    }
  });

  function layerInit(){
    var diameterValue = (Math.sqrt( Math.pow($(window).height(), 2) + Math.pow($(window).width(), 2))*2);
    overlayNav.children('span').velocity({
      scaleX: 0,
      scaleY: 0,
      translateZ: 0,
    }, 50).velocity({
      height : diameterValue+'px',
      width : diameterValue+'px',
      top : -(diameterValue/2)+'px',
      left : -(diameterValue/2)+'px',
    }, 0);

    overlayContent.children('span').velocity({
      scaleX: 0,
      scaleY: 0,
      translateZ: 0,
    }, 50).velocity({
      height : diameterValue+'px',
      width : diameterValue+'px',
      top : -(diameterValue/2)+'px',
      left : -(diameterValue/2)+'px',
    }, 0);
  }

$(".animsition").animsition({
    inClass: 'fade-in',
    outClass: 'fade-out',
    inDuration: 1500,
    outDuration: 800,
    linkElement: '.animsition-link',
    // e.g. linkElement: 'a:not([target="_blank"]):not([href^="#"])'
    loading: true,
    loadingParentElement: 'body', //animsition wrapper element
    loadingClass: 'animsition-loading',
    loadingInner: '', // e.g '<img src="loading.svg" />'
    timeout: false,
    timeoutCountdown: 5000,
    onLoadEvent: true,
    browser: [ 'animation-duration', '-webkit-animation-duration'],
    // "browser" option allows you to disable the "animsition" in case the css property in the array is not supported by your browser.
    // The default setting is to disable the "animsition" in a browser that does not support "animation-duration".
    overlay : false,
    overlayClass : 'animsition-overlay-slide',
    overlayParentElement : 'body',
    transition: function(url){ window.location.href = url; }
  });

});
///fin document ready








