<?
	error_reporting(0);

	session_start();

	include("../../incluir/config.php");
	include("../../incluir/class_mysqli.php");
	include("../../incluir/class_usuario.php");
	include("../../incluir/funciones.php");

	$mysql= new Con_mysqli;

	$usuario= new Usuario;
	$usuario->check_sesion();

	// echo 'mmmmmm';
	// echo "<pre>";
	// var_dump($_POST);
	// var_dump($_FILES);
	// // var_dump($_SESSION);
	// echo "</pre>";


	switch($_POST["seccion"])
	{


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//---////---////---////---////---////---////---////---////---////---////---//
//---////---// N - U - E - V - O //---////---////---////---////---////---////---////---////---////---////---////---////---////---////---////---////---//
		case 'nuevo':

		
			$valores_regreso=array();
			
			$max_data=$mysql->consulta("SELECT MAX(id_clase), MAX(orden) FROM clase");
			
			$id=$max_data[0]["MAX(id_clase)"];
			if ($id === NULL){$id=0;}
			$id=$id+1;
			
			$orden=$max_data[0]["MAX(orden)"];
			if ($orden === NULL){$orden=0;}
			$orden=$orden+1;

			if (!empty($id))
			{
				$name_dir="files/clase/".$id."/";
				
				if(mkdir($name_dir, 0777, true))
				{
					$valores_regreso["imagenes"]=$mysql->upload_files_general($name_dir,"all",50000000,["id_clase"=>$id],"imagenes_clase");

					if ($valores_regreso["imagenes"][0]["respuesta"]) {



						//////-----------//////-----------//////-----------//////-----------//////-----------//////-----------//////-----------//////-----------//////-----------
						$id_new=$_POST["categoria"];

						
						$categoria_data=$mysql->consulta("SELECT * FROM categoria");
						

						if (!is_numeric($id_new)) {
							// echo "no es numerico";
							$categoria_max_data=$mysql->consulta("SELECT MAX(id_categoria), MAX(orden) FROM categoria");
							
			
							$id_cat=$categoria_max_data[0]["MAX(id_clase)"];
							if ($id_cat === NULL){$id_cat=0;}
							$id_cat=$id_cat+1;
							
							$orden_cat=$categoria_max_data[0]["MAX(orden)"];
							if ($orden_cat === NULL){$orden_cat=0;}
							$orden_cat=$orden_cat+1;

							$categoria_exist=multidimensional_search_array($categoria_data, ["nombre"=>$_POST["categoria"]]);
							// var_dump($categoria_exist);
							
							if (empty($categoria_exist)) {
								
								$data= array(
									"nombre"=>$_POST["categoria"],
									"orden"=>$orden_cat,
									"id_categoria"=>$id_cat
								);								
								$id_new=$mysql->insert_individual("categoria",$data);
								$valores_regreso["categoria_nombre"]=$_POST["categoria"];
								$valores_regreso["id_categoria"]=$id_new;
							}
							else{
								$id_new=$categoria_exist["id_categoria"];
								$valores_regreso["categoria_nombre"]=$categoria_exist["nombre"];
								$valores_regreso["id_categoria"]=$id_new;
							}

						}
						else{
							$categoria_exist=multidimensional_search_array($categoria_data, ["id_categoria"=>$_POST["categoria"]]);
							
							
							$valores_regreso["categoria_nombre"]=$categoria_exist["nombre"];
							$valores_regreso["id_categoria"]=$categoria_exist["id_categoria"];
						}
						//////-----------//////-----------//////-----------//////-----------//////-----------//////-----------//////-----------//////-----------//////-----------

							// var_dump($_POST["categoria"]);
							// var_dump($categoria_exist);
							// var_dump($categoria_data);


						$data= array(
							"id_clase"=>$id,
							"orden"=>$orden,
							"nombre"=>$_POST["nombre"],
							"name"=>$_POST["name"],
							"id_categoria"=>$valores_regreso["id_categoria"]
						);

						$id=$mysql->insert_individual("clase",$data);

						$valores_regreso["respuesta"]=true;
						$valores_regreso["id"]=$id;
						$valores_regreso["id_clase"]=$id;
						$valores_regreso["nombre"]=$_POST["nombre"];
						$valores_regreso["orden"]=$orden;
						$valores_regreso["name"]=$name;
						
					}
					else{
						$valores_regreso["respuesta"]=false;
						$valores_regreso["msj"]=$valores_regreso["imagenes"][0]["msj"];
					}
				}
				else
				{
					$valores_regreso["respuesta"]=false;
					$valores_regreso["msj"]='<h3 style="text-align: center;color: red;">Lo sentimos, ha ocurrido un problema durante la creacion del directorio, no se ha cargado.</h3>';;
				}
			}
			else
			{
				$valores_regreso["respuesta"]=false;
				$valores_regreso["msj"]='<h3 style="text-align: center;color: red;">Lo sentimos, ha ocurrido un problema al obtener el último ID, no se ha cargado.</h3>';;
			}

			$valores_regreso = json_encode($valores_regreso,JSON_UNESCAPED_SLASHES);
				
			echo $valores_regreso;	

		break;




////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//---////---////---////---////---////---////---////---////---////---////---//
//---////---// O R D E N A R //---////---////---////---////---////---////---////---////---////---////---////---////---////---////---////---////---//
		case 'ordenar':	

			$id_existense=$mysql->consulta("SELECT orden FROM clase WHERE orden=".$_POST["orden_id"]);
	
			if (!empty($id_existense)) {

				$id_existense= $id_existense[0]["orden"];

				$valores_regreso["respuesta"]=FALSE;
				$valores_regreso["msj"]="Ya existe el número".$id_existense.". Captura otro número.";

			}
			else{

				$id=$mysql->update_individual("orden","clase",$_POST["orden_id"],["id_clase"=>$_POST["id"]]);
				$valores_regreso["respuesta"]=TRUE;
				$valores_regreso["msj"]="Se ha cambiado  ".$_POST["orden_id"].".";
			}

			$valores_regreso = json_encode($valores_regreso,JSON_UNESCAPED_SLASHES);
				
			echo $valores_regreso;	
		
		break;


		////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//---////---////---////---////---////---////---////---////---////---////---//
//---////---// E D I T A R //---////---////---////---////---////---////---////---////---////---////---////---////---////---////---////---////---//

		case 'editar':	
			$id=$_POST["id"];
			$name_dir="files/clase/".$id."/";	

			$valores_regreso=array();
			
			$first_value = reset($_FILES);

			if (condition) {
				# code...
			}

			$categoria_data=$mysql->consulta("SELECT * FROM categoria");

			$categoria_exist=multidimensional_search_array($categoria_data, ["id_categoria"=>$_POST["categoria"]]);
			$valores_regreso["nombre_categoria"]=$categoria_exist["nombre"];
			$valores_regreso["id_categoria"]=$categoria_exist["id_categoria"];


			if (!empty($first_value["name"])) {

				

				# code...
			
				$valores_regreso["imagenes"]=$mysql->upload_files_general($name_dir,"all",50000000,["id_clase"=>$id],"imagenes_clase");

				if ($valores_regreso["imagenes"][0]["respuesta"]) {


					


					
					$data= array(n,
							"nombre"=>$_POST["nombre"],
							"id_categoria"=>$valores_regreso["id_categoria"]
					);

					$id=$mysql->data_update($data, "clase", ["id_clase"=>$_POST["id"]]);	

		

						$valores_regreso["imagenes"][0]["file"]="files/clase/".$_POST["id"]."/".$valores_regreso["imagenes"][0]["file"];
						$valores_regreso["respuesta"]=true;
						$valores_regreso["id"]=$_POST["id"];;
						$valores_regreso["nombre"]=$_POST["nombre"];
						$valores_regreso["name"]=$_POST["name"];
				}
				else{
					$valores_regreso["respuesta"]=false;
					$valores_regreso["msj"]=$valores_regreso["imagenes"][0]["msj"];
				}
			}
			else{

				$data= array(

							"nombre"=>$_POST["nombre"],
							"id_categoria"=>$valores_regreso["id_categoria"]
				);

				$id=$mysql->data_update($data, "clase", ["id_clase"=>$_POST["id"]]);	

				$valores_regreso["imagenes"][0]["id_foto"]="";
					$valores_regreso["imagenes"][0]["file"]="";
					$valores_regreso["respuesta"]=true;
					$valores_regreso["id"]=$_POST["id"];
					$valores_regreso["id_clase"]=$_POST["id"];;
					$valores_regreso["nombre"]=$_POST["nombre"];
					$valores_regreso["name"]=$_POST["name"];

			}			
			
			$valores_regreso = json_encode($valores_regreso,JSON_UNESCAPED_SLASHES);
				
			echo $valores_regreso;	

		break;	

		////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//---////---////---////---////---////---////---////---////---////---////---//
//---////---// B _ O _ R _ R _ A _ R  ++++  I - M - A - G - E - N//---////---////---////---////---////---//  clase
//		--////---////---////---////---////---////---////---////---////---////---////---//	
//---////---////---////---////---////---////---////---////---////---////---//	
		case 'borrar_foto':	

		
			$dato=$_POST['id'];


		    $dir_name='';

	        if($dato!='' || $dato!=NULL){

	        	$file_data=$mysql->consulta_global('imagenes_clase',["id_imagen"=>$dato]);

	        	// var_dump($file_data);
	        
	            // $del_advise=$mysql->delete_files_individual($file_data->thumb,$dir_name);

	            // if ($del_advise["respuesta"]) {
	            // 	// var_dump($del_advise);

	            	$del_advise=$mysql->delete_files_individual($file_data->file_name,$dir_name);
	            	
	            	if ($del_advise["respuesta"]) {
	            		// echo "<br>del advise 2<br>";
	            		// var_dump($del_advise);
	            		$id=$mysql->delete_individual("imagenes_clase",["id_imagen"=>$dato]);
	    
	            		$valores_regreso=array(
							'id_imagen' => $dato,
							'id'=>$file_data->id_clase,
							'respuesta' => $del_advise["respuesta"],
							'advise'=>$del_advise["msj"]
						);
							// echo "<pre>";
	      //   	var_dump($file_data);
	      //   	echo "</pre>";

	            	}	
	            	else
	            	{
	            		$valores_regreso=array(			
						'id' => $dato ,
						'respuesta' => $del_advise["respuesta"],
						'advise'=>$del_advise["msj"]
						);
	            	}
	    //         }
	    //         else
	    //         {

	    //         	$valores_regreso=array(
					// 	'id' => $dato ,
					// 	'respuesta' => $del_advise["respuesta"],
					// 	'advise'=>$del_advise["msj"]
					// );
	    //         }
	        }	
		
			$valores_regreso = json_encode($valores_regreso,JSON_UNESCAPED_SLASHES);
				
			echo $valores_regreso;			

	

		break;	

		////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//---////---////---////---////---////---////---////---////---////---////---//
//---////---// B _ O _ R _ R _ A _ R //---////---////---////---////---////---////---////---////---////---////---////---////---////---////---////---////---//		

		case 'borrar':	

			$id_doc=$_POST['id'];
		   
	        if($id_doc!='' || $id_doc!=NULL)
	        {

	        	$file_data=$mysql->consulta("SELECT * FROM imagenes_clase WHERE id_clase ='".$id_doc."'");

	        	if (!empty($file_data)) {	        	
	        		foreach ($file_data as $key => $value) {
		        		$del_advise=$mysql->delete_files_individual($value["file_name"],$dir_name);

		        		if ($del_advise["respuesta"]) {
		        			$id=$mysql->delete_individual("imagenes_clase",["id_imagen"=>$value["id_imagen"]]);
		        		}

		        		if ($id) {
		    				$ruta="files/clase/".$id_doc;
							eliminarDir($ruta);
		        			$id=$mysql->delete_individual("clase",["id_clase"=>$id_doc]);

		        			if ($id) {
		        				$valores_regreso=array(
									'id' => $id_doc ,
									'respuesta' => true,
									'advise'=>"<h3>La clase se ha borrado con éxito.</h3>"
								);
		        			}
		        		}
		        		else
			            {
			            	$valores_regreso=array(
								'id' => $id_doc ,
								'respuesta' => false,
								'advise'=>"<h3>hubo un problema al borrar la clase, intentalo otra vez o comunicate con el administrador.</h3>"
							);
			            }	
	        		}

	    		}
	    		else{
	    			$ruta="files/clase/".$id_doc;
					eliminarDir($ruta);
        			$id_noimg=$mysql->delete_individual("clase",["id_clase"=>$id_doc]);

        			if ($id_noimg) {
        				$valores_regreso=array(
							'id' => $id_doc ,
							'respuesta' => true,
							'advise'=>"<h3>La clase se ha borrado con éxito.</h3>"
						);
        			}
        			else
        			{
        				$valores_regreso=array(
							'id' => $id_doc ,
							'respuesta' => false,
							'advise'=>"<h3>hubo un problema al borrar la clase, intentalo otra vez o comunicate con el administrador.</h3>"
						);
        			}

	    		}
        		
	            
            }
            

			$valores_regreso = json_encode($valores_regreso,JSON_UNESCAPED_SLASHES);
				
			echo $valores_regreso;	

		break;	

	}


?>










