// JavaScript Document

var seccion_anterior;
///////-----------///////-----------///////-----------///////-----------///////-----------///////-----------///////-----------///////----------- l 
var abrir_ventana_nuevo=function(btn,frm,fields){
	var btn=$(btn);
	btn.click(function(event)
			{

				console.log("__________file_list");
				console.log(file_list);
				file_list=[];
				// console.log(file_list);

				$(this).hide();
				btn=$(this);
				
				$("body").append('<div class="overlay"></div>');
				$(".overlay").hide().fadeIn(700,"easeOutQuint");
				$("#n_contenedor").hide().fadeIn(1100,"easeInOutExpo");
				frm.appendTo("#n_contenedor");
				frm.show();
				frm.find(fields).val("");
				$('select').selectpicker('val', '');

				var nficha=$("#nueva_ficha");

				nficha.find(".cont_img_form").clone().appendTo("body").removeClass("cont_img_form").addClass("img_tmp").hide();


				$(document).bind("keypress", function(event) {
					
				    if (event.keyCode == 27) {
						console.log(event);
						console.log(event.keyCode);
						cerrar_ventana_nuevo(frm);
				    }
				});


				$("#close_nuevo, .overlay").click(function(){
					cerrar_ventana_nuevo(frm);
				});
			});
};

var cerrar_ventana_nuevo=function(frm){
	$("#n_contenedor").fadeOut(500);
	
	// frm.fadeOut(500);
	
	$(".overlay").fadeOut(500,"easeOutQuint",function(){
		$(this).remove();
	});
	
	$("#ad_btn").show();
	
	$(document).unbind("keypress.key27");
};


///////-----------///////-----------///////-----------///////-----------///////-----------///////-----------///////-----------///////----------- l a o d e r   A D D

var loader_add=function(gif_file){
	$("body").append('<div class="loader">'+
		'<h2 class="loader_title color">Se esta procesando tu solicitud</h2>'+
		'<img src="'+gif_file+'" alt="loader gif" class="loager_gif"/>'+
		'<div class="overlay_loader"></div>'+
		'</div>');
}

var loader_del=function(){
	var loader=$(".loader");	
	var index_timer=0;
	loader.each(function( index ) {
		index_timer++;
  		$( this ).fadeOut(300*index_timer, function(){
  			$(this).remove();
  		});
	});
}

 ///////-----------///////-----------///////-----------///////-----------///////-----------///////-----------///////-----------///////----------- B O R R  A R

var borrar_imagen=function (btn_borrar_img, list_data,key_data_element,type_file, id_foto_input) {
			if (id_foto_input == "" || id_foto_input == null || id_foto_input == undefined ) {
				id_foto_input = "foto_2";
			};
	// body...
			$(btn_borrar_img).click(function(event){
				event.preventDefault();
				var id=$(this).attr("id-element");
				var seccion=$(this).attr("seccion");
				var data_attr=$(this).attr("data");
				console.log($(this).attr('method'));
				var	confirm = confirmSubmit(id);
				if (confirm)
				{
					loader_add("img/loader.gif");

					$.ajax({
			            type: $(this).attr('method'),
			            url: $(this).attr('action'),
			            data: {id:id,seccion:seccion,data:data_attr},
			            success: function (data) {	

			            	loader_del();
			            	// console.log("data");
			            	// console.log(data);
			            	var data=JSON.parse(data);	
			            	if (data.respuesta) {

			            		console.log($("#row_image"+data.id_imagen).parent());

			            		$("#row_image"+data.id_imagen).parent().append("<div id='data_cont'></div>");

			            		$("#row_image"+data.id_imagen).hide(function(){$(this).remove();});	

			            		$("#data_cont").append(data.advise).delay(1000).fadeOut(1000);

			            		//$("#imagenes")
			            		$("#row_image"+data.id_imagen).parent().append(
								' <br><div class="col-xs-4 input_img_div" id="content_img_detalle">'+
							      '<label><h6>Carga tu Imagen '+id_foto_input+':</h6></label>'+
							      '<p class="small">Seleccione el archivo '+type_file+':'+
							      '<input type="file" class="validate[required]" name="'+id_foto_input+'" id="'+id_foto_input+'_new"/> </p>'+
							    '</div>'
								);
			            		
			            		file_list=[];

			            		console.log("------");
			            		console.log(type_file);
			            		console.log(id_foto_input);

			            		if (type_file=="" || type_file=== undefined) {

			            			console.log("--ªªªªªªªªªªªªª---");
			            		console.log(type_file);

			            			file_filter("#"+id_foto_input+'_new',5,"image/JPEG");	
			            		}
			            		else
			            		{
			            			console.log("--EEEEEEE---");
			            		console.log(type_file);
								console.log($("#"+id_foto_input+'_new'));
			            			file_filter("#"+id_foto_input+'_new',5,type_file);
			            		}
								

			                	console.log("nombre_td");
			                	console.log($("#row"+data.id).find('.imagen_td a'));
			                
			                	$("#row"+data.id).find('.imagen_td a').text("");

		      					//console.log(data_element);
								// console.log(key_data_element);         

								$.each(list_data, function(key, value){
									if (key==key_data_element) {


										console.log("________borrar_image________");  
										console.log(value);  
										console.log(id_foto_input);  
										console.log(key_data_element);  

										

										switch(id_foto_input){
											case "principal":

											value["principal"]["file_name"]="";
											value["principal"]["id_imagen"]=null;
											value["principal"]["thumb"]="";
											

											break;
											
											default:

											value["images"][id_foto_input]["file_name"]="";
											value["images"][id_foto_input]["id_imagen"]=null;
											value["images"][id_foto_input]["thumb"]="";

											break;
											// case "lifestyle":

											// value["lifestyle"]["file_name"]="";
											// value["lifestyle"]["id_imagen"]=null;
											// value["lifestyle"]["thumb"]="";

											// break;
										}

										




										// console.log("PUSH DATA");
										// console.log(value);  
									}
								});

								return true;
											            
								
					            // console.log("new liust");
					            // console.log(list_productos); 	

			            	}
			            	else
			            	{
			            		console.log(data);
			            		$("#row_image"+data.id).append(data.advise);
			            		$("#row_image"+data.id).find("h3").delay(1000).fadeOut(1000);
			            		return false;

			            	};
			            }
		        	});
				};
			});

		}	




var borrar_imagen_caratula=function (btn_borrar_img, list_data,key_data_element,type_file, id_foto_input) {
			if (id_foto_input == "" || id_foto_input == null || id_foto_input == undefined ) {
				id_foto_input = "foto_2";
			};
	// body...
			$(btn_borrar_img).click(function(event){
				event.preventDefault();

				var id=$(this).attr("id-element");
				var seccion=$(this).attr("seccion");
				console.log($(this).attr('method'));

				var	confirm = confirmSubmit(id);

				if (confirm)
				{
					//loader_add("img/loader.gif");

					$.ajax({
			            type: $(this).attr('method'),
			            url: $(this).attr('action'),
			            data: {id:id, seccion:seccion},
			            success: function (data) {	

			            	
			            	console.log("data");
			            	console.log(data);

			            	var data=JSON.parse(data);	

			            	if (data.respuesta) {

			            		var contenedor_padre=$("#row_image"+data.id_imagen).parent();
			            		console.log(contenedor_padre);

			            		contenedor_padre.append("<div id='data_cont'></div>");

			            		$("#row_image"+data.id_imagen).hide(function(){$(this).remove();});	

			            		console.log("row_image");
			            		console.log("#row_image"+data.id_imagen);

			            		$("#data_cont").append(data.advise).delay(1000).fadeOut(1000);

			            		contenedor_padre.append(
								' <br><div class="" id="content_img_portada">'+
							      '<label><h6>Carga tu Imagen:</h6></label>'+
							      '<p class="small">Seleccione el archivo JPG:'+
							      '<input type="file" class="validate[required]" name="'+id_foto_input+'" id="'+id_foto_input+'"/> </p>'+
							    '</div>'
								);

								file_list=[];

			            		if (type_file=="" || type_file=== undefined) {
			            			file_filter("#"+id_foto_input,5,"image/jpeg");	
			            		}
			            		else
			            		{
			            			file_filter("#"+id_foto_input,5,type_file);
			            		}
								

			                	// console.log("nombre_td");
			                	// console.log($("#row"+data.id).find('.imagen_td a'));
			                
			                	// $("#row"+data.id).find('.imagen_td a').text("");

		      					
								console.log(key_data_element);   


								var name_propiety =["file_name_caratula", "id_caratula","thumb_caratula"];

								$.each(list_data, function(key, value){
									if (key==key_data_element) {
										// console.log(value);  

										value[name_propiety[0]]="";
										value[name_propiety[1]]=null;
										value[name_propiety[2]]="";

										console.log("PUSH DATA");
										console.log(value);  
									}
								});
											            
								
					            // console.log("new liust");
					            // console.log(list_productos); 	

			            	}
			            	else
			            	{
			            		console.log(data);
			            		$("#row_image"+data.id).append(data.advise);
			            		$("#row_image"+data.id).find("h3").delay(1000).fadeOut(1000);

			            	};
			            	loader_del();
			            }
		        	});
				};
			});

		}	

/////////////////////////////////////////////
/////////////// /*ORDENAR*/
////////////////////////////////////////////
//ordenar(".order_field", {seccion:"ordenar_clase",clase_id:"" }, "paginas/catalogo/ordenar.php" )
var actualizar = function(order, data_send, url )
{
	var order=$(order);

	order.focus(function()
	{

		var orden_anterior=$(this).val();

		console.log("orden_anterior");
		console.log(orden_anterior);

		$(this).change(function()
		{

			var current=$(this);

			// console.log($(this).val());	

			var orden=$(this).val();
			var id_el=$(this).attr("id-data");
		
			data_send.orden_id=orden;
			data_send.id=id_el;

			console.log(data_send);
			// var data_send={
			// 	seccion:seccion,
			// 	orden_id:orden,
			// 	id: id_el
			// };

			// console.log("data_send");
			// console.log(data_send);
			loader_add("img/loader.gif");
			$.ajax({
				url: url,
				type: "post",
				data: data_send, 
				success: function(data){
					loader_del();

					var data=JSON.parse(data);	
					console.log("data RESPUESTA");
					console.log(data.respuesta);

					if (data.respuesta) {
						
						console.log("TRUE");
						console.log(current);

						current.val(orden);
						current.parent().find("p").text(orden);
						current.animate({"background-color":"#DAF7B9"}, 100,"easeOutExpo").delay(200).animate({"background-color":"#f5f5f5"}, 500,"easeOutExpo");
						current.unbind( "change" );

					}
					else{
						console.log("FALSE");
						console.log(current);
						current.val(orden_anterior);
						current.animate({"background-color":"red"}, 100).delay(200).animate({"background-color":"#f5f5f5"}, 500);
						current.unbind( "change" );
					}
				}
			});
		});
	});
}





/////////////////////////////////////////////
/////////////// /*ORDENAR*/
////////////////////////////////////////////
//ordenar(".order_field", {seccion:"ordenar_clase",clase_id:"" }, "paginas/catalogo/ordenar.php" )
var ordenar = function(order_field, data_send, url )
{
	var order_field=$(order_field);

	order_field.focus(function()
	{

		var orden_anterior=$(this).val();

		console.log("orden_anterior");
		console.log(orden_anterior);

		$(this).change(function()
		{

			var current=$(this);
			var p_field=current.parent().find("p");

			// console.log($(this).val());	

			var orden=$(this).val();
			var id_el=$(this).attr("id-data");
			var id_clase=$(this).attr("id-clase");
		
			data_send.orden_id=orden;
			data_send.id=id_el;
			data_send.id_clase=id_clase;

			console.log("+++++++data_send");
			console.log(data_send);
			// var data_send={
			// 	seccion:seccion,
			// 	orden_id:orden,
			// 	id: id_el
			// };

			// console.log("data_send");
			// console.log(data_send);
			loader_add("img/loader.gif");
			$.ajax({
				url: url,
				type: "post",
				data: data_send, 
				success: function(data){
					loader_del();
					
					var data=JSON.parse(data);	

					console.log("data RESPUESTA");
					console.log(data.respuesta);

					if (data.respuesta) {
						
						console.log("TRUE");
						console.log(current);

						current.val(orden);
						current.parent().find("p").text(orden);
						current.animate({"background-color":"#DAF7B9"}, 100,"easeOutExpo").delay(200).animate({"background-color":"#f5f5f5"}, 500,"easeOutExpo");
						current.unbind( "change" );
						p_field.text(data.orden);

					}
					else{
						console.log("FALSE");
						console.log(current);
						current.val(orden_anterior);
						current.animate({"background-color":"red"}, 100).delay(200).animate({"background-color":"#f5f5f5"}, 500);
						current.unbind( "change" );
					}
				}
			});
		});
	});
}



/////////////////////////////////////////////
/////////////// /*FILE FILTER*/
////////////////////////////////////////////
var file_list=[];

var file_filter = function(field,maxweight,typefile)
{
	console.log(field);

	$(field).change(function()
	{
	    	
	    	 console.log("value_______");
        console.log(file_list);


    	var current=$(this);
        //obtenemos un array con los datos del archivo
        var file = $(this)[0].files[0];
        //obtenemos el nombre del archivo
        var fileName = file.name;

        // console.log("value_______");
        // console.log(file_list);


        var compare_result=$.grep(file_list, function(value, key){
        	return value===fileName;
        });
        console.log("compare_result____");
        console.log(compare_result);

        if(jQuery.isEmptyObject(compare_result))
        {
        	// console.log("its empty");
        	file_list.push(fileName);
	        

	        //obtenemos la extensión del archivo
	        fileExtension = fileName.substring(fileName.lastIndexOf('.') + 1);
	        //obtenemos el tamaño del archivo
	        var fileSize = file.size;
	        
	  //       console.log("maxweight");
			// console.log(maxweight);

	        var maxweightotal=maxweight*1000000;

	        // console.log(maxweightotal);

	        if (fileSize > maxweightotal) {
	        	// console.log( "mucho dato");
	        	$(this).val("");
	        	$(this).parent().append("<h6 class='color small' id='alert_image'> Solo puedes subir archivos menores a "+maxweight+" megas</h6>");
	        	$("#alert_image").hide().fadeIn(400).delay(1500).stop(true, true).fadeOut(1000, function(){$(this).remove();})
	        }
	        //obtenemos el tipo de archivo image/png ejemplo
	        var fileType = file.type;

	        if (fileType != typefile ) {
	        	// alert("<span class='info'>Archivo para subir: "+fileName+", peso total: "+fileType+" bytes.</span>");
	        	$(this).val("");
	        	$(this).parent().append("<h6 class='color small' id='alert_image'> Solo puedes subir archivos "+typefile+"</h6>");
	        	$("#alert_image").hide().fadeIn(300).delay(1500).fadeOut(1000, function(){$(this).remove();})

	        }
	    }
        else{
        	console.log("already exist");
        	console.log(current);
        	current.val("");
        	current.parent().append("<h6 id='alert_file' class='small' style='color:orange;'>Este archivo ya está cargado, selecciona un archivo con otro nombre.</h6>");
        	current.parent().find("#alert_file").hide().fadeIn(300).delay(1500).fadeOut(1000, function(){ $(this).remove();});
        }
    });
}





/////////////////////////////////////////////
/////////////// /*CONFIRM SUBMIT*/
////////////////////////////////////////////

var ajax_prosecing=function(data){
	console.log(data);
	 
}







/////////////////////////////////////////////
/////////////// /*CONFIRM SUBMIT*/
////////////////////////////////////////////
var borrar_element=function(btn_borrar, data_list){
	console.log(btn_borrar);


	// var btn_borrar=$(btn_borrar); 
	$(document).on("click",btn_borrar,function(event)
	{
		event.preventDefault();

		var itself= $(this);

		var row_parent=$(this).parents('tr');

		var id=$(this).attr("id-element");

		var seccion=$(this).attr("seccion");

		console.log($(this).attr('method'));
		
		var	confirm = confirmSubmit(id);
		
		if (confirm)
		{
			loader_add("img/loader.gif");
			$.ajax({
	            type: $(this).attr('method'),
	            url: $(this).attr('action'),
	            data: {id:id, seccion:seccion},
	            success: function (data) {	
	            	loader_del();

	            	console.log("data");
	            	console.log(data);

	            	var data=JSON.parse(data);	

	            	
	            	if (data.respuesta) {
	            		console.log($("#row"+data.id));
	            	
	            		$("#row"+data.id).parent().parent().prepend("<div id='data_cont' style='width:100%;position:absolute;background-color:#E2EAA4;padding:20px;border-radius:30px;'></div>");


	            		$("#data_cont").append(data.advise).delay(1000).fadeOut(1000);
	            		
	            		var table = $('#example').DataTable();
	            		table.row(row_parent).remove().draw();

	            		$("#row"+data.id).hide(2000,function(){$(this).remove()});

	            		
	            		if (data_list != undefined && data_list != "" && data_list!=null) {

	            		var data_element = $.map(data_list, function(value,key){
							 if(value["id_producto"]== id){
								return	key;
							}
						}, false);

	            		console.log("----------DATA");
	            		console.log(data_element);

	            		data_list.splice(data_element,1)

	            		console.log(data_list);
	            		};

	            	}
	            	else
	            	{
	            		console.log(data);
	            		$("#row"+data.id).append(data.advise);
	            		$("#row"+data.id).find("h3").css({"color":"red","font-size":"15px" });
	            		$("#row"+data.id).find("h3").delay(1000).fadeOut(1000);
	            	};

	            	

	            }
        	});

		};
	});
}




/////////////////////////////////////////////
/////////////// /*CONFIRM SUBMIT*/
////////////////////////////////////////////
var borrar_element_target=function(btn_borrar,target_id){
	console.log("btn_borrar");
	console.log(btn_borrar);
	console.log("target_id");
	console.log(target_id);


	// var btn_borrar=$(btn_borrar); 
	$(document).on("click",btn_borrar,function(event)
	{
		event.preventDefault();

		var id=$(this).attr("id-element");

		var seccion=$(this).attr("seccion");

		console.log($(this).attr('method'));
		
		var	confirm = confirmSubmit(id);
		
		if (confirm)
		{
			loader_add("img/loader.gif");
			$.ajax({
	            type: $(this).attr('method'),
	            url: $(this).attr('action'),
	            data: {id:id, seccion:seccion},
	            success: function (data) {	
	            	loader_del();

	            	console.log("data");
	            	console.log(data);

	            	var data=JSON.parse(data);	

	            	
	            	if (data.respuesta) {
	            		console.log($(target_id+data.id));
	            		$(target_id+data.id).hide();			
	            		$("#content_img").append("<div id='data_cont'></div>");
	            		$("#data_cont").append(data.advise).delay(1000).fadeOut(1000);
	            	}
	            	else
	            	{
	            		console.log(data);
	            		$(target_id+data.id).append(data.advise);
	            		$(target_id+data.id).find("h3").delay(1000).fadeOut(1000);

	            	};

	            	

	            }
        	});

		};
	});
}



/////////////////////////////////////////////
/////////////// /*CONFIRM SUBMIT*/
////////////////////////////////////////////
function confirmSubmit(id){
  var inPut = prompt("Password", "");
  if (inPut == 'admin123'){
    var agree=confirm("Está seguro de eliminar este registro? Este proceso es irreversible.");
    if (agree)
      return id ;
    else
       return false ;
  }
  else{
  	alert("La contraseña es incorrecta");
  	return false ;
  }
}



/////////////////////////////////////////////
/////////////// /*AD AREA*/
////////////////////////////////////////////
var id_image=1;
function ad_file_area(element){
	id_image++;
	$(element).append('<div class="input_img col-sm-4"><p>Seleccione la Imagen:<input type="file" id="foto'+id_image+'"name="foto'+id_image+'"/></p></div>');

	file_list=[];
	file_filter("#foto"+id_image,5,"image/jpeg");


}




















///////////////////////////////////////////
///////////// /*load page content*/
//////////////////////////////////////////

var load_page=function(seccion){

	
	$('body,html').animate({'scrollTop':0},0);	

	var load_content=$(".load_content");
	seccion_anterior=seccion;
	var btn;

	console.log("seccion");
	console.log(seccion);

	switch(seccion){


//////////////////////////////////////////////////////////////////////
//---------------------------------- I N I C I A R   -----------------
//////////////////////////////////////////////////////////////////////
		case "login":

			console.log("login");

		break;


//////////////////////////////////////////////////////////////////////
//---------------------------------- I N I C I A R   -----------------
//////////////////////////////////////////////////////////////////////
		case undefined:

			console.log("log");
			$(".navbar").hide();

		break;

//////////////////////////////////////////////////////////////////////
//---------------------------------- I N I C I A R   -----------------
//////////////////////////////////////////////////////////////////////
		case "inicio":

			console.log("inicio");

		break;


//////////////////////////////////////////////////////////////////////
//---------------------------------- E D I T A  R  C O N T  R A S E Ñ A S  -----------------
//////////////////////////////////////////////////////////////////////
		case "cambiar_contrasena":

			console.log("cambiar_contrasena");

			var frm = $('#form_one');

			var respuesta_cont=$("#respuesta");

			respuesta_cont.hide();

    		frm.submit(function (ev) {
    			ev.preventDefault();
    			console.log(this);
    			if ($(this).validationEngine('validate')) {

	    			// console.log("its validate yuju");
	    			loader_add("img/loader.gif");

	    			$.ajax({
			            cache: false,
			            contentType: false,
			            processData: false,
			            type: frm.attr('method'),
			            url: frm.attr('action'),
			            data: new FormData(this),
			            success: function (data) {	

			            	loader_del();

			            	console.log("data");
			            	console.log(data);

			            	var data=JSON.parse(data);	
				            	console.log(data);

			            	if (!jQuery.isEmptyObject(data))
			            	{
			            		console.log(jQuery.isEmptyObject(data));
				            

				            	if (data.respuesta == true ) 
				            	{
				            			respuesta_cont.append('<h1 class="color">Tu contraseña ha cambiado</h1><div class="respuesta_cont"><h6>'+data.msj+'</h6></div><br/><br/> <br/><br/>').slideDown(1000);
				            			$("#form_one").slideUp(500);

				            			 setTimeout ( function(){ 
                							location.href='index.php'}
                						,2000);

				            	}
				            	else{
				            		console.log("false");

				            		respuesta_cont.append('  <h1 style="color:red;">No se pudo cambiar tu contraseña</h1><div class="respuesta_cont"><h6>'+data.msj+'</h6></div><br/><br/> <br/><br/>').slideDown(1000).delay(3000).slideUp(200, function(){ $(this).children().remove();});

				            	}
				            //     frm.slideUp(1000);
				            //     $("#respuesta").fadeIn(1000, "swing");
				            //     $(".respuesta_cont").append('<h3 class="color"> TÍtulo:'+data.titulo+'</h3><h6>Subtítulo:'+data.subtitulo+'<h6>');
				            // }
				            // else{
				            // // 	$("#ya_existe").fadeIn(1000, "swing").delay(1000).fadeOut(500, "swing");
				            }	
			            }
			        });
					/////<------ /* END ajax
                   
                }
                else{
                	    			// console.log("NO its not");
                }

    		});
				


		break;






			default:
				
			break;			






	}

	// });

	
	// console.log("destino[seccion]");
	// console.log(seccion);

	//console.log("seccion");
	//console.log(seccion);

	

}

/////////////////////////////////////////////
/////////////// /*  TODO  */
////////////////////////////////////////////
$ (document).ready(function(){

	
	load_page(GLOBAL_GET_DATA.seccion);

	
	// $('select').selectpicker('destroy');
	// $("select").selectpicker({
 //                style: 'chosen-container',
 //                showIcon:true,
 //  				size: 4,
 //  				width: "50%",
 //  				showTick:false,
 //  				actionsBox:false,
 //            });

 });


