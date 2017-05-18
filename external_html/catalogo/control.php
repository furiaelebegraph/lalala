<?php

error_reporting(0);


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
		
		
		$data_categoria=$mysql->consulta("SELECT * FROM categoria ORDER BY nombre ASC ");
  		
  	
  		
    	

		$data["lista"]=$data_categoria;


		
	break;


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//---////---////---////---////---////---////---////---////---////---////---//
//---////---// C _ L _ A _ S _ E //---////---////---////---////---////---////---////---////---////---////---////---////---////---////---////---////---//
	case 'todos':	
		
		
		$categoria=$mysql->consulta("SELECT * FROM categoria ORDER BY nombre ASC ");
  		$data_clase=$mysql->consulta("SELECT * FROM clase ORDER BY nombre ASC");
  		$data_ciudad=$mysql->consulta("SELECT * FROM municipio ORDER BY nombre ASC");
  		$data_producto=$mysql->consulta("SELECT * FROM producto ORDER BY nombre");
  
		$data_img_prin=$mysql->consulta("SELECT * FROM imagenes_principal");	
  
      	$data_img_lifestyle=$mysql->consulta("SELECT * FROM imagenes_lifestyle");
  
      	$data_img_producto=$mysql->consulta("SELECT * FROM imagenes_producto");


      	foreach ($data_producto as $key => $value) {
      		

      			$img_prin_data =multidimensional_search_array($data_img_prin,["id_producto"=>$value["id_producto"]]);
          
	          	$img_lifestyle_data =multidimensional_search_array($data_img_lifestyle,["id_producto"=>$value["id_producto"]]);
	  
	         	$img_producto_data =multidimensional_search_array($data_img_producto,["id_producto"=>$value["id_producto"]]);
	  
	         	$clase =multidimensional_search_array($data_clase,["id_clase"=>$value["id_clase"]]);
	  
	          	$ciudad =multidimensional_search_array($data_ciudad,["id_ciudad"=>$value["id_ciudad"]]);
	  
	          	$categoria=multidimensional_search_array($categoria,["categoria"=>$value["categoria"]]);
	  
	  
	          
		        $data_inicio[$key]=$value;
		        $data_inicio[$key]["principal"]=$img_prin_data;
		        $data_inicio[$key]["lifestyle"]=$img_lifestyle_data;
		        $data_inicio[$key]["producto"]=$img_producto_data;
		        $data_inicio[$key]["clase"]=$clase;
		        $data_inicio[$key]["categoria"]=$categoria;
		        $data_inicio[$key]["ciudad"]=$ciudad;
          
    }
  
		$data["lista"]=$data_inicio;

		
	break;
	
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//---////---////---////---////---////---////---////---////---////---////---//
//---////---// C - A - T - E - G - O - R - I - A //---////---////---////---////---////---////---////---////---////---////---////---////---////---////---////---////---//
	case 'categoria':	
	// var_dump($_POST["id_clase"]);
		$categoria=$_POST["id_categoria"];

		// $categoria=$mysql->consulta("SELECT * FROM categoria ORDER BY nombre ASC ");

  		$data_clase=$mysql->consulta("SELECT * FROM clase WHERE id_categoria='".$categoria."' ORDER BY nombre ASC");
  		$data_clase_img=$mysql->consulta("SELECT * FROM imagenes_clase ORDER BY id_clase ASC");
		
  // 		$data_producto=$mysql->consulta("SELECT * FROM producto WHERE categoria='".$categoria."' ORDER BY id_ciudad ");  
		
		// $data_img_prin=$mysql->consulta("SELECT * FROM imagenes_principal");	
  
  //     	$data_img_producto=$mysql->consulta("SELECT * FROM imagenes_producto");


      	foreach ($data_clase as $key => $value) {
      		// var_dump($value);
      		


      			$img_clase =multidimensional_search_array($data_clase_img,["id_clase"=>$value["id_clase"]]);
	  
	          
		        $data_inicio[$key]=$value;
		        $data_inicio[$key]["images"]=$img_clase;          
    }
  
		$data["lista"]=$data_inicio;

		
	break;

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//---////---////---////---////---////---////---////---////---////---////---//
//---////---// P - R - O - D - U - C - T - O - //---////---////---////---////---////---////---////---////---////---////---////---////---////---////---////---////---//
	case 'clase':
	// var_dump($_POST["id_clase"]);
		$clase=$_POST["id_clase"];

		// $clase=$mysql->consulta("SELECT * FROM clase ORDER BY nombre ASC ");

  		$data_producto=$mysql->consulta("SELECT * FROM producto WHERE id_clase='".$clase."' ORDER BY orden ASC");
  		$data_producto_img=$mysql->consulta("SELECT * FROM imagenes_principal ORDER BY id_producto ASC");
		
  // 		$data_producto=$mysql->consulta("SELECT * FROM producto WHERE producto='".$producto."' ORDER BY id_ciudad ");  
		
		// $data_img_prin=$mysql->consulta("SELECT * FROM imagenes_principal");	
  
  //     	$data_img_producto=$mysql->consulta("SELECT * FROM imagenes_producto");


      	foreach ($data_producto as $key => $value) {
      		// var_dump($value);
      		


      			$img_producto =multidimensional_search_array($data_producto_img,["id_producto"=>$value["id_producto"]]);
	  
	          
		        $data_inicio[$key]=$value;
		        $data_inicio[$key]["images"]=$img_producto;          
    }
  
		$data["lista"]=$data_inicio;

		
	break;



	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//---////---////---////---////---////---////---////---////---////---////---//
//---////---// S - E - A - R - C - H -  I - N - G  - //---////---////---////---////---////---////---////---////---////---////---////---////---////---////---////---////---//
	case 'producto':
		$producto=$_POST["id_producto"];

		
  		$data_producto=$mysql->consulta("SELECT * FROM producto WHERE id_producto='".$producto."'");  
		$data_categoria=$mysql->consulta("SELECT * FROM categoria WHERE id_categoria='".$data_producto[0]["id_categoria"]."'");

  		$data_clase=$mysql->consulta("SELECT * FROM clase WHERE id_clase='".$data_producto[0]["id_clase"]."'");
		
  		$data_img_prin=$mysql->consulta("SELECT * FROM imagenes_principal WHERE id_producto='".$data_producto[0]["id_producto"]."'");


      	$data_img_producto=$mysql->consulta("SELECT * FROM imagenes_producto WHERE id_producto='".$data_producto[0]["id_producto"]."'");

      	$key=0;
      	 $data_inicio[$key]=$data_producto[0];
        $data_inicio[$key]["principal"]=$data_img_prin[0];
        $data_inicio[$key]["imagenes"]=$data_img_producto;
        $data_inicio[$key]["clase"]=$data_clase[0];
        $data_inicio[$key]["categoria"]=$data_categoria[0];


		$data["lista"]=$data_inicio;

		
	break;


	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//---////---////---////---////---////---////---////---////---////---////---//
//---////---// S - E - A - R - C - H -  I - N - G  - //---////---////---////---////---////---////---////---////---////---////---////---////---////---////---////---////---//
	case 'ciudad':
		$clase=$_POST["id_ciudad"];

		$categoria=$mysql->consulta("SELECT * FROM categoria ORDER BY nombre ASC ");
  		$data_clase=$mysql->consulta("SELECT * FROM clase ORDER BY nombre ASC");
  		$data_ciudad=$mysql->consulta("SELECT * FROM municipio ORDER BY nombre ASC");
  		$data_producto=$mysql->consulta("SELECT * FROM producto WHERE id_ciudad='".$clase."' ORDER BY nombre ");  

		$data_img_prin=$mysql->consulta("SELECT * FROM imagenes_principal");	
  
      	$data_img_lifestyle=$mysql->consulta("SELECT * FROM imagenes_lifestyle");
  
      	$data_img_producto=$mysql->consulta("SELECT * FROM imagenes_producto");


      	foreach ($data_producto as $key => $value) {
      		// var_dump($value);
      		


      			$img_prin_data =multidimensional_search_array($data_img_prin,["id_producto"=>$value["id_producto"]]);
          
	          	$img_lifestyle_data =multidimensional_search_array($data_img_lifestyle,["id_producto"=>$value["id_producto"]]);
	  
	         	$img_producto_data =multidimensional_search_array($data_img_producto,["id_producto"=>$value["id_producto"]]);
	  
	         	$clase =multidimensional_search_array($data_clase,["id_clase"=>$value["id_clase"]]);
	  
	          	$ciudad =multidimensional_search_array($data_ciudad,["id_ciudad"=>$value["id_ciudad"]]);
	  
	          	$categoria=multidimensional_search_array($categoria,["categoria"=>$value["categoria"]]);
	  
	  
	          
		        $data_inicio[$key]=$value;
		        $data_inicio[$key]["principal"]=$img_prin_data;
		        $data_inicio[$key]["lifestyle"]=$img_lifestyle_data;
		        $data_inicio[$key]["producto"]=$img_producto_data;
		        $data_inicio[$key]["clase"]=$clase;
		        $data_inicio[$key]["categoria"]=$categoria;
		        $data_inicio[$key]["ciudad"]=$ciudad;
      		

          
          
    }
  
		$data["lista"]=$data_inicio;

		
	break;



	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//---////---////---////---////---////---////---////---////---////---////---//
//---////---// P - R - O - D - U - C - T - O - //---////---////---////---////---////---////---////---////---////---////---////---////---////---////---////---////---//
	case 'producto':	

	

	break;
}
	
$valores_regreso = json_encode($data,JSON_UNESCAPED_SLASHES);
				
		echo $valores_regreso;


?>