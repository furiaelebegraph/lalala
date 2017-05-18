<?php

// error_reporting(0);


 $path ="../../";

include($path."admin/incluir/config.php");
include($path."admin/incluir/class_mysqli.php");
include($path."admin/incluir/funciones.php");

$seccion = $_POST["seccion"];

$mysql= new Con_mysqli;

$id_clase=$_POST["id_clase"];
$id_categoria=$_POST["id_categoria"];
$id_producto=$_POST["id_producto"];

// var_dump($id_clase);


switch($seccion)
{

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//---////---////---////---////---////---////---////---////---////---////---//
//---////---// C _ L _ A _ S _ E //---////---////---////---////---////---////---////---////---////---////---////---////---////---////---////---////---//
	case 'inicio':	

		// $data=$mysql->consulta("SELECT clase.id_clase, clase.orden, clase.nombre, imagenes_clase.*, categoria.id_categoria, categoria.nombre as nombre_categoria, COUNT(*) as n_categorias FROM clase INNER JOIN categoria ON clase.`id_clase` = categoria.`id_clase` INNER JOIN imagenes_clase ON clase.id_clase=imagenes_clase.id_clase group by clase.id_clase  ORDER by clase.`orden` asc");

		$data_inicio=$mysql->consulta(
		"SELECT 
			marca.*, 
			imagenes_logotipo.`file_name` as logotipo,
			imagenes_lifestyle.`file_name` as lifestyle,
			imagenes_fondo.`file_name` as fondo,

			sector.`nombre` as sector_nombre,
			imagenes_sector.`file_name` as sector_imagen,

			tipo.`nombre` as tipo_nombre,
			imagenes_tipo.`file_name` as tipo_imagen,

			municipio.`nombre` as ciudad_nombre,
			imagenes_municipio.`file_name` as ciudad_imagen


			  

			FROM marca 

			INNER JOIN imagenes_logotipo ON marca.id_marca = imagenes_logotipo.id_marca
			INNER JOIN imagenes_lifestyle ON marca.id_marca = imagenes_lifestyle.id_marca
			INNER JOIN imagenes_fondo ON marca.id_marca = imagenes_fondo.id_marca

			INNER JOIN sector ON marca.id_sector = sector.id_sector
			INNER JOIN imagenes_sector ON sector.id_sector = imagenes_sector.id_sector

			INNER JOIN tipo ON marca.id_tipo = tipo.id_tipo
			INNER JOIN imagenes_tipo ON tipo.id_tipo = imagenes_tipo.id_tipo

			INNER JOIN municipio ON marca.id_ciudad = municipio.id_ciudad
			INNER JOIN imagenes_municipio ON municipio.id_ciudad = imagenes_municipio.id_ciudad


			ORDER by sector.orden asc
		");

		// $data_img=$mysql->consulta("SELECT * FROM imagenes_clase");


		// foreach ($data_inicio as $key => $value) {
			
			
		// 	$search_result= multidimensional_search_multiarray($data_img, ["id_clase"=>$value["id_clase"]]);
		// 	// var_dump($search_result);
		// 		if (!empty($search_result && count($search_result) > 1)) {
		// 			# code...
				
		// 		foreach ($search_result as $key_img => $value_img) {
		// 			// var_dump($value_img);
		// 			if ($value_img["id_imagen"] == $value["id_caratula"]) {
		// 				$data_inicio[$key]["caratula"]=$value_img;
		// 			}
		// 			else{
		// 				$data_inicio[$key]["portada"]=$value_img;	
		// 			}
		// 		}
		// 	}
		// 	else{
		// 		$data_inicio[$key]["caratula"]=[
		// 			"file_name" => "",
		// 			"id_clase"=>"",
		// 			"id_imagen"=>"",
		// 			"thumb"=>""
		// 		];

		// 		$data_inicio[$key]["portada"]=[
		// 			"file_name" => "",
		// 			"id_clase"=>"",
		// 			"id_imagen"=>"",
		// 			"thumb"=>""
		// 		];	
		// 	}

		// 	$data["lista"]=$data_inicio;
		// 	// var_dump($value);
		// 	// var_dump($searh_result);

		// }

		$data["lista"]=$data_inicio;

		
	break;
	
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//---////---////---////---////---////---////---////---////---////---////---//
//---////---// C - A - T - E - G - O - R - I - A //---////---////---////---////---////---////---////---////---////---////---////---////---////---////---////---////---//
	case 'clase':	

	

	$data_clase=$mysql->consulta("SELECT * FROM clase INNER JOIN imagenes_clase ON clase.id_caratula=imagenes_clase.id_imagen WHERE clase.id_clase ='".$id_clase."'");

		$data_categoria=$mysql->consulta("SELECT * FROM categoria INNER JOIN imagenes_categoria ON categoria.id_categoria=imagenes_categoria.id_categoria  WHERE id_clase ='".$id_clase."' ORDER BY categoria.orden_categoria");

		// var_dump($data_clase);
		$data["clase"]=$data_clase;
		$data["lista"]=$data_categoria;

	break;

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//---////---////---////---////---////---////---////---////---////---////---//
//---////---// P - R - O - D - U - C - T - O - //---////---////---////---////---////---////---////---////---////---////---////---////---////---////---////---////---//
	case 'categoria':	

		
		$data_producto=$mysql->consulta("SELECT id_producto, nombre, orden, id_clase FROM producto WHERE id_categoria='".$id_categoria."' ORDER BY orden");


		$data_clase=$mysql->consulta("SELECT *, COUNT(categoria.id_categoria) as n_categorias FROM clase INNER JOIN imagenes_clase ON clase.id_caratula=imagenes_clase.id_imagen INNER JOIN categoria ON categoria.id_clase=clase.id_clase WHERE clase.id_clase ='".$data_producto[0]["id_clase"]."'");

		

		foreach ($data_producto as $key => $value) {
			$data_producto_id[$key]=$value["id_producto"];
		}
		
		$ids = join("','",$data_producto_id);   


		$data_imagenes=$mysql->consulta("SELECT * FROM imagenes_producto WHERE id_producto IN ('".$ids."')ORDER BY id_imagen");
		
		
		foreach ($data_producto as $key => $value) {
			$imagenes=multidimensional_search_multiarray($data_imagenes, ["id_producto"=>$value["id_producto"]]);

			$data_producto[$key]["imagenes"]=$imagenes;	
		
		}

		$data["lista"]=$data_producto;
		$data["clase"]=$data_clase;	


		

	break;
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//---////---////---////---////---////---////---////---////---////---////---//
//---////---// P - R - O - D - U - C - T - O - //---////---////---////---////---////---////---////---////---////---////---////---////---////---////---////---////---//
	case 'producto':	

		$data_producto=$mysql->consulta("SELECT * FROM producto WHERE id_producto='".$id_producto."'");
		$data_imagenes=$mysql->consulta("SELECT * FROM imagenes_producto WHERE id_producto='".$id_producto."'");
		
		$data_clase=$mysql->consulta("SELECT * FROM clase WHERE id_clase='".$data_producto[0]["id_clase"]."'");

		$data_categoria=$mysql->consulta("SELECT * FROM categoria WHERE id_categoria='".$data_producto[0]["id_categoria"]."'");

		$data_suela_producto=$mysql->consulta("SELECT suela_producto.`id_suela_producto`, suela_producto.`id_producto`, suela.`orden`, suela.`nombre`, `imagenes_suela`.`file_name`, `imagenes_suela`.`thumb` FROM suela_producto INNER JOIN suela ON suela_producto.`id_suela`= suela.`id_suela` INNER JOIN `imagenes_suela` ON suela.`id_suela`= imagenes_suela.`id_suela`  WHERE id_producto='".$data_producto[0]["id_producto"]."' ORDER BY suela_producto.`id_producto`, suela.`orden`");


		$data_producto[0]["clase"]=$data_clase[0];
		$data_producto[0]["categoria"]=$data_categoria[0];
		$data_producto[0]["suela"]=$data_suela_producto;
		$data_producto[0]["imagenes"]=$data_imagenes;
		$data["lista"]=$data_producto;	


	break;
}
	
$valores_regreso = json_encode($data,JSON_UNESCAPED_SLASHES);
				
		echo $valores_regreso;


?>