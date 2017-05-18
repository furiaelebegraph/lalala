var path='external_html/catalogo/';
var url_data={};
var lista_array={};
var seccion_anterior="";
var seccion_actual="inicio";
var id_anterior="";
var id_actual="";


/////////////////////////////////////////////
/////////////// /*load page content*/
////////////////////////////////////////////

var getUrlData=function(){

var url_data={};

var seccion=currentURL.hash;

seccion = seccion.replace('#',"");
seccion =seccion.split('/');


$.each(seccion, function(key, value){
    value =value.split('=');
    url_data[value[0]]=value[1];
    // seccion[keyin]
});

// //console.log(seccion);
// //console.log("url_data");
// //console.log(url_data);

return url_data;

};





// /////////////////////////////////////////////
// /////////////// /*POPULATE ACORDION*/
// ////////////////////////////////////////////
// var populate_acordion=function(lista,opt){
 

//   $.each(lista,function(key,value){
//     // //console.log(key);
//     // //console.log(value);

    

//     var id_name="menu_"+(key+1);
//     var menu_name="."+id_name;


//     var id_name="menu_"+(key+1);
//     var menu_name="."+id_name;
    
//     var nombre="";
//     var tipo="";
//     var sector="";
//     var descripcion="";

//     if (idioma == "ES") {
//       nombre=value.nombre;
//       sector=value.sector["nombre"];
//       tipo=value.tipo["nombre"];
//       descripcion=value.descripcion;


//     }else if(idioma == "EN"){
//       nombre=value.name;
//       sector=value.sector["name"];
//       tipo=value.tipo["name"];
//       descripcion=value.description;
//     }


   
//     $("#accordion_new").fadeIn(1000,"easeInQuart");
//     $("#menu_template").hide().clone().appendTo( "#accordion_new").addClass(id_name).attr("id","");
//     $(menu_name).fadeIn(1000*key,"easeOutQuart");
//     $(menu_name).find('.panel-heading').attr("id","heading"+key);
    
    


//     $(menu_name).find('.btn_colapse').attr({
//       "href":"#collapse"+key,
//       "aria-controls":"collapse"+key,
//       "data-parent":"#accordion_new"
//     });

//     $(menu_name).find(".panel-collapse").attr({
//       "id":"collapse"+key,
//       "aria-labelledby":"heading"+key
//     });
//     $(menu_name).find('.titulo_marca').text(nombre);
//     $(menu_name).find('.sector').text(sector);
//     $(menu_name).find('.tipo').text(tipo);
//     var sector_data=$.grep(GLOBAL_SECTOR,function(value_sector,key_sector){
//        if(value_sector["id_sector"]==value.sector["id_sector"]){
//         return value;
//        };
//     });
//     // //console.log("sector_data");
//     // //console.log(sector_data);


//     $(menu_name).find('.descripcion').text(descripcion);
//     $(menu_name).find('.direccion').text(value.direccion);

//     $(menu_name).find('.direccion').attr("href","http://"+value.direccion);
//     $(menu_name).find('.ciudad').prepend(value.ciudad.nombre);
//     $(menu_name).find('.telefono').text(value.telefono);
//     $(menu_name).find('.telefono').attr("href",'tel:'+value.telefono);
//     // 
//     $(menu_name).find('.correo').text(value.correo);
//     $(menu_name).find('.correo').attr("href",'mailto:'+value.correo+'?Subject=GTO%20Fashion%20-%20HOla%20los%20he%20visto%20en%20la%20pagina%20gto-fashion.com.mx');
    
//     $(menu_name).find('.lifestyle').attr("data-src",opt.
//       path_foto+value.lifestyle['file_name']);

//     //console.log(value.logotipo['file_name']);

//     if (value.logotipo['file_name'] != undefined) {
      
//       //console.log("existe----------->>>>");
      
//       $(menu_name).find('.btn_colapse img').attr({
//         "src":opt.path_foto+value.logotipo['file_name'],
//         "alt":nombre
//       });

//       $(menu_name).find('.logotipo').attr({
//         "data-src":opt.path_foto+value.logotipo['file_name'],
//         "alt":nombre
//       });
    
//     }else{

//       $(menu_name).find('.btn_colapse img').parent();
//       var padre= $(menu_name).find('.btn_colapse img').parent();
//       //"<h3 class='nologo_nombre'><img src='images/no_logo_GTO-FASHION.png' alt='No logo' /> "+nombre+"</h3>"
//       $(menu_name).find('.btn_colapse img').remove();
//       padre.prepend('<img class="nologo_imagen" src="images/no_logo_GTO-FASHION.png" alt="NO LOGO" /><h3 class="nologo_nombre">'+nombre+'</h3>');

      
//       $(menu_name).find('.logotipo').remove();


//     };
    

//     $(menu_name).find('.fondo').attr("data-src",opt.path_foto+value.fondo['file_name']);
//      $(menu_name).find('.sector_img').attr("data-src",opt.path_foto+sector_data[0]["file_name"]);

//     if (key==0) {
//        $("#collapse"+key).addClass("in");
//          $(menu_name).find('.lifestyle').attr("src",opt.
//       path_foto+value.lifestyle['file_name']);
//     $(menu_name).find('.logotipo').attr("src",opt.path_foto+value.logotipo['file_name']);
//     $(menu_name).find('.fondo').attr("src",opt.path_foto+value.fondo['file_name']);
//      $(menu_name).find('.sector_img').attr("src",opt.
//       path_foto+sector_data[0]["file_name"]);
//     };
   
//   });
// }
// /////////////////////////////////////////////
// /////////////// /*EFECTO ACORDION*/
// ////////////////////////////////////////////

// var target_actual="";
// var target_anterior="";
// var efect_acordion=function(data){

//     target_actual=data.target.parentElement;

//     if (target_actual != target_anterior) {
//       // //console.log("TESTIN");
//       // //console.log(data);
//       // //console.log(target_actual);

//     };
    
    

  
//     var actua_el = $(data.target.parentElement);
    

//     var lifestyle_foto=actua_el.find('.lifestyle').attr("data-src");
//     var logotipo_foto=actua_el.find('.logotipo').attr("data-src");
//    var fondo_foto=actua_el.find('.fondo').attr("data-src");
//    var sector_foto=actua_el.find('.sector_img').attr("data-src");


//     actua_el.find('.lifestyle').attr("src",lifestyle_foto).hide().delay(1000).fadeIn(2000,"easeInOutQuart");
//     actua_el.find('.logotipo').attr("src",logotipo_foto).hide().delay(500).fadeIn(1000,"easeInQuart");;
//    actua_el.find('.fondo').attr("src",fondo_foto).hide().delay(1000).fadeIn(1000,"easeOutQuart");


//    actua_el.find(".datos_content").children().each(function(key, value){
//       //console.log(value);
//       $(value).css({"left":"+=1500","opacity":"0","position":"relative"});

//       $(value).stop(true).animate({"left":"-=1500","opacity":"1"},1000+(300*key),"easeOutQuart");

//        // $('body,html').animate({'scrollTop':0},0);  
//    });

//    actua_el.find('.sector_img').attr("src",sector_foto).hide().fadeIn( 500,"easeOutQuart");

//    targer_anterior=target_actual;

// //  }
// /////////////////////////////////////////////
// /////////////// /*onWidthResize*/
// ////////////////////////////////////////////
// var onWidthResize_p = function(callback_true,callback_false,min_width,data_callback_true, data_callback_false){
//   //console.log("onWidthResize_p");

//   var onSwitch=true;

//     if ($(window).width() < min_width) {

//         //console.log("ES MENROOOOORRRR  resize");
//         //console.log($(window).width());
//         //console.log(onSwitch);
//         if (onSwitch) {  
          
//          callback_true(data_callback_true);
//            onSwitch=false;
//         }
//     }
//     else if($(window).scrollTop()< 320) {
//         if (!onSwitch) { 
//           //console.log(onSwitch);
//           // //console.log('More than'+min_width);
//           callback_false(data_callback_false);      
//           onSwitch=true;
//         }  
//     }

//     $(window).on('resize', function() {
      
        
//             if ($(window).width() < min_width) {
              

//                 if (onSwitch) {  
//                   //console.log(onSwitch);
//                   // //console.log('Less than '+min_width+' resize');
//                   callback_true(data_callback_true);
//                   onSwitch=false;
//                 }

//             } else if($(window).scrollTop()< 320){

              
//                 if (!onSwitch) { 
//                   //console.log(onSwitch);
//                   callback_false(data_callback_false);
//                   // //console.log('More than '+min_width+' resize');
//                   onSwitch=true;
//                 }  
//             }

        
//     });

// }

//// ESTA FUNCION DETERMINA LOS VALORES DEL URL, DETECTA EL HASH, LO COMPARA CON LAS SECCIONES EXISTENTES Y APARTIR DE ELLO EJECUTA LA FUNCIONALIDAD CORRESPONDIENTE A LA SECCION .
var callSeccion=function(url_data){

    var url_data=url_data; // declaramos la variable 



    var seccion="";
    var seccion_value="";

    $.each(url_data,function(key, value){

          seccion=key;
          seccion_value=value;
    });
    
    if (seccion=="") {
      seccion="inicio";
    }


       console.log("seccion"); 
          console.log(seccion);

    
    id_anterior=id_actual;

    id_actual=seccion_value;
    seccion_actual=seccion;

    // console.log(seccion_anterior);

    $("#btn_back").remove();
     $('#pagination-container').children().remove();

     if(seccion != "inicio" ){

       $(".control_container").prepend('<div id="btn_back"><a href="#">Regresar</a></div>');

        var btn_back=$("#btn_back");
        

        btn_back.on("click",function(event){  

          event.preventDefault();
          console.log("_+++++++++++++___________seccion_anterior"); 
        console.log(seccion_anterior);
        console.log(id_anterior);


          console.log("____________seccion_anterior"); 
          console.log(seccion_anterior+"="+id_anterior); 
          // $(this).remove();

          // console.log(seccion_anterior);
          // console.log(id_anterior);

          currentURL.hash=seccion_anterior+"="+id_anterior;

        });
     }

    switch(seccion){
      case "inicio":
        list_display_home({
          url_data:url_data,
          name:"inicio",
          lista:"",
          contenedor:".data-container",
     
          seccion:"inicio",  
          path:path

        });

      break;


      case "categoria":

        console.log("-------------categoria");

        list_display_home({
          url_data:url_data,
          name:"categoria",
          lista:"",
          contenedor:".data-container",
     
          seccion:"categoria",  
          id_categoria   :seccion_value,
          path:path

        });

        seccion_anterior="inicio";

      break;

      case "clase":

        console.log("-------------clase");

        list_display_home({
          url_data:url_data,
          name:"clase",
          lista:"",
          contenedor:".data-container",
     
          seccion:"clase",  
          id_clase:seccion_value,
          path:path

        });

        seccion_anterior="categoria";

      break;

      case "producto":

        console.log("-------------producto");

        list_display_home({
          url_data:url_data,
          name:"producto",
          lista:"",
          contenedor:".data-container",
     
          seccion:"producto",  
          id_producto:seccion_value,
          path:path

        });

        seccion_anterior="clase";
      break;

      default:
      break;
    }   

};




var list_display_home=function(parameters){ /// funcion que hace el display de los productos, categorias y clases
  
  var defaults = { // paramnetros por default
     url_data       :'',
     lista          :'',
     url_control    :'control.php',
     contenedor     :".data-container",
     path_foto      :'admin/paginas/marca/',
     path           :'',
     seccion        :'clase',
     id_clase       :'',
     id_categoria   :'',
     id_producto       :'',
     append_string  :'<div class="display_error"> </div>'
  };
 

  var opt = $.extend(defaults, parameters); // comparamos lo paremtros por default conlos parametros externos y unimos en un solo arreglo.


  // //console.log("-----defaults");
  // //console.log(defaults);
  // //console.log("-----parameters");
  // //console.log(parameters);
  // //console.log("--------------------------------------------------------------------------------------------------------------------------------------------------------------------------");
  // //console.log("-----///OPT");
  // //console.log(opt);
  // //console.log(opt);
  var contenedor_templates=$('.contenedor_templates'); // asignamos la variable con el contenedor.

 contenedor_templates.hide();// coulamtos el contenedor de los templates.

 $("#pagination-container").appendTo("#catalogo_contenedor").show();

  $.ajax({   /// por el metodo ajax obtenemos la información de la base de datos como un objeto json 
    method:"POST",
    url: opt.path+opt.url_control,
    data:{
      seccion:opt.seccion,
      id_clase:opt.id_clase,
      id_categoria:opt.id_categoria,
      id_producto:opt.id_producto
    }
  }).done(function( data ) // una vez realizada con exito la consula vamos a:
  {
    var data=JSON.parse(data); // converitmos el json a un objeto js.
    console.log(data);
    if (data.lista == null || data.lista == "" ) { // centinela que detecta que si venga información de regreso, si no  envia a la página de error.
        //console.log("ITS NULLLLLL--------");
        // window.location.href="index.php?lgj="+idioma+"&seccion=error_busqueda";
         load_file(opt.contenedor,"error_busqueda.php");
         $('.header_container').hide();
          $('body,html').animate({'scrollTop':0},1000);
        return false;
      };
      
      $('.header_container').fadeIn(1000);
      opt.lista=data; // el objeto resultante se agrega a las opciones en la posición listq.

      // generamos variable contenedoras para cada uno
      var clase_nombre =""; 
      var categoria_nombre ="";
      var todos_nombre="";
      var producto_nombre="";

    // definimos en variables los elementos HTML a afectar.
      var categoria_cont=$('.template_categoria_cont');
      var categoria_slide=$('.template_categoria_slide');
      var categoria_item=$('.template_categoria_item');

      var clase_cont=$('.template_clase_cont');
      var clase_slide=$('.template_clase_slide');
      var clase_item=$('.template_clase_item');

      var producto_cont=$('.template_producto_cont');
      
      

      
    
      

  
          /// generamos el switch para cada una de las secciones a mostrar.
          switch(opt.seccion)
          {
            case "inicio":

                $(opt.contenedor).children().remove(); // quitamos todos los elementos del contenedor.
                  
                // categoria_slide;
                // categoria_item;

                categoria_item.hide() // escondemos el item de categoria.

                categoria_cont.clone().appendTo(opt.contenedor).show().removeClass('template_categoria_cont').attr('id','contenedor_categoria'); // clonamos y modificamos las propiedades del nuevo elemento.

                var categoria_id=$('#contenedor_categoria'); // asiganoms una variable para el elemento html creado.
                var cociente=0;// generamos una variable de cociente para el control de las filas y columnas

               $.each(GLOBAL_CATEGORIA,function(key, value){ // por cada elemento conetido en el arreglo global de categorias vamos a hacer:

                cociente=key%3; // usamos el operador modulor para obtener el sobrante de la division del valor de key entre 3.

                // console.log(cociente);

                if(cociente == 0){ // si el cociente es = a 0 entonces crea un contenedor de row para insertar las columnas siguientes,
                  categoria_slide.clone().remove().appendTo("#cont_gal").show().removeClass('template_categoria_slide').attr('id','categoria_slide_'+value['id_categoria']);
                  categoria_slide.hide();
                  linea_actual=$('#categoria_slide_'+value['id_categoria']); // asignamos una variable al objeto creado.
                }

                 
                  // creamos dentro del nuevo row una nuevo item de categoria y lo modificamos.
                  categoria_item.clone().appendTo(linea_actual).show().removeClass('template_categoria_item').attr('id','categoria_item_'+value['id_categoria']);
                  
                   // console.log("value del item______-");
                   // console.log(value);
                  
                   item_id=$('#categoria_item_'+value['id_categoria']); // asignamos a una variable el item creado.
                    // console.log("-//------------------&////&///");

                   // console.log("DATA DE categoria");
                   // console.log(value["id_categoria"])


                   item_id.find(".prod_name").html(value["nombre"]); // modificamos el valor del nombre.


                   // modificamos la imagen y el alt.
                   item_id.find(".la_imagen_prod").attr({"src":"admin/paginas/producto/"+value["file_name"], "alt":value["nombre"]});
                   // modificamos el enlace
                    item_id.find("#btn_mas_prod > a").attr({"href":"index.php?seccion=productos#categoria="+value["id_categoria"], "alt":value["nombre"]})

             });




                  break;



                    //---------------------------------- C A T E G  O R I A -----------------
                  case "categoria":

                  // var clases={"lista":GLOBAL_CLASE};

                  $(opt.contenedor).children().remove();
                  
                  var categoria_data = $.grep(GLOBAL_CATEGORIA,function(value, key){
                      
                    if (value["id_categoria"]== opt.id_categoria) {
                      return value;
                    };

                  });

                  console.log("CLASES__________");
                  console.log(GLOBAL_CATEGORIA);
                  console.log(opt.id_categoria);
                  console.log(categoria_data[0]["nombre"]);

                  $('#la_calidad_dos').text(categoria_data[0]["nombre"]);
                  $('#titulo_inicio_home').text("");
                  $('#parrafo_cabra').text("Seleccióna una clase");

                  clase_item.hide();

                  clase_cont.clone().appendTo(opt.contenedor).show().removeClass('template_clase_cont').attr('id','contenedor_clase'); // clonamos y modificamos las propiedades del nuevo elemento.

                  var clase_id=$('#contenedor_clase'); // asiganoms una variable para el elemento html creado.
                  

                  var cociente=0;// generamos una variable de cociente para el control de las filas y columnas



                  $('#pagination-container').pagination(
                  {
                      dataSource: opt.lista["lista"],
                      autoHidePrevious: true,
                      autoHideNext: true,
                      pageSize:6,
                      callback: function(lista, pagination)
                      { 

                        // console.log("lista de clases dentro de categoria");
 
                        // console.log(lista);
                        // console.log(clase_id);

                        // se limpian lo elemento dentro del contenedor principal

                        clase_id.find("#cont_gal").children().not(".titulo_clases, .titulo_image ").remove();

                    $.each(lista,function(key, value){ // por cada elemento conetido en el arreglo global de categorias vamos a hacer:


                        cociente=key%3; // usamos el operador modulor para obtener el sobrante de la division del valor de key entre 3.

                        // console.log(cociente);

                        if(cociente == 0){ // si el cociente es = a 0 entonces crea un contenedor de row para insertar las columnas siguientes,
                          
                          clase_slide.clone().appendTo("#cont_gal").show().removeClass('template_clase_slide').attr('id','clase_slide_'+value['id_clase']);
                         
                          clase_slide.hide();

                          
                          linea_actual=$('#clase_slide_'+value['id_clase']); // asignamos una variable al objeto creado.
                          linea_actual.children().remove();
                        }

                         
                          // creamos dentro del nuevo row una nuevo item de clase y lo modificamos.
                          clase_item.clone().appendTo(linea_actual).show().removeClass('template_clase_item').attr('id','clase_item_'+value['id_clase']);
                          
                           // console.log("value del item______-");
                           // console.log(value);
                          
                           item_id=$('#clase_item_'+value['id_clase']); // asignamos a una variable el item creado.
                            // console.log("-//------------------&////&///");

                           // console.log("DATA DE clase");
                           // console.log(value["id_clase"])


                           item_id.find(".prod_name").html(value["nombre"]); // modificamos el valor del nombre.


                           // modificamos la imagen y el alt.
                           item_id.find(".la_imagen_prod").attr({"src":"admin/paginas/producto/"+value["images"]["file_name"], "alt":value["nombre"]});
                           // modificamos el enlace
                            item_id.find("#btn_mas_prod > a").attr({"href":"index.php?seccion=productos#clase="+value["id_clase"], "alt":value["nombre"]})

                    });
                      }
                  }); 
            ///////-/-****** EN EACH


                      

                      $("#pagination-container").appendTo(".data-container").show();


                      
                      var class_producto_cont=$('.template_clases_prod_cont');
                      var class_producto_slide=$('.template_clases_prod_slide');
                      var class_producto_item=$('.template_clases_prod_item');




                     $('.template_clases_prod_cont').clone().appendTo(opt.contenedor).removeClass('template_clases_prod_cont').attr("id",'menu_clases').show();
                      // class_producto_cont.hide();
                      var categoria_cont=$("#menu_clases");
                      categoria_cont.find("#cont_class").children().remove();

                      categoria_cont.prepend('<br /><br /> <h1 class="tit_slider"> Tenemos más productos para tí.</h1>');


                      console.log("class_producto_cont");
                      console.log($("#pagination-container"));

                        // class_producto_slide.hide();

                        var cociente_class=0;
                        var alt_class_index=0;

                         var lista_categoria=GLOBAL_CATEGORIA;


                        

                        

                         $.each(lista_categoria ,function(key, value){ // por cada elemento conetido en el arreglo global de categorias vamos a hacer:
                          
                          // cont_class  

                            cociente_class=key%3; // usamos el operador modulor para obtener el sobrante de la division del valor de key entre 3.
                         
                            if(cociente_class == 0){ // si el cociente es = a 0 entonces crea un contenedor de row para insertar las columnas siguientes,
                                

                                // producto_id.find('.template_clases_prod_slide').hide();
                                var cont_destino= $('#menu_clases').find("#cont_class");


                                console.log("_____cociente_class");
                                console.log(cont_destino);
                                
                                class_producto_slide.clone().appendTo(cont_destino).removeClass('template_clases_prod_slide').attr('id','clase_producto_slide_'+value['id_categoria']).show();
                               
                                linea_clase_actual=cont_destino.find('#clase_producto_slide_'+value['id_categoria']); // asignamos una variable al objeto creado.
                                linea_clase_actual.find(".clases_prod_container").children().remove();

                                 console.log("_____linea_clase_actual");
                                console.log(linea_clase_actual);

                                // console.log(linea_clase_actual);  
                                // $('.indicador_producto').hide().clone().appendTo('#indicadores_rosa').removeClass('indicador_producto').attr({"data-slide-to":alt_index, id:"indicador"+alt_index}).show();
                                // $('.indicador_slide_producto').hide().clone().remove().appendTo('#indicadores_rosa').removeClass('indicador_slide_producto').attr({"data-slide-to":alt_index, id:"indicador"+alt_index}).show();

                                if (alt_class_index != 0) {
                                  linea_clase_actual.removeClass('active');  
                                 // $("#indicador"+alt_index).removeClass('active');  
                                }
   



                                alt_class_index ++;
                            }

                            // console.log("class_producto_item");
                            //   console.log(class_producto_item);
                              
                              // creamos dentro del nuevo row una nuevo item de producto y lo modificamos.
                              $('.template_clases_prod_item').hide();
                              
                              class_producto_item.hide().clone().appendTo(linea_clase_actual.find(".clases_prod_container")).removeClass('template_clases_prod_item').attr('id','catego_item_'+value['id_categoria']).show();
                              

                               item_class_id=$('#catego_item_'+value['id_categoria']); // asignamos a una variable el item creado.
                               //  console.log("-//------------------&////&///");
                               
                               // console.log("DATA DE producto");
                               // console.log(value)


                               item_class_id.find(".nombre_producto").html(value["nombre"]); // modificamos el valor del nombre.

                               console.log("___++++++++++ -- - - id_categoria");
                              console.log(key);
                              console.log(item_class_id);


                               item_class_id.find(".parr_ficha").html(""); // modificamos el valor del nombre.


                               // modificamos la imagen y el alt.
                               item_class_id.find(".photo > img").attr({"src":"admin/paginas/producto/"+value["file_name"], "alt":value["nombre"]});
                               // modificamos el enlace
                                item_class_id.find("#btn_mas_ficha_banner > a").attr({"href":"index.php?seccion=productos#categoria="+value["id_categoria"], "alt":value["nombre"]})


                          }); ////___________       

                  //     }
                  // }); 
            // ///////-/-****** EN EACH

            $('.carousel').carousel();

                  break;





                    //---------------------------------- C L A S E -----------------

                  case "clase":

                    $(opt.contenedor).children().remove();//limpiamo el contenedor

                     var clase_data = $.grep(GLOBAL_CLASE,function(value, key){
                      
                    if (value["id_clase"]== opt.id_clase) {
                      return value;
                    };

                  });

                     $('#titulo_inicio_home_pro_prods').text("  "+clase_data[0]['nombre']);
                    console.log("CLASES__________");
                    // console.log(GLOBAL_CLASE);
                    console.log(clase_data);

                    $('.header_container').hide();
                  
                    producto_cont.hide();

                    producto_cont.clone().appendTo(opt.contenedor).show().removeClass('template_producto_cont').attr('id','menu_productos'); // clonamos y modificamos las propiedades del nuevo elemento.

                    var producto_id=$('#menu_productos'); // asiganoms una variable para el elemento html creado.
                    var cociente=0;// generamos una variable de cociente para el control de las filas y columnas
                    var alt_index=0;

                    console.log("_______ CLASES");
                    console.log();

                    var producto_slide=$('#menu_productos').find('.template_producto_slide');
                    var producto_item=$('#menu_productos').find('.template_producto_item');

                    var class_producto_cont=$('#menu_productos').find('.template_clases_prod_cont');
                    var class_producto_slide=$('#menu_productos').find('.template_clases_prod_slide');
                    var class_producto_item=$('#menu_productos').find('.template_clases_prod_item');

                    producto_item.hide();

                    // $('#pagination-container').pagination(
                    // {
                    //     dataSource: opt.lista["lista"],
                    //     autoHidePrevious: true,
                    //     autoHideNext: true,
                    //     pageSize:6,
                    //     callback: function(lista, pagination)
                    //     {

                        // console.log("LISTADO DE LOS PRODUCTOS DENTRO DE LAS CLASES");
                        // // console.log(lista);
                        // // console.log(pagination);
                        // console.log(producto_id);

                    producto_slide.hide();

                    // se limpian lo elemento dentro del contenedor principal

                    producto_slide.children().remove();

                    var id_categoria="";

                    $.each(opt.lista["lista"] ,function(key, value){ // por cada elemento conetido en el arreglo global de categorias vamos a hacer:

                        id_categoria= value["id_categoria"];

                        cociente=key%2; // usamos el operador modulor para obtener el sobrante de la division del valor de key entre 3.
                        console.log("_____ID CATEGORIA");
                        console.log(id_categoria);

                        producto_slide.hide();
                        if(cociente == 0){ // si el cociente es = a 0 entonces crea un contenedor de row para insertar las columnas siguientes,
                            

                          // console.log(alt_index);  
                          
                          producto_slide.clone().appendTo($('#menu_productos').find("#cont_prod")).show().removeClass('template_producto_slide').attr('id','producto_slide_'+value['id_producto']);
                          
                         
                          // $('.template_producto_slide').remove();
                          
                          linea_actual=$('#menu_productos').find('#producto_slide_'+value['id_producto']); // asignamos una variable al objeto creado.
                          
                          producto_id.find('.indicador_producto').hide().clone().appendTo($('#menu_productos').find('#indicadores_rosa')).removeClass('indicador_producto').attr({"data-slide-to":alt_index, id:"indicador"+alt_index}).show();
                          // $('.indicador_slide_producto').hide().clone().remove().appendTo('#indicadores_rosa').removeClass('indicador_slide_producto').attr({"data-slide-to":alt_index, id:"indicador"+alt_index}).show();


                          if (alt_index != 0) {
                            linea_actual.removeClass('active');  
                           $("#indicador"+alt_index).removeClass('active');  
                          }




                          alt_index ++;
                        }

                         
                          // creamos dentro del nuevo row una nuevo item de producto y lo modificamos.
                          producto_item.clone().appendTo(linea_actual).show().removeClass('template_producto_item').attr('id','producto_item_'+value['id_producto']);
                          
                           // console.log("value del item______-");
                           // console.log(value);
                          
                           item_id=$('#menu_productos').find('#producto_item_'+value['id_producto']); // asignamos a una variable el item creado.
                            console.log("-//------------------&////&///");

                           // console.log("DATA DE producto");
                           // console.log(value["id_producto"])


                           item_id.find(".nombre_producto").html(value["nombre"]); // modificamos el valor del nombre.

                           item_id.find(".parr_descripcion").html(value["descripcion"]); // modificamos el valor del nombre.


                           // modificamos la imagen y el alt.
                           item_id.find(".photo > img").attr({"src":"admin/paginas/producto/"+value["images"]["file_name"], "alt":value["nombre"]});
                           // modificamos el enlace
                            item_id.find("#btn_mas_ficha > a").attr({"href":"index.php?seccion=productos#producto="+value["id_producto"], "alt":value["nombre"]})

                    });


                    $('.carousel').carousel();
                        
                      
                       class_producto_cont.clone().appendTo(producto_id).removeClass('template_clases_prod_cont').attr("id",'menu_clases').show();
                      class_producto_cont.hide();

                        class_producto_slide.hide();

                        var cociente_class=0;
                        var alt_class_index=0;

                        var lista_clases=$.grep(GLOBAL_CLASE,function(value,key){
                          if (value["id_categoria"]==id_categoria) {
                            return value;
                          }
                        });


                        console.log("___++++++++++ -- - - id_categoria");
                        console.log(GLOBAL_CLASE);
                        console.log(lista_clases);

                        $('.template_clases_prod_slide').hide();

                         $.each(lista_clases ,function(key, value){ // por cada elemento conetido en el arreglo global de categorias vamos a hacer:
                          
                          // cont_class  

                            cociente_class=key%3; // usamos el operador modulor para obtener el sobrante de la division del valor de key entre 3.
                         
                            if(cociente_class == 0){ // si el cociente es = a 0 entonces crea un contenedor de row para insertar las columnas siguientes,
                                

                                // producto_id.find('.template_clases_prod_slide').hide();
                                var cont_destino= $('#menu_clases').find("#cont_class");


                                console.log("_____cociente_class");
                                console.log(class_producto_slide);
                                

                                 

                                class_producto_slide.clone().appendTo(cont_destino).removeClass('template_clases_prod_slide').attr('id','clase_producto_slide_'+value['id_clase']).show();
                               
                                
                                
                                linea_clase_actual=cont_destino.find('#clase_producto_slide_'+value['id_clase']); // asignamos una variable al objeto creado.
                                
                                // console.log(linea_clase_actual);  
                                // $('.indicador_producto').hide().clone().appendTo('#indicadores_rosa').removeClass('indicador_producto').attr({"data-slide-to":alt_index, id:"indicador"+alt_index}).show();
                                // $('.indicador_slide_producto').hide().clone().remove().appendTo('#indicadores_rosa').removeClass('indicador_slide_producto').attr({"data-slide-to":alt_index, id:"indicador"+alt_index}).show();


                                if (alt_class_index != 0) {
                                  linea_clase_actual.removeClass('active');  
                                 // $("#indicador"+alt_index).removeClass('active');  
                                }
   



                                alt_class_index ++;
                            }

                            // console.log("class_producto_item");
                            //   console.log(class_producto_item);
                              
                              // creamos dentro del nuevo row una nuevo item de producto y lo modificamos.
                              $('.template_clases_prod_item').hide();
                              
                              class_producto_item.hide().clone().appendTo(linea_clase_actual.find(".clases_prod_container")).removeClass('template_clases_prod_item').attr('id','clase_item_'+value['id_clase']).show();
                              
                               
                              
                               item_class_id=$('#clase_item_'+value['id_clase']); // asignamos a una variable el item creado.
                               //  console.log("-//------------------&////&///");
                               
                               // console.log("DATA DE producto");
                               // console.log(value)


                               item_class_id.find(".nombre_producto").html(value["nombre"]); // modificamos el valor del nombre.

                               item_class_id.find(".parr_ficha").html(""); // modificamos el valor del nombre.


                               // modificamos la imagen y el alt.
                               item_class_id.find(".photo > img").attr({"src":"admin/paginas/producto/"+value["file_name"], "alt":value["nombre"]});
                               // modificamos el enlace
                                item_class_id.find("#btn_mas_ficha_banner > a").attr({"href":"index.php?seccion=productos#clase="+value["id_clase"], "alt":value["nombre"]})


                          }); ////___________       

                  //     }
                  // }); 
            // ///////-/-****** EN EACH

                  break;



                   case "producto":

                    $(opt.contenedor).children().remove();

                    $('.header_container').hide();

                  
                  var detalle_content=$(".detalle_template_cont");

                  detalle_content.hide();
                  detalle_content.clone().appendTo(opt.contenedor).show().removeClass('detalle_template_cont').attr('id','contenedor_detalle'); 

                  var detalle_id=$('#contenedor_detalle');

                  var foto_detalle=detalle_id.find('#bote');
                  var tit_class=detalle_id.find('#titulo_relajante');
                  var tit_prod=detalle_id.find('#relajante');

                  var descripcion=detalle_id.find('#parrafo_descripcion');
                  var ingredientes=detalle_id.find('#parrafo_ingredientes');
                  var btn_quiero=detalle_id.find('#btn_quiero>a');
                  var los_controles=detalle_id.find('#los_controles');
                  var las_imagenes=detalle_id.find('#las_imagenes');

                  var el_control_original=$(".detalle_template_cont").find('#template_detalle_control');
                   var la_imagene_original=$(".detalle_template_cont").find('#template_detalle_item');

                  console.log("PRODUCTO------>>>>>>>>*****>**>***>*>**>");
                  console.log(opt.lista["lista"][0]);

                  var detalle_data=opt.lista["lista"][0];

                  tit_class.text(detalle_data["clase"]["nombre"]);
                  tit_prod.text(detalle_data["nombre"]);

                  foto_detalle.attr({"src":"admin/paginas/producto/"+detalle_data["principal"]["file_name"],"alt":detalle_data["nombre"]});

                  descripcion.html(detalle_data["descripcion"]);
                  ingredientes.html(detalle_data["ingredientes"]);
                  // btn_quiero.attr("href","index.php?seccion=contacto&id_producto="+detalle_data["id_producto"]);

                  los_controles.children().remove();
                  las_imagenes.children().remove();

                  var index_galeria=0;
                  $.each(detalle_data["imagenes"],function(key, value){


                    el_control_original.clone().appendTo(los_controles).attr({
                      "id":"detalle_control"+index_galeria,
                      "data-slide-to":index_galeria
                    });

                    var control_item= $("#detalle_control"+index_galeria);
                    control_item.find("img").attr({"src":"admin/paginas/producto/"+value["file_name"],"alt":detalle_data['nombre']});


                    la_imagene_original.clone().appendTo(las_imagenes).attr({
                      "id":"detalle_item"+index_galeria,
                    });

                    var imagen_item=$("#detalle_item"+index_galeria);
                    imagen_item.find('img').attr({"src":"admin/paginas/producto/"+value["file_name"],"alt":detalle_data['nombre']});



                    if (index_galeria != 0) {
                     control_item.removeClass("active");
                       imagen_item.removeClass("active");
                    };

                    index_galeria++;

                  });




                  ///////-/-****** INIT EACH
   
                  ///////-/-****** EN EACH

                  break;



     //               case "ciudad":


     //              //console.log("CIUDADOA------>>>>>>>>*****>**>***>*>**>");
     //              //console.log(opt.lista["lista"][0]["ciudad"]["nombre"]);

     // ///////-/-****** INIT EACH
     //              $('#pagination-container').pagination(
     //              {
     //                  dataSource: opt.lista["lista"],
     //                  autoHidePrevious: true,
     //                  autoHideNext: true,
     //                  pageSize:6,
     //                  callback: function(lista, pagination)
     //                  {

     //                    $(opt.contenedor).children().remove();

                        

     //                  $(opt.contenedor).prepend('<h1 class="titulo_prin">'+ciudad_nombre+'</h1>')


     //                     $("#accordion").hide();
     //                     $("#accordion").clone().appendTo(".data-container").attr("id","accordion_new");

     //                      $("#accordion_new").on('show.bs.collapse', function (data) {
     //                           efect_acordion(data);
     //                      }); 
     //                      $('.btn_colapse').unbind( "click" );

     //                      populate_acordion(lista, opt); 
                          

     //                  }
     //              }); 
     //        ///////-/-****** EN EACH

     //              break;



     //              case "todos":


     //              //console.log("TODOAS------>>>>>>>>*****>**>***>*>**>");
     //              // //console.log(opt.lista["lista"][0]["ciudad"]["nombre"]);

     // ///////-/-****** INIT EACH
     //              $('#pagination-container').pagination(
     //              {
     //                  dataSource: opt.lista["lista"],
     //                  autoHidePrevious: true,
     //                  autoHideNext: true,
     //                  pageSize:6,
     //                  callback: function(lista, pagination)
     //                  {

     //                    $(opt.contenedor).children().remove();

                      

     //                  $(opt.contenedor).prepend('<h1 class="titulo_prin">'+todos_nombre+'</h1>')


     //                     $("#accordion").hide();
     //                     $("#accordion").clone().appendTo(".data-container").attr("id","accordion_new");

     //                      $("#accordion_new").on('show.bs.collapse', function (data) {
     //                           efect_acordion(data);
     //                      }); 
     //                      $('.btn_colapse').unbind( "click" );

     //                      populate_acordion(lista, opt); 
                          

     //                  }
     //              }); 
     //        ///////-/-****** EN EACH

     //              break;





                    //---------------------------------- DEFAULT -----------------
                  default:
                  console.log("default");
                  break; 


          }///F I N  D E L  S W I T C H


      
  });
         // }
        // });
            ///////-/-****** EN EACH


          // if ($('#pagination-container').pagination('getTotalPage')==1) {
          //   $('#pagination-container').pagination('hide');
          // };

};





var click_list=function(opt){


  

    var btn='.'+opt.seccion+'_lista_element';
    

    switch(opt.seccion){
      case"inicio":
        //console.log("INICIO+6+6+6+6+6+6+6");
        opt.seccion_siguiente="clase";
      break;
      case"clase":
        opt.seccion_siguiente="categoria";
      break;
      case"categoria":
        opt.seccion_siguiente="producto";
      break;
      case"producto":
        opt.seccion_siguiente="";
      break;
    }

    $(document).on("click",btn,function()
    {
      var current=$(this);
      var id= current.attr("id-element");
      var n_childs= current.attr("num-child");
      var id_childs= current.attr("id-child");
      var name_childs= current.attr("name-child");
      var img_childs= current.attr("img-child");
      var no_categoria=false;

      //console.log("__________n_childs");
      //console.log(id);

      if (n_childs==1) {
        opt.seccion_siguiente="categoria";
        // opt.contenedor=".galery_cont";
        id=id_childs;

        currentURL.hash=opt.seccion_siguiente+"="+id;

     
      };

      
      //console.log("opt----------------------++++");
      //console.log(opt);

      currentURL.hash=opt.seccion_siguiente+"="+id;
  

    });

};


var click_detail=function(opt){

    var btn='.'+opt.seccion+'_lista_element';
    

    $(document).on("click",btn,function()
    {
  

    });
};




///------ INIT -READY */ /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
$(document).ready(function(){

  //console.log(currentURL.hash);

    //console.log(url_data["tipo"]);

    url_data=getUrlData();

    callSeccion(url_data);


//////******____________


  $(window).on('hashchange',function(){ 

      // $(".navbar-collapse").collapse("hide");
      
      //console.log("cambio");
      url_data=getUrlData();
      //console.log(url_data);

      callSeccion(url_data);
     
      
      // //console.log(seccion);
      //console.log("url_data");
      //console.log(url_data);

   

  });

 

});///------ END -READY */ /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    