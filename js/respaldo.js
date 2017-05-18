var select_clase=function(clase_data, btn_categoria){
	$(btn_categoria).change(function(event){
		console.log($(this).val());
		console.log(event);
		var id_categoria = $(this).val();
		var data_return={};
	$.map(clase_data,function(value,key){
		console.log(value);
		if (value["id_categoria"]==id_categoria) {
			data_return[key]=value;
		}
	});
	console.log(data_return)
	
	});
	// var data_return={};
	// $.map(clase_data,function(value,key){
	// 	console.log(value);
	// 	if (value["id_categoria"]==id_categoria) {
	// 		data_return[key]=value;
	// 	}
	// });
	// console.log(data_return);
	// return data_return;
};