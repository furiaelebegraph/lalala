// JavaScript Document

//////////////////////////////////////////////////////////////////////
//---------------------------------- BORRARO -----------------
//////////////////////////////////////////////////////////////////////


var borrar_index_el=function(btn_borrar){
	console.log(btn_borrar);


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

			$.ajax({
	            type: $(this).attr('method'),
	            url: $(this).attr('action'),
	            data: {id:id, seccion:seccion},
	            success: function (data) {	


	            	console.log("data");
	            	console.log(data);

	            	var data=JSON.parse(data);	

	            	
	            	if (data.respuesta) {
	            		console.log($("#row"+data.id));
	            		$("#row"+data.id).hide();
	            		$("#content_img").append("<div id='data_cont'></div>");
	            		$("#data_cont").append(data.advise).delay(1000).fadeOut(1000);

	            		 setTimeout(function(){ 
									location.href="index.php?seccion=fraccionamiento&id="+data.id_proyecto}
									,3000);

	            	}
	            	else
	            	{
	            		console.log(data);
	            		$("#row"+data.id).append(data.advise);
	            		$("#row"+data.id).find("h3").delay(1000).fadeOut(1000);

	            	};

	            	

	            }
        	});

		};
	});
}
//////////////////////////////////////////////////////////////////////
//---------------------------------- D E T A L L E S -----------------
//////////////////////////////////////////////////////////////////////




/////////////////////////////////////////////
/////////////// /*load page content*/
////////////////////////////////////////////

var load_page_fraccionamientos=function(seccion){

	console.log("load_page_fraccionamientos");
	
	$('body,html').animate({'scrollTop':0},0);	

	var load_content=$(".load_content");
	seccion_anterior=seccion;
	var btn;

	switch(seccion){


//////////////////////////////////////////////////////////////////////
//---------------------------------- N U E V A  -----------------
//////////////////////////////////////////////////////////////////////			

		case "nfraccionamiento":

			console.log(seccion);

		
			$("#respuesta").hide(0);

			

			$( "#datepicker" ).datepicker({

      			dateFormat: 'yy',
		        // changeMonth: true,
		        changeYear: true,
		        showButtonPanel: true,

		        onClose: function(dateText, inst) {  
		            // var month = $("#ui-datepicker-div .ui-datepicker-month :selected").val(); 
		            var year = $("#ui-datepicker-div .ui-datepicker-year :selected").val(); 

		            $(this).val($.datepicker.formatDate('yy', new Date(year, 1)));
		        }
      		});

			$("#ad_btn").click(function(event){
				event.preventDefault();
				ad_file_area("#content_img");	
			});


			file_filter("#foto_1",5,"image/png");
			file_filter("#foto_2",5,"image/jpeg");



			
			var frm = $('#form_one');

    		frm.submit(function (ev) {
    			ev.preventDefault();

    			console.log(this);

    			if ($(this).validationEngine('validate')) {

	    			// console.log("its validate yuju");
	    			$.ajax({
			            cache: false,
			            contentType: false,
			            processData: false,
			            type: frm.attr('method'),
			            url: frm.attr('action'),
			            data: new FormData(this),
			            success: function (data) {	
			            	console.log(data);
			            	if (data != "null")
			            	{
			            	// 	console.log(jQuery.isEmptyObject(data));
				            	var data=JSON.parse(data);	
				                frm.slideUp(1000);
				                $("#respuesta").fadeIn(1000, "swing");
				                $(".respuesta_cont").append('<h3 class="color"> TÍtulo:'+data.titulo+'</h3><h6>Subtítulo:'+data.subtitulo+'<h6>');
				            }
				            else{
				            // 	$("#ya_existe").fadeIn(1000, "swing").delay(1000).fadeOut(500, "swing");
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

//////////////////////////////////////////////////////////////////////
//---------------------------------- L I S T A  -----------------
//////////////////////////////////////////////////////////////////////			

			case "fraccionamientos":

				borrar_element(".borrar");

				var order_field=$(".order_field");



				
			order_field.focus(function(){

				var orden_anterior=$(this).val();

				console.log("orden_anterior");
				console.log(orden_anterior);

				$(this).change(function(){

					var current=$(this);

					console.log($(this).val());	

					var orden=$(this).val();
					var id_frac=$(this).attr("id-data");
				
	    			var data_send={
	    				seccion:"ordenar",
	    				orden_id:orden,
	    				id: id_frac
	    			};

	    			console.log("data_send");
	    			console.log(data_send);

	    			$.ajax({
						url: "fraccionamiento_control.php",
						type: "post",
						data: data_send, 
						success: function(data){
							

							var data=JSON.parse(data);	
							console.log("data RESPUESTA");
							console.log(data.respuesta);

							if (data.respuesta) {
								
								console.log("TRUE");
								console.log(current);
								
								current.unbind( "change" );
								current.animate({"background-color":"#DAF7B9"}, 100,"easeOutExpo").delay(200).animate({"background-color":"#f5f5f5"}, 500,"easeOutExpo");
							}
							else{
								// 
								console.log("FALSE");
								console.log(current);
								

							

								
								// current.delay(1000).css("background","gray");
								current.unbind( "change" );
								current.val(orden_anterior);
								current.animate({"background-color":"red"}, 100,"easeOutExpo").delay(200).animate({"background-color":"#f5f5f5"}, 500,"easeOutExpo");
							}
						}
					});





				});
			});
			
			
				

			break;







			//////////////////////////////////////////////////////////////////////
//---------------------------------- D E T A L L E   -----------------
//////////////////////////////////////////////////////////////////////			

			case "fraccionamiento":

			console.log("noticia_secc");

			$("#respuesta").hide(0);
			

			$( "#datepicker" ).datepicker({

      			dateFormat: 'yy',
		        // changeMonth: true,
		        changeYear: true,
		        showButtonPanel: true,

		        onClose: function(dateText, inst) {  
		            // var month = $("#ui-datepicker-div .ui-datepicker-month :selected").val(); 
		            var year = $("#ui-datepicker-div .ui-datepicker-year :selected").val(); 

		            $(this).val($.datepicker.formatDate('yy', new Date(year, 1)));
		        }
      		});

			$("#ad_btn").click(function(event){
				event.preventDefault();
				ad_file_area("#ad_image_area");	
			});

			file_filter("#img_logo",5,"image/png");
			file_filter("#img_fondo",5,"image/jpeg");



			
			var frm = $('#form_one');

    		frm.submit(function (ev) {
    			ev.preventDefault();

    			console.log(this);

    			if ($(this).validationEngine('validate')) {

	    			// console.log("its validate yuju");
	    			$.ajax({
			            cache: false,
			            contentType: false,
			            processData: false,
			            type: frm.attr('method'),
			            url: frm.attr('action'),
			            data: new FormData(this),
			            success: function (data) {	
			            	console.log(data);
			            	if (data != "null")
			            	{
			            	// 	console.log(jQuery.isEmptyObject(data));
				            	var data=JSON.parse(data);	
				                frm.slideUp(1000);
				                $("#respuesta").fadeIn(1000, "swing");
				                $(".respuesta_cont").append('<h3 class="color"> TÍtulo:'+data.titulo+'</h3><h6>Subtítulo:'+data.subtitulo+'<h6>');

				                setTimeout(function(){ 
									location.href="index.php?seccion=fraccionamiento&id="+data.id_proyecto}
									,3000);
				            }
				            else{
				            	$("#ya_existe").fadeIn(1000, "swing").delay(1000).fadeOut(500, "swing");

				            	
				            }	
			            }
			        });
					/////<------ /* END ajax
                   
                }
                else{
                	    			// console.log("NO its not");
                }

    		});

			var borar_advise=borrar_index_el(".borrar");

			console.log("borar_advise");
			console.log(borar_advise);
			
			break;

	//////////////////////////////////////////////////////////////////////
//---------------------------------- T I P O S -----------------
//////////////////////////////////////////////////////////////////////
		case "tipos_fraccionamiento":

			$("#n_contenedor").hide();

			$("#ad_btn").click(function(event){
				$(this).hide();
				btn=$(this);
				$("#n_contenedor").show();
			});
			
			var frm = $('#form_one');
    		frm.submit(function (ev) {
    			$(this).val("");
		        $.ajax({
		            type: frm.attr('method'),
		            url: frm.attr('action'),
		            data: frm.serialize(),
		            success: function (data) {	

		            	
		            	if (data != "null")
		            	{
		            		console.log(jQuery.isEmptyObject(data));
			            	var data=JSON.parse(data);	
			                
			                $("#input_tipos").val("");

			                $("#creado").fadeIn(1000, "swing").delay(1000).fadeOut(500, "swing");

			                btn.fadeIn(1000,"swing");

			                $("#n_contenedor").hide();
			                
			                var enlace_detalle ="#";
			                var enlace_borrar ="#";

			                $("tbody").append('<tr><td id=""class="border_bottom_green bordesini" nowrap="nowrap" valign="top" style="padding_bottom:0;"><a href= "'+enlace_detalle+'">'+data.id_tipo+'</a></td><td class="border_bottom_green bordesini" nowrap="nowrap" valign="top"><a href= "'+enlace_detalle+'" >'+data.tipo+'</a></td> <td class="bordes" nowrap="nowrap" valign="top" align="center"><a href= "'+enlace_borrar+'"   ><img src="img/btn_borrar.jpg" border="0"/></a></td></tr>');
			            }
			            else{
			            	$("#ya_existe").fadeIn(1000, "swing").delay(1000).fadeOut(500, "swing");
			            }	
		            }
		        });
		        ev.preventDefault();
		    });

			$(".borrar").click(function(event){
				event.preventDefault();

				var id=$(this).attr("id-element");
				var seccion=$(this).attr("seccion");


				console.log($(this).attr('method'));
				
				var	confirm = confirmSubmit(id);
				
				if (confirm) {

					$.ajax({
			            type: $(this).attr('method'),
			            url: $(this).attr('action'),
			            data: {id:id, seccion:seccion},
			            success: function (data) {	

			            	var data=JSON.parse(data);	

			            	console.log($("#row"+data.id));

			            	$("#row"+data.id).hide();

			            }
		        	});

				};
			});

			break;




			default:
				// console.log("test___");
			break;			






	}

}

/////////////////////////////////////////////
/////////////// /*  TODO  */
////////////////////////////////////////////
$ (document).ready(function(){

	load_page_fraccionamientos(GLOBAL_GET_DATA.seccion);

});


