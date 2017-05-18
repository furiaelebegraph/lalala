var path='external_html/catalogo/';
var currentURL = window.location;
var url_data={};
var lista_array={};



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

// console.log(seccion);
// console.log("url_data");
// console.log(url_data);

return url_data;

};


/////////////////////////////////////////////
/////////////// /*load page content*/
////////////////////////////////////////////


/////////////////////////////////////////////
/////////////// /*onWidthResize*/
////////////////////////////////////////////
var onWidthResize_p = function(callback_true,callback_false,min_width,data_callback_true, data_callback_false){
  console.log("onWidthResize_p");

  var onSwitch=true;

    if ($(window).width() < min_width) {

        console.log("ES MENROOOOORRRR  resize");
        console.log($(window).width());
        console.log(onSwitch);
        if (onSwitch) {  
          
         callback_true(data_callback_true);
           onSwitch=false;
        }
    }
    else if($(window).scrollTop()< 320) {
        if (!onSwitch) { 
          console.log(onSwitch);
          // console.log('More than'+min_width);
          callback_false(data_callback_false);      
          onSwitch=true;
        }  
    }

    $(window).on('resize', function() {
      
        
            if ($(window).width() < min_width) {
              

                if (onSwitch) {  
                  console.log(onSwitch);
                  // console.log('Less than '+min_width+' resize');
                  callback_true(data_callback_true);
                  onSwitch=false;
                }

            } else if($(window).scrollTop()< 320){

              
                if (!onSwitch) { 
                  console.log(onSwitch);
                  callback_false(data_callback_false);
                  // console.log('More than '+min_width+' resize');
                  onSwitch=true;
                }  
            }

        
    });

}

var callSeccion=function(url_data){
    var url_data=url_data;

    console.log("url_data.length");
    console.log(url_data.size);

    if (url_data["sector"]==null && url_data["tipo"]==null && url_data["marca"]==null) {
       console.log("--+-++-+--+-+*-+*-+--+*-+*+-*+url_data CLASE");
      console.log("inicio"); 


      list_display({
          url_data:url_data,
          name:"inicio",
          lista:"",
          contenedor:".data-container",
     
          seccion:"inicio",  
          path:path

        });

    };

    if (url_data["sector"]!="" && url_data["sector"]!=undefined && url_data["sector"] != null && url_data["marca"]==undefined && url_data["tipo"]==undefined) {
      console.log("--+-++-+--+-+*-+*-+--+*-+*+-*+url_data CLASE");
      console.log(url_data["sector"]); 
    
      list_display({
          url_data:url_data,
          name:"clase",
          id_clase:url_data["sector"],
          lista:"",
          contenedor:".data-container",
       
          seccion:"clase",  
          path:path

        });


    };

    // if ( url_data["tipo"]!="" && url_data["tipo"]!=undefined && url_data["tipo"] != null && url_data["marca"]==undefined) {

    //   console.log("--+-++-+--+-+*-+*-+--+*-+*+-*+url_data CATEGORIA");
    //   console.log(url_data["tipo"]);

    //   list_display({
    //       url_data:url_data,
    //       name:"categoria",
    //       id_categoria:url_data["tipo"],
    //       lista:"",
    //       contenedor:".data-container",
      
    //       seccion:"categoria",  
    //       path:path

    //     });
       


    // };
    // if (url_data["marca"]!="" && url_data["marca"]!=undefined && url_data["marca"] != null) {
    //   console.log("--+-++-+--+-+*-+*-+--+*-+*+-*+url_data PRODUCTO");
    //   console.log(url_data["marca"]);

    //   list_display({
    //       url_data:url_data,
    //       name:"producto",
    //       id_clase:url_data["sector"],
    //       id_categoria:url_data["tipo"],
    //       id_producto:url_data["marca"],
    //       lista:"",
    //       contenedor:".data-container",
         
    //       seccion:"producto",  
    //       path:path

    //     });
    // };

};




var list_display=function(parameters){
  console.log("list_display>>>>>>>>");
  console.log(parameters);
  //list_of_parameters
  var defaults = {
     url_data       :'',
     lista          :'',
     url_control    :'control.php',
     contenedor     :".data-container",
     path_foto      :'admin/paginas/marca/',
     path           :'',
     seccion        :'clase',
     id_clase       :'',
     id_categoria   :'',
     id_producto    :'',
     append_string  :'<div class="display_error"> </div>'
  };
 
  // console.log("-----defaults");
  // console.log(defaults);

  // console.log("-----parameters");
  // console.log(parameters);

  var opt = $.extend(defaults, parameters);

  console.log("-----///OPT");
  console.log(opt);


  $.ajax({
    method:"POST",
    url: opt.path+opt.url_control,
    data:{
      seccion:opt.seccion,
      id_clase:opt.id_clase,
      id_categoria:opt.id_categoria,
      id_producto:opt.id_producto
    }
  }).done(function( data )
  {
      var data=JSON.parse(data);  
      
      opt.lista=data;
      console.log(opt.lista["lista"]);
  

    $('#pagination-container').pagination({
      dataSource: opt.lista["lista"],
          autoHidePrevious: true,
    autoHideNext: true,
      pageSize:4,
      callback: function(lista, pagination) {
          // var html = simpleTemplating(data);
          // dataContainer.html(html);

          console.log("pafin");
          console.log(lista);
          console.log(pagination);
        
          $(opt.contenedor).children().remove();
          
          switch(opt.seccion)
          {
            case "inicio":

                $("#accordion").hide();
                $("#accordion").clone().appendTo( opt.contenedor ).attr("id","accordion_new");

            break;
          }


          $.each(lista,function(key,value){
        // console.log(value);
            switch(opt.seccion)
            {
              //----------------------------------//----------------------------------//----------------------------------//----------------------------------//----//-// T E M P L A T E //--//-----------------------------//----------------------------------//----------------------------------//----------------------------------//----------------------------------//----------------------------------//----------------------------------//-------------------
              //---------------------------------- C L A S E -----------------
              case "inicio":
        

              // console.log("value");
              //  console.log(lista_array["lista_clase"]);

                // opt.append_string='<div class="col-xs-12 col-sm-6 col-md-4 '+opt.seccion+'_lista_element" id-element="'+value.id_clase+'" num-child="'+value.n_categorias+'" name-child="'+value.nombre_categoria+'" id-child="'+value.id_categoria+'" titulo-child="'+value.titulo+'" descripcion-child="'+value.descripcion+'"  img-child="'+opt.path_foto+value.caratula.file_name+'"><img src="'+opt.path_foto+value.portada.file_name+'" alt="'+value.nombre_clase+'" /></div>';

                // opt.append_string='<div class="">'

                // $("opt.contenedor").append(opt.append_string);

                
                // var id_name="menu"+key;
                // var menu_name="#"+id_name;
                
                // $("#seccion_template_inicio").appendTo( opt.contenedor );
                // $("#seccion_template_inicio").fadeIn(1000,"easeInQuart");
                // $("#menu_template").clone().appendTo( ".menu_cont" ).attr("id",id_name);
                
                // $(menu_name).find('.titulo_marca').text(value.nombre);
                // $(menu_name).find('.sector').text(value.sector_nombre);
                // $(menu_name).find('.descripcion').text(value.descripcion);
                // $(menu_name).find('.direccion').text(value.direccion);
                // $(menu_name).find('.lifestyle').attr("src",opt.path_foto+value.lifestyle);
                // $(menu_name).find('.logotipo').attr("src",opt.path_foto+value.logotipo);
                // $(menu_name).find('.fondo').attr("src",opt.path_foto+value.fondo);

                //  var id_name_li="list"+key;
                // var li_name="#"+id_name_li;

                // $("#list_template").clone().appendTo( ".lateral_list" ).attr("id",id_name_li);
                //  $(li_name).find("a").attr("href",menu_name);
                //  $(li_name).find("img").attr("src",opt.path_foto+value.logotipo);
                // $(".panel").hide(0);

                var id_name="menu_"+(key+1);
                var menu_name="."+id_name;
               

                $("#accordion_new").fadeIn(1000,"easeInQuart");

                 

                $("#menu_template").hide().clone().appendTo( "#accordion_new").addClass(id_name).attr("id","");



                $(menu_name).fadeIn(1000*key,"easeOutQuart");

                console.log(menu_name);


                $(menu_name).find('.panel-heading').attr("id","heading"+key);
                $(menu_name).find('.btn_colapse img').attr("src",opt.path_foto+value.logotipo);
                $(menu_name).find('.btn_colapse').attr({
                  "href":"#collapse"+key,
                  "aria-controls":"collapse"+key,
                  "data-parent":"#accordion_new"
                });

                $(menu_name).find(".panel-collapse").attr({
                  "id":"collapse"+key,
                  "aria-labelledby":"heading"+key
                });

                
                $(menu_name).find('.titulo_marca').text(value.nombre);
                $(menu_name).find('.sector').text(value.sector_nombre);
                $(menu_name).find('.descripcion').text(value.descripcion);
                $(menu_name).find('.direccion').text(value.direccion);
                $(menu_name).find('.lifestyle').attr("src",opt.path_foto+value.lifestyle);
                $(menu_name).find('.logotipo').attr("src",opt.path_foto+value.logotipo);
                $(menu_name).find('.fondo').attr("src",opt.path_foto+value.fondo);

                //  var id_name_li="list"+key;
                // var li_name="#"+id_name_li;

                // $("#list_template").clone().appendTo( ".lateral_list" ).attr("id",id_name_li);
                //  $(li_name).find("a").attr("href",menu_name);
                //  $(li_name).find("img").attr("src",opt.path_foto+value.logotipo);







              break;

               //---------------------------------- CATEGORIA -----------------
              case "clase":

              

                opt.append_string='<div class="col-xs-12 col-sm-6 col-md-3 col-lg-3 '+opt.seccion+'_lista_element" id-element="'+value.id_categoria+'"><img src="'+opt.path_foto+value.thumb+'" alt="'+value.nombre+'" /><h6>'+value.nombre+'</h6></div>';
              break;

              //---------------------------------- CATEGORIA -----------------
              case "categoria":


            
                var keys_imagenes=Object.keys(value.imagenes);
                
                var imagen=value.imagenes[keys_imagenes[0]];
                console.log("thumb------");
                console.log(imagen.thumb);



                opt.append_string='<div class=" col-xs-12 col-sm-5 col-md-3 '+opt.seccion+'_lista_element" id-element="'+value.id_producto+'"><img src="'+opt.path_foto+imagen.thumb+'" alt="'+value.nombre+'" /><h6>'+value.nombre+'</h6></div>';
              break;

              default:
              console.log("default");
              break;
            }
            // console.log(opt.contenedor);
            // $(opt.contenedor).append(opt.append_string);
          });
         }
        });
            ///////-/-****** EN EACH


          if ($('#pagination-container').pagination('getTotalPage')==1) {
            $('#pagination-container').pagination('hide');
          };



          lista_array['lista_'+opt.seccion]=opt.lista;

          // console.log("var lista+opt.seccion=opt.lista;");
          // console.log(lista_array);

          switch(opt.seccion)
          {
            case "inicio":

            

              
              // $(opt.contenedor).removeClass("producto_content");

              //  $(".header_container").children().remove();

              // click_list(opt);
              // seccion_anterior="";
              // // data_anterior=lista_array["lista_clase"];

            break;

            case "clase":
            // console.log("CLASEEEE______________");
            // console.log(opt.lista["clase"][0]["file_name"]);


              $(opt.contenedor).removeClass("producto_content");
              $(".header_container").children().remove();
              click_list(opt);
              seccion_anterior="inicio";
              // data_anterior=lista_array["lista_clase"];

  
              // var id_clase_header=lista_array["lista_categoria"][0]["id_clase"];

              // var clase_header_data=$.grep(lista_array.lista_clase, function(value,key){
              //         return ( value.id_clase==id_clase_header);
              //       }, false);

              // console.log("+++-+-+-+-clase_header_data");
              // console.log(clase_header_data);

              var header={
                "imagen":opt.lista["clase"][0]["file_name"],
                "nombre":opt.lista["clase"][0]["nombre"],
                "titulo":opt.lista["clase"][0]["titulo"],
                "descripcion":opt.lista["clase"][0]["descripcion"]
                };
                console.log(header);

               $(".header_container").prepend('<div class="col-xs-12 col-sm-8 col-sm-offset-4 col-md-7 col-md-offset-5 header_cont"><div class="image_header"><img src="'+opt.path_foto+header["imagen"]+'" alt="'+header["nombre"]+'" /></div><h1>'+header["nombre"]+'</h1><h2>"'+header["titulo"]+'"</h2><br /><p>'+header["descripcion"]+'</p></div>'
                  );


               currentURL.hash="clase="+opt.lista["clase"][0]["id_clase"];

            break;

            case "categoria":

            console.log("CLASEEEE+++++++______________");
            console.log(opt.lista);


              $(opt.contenedor).prepend('<div class="espace"></div>');
              $(opt.contenedor).addClass('producto_content');
              $(".header_container").children().remove();

              click_list(opt);

              if (opt.lista["clase"][0]["n_categorias"]==1) {
                
                seccion_anterior="inicio";

              }
              else{
                seccion_anterior="clase="+opt.lista["clase"][0]["id_clase"];  
              }
              
              // data_anterior=lista_array["lista_categoria"];


                var header={
                "imagen":opt.lista["clase"][0]["file_name"],
                "nombre":opt.lista["clase"][0]["nombre"],
                "titulo":opt.lista["clase"][0]["titulo"],
                "descripcion":opt.lista["clase"][0]["descripcion"]
                };
                console.log(header);

               // $(".header_container").prepend('<div class="col-xs-12 col-sm-8 col-sm-offset-4 col-md-7 col-md-offset-5 header_cont"><div class="image_header"><img src="'+opt.path_foto+header["imagen"]+'" alt="'+header["nombre"]+'" /></div><h1>"'+header["titulo"]+'"</h1><br /><p>'+header["descripcion"]+'</p></div>'
               //    );

              $(".header_container").prepend('<div class="col-xs-12 col-sm-8 col-sm-offset-4 col-md-7 col-md-offset-5 header_cont"><div class="image_header"><img src="'+opt.path_foto+header["imagen"]+'" alt="'+header["nombre"]+'" /></div><h1>'+header["nombre"]+'</h1><h2>"'+header["titulo"]+'"</h2><br /><p>'+header["descripcion"]+'</p></div>'
                  );





              // if (opt.no_categoria) { 

              //   seccion_anterior="clase";
              //   data_anterior=lista_array["lista_clase"];

              //   // console.log("LISTA CATEGORIA");
              //   // console.log(lista_array["lista_categoria"][0]);

              //   // var header={
              //   // "imagen":lista_array["lista_categoria"][0]["image"],
              //   // "nombre":lista_array["lista_categoria"][0]["nombre"],
              //   // "titulo":lista_array["lista_categoria"][0]["titulo"],
              //   // "descripcion":lista_array["lista_categoria"][0]["descripcion"]
              //   // };
              //   // console.log(header);


              //   // $(opt.contenedor).prepend('<div class="col-xs-12 col-sm-8 col-sm-offset-4 col-md-7 col-md-offset-5 header_cont"><div class="image_header"><img src="'+header["imagen"]+'" alt="'+header["nombre"]+'" /></div><h1>"'+header["titulo"]+'"</h1><br /><p>'+header["descripcion"]+'</p></div>'
              //   //   );



              // };

              // console.log(lista_array);

              // var id_clase_header=lista_array["lista_producto"][0]["id_clase"];

              // var clase_header_data=$.grep(lista_array.lista_clase, function(value,key){
              //         return ( value.id_clase==id_clase_header);
              //       }, false);

              // var header={
              //   "imagen":clase_header_data[0]["caratula"]["file_name"],
              //   "nombre":clase_header_data[0]["nombre_clase"],
              //   "titulo":clase_header_data[0]["titulo"],
              //   "descripcion":clase_header_data[0]["descripcion"]
              //   };
                

              //  $(opt.contenedor).prepend('<div class="col-xs-12 col-sm-8 col-sm-offset-4 col-md-7 col-md-offset-5 header_cont"><div class="image_header"><img src="'+opt.path_foto+header["imagen"]+'" alt="'+header["nombre"]+'" /></div><h1>"'+header["titulo"]+'"</h1><br /><p>'+header["descripcion"]+'</p></div>'
              //     );

               currentURL.hash="categoria="+opt.id_categoria;

            break;

             case "producto":
                
                $(".header_container").children().remove();
                
                var producto=opt.lista["lista"];
                producto[0]["path_foto"]=opt.path_foto;
                producto[0]["contenedor"]=opt.contenedor;

                 seccion_anterior="categoria="+producto[0]["id_categoria"];
                 // console.log("+/-*+*9-/+/*-/*+/producto");  
                 // console.log(seccion_anterior); 
                p_disp(producto);

             break;
          }



          if (opt.seccion != "inicio") {

            console.log(opt.seccion);


            var btn_back=$("#btn_back");

            console.log(btn_back);
            
            btn_back.remove();

            // $(".control_container").prepend('<div id="btn_back"><a href="#">Regresar</a></div>');

                  

            //       btn_back.click(function(){  

            //       $(this).remove();

            //       currentURL.hash=seccion_anterior;

            //       // list_display({
            //       //   name:seccion_anterior,
            //       //   lista:data_anterior,
            //       //   contenedor:opt.contenedor,
            //       //   seccion:seccion_anterior,
            //       //   path_foto:opt.path_foto,
            //       //   path:opt.path
            //       // });

            //       // if ($('#pagination-container').pagination('getTotalPage')>1) {
            //       //   $('#pagination-container').pagination('show');
            //       // };

            //     });
          };


    


});



    

};


var click_list=function(opt){


  

    var btn='.'+opt.seccion+'_lista_element';
    

    switch(opt.seccion){
      case"inicio":
        console.log("INICIO+6+6+6+6+6+6+6");
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

      console.log("__________n_childs");
      console.log(id);

      if (n_childs==1) {
        opt.seccion_siguiente="categoria";
        // opt.contenedor=".galery_cont";
        id=id_childs;

        currentURL.hash=opt.seccion_siguiente+"="+id;

         // lista_array['lista_categoria']=[{
         //    id_categoria:id_childs, 
         //    nombre:name_childs, 
         //    image:img_childs,
         //    titulo:current.attr("titulo-child"),
         //    descripcion:current.attr("descripcion-child")
         //  }];
         // no_categoria=true;
      };

      
      console.log("opt----------------------++++");
      console.log(opt);

      currentURL.hash=opt.seccion_siguiente+"="+id;
      // var lista_clase=[]; 

     // $.ajax({
     //    method: "POST",
     //    url: opt.path+"control.php",
     //    data:{
     //      seccion:opt.seccion_siguiente,
     //      id:id 
     //    }
     //  })
     // .done(function( data )
     //    {
     //      var data=JSON.parse(data);  

     //      // console.log(data);
          
     //      if (opt.seccion_siguiente == "producto") {

     //        $(opt.contenedor).parent().addClass("");
     //        // console.log("opt.seccion_siguiente");
     //        // console.log(id);
     //        // console.log(lista_array["lista_categoria"]);


     //        $.each(data,function(key,value){


     //          var id_clase=value["id_clase"];
     //          var id_categoria=value["id_categoria"];

     //          clase_value=$.grep(lista_array.lista_clase, function(value,key){
     //            return ( value.id_clase==id_clase);
     //          }, false);

     //          categoria_value=$.grep(lista_array.lista_categoria, function(value,key){
     //            return ( value.id_categoria==id_categoria);
     //          }, false);

               

     //          // value["nombre_clase"]=clase_value[0].nombre;
     //          // value["nombre_categoria"]=categoria_value[0].nombre;
     //          // value["path_foto"]=opt.path_foto;

     //          // console.log("LISTA VALUE");
     //          // console.log(value);
     //        });
     //      };

     //      list_display({
     //        name:opt.seccion_siguiente,
     //        lista:data,
     //        path_foto:opt.path_foto,
     //        contenedor:opt.contenedor,
     //        seccion:opt.seccion_siguiente,
     //        no_categoria:no_categoria,
     //        path:opt.path
     //      });
     //      // name, lista, contenedor
     //  });

    });

};


var click_detail=function(opt){

          // $(opt.contenedor).append('<div class="detalle_producto" id="'+opt.id+'"><div class="galeria_producto"></div></div>');

    var btn='.'+opt.seccion+'_lista_element';
    // console.log(btn);

    // switch(opt.seccion){
    //   case"clase":
    //     opt.seccion_siguiente="categoria";
    //   break;
    //   case"categoria":
    //     opt.seccion_siguiente="producto";
    //   break;
    //   case"producto":
    //     opt.seccion_siguiente="";
    //   break;
    // }

    $(document).on("click",btn,function()
    {
    //   var current=$(this);
    //   var id= current.attr("id-element");

    //   // console.log(id);
    //   // console.log("lista_array.lista_producto");
    //   // console.log(lista_array.lista_producto);


    //   var producto={};

    //   producto=$.grep(lista_array.lista_producto, function(value,key){
    //           return ( value.id_producto==id);
    //   }, false);

    //   producto[0]["path_foto"]=opt.path_foto;
    //   producto[0]["contenedor"]=opt.contenedor;
    //   // var append_string='<div>'

    //   // $(opt.contenedor).append(append_string);

    //   p_disp(producto);


    //   $(".control_container").children().remove();
    //    $(".control_container").prepend('<div   id="btn_back"><a href="#">Regresar</a></div>');

    //       var btn_back=$("#btn_back");

    //       btn_back.click(function(){  
    //         $(this).remove();

    //         list_display({
    //           name:"producto",
    //           lista:lista_array["lista_producto"],
    //           contenedor:opt.contenedor,
    //           seccion:"producto",
    //           path_foto:opt.path_foto,
    //           no_categoria:opt.no_categoria,
    //           path: opt.path

    //         });

    //       });

    //   //p_disp=function(ficha, indice, arreglo_fotos){

 

    });
};




  var p_disp=function(producto){
      
      var producto=producto[0];

    console.log("___________producto.lista.clase");
    console.log(producto);
    
    $(producto.contenedor).removeClass("producto_content");

    var clase=producto.clase;

    var categoria=producto.categoria

  //   var clase=$.grep(lista_array.lista_clase, function(value,key){
  //             return ( value.id_clase==producto.id_clase);
  //     }, false);

  //   var categoria=$.grep(lista_array.lista_categoria, function(value,key){
  //             return ( value.id_categoria==producto.id_categoria);
  //     }, false);

    producto["clase"]=clase["nombre"];

    producto["categoria"]=categoria["nombre"];

    console.log("___________producto.lista.clase");
    console.log(categoria["nombre"]);

  //    console.log("lista_array++++-+-+-+-+-+-+- -  - -  - - -  - -");
  //   console.log(clase[0]["id_categoria"]);

    $('#pagination-container').pagination('hide');

   

    var contenedor=$(producto.contenedor);
    contenedor.children().remove();
    contenedor.find(".producto, .suelas, .cont_foto").remove();
    contenedor.append(
      '<div class="cont_foto col-xs-12 col-sm-5 col-sm-offset-1 col-md-4 col-md-offset-3">'+
     
      '</div>'+
      '<div class="col-xs-12 col-sm-2 col-md-1 col-lg-1  "> <p></p>'+
     
      '</div>'+

    '<div class="producto col-xs-12 col-sm-3 col-md-3 col-lg-3" id="productoficha_'+producto.id_producto+'">'+

      '<div class="row detalle_producto">'+  
       // '<h6 class="col-xs-7 col-sm-6" >Categoria:</h6>'+
       '<p class="col-xs-12" id="clase">'+ producto.clase+'</p>'+
        '<p class="col-xs-12" id="categoria">'+producto.categoria+'</p>'+
        '<p class="col-xs-12" id="nombre">'+producto.nombre+'</p>'+
        // '<h6 class="col-xs-7 col-sm-6" >Clase:</h6>'+
        
        // '<h6 class="col-xs-7 col-sm-6" >Nombre:</h6>'+
        // '<p class="col-xs-5 col-sm-6" id="nombre">'+producto.nombre+'</p>'+
        '<h6 class="col-xs-5 col-sm-5 col-xs-offset-2 col-sm-offset-0" >Corrida:</h6>'+
        '<p class="col-xs-5 col-sm-6 " id="talla">'+producto.corrida+'</p>'+
        '<h6 class="col-xs-5 col-sm-5 col-xs-offset-2 col-sm-offset-0" >Piel:</h6>'+
        '<p class="col-xs-5 col-sm-6" id="piel">'+producto.piel+'</p>'+
         '<h6 class="col-xs-5 col-sm-5 col-xs-offset-2 col-sm-offset-0">Color:</h6>'+
        '<p class="col-xs-5 col-sm-6" id="id_color">'+producto.color+'</p>'+
        
        '<h6 class="col-xs-5 col-sm-5 col-xs-offset-2 col-sm-offset-0" >Manufactura:</h6>'+
        '<p class="col-xs-5 col-sm-6" id="manufactura">'+producto.manufactura+'</p>'+
      '</div>'+  
    '</div>'+
    ' <div class="suelas col-xs-12 col-sm-5 col-md-3 col-lg-3 col-sm-offset-7 col-md-offset-8">'+
        ' <h5>SUELAS:</h5> '  +
        '<div class="row"> </div> '+
    '</div>'+
    '<img id="cactus_producto" src="images/cactus.png" alt="EL canelo calzado para charros">'+
    '<img id="colibri_producto" src="images/colibri.png" alt="EL canelo calzado para charros">'+
    '<img id="maguey_producto" src="images/maguey.png" alt="EL canelo calzado para charros">'+
     '<img id="fondo_producto" src="images/vector_decorativo.png" alt="EL canelo calzado para charros">'

    
  );


   currentURL.hash="producto="+producto.id_producto;

    var producto_el=$("#productoficha_"+producto.id_producto);
    console.log(producto_el);
    var contenedor_foto=producto_el.parent().find(".cont_foto");
    var contenedor_suela=producto_el.parent().find(".suelas").find(".row");

    console.log("---------------------fotos correspondientes----------------------------")


    console.log(producto.suela);

      $.each(producto.suela, function(index, value){
      console.log("suekla"+value.file_name);

      contenedor_suela.append(
        '<a class="col-xs-4 col-md-4 suela_item" rel="suela_item" href= "'+producto.path_foto+value.file_name+'"    >'+
          
           '<img src= "'+producto.path_foto+value.thumb+'" alt="" style="height:70px;"/>'+
             '<p>'+value.nombre+'</p>'+
        '</a>'
      ); 


    });


    $(".suela_item").fancybox({
    //   maxWidth  : 800,
    // maxHeight : 600,
    // fitToView : false,
    // width   : '70%',
    // height    : '70%',
    // autoSize  : false,
    // closeClick  : false,
    // openEffect  : 'none',
    // closeEffect : 'none'
    }); 

  // $(".suela_item").fancybox.reposition();


    
    contenedor_foto.append('<ul id="etalage"></ul>');

    contenedor_foto.append(
      '<div id="bkg_producto"></div>'+
      '<div id="bkg_titulo"></div>'
      );

    $.each(producto.imagenes, function(index, value){

       

      $('#etalage').append(
        '<li>'+

          '<img class="etalage_source_image" src="'+producto.path_foto+value.file_name+'" title="'+producto.nombre+'" />'+
          '<a class="img_producto" rel="group" href="'+producto.path_foto+value.file_name+'">'+
            '<img class="etalage_thumb_image producto_img" title="'+producto.nombre+'" alt="'+producto.nombre+'" id="'+value.id_imagen+'" src="'+producto.path_foto+value.thumb+'" />'+
            '<h1 id="nombre_principal">'+producto.nombre+'</h1>'+
          '</a>'+
        '</li>'
      );   
    });

    $('#etalage').etalage({
      thumb_image_width: 300,
      thumb_image_height: 223,
      source_image_width: 1200,
      source_image_height: 900,
      zoom_area_width: 210,
      zoom_area_height: 210,
      zoom_area_distance:-50,
      show_descriptions: false,

       click_callback: function(image_anchor, instance_id){
            
          

           $.fancybox({
            'href': image_anchor,
              margin:35,

            }); 

          //  console.log("+++++++image_anchor");
          //  console.log(image_anchor);
          // console.log(instance_id);

           

        } 
    });


     var move_etalage= function(){
              console.log("..__________n_childs");
              $(".etalage_thumb_image ").css({
                "width":"250px",
                "height":"auto"
              });
            }
            var move_etalage_false= function(){
              console.log("..__________n_childs");
              $(".etalage_thumb_image ").css({
                "width":"300px",
                "height":"223px"
              });
            }

            onWidthResize_p(move_etalage,move_etalage_false,480);
  

    

  };





///------ INIT -READY */ /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
$(document).ready(function(){

    console.log(currentURL.hash);

    console.log(url_data["tipo"]);

    url_data=getUrlData();

    callSeccion(url_data);




//////******____________


  $(window).on('hashchange',function(){ 
      
      console.log("cambio");
      url_data=getUrlData();
      console.log(url_data);

      callSeccion(url_data);
      // seccion=currentURL.hash;

      // seccion = seccion.replace('#',"");
      // seccion =seccion.split('/');
      // $.each(seccion, function(key, value){
      //     value =value.split('/');
      // });
      // seccion[0]=temp_seccion[1];

      // console.log(seccion[0]);
      // console.log(seccion[1]);

      // var keyin=seccion[0];
      // var value=seccion[1];

      // url_data[keyin]=value;
      // // if (seccion != "") {};

      // // console.log(trigger);  
      
      console.log(seccion);
      console.log("url_data");
      console.log(url_data);

      // if( seccion[0] =="#estudios_sindicados" || seccion[0] =="#investigacion_de_mercados" || seccion[0] =="#opinion_publica" || seccion[0] =="#metodologias_patentadas" || seccion[0] =="#big_data")
      // {
      //   if (trigger == false) {
      //     seccion = seccion[0].split('#');  
      //     load_page(seccion[1]);
      //     trigger=true;
      //     // console.log("SOLO DEBE PASAR UNA VES");
      //   }
      //   else{
      //     // console.log("SOLO DEBE PASAR UNA VES");
      //   }
          
        
        
      // }
      // else{
      //   trigger=false;

      //   if (seccion[0]=="#publicacion") {
      //     id_noticia=seccion[1];
      //   };
      //   seccion = seccion[0].split('#');        
      //         // console.log(seccion[1]);
      //   // console.log(id_noticia);
      //   load_page(seccion[1]);
      // }



   // $.ajax({
   //    method:"POST",
   //    url: path+"control.php",
   //    data:{
   //      seccion:"clase" 
   //    }
   //  }).done(function( data )
   //  {
          
   //      var data=JSON.parse(data);  

   //      list_display({
   //        name:"clase",
   //        lista:data,
   //        contenedor:".data-container",
   //        path_foto:"admin/paginas/catalogo/",
   //        seccion:"clase",  
   //        path           :path

   //      });
   //      // name, lista, contenedor
   //    });


  });




 

});///------ END -READY */ /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    