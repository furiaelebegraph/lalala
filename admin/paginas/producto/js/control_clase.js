// // JavaScript Document

var seccion_anterior;


///////////////////////////////////////////////////////////////////////////
//---------------------------------- E S T A D O S  -----------------
//////////////////////////////////////////////////////////////////////


var clase_page_template= function(idval, seccion)
{				

			var idval_name=idval.substring(3);
			//console.log(idval_name);

			var frm = $('#form_one');
			

			$( "a, input" ).tooltip({
		      position: {
		        my: "left top-1000",
		        at: "left top-1000",
		        using: function( position, feedback ) {
		        	//console.log("tooltip");
		        	//console.log(position);
		        	//console.log(feedback);
		          $( this ).css( position );
		          $( "<div>" )
		            .addClass( "arrow" )
		            .addClass( feedback.vertical )
		            .addClass( feedback.horizontal )
		            .appendTo( this );
		        }
		      }
		    });
			
			$("#n_contenedor").hide();

			$("#respuesta").hide(0);

			$(".imagen_td a").fancybox({
				    padding    : 0,
			        margin     : 0,
				});

			
			
			abrir_ventana_nuevo("#ad_btn",frm,"#text_field, #foto_1");
			
			$(".imagen_td a").fancybox({
				    padding    : 0,
			        margin     : 0,
				});

			var table_obj=$('#example').DataTable({
				"order": [[0,"asc"]],
				"sScrollX": "25%",
				"bScrollCollapse": false,
				"autoWidth": false,
				"lengthMenu": [10, 25, 50],
				
			});


			var selector_tipo=$("#selector_tipo");
			selector_tipo.change(function(){
	
				var self=$(this);
				var tipo_name=self.val();
				console.log(tipo_name);

				table_obj.search(tipo_name);
				table_obj.draw(true);

				$(".dataTables_filter input").val("");
	
			});



			// var tipo_count=0;
			var select_origen=$("#tipo_form");

			select_origen.on("change", function(){

				var current=$(this);
				var current_val=current.val();
				console.log(current_val);

				// if (current_val === "add") {
				// 	console.log(current);

				// 	$(".select_tipo_cont").fadeOut(1000);
					
				// 	$("#tipo_form").attr("name","" );	

				// 	$(".galeria_select_tipo").append('<br> <div class="tipo_item"> <input id="tipo" class="validate[required]" name="categoria" value="Nueva categoria"/><a href="#" class="borrar_tipo btn_close list_btn_close">X</a></div>');

				// 	// $('suela'+suela_count).prop( "disabled", true );


				// 	var btn_borrar=$(".borrar_tipo");
				// 	btn_borrar.click(function(event){
				// 		event.preventDefault();
				// 		$(this).parent().remove();
				// 		$(".select_tipo_cont").fadeIn(1000);
				// 		$("#tipo_form").attr("name","categoria" );	
				// 	});

				// };	
		
				

				// var data_element = $.grep(list_tipo, function(value,key){
				// 	return value["id_suela"] == current_val;
				// }, false);


				// var name_data=data_element[0].nombre;
				

				// suela_count++;
				
			});






			file_filter("#foto_1",5,"image/png");

    		frm.submit(function (ev)
    		{
    			ev.preventDefault();
    			
    			// //console.log(this);
    			if ($(this).validationEngine('validate'))
    			{
    				loader_add("img/loader.gif");
	    			//console.log("its validate yuju");

	    			$.ajax(
	    			{
			            cache: false,
			            contentType: false,
			            processData: false,
			            type: frm.attr('method'),
			            url: frm.attr('action'),
			            data: new FormData(this),
			            success: function (data) 
			            {	
			            	loader_del();

			            	//console.log(data);
			            	if (data != "null")
			            	{
			            		var data=JSON.parse(data);	
			            		if (data.respuesta) 
			            		{
			      //       			var value={};
			      //       			value["images"][0]["file_name"]="files/clase/"+data.id+"/"+data.imagenes[0].file;
									// value["images"][0]["id_imagen"]=data.imagenes[0].id_foto;
									// value[idval]=data.id;
									// value["nombre"]=data.nombre;
									// value["orden"]=data.orden;
									// value["url"]=data.url;
									// value["images"][0]["thumb"]="files/clase/"+data.id+"/"+data.imagenes[0].file;
									var value={
			            				"images":{
			            					0:{
			            						"file_name":"files/clase/"+data.id+"/"+data.imagenes[0].file,
			            						"thumb":"files/clase/"+data.id+"/"+data.imagenes[0].file
			            					}	
			            				},
			            				"id_clase":data.id,
			            				'nombre':data.nombre,
			            				'orden':data.orden,
			            				'url':data.url,
			            				"id_categoria":data.id_categoria,
			            				'nombre_categoria':data.id_categoria
			            			};

									//console.log("PUSH DATA");
									//console.log(value);

			            			
									// if (typeof list_tienda === undefined) {
									// 	var list_tienda={};
									// };

									// //console.log("list_tienda antes");
									// //console.log(list_tienda);


									list_clase.push(value);


			      //       			//console.log("list_productos_despues");
									// //console.log(list_tienda);				            		
					                
					                cerrar_ventana_nuevo(frm);



					                $("#respuesta").fadeIn(1000, "swing");
					                $(".respuesta_cont").append('<h3 class="color"> Nombre:&nbsp;'+data.nombre+'</h3>');
					                $("#respuesta").delay(1500).fadeOut(500, "swing", function(){
					                	$(".respuesta_cont").find("h3").remove();
					                });

					                $("#ad_btn").show();

					                var jRow = $("<tr>").append(
						                // ' <tr id="row'+data.id+'">'+
											 '<td class="border_bottom_green bordesini" nowrap="nowrap" valign="top">'+
									        '<div style="display:none;">'+data.orden+'</div>'+
									        '<input  type="text" class="order_field" value="'+data.orden+'"  name="orden" id-data="'+data.id+'" >'+
									      '</td>',
									   
									      '<td class="nombre_td border_bottom_green bordesini" nowrap="nowrap" valign="top">'+
									        '<a href= "#" >'+data.nombre+'</a>'+
									      '</td> ',

									    


									   ' <td class="imagen_td border_bottom_green bordesini" nowrap="nowrap" valign="top">'+
									        '<a href= "paginas/producto/'+value["images"][0]["file_name"]+'" target="blank" >'+
									           '<img src= "paginas/producto/'+value["images"][0]["file_name"]+'" alt="'+data.nombre+'" style="height:70px;"/>'+
									        '</a>'+
								       '</td> ',


									       '<td class="editar_td bordes" nowrap="nowrap" valign="top" align="center">'+
        										'<a href= "#" class="editar" id="editar'+data.id+'" id-element="'+data.id+'"  title="Ver el detalle" >'+
          											'<img src="img/btn_ver.jpg" border="0"/>'+
										       	'</a>'+
										     '</td>',


									      '<td class="bordes" nowrap="nowrap" valign="top" align="center">'+
									        '<a class="borrar" id="noti_borrar" id-element="'+data.id+'" href= "#"  method="post" action="paginas/producto/control_clase.php" seccion="borrar"><img src="img/btn_borrar.jpg" border="0"/></a>'+
									      '</td>'
									    //   +
									    // '</tr>'


					               	);
									
									table_obj.row.add(jRow).draw();
									var last_row=$("tr:last");
									last_row.attr("id","row"+data.id);
									//console.log(last_row);
		

					               	// hacer_detalle_tienda("#editar"+data.id, idval, seccion);
				            	}
				            	else{
				            		$("#ya_existe").append(data.msj);
				            		$("#ya_existe").fadeIn(1000, "swing").delay(3000).fadeOut(500, "swing", function(){
				            			$(this).find("h3").remove();
				            		});
				            		// $("#ad_btn").show();
				            	}	
			            	}
			            }
			        });
					// /////<------ /* END ajax
                   
                }
                else{
                	    			// //console.log("NO its not");
                }

    		});

    			
				ordenar(".order_field", {"seccion":"ordenar"}, "paginas/producto/control_clase.php" );

				borrar_element(".borrar",list_clase);

				hacer_detalle_clase(".editar", idval, seccion);
};


/////////////////////////////////////////////
/////////////// /*DETALLE*/

var hacer_detalle_clase = function(btn, idval, seccion){//--Begin

	// //console.log("hacer_detalle");

	// var btn = $(btn);
	var seccion=seccion;

	// btn.click(function(event)
	$(document).on("click",btn,function(event)
	{
		event.preventDefault();
		var current =$(this);
		var id= current.attr("id-element");
		var key_data_element="";						
		var data_element = $.grep(list_clase, function(value,key){
			// //console.log(value[idval]);
			if (value[idval] == id) {
				key_data_element=key;
				return value;
			}
		}, false);
		
		data_element=data_element[0];
		
		var data_categoria = $.grep(list_categoria, function(value,key){
			// //console.log(value[idval]);
			if (value["id_categoria"] == data_element.id_categoria) {
				return value;
			}
		}, false);



		if (data_categoria[0] != undefined) {
			data_element["nombre_categoria"]=data_categoria[0]["nombre"];	
		};
		
		console.log("data_element");
			console.log(data_element);
			console.log(data_categoria);

		$("body").append('<div class="overlay"></div>');
	
		$("body").append(
			'<div class="col-sm-10 col-sm-offset-1" id="detalles_contenedor">'+
			  
			  '<a href="#" class="btn_close smaler_btn_close" id=""> X </a>'+

			  '<form id="form_two" name="form_two" method="post" action="paginas/producto/control_clase.php"  enctype="multipart/form-data">'+
			  '<input name="seccion" type="text" value="editar" hidden/>'+
			  '<input name="id" type="text" value="'+id+'" hidden/>'+

			  '<div class="col-sm-12" style="background:none; ">'+
			    '<h1 style="">detalles de la Clase:</h1>'+
			  '</div>'+
			  
			  '<div class="col-sm-12">'+
			  '<div id="nombre">'+
			    '<span class="label label-primary col-sm-2">Nombre:</span>'+
			    '<p><input name="nombre" class="validate[required]" type="text" maxlength="100" value="'+data_element.nombre+'" /></p>'+
			  '</div>'+ 
			  '</div> <br />'+

			  // '<div class="col-sm-6">'+
			  // '<div id="name" class="col-sm-12">'+
			  //   '<span class="label label-primary col-sm-2">Name::</span>'+
			  //   '<p><input name="name" class="validate[required]" type="text" maxlength="100" value="'+data_element[0].name+'" /></p>'+
			  // '</div>'+ 
			  // '</div>'+

			  '<div class="col-sm-12">'+
			  '<div class="actualizar_select_tipo">'+

			'      <br>'+
			        '<label><h6>Categoria de la clase:</h6></label>'+
			      '<div class="select_tipo_dinamico">'+

			        '<select class="validate[required]"  id="tipo_form_dinamic" name="categoria" title="'+data_element.nombre_categoria+'">'+

			           '<option value="'+data_element.id_categoria+'">'+data_element.nombre_categoria+'</option>'+
			        '</select><br/><br/><br/>'+
			      '</div>'+
			    '</div> '+
			    '</div> '+
			    ''+




			   '<div id="imagenes" class="col-sm-12 border-bottom">'+
			    '<span class="label label-primary col-sm-2">imágenes :</span>'+
			    '<div class="clear"></div>'+
			    '</div>'+
			    '<div class="clear"></div>'+
			    '<div id="ya_existe" class="color small" style="color: red ! important;display:none;"> <h2> NO SE HA PODIDO CREAR TU tienda </h2></div>'+
			'<input name="enviar" type="submit" value="Actualizar Proyecto" id="enviar_window" class="btn btn-default"/>'+

			'</form>'+

			'</div>'
			);

		var cont=$("#detalles_contenedor");
		cont.css("height",$( window ).height()-100);


		$(".btn_close, .overlay").click(function(){
			cont.fadeOut(1000,"easeOutQuint",function(){
				$(this).remove();	
			});
			$(".overlay").fadeOut(1000,"easeInOutExpo", function(){$(this).remove();});
			file_list=[];
		});



		$(document).bind("keypress", function(event) {
			
		    if (event.keyCode == 27) {
				//console.log(event);
				//console.log(event.keyCode);
				cont.fadeOut(1000,"easeOutQuint",function(){
				$(this).remove();	
					});
					$(".overlay").fadeOut(1000,"easeInOutExpo", function(){$(this).remove();});
					file_list=[];
		
		    }
		});



		$.each(list_categoria,function(key,value){
			console.log(key);
			console.log(value);
			if (value.id_categoria!==data_element.id_categoria) {
				$("#tipo_form_dinamic").append('<option value= "'+value.id_categoria+'" name_data="'+value.nombre+'">'+value.nombre+'  </option>');
			};

		})
		console.log('__________data_element_______');
		console.log(data_element);
		console.log(list_clase);

		if (data_element["images"][0].file_name !="" && data_element["images"][0].id_imagen != null) {

			$("#imagenes").append(
				'<div id="row_image'+data_element["images"][0].id_imagen+'" class="col-md-3 col-sm-12 image_item">'+
					'<div id="img_preview_cont">'+
					'<a class="borrar_img btn_close smaller_btn_close" id="noti_borrar" id-element="'+data_element["images"][0].id_imagen+'" href= "#"  method="post" action="paginas/producto/control_clase.php" seccion="borrar_foto">'+
			        		'X</a>'+
					'<img id="img_preview"src="paginas/producto/'+data_element["images"][0].file_name+'" alt="foto">'+
					'</div>'+
						
					    
				'</div>'
				);

			// borrar_imagen(".borrar_img", list_clase, key_data_element,"image/png");

			// btn_borrar_img, list_data,key_data_element,type_file, id_foto_input

			cont.find("select").selectpicker('refresh');

			cont.find("select").selectpicker('val', data_element.id_categoria);

			borrar_imagen(".borrar_img", list_clase, 0,"image/png","0");

		}
		//_------/* FIN BORRAR
		else{

			// //console.log("ESTA VACIO");

				$("#imagenes").append(
				' <br><div class="" id="content_img_detalle">'+
			      '<label><h6>Carga tu Imagen:</h6></label>'+
			      '<p class="small">Seleccione el archivo PNG:'+
			      '<input type="file" class="validate[required]" name="foto_2" id="foto_2"/> </p>'+
			    '</div>'
				);

				file_filter("#foto_2",5,"image/png");

		}

		cont.hide().fadeIn(1000,"easeInOutExpo");
		$(".overlay").hide().fadeIn(1000,"easeOutExpo");


///////-----------///////-----------///////-----------///////-----------///////-----------///////-----------///////-----------///////----------- SUMIT ACTUALIZAR

		var frm2 = $('#form_two');
		// //console.log(frm2);

		frm2.submit(function (ev) {
			ev.preventDefault();
			//console.log($(this));
			loader_add("img/loader.gif");

    			$.ajax({
		            cache: false,
		            contentType: false,
		            processData: false,
		            type: frm2.attr('method'),
		            url: frm2.attr('action'),
		            data: new FormData(this),
		            success: function (data) {	
		            	// //console.log(data);
		            	loader_del();

		            	if (data != "null")
		            	{
		            		var data=JSON.parse(data);	
		            		if (data.respuesta) 
		            		{
	    						// //console.log($("#content_img_detalle"));

	    						$("#content_img_detalle").slideUp(1000,"easeOutQuint",function(){
									$(this).remove();	
								});
							
							
								cont.prepend('<div class="col-xs-10" id="respuesta_window" style="">'+
								    '<h3 class="small color"> Se ha actualizado la información</h3> '+
								'</div>');

				                	$("#respuesta_window").hide().fadeIn(1000, "swing").delay(2000).slideUp(1000, "swing", function(){
				                	$(this).remove();
				                });
				                
					             if (data.imagenes[0].id_foto !="") {
				                	$("#imagenes").append
				                	(
										'<div id="row_image'+data.imagenes[0].id_foto+'" class="col-md-3 col-sm-12 image_item">'+
											'<div id="img_preview_cont">'+
											'<a class="borrar_img btn_close smaller_btn_close" id="noti_borrar" id-element="'+data.imagenes[0].id_foto+'" href= "#"  method="post" action="paginas/producto/control_clase.php" seccion="borrar_foto">'+
									        		'X</a>'+
											'<img id="img_preview"src="paginas/producto/'+data.imagenes[0].file+'" alt="foto">'+
											'</div>'+
											    
										'</div>'
									);

				                	var img_name= data.imagenes[0].file.substring(data.imagenes[0].file.lastIndexOf('/') + 1);

				                	//console.log(data);

				                	
				                	$("#row"+data.id).find('.imagen_td a').remove();
			                		$("#row"+data.id).find('.imagen_td').append(
			                		' <a href= "paginas/producto/'+data.imagenes[0].file+'" target="_blank" >'+
							           '<img src= "paginas/producto/'+data.imagenes[0].file+'" alt="'+data.nombre+'" style="height:70px;"/>'+
							        '</a>'
							        );
				                }

				                	$("#row"+data.id).find('.nombre_td a').remove();
			                	$("#row"+data.id).find('.nombre_td').append(
			                		'<a class="" href= "#">'+data.nombre+'  </a>');

			                	console.log("data");
			                	console.log(data);

			                		$("#row"+data.id).find('.categoria_td a').remove();
			                		$("#row"+data.id).find('.categoria_td').append(
			                		'<a class="" href= "#">'+data.nombre_categoria+'  </a>');
				     //            else{
				     //            	$("#imagenes").append(
									// ' <br><div class="" id="content_img_detalle">'+
								 //      '<label><h6>Carga tu Imagen:</h6></label>'+
								 //      '<p class="small">Seleccione el archivo JPG:'+
								 //      '<input type="file" class="validate[required]" name="foto_2" id="foto_2"/> </p>'+
								 //    '</div>'
									// );
				     //            }


				     			borrar_imagen(".borrar_img", list_clase, 0,"image/png","0");



								$.each(list_clase, function(key, value){


									if (key==key_data_element) {
										if (data.imagenes[0].id_foto!="") {
											value["images"][0]["thumb"]=data.imagenes[0].file;
											value["images"][0]["file_name"]=data.imagenes[0].file;
											value["images"][0]["id_imagen"]=data.imagenes[0].id_foto;
											value["images"][0]["id_producto"]=data.id;

										}
										value["nombre"]=data.nombre;
										value["name"]=data.name;
										value["id_categoria"]=data.id_categoria;
										value["nombre_categoria"]=data.nombre_categoria;

									}
								});


								console.log('AFTER________++++++list_clase');
								console.log(list_clase);
							 }
			          
				            else{
				            	
				            	
				            	$("#ya_existe").append(data.msj);
				            	$("#ya_existe").fadeIn(1000, "swing").delay(1000).fadeOut(500, "swing", function(){

				            		$(this).children().not(':first').remove();

				            	});

				            }	
			            }
			            else{

			            }
		        }
		    });
	});
});
}//---/*end


///////////////////////////////////////////////////////////////////////////
//---------------------------------- LOAD PAGE CONTENT -----------------
//////////////////////////////////////////////////////////////////////

var load_page_clases=function(seccion){

	
	$('body,html').animate({'scrollTop':0},0);	

	var load_content=$(".load_content");
	seccion_anterior=seccion;
	var btn;

	switch(seccion)
	{


//////////////////////////////////////////////////////////////////////
//---------------------------------- C L A S E -----------------
//////////////////////////////////////////////////////////////////////			
		case "clase_producto":
		//console.log("load_page_galeria");
	
		
		clase_page_template("id_clase","editar_clase");

		break;


		default:
			// //console.log("test___");
		break;			






	}

}

/////////////////////////////////////////////
/////////////// /*  TODO  */
////////////////////////////////////////////
$ (document).ready(function(){

	load_page_clases(GLOBAL_GET_DATA.seccion);

	console.log("select");
	console.log($("select"));

	$("select").selectpicker({
                style: 'chosen-container',
                showIcon:true,
  				size: 4,
  				width: "50%",
  				showTick:false,
  				actionsBox:false,
            });

});


