<?php

/*//------------- CLASE USUARIO -----------------*/
class Usuario
{
/*//------------- Inicio función -----------------*/
	////// Atributos de la clase.
	private $user;
	private $correo; 
	private $pass_usr; 
	private $email;

	private $sesion_name;
	
	private $longitud;
	private $dabe;
	private $data;

	private $mysql;
	private $seccion;

//inicializa el numero de productos en 0
	function __construct()
	{		
		global $seccion, $sesion_name;

		$this->mysql= new Con_mysqli;

		
		$this->seccion=$seccion;

		$this->sesion_name="SPABRA";

		// echo "<pre>";
		// var_dump($GLOBALS['sesion_name']);
		// echo "</pre>";


		$this->user='';
		$this->correo=''; 
		$this->pass_usr=''; //Vaciamos la info del usuario

		
		// $password="123";
		// echo $hash = password_hash($password, PASSWORD_DEFAULT);

		if($_POST[email]=='' or $_POST[pass_usr]==''){

			// echo "<pre> SESSION NO POST<br/>";
			// 	var_dump($_SESSION);
			// 	echo "</pre>";

			$this->check_usuario($_SESSION[$this->sesion_name][email], $_SESSION[$this->sesion_name][pass_usr]);
		}
		else
		{
			unset($_SESSION[$this->sesion_name][email]);
			unset($_SESSION[$this->sesion_name][pass_usr]);

			$_SESSION[$this->sesion_name][email]=$_POST[email];
			$_SESSION[$this->sesion_name][pass_usr]=$_POST[pass_usr];
			
			$this->log_usuario($_SESSION[$this->sesion_name][email],$_SESSION[$this->sesion_name][pass_usr]);
		}

	}

	// Login del usario, se comprueba la existencia y de ser así se pasan las variable a $SESSION para que se inicie la sesion. 
	function log_usuario($user, $pass_usr){
		if($user!='' or $pass_usr!='')
		{	
			$data_user=$this->mysql->consulta_global("usuario",["email"=>"$user"]);

			if ($data_user !='')
			{
				// echo "<pre> SESSION <br/>";
				// var_dump($data_user->pass_usr);
				// echo "</pre>";
				if (password_verify($pass_usr, $data_user->pass_usr)) 
				{
					foreach ($data_user as $key => $value)
		        	{
						$_SESSION[$this->sesion_name][user_data][$key]=$value;
		        	}

				}
				else{
				unset($_SESSION[$this->sesion_name][email]);
				unset($_SESSION[$this->sesion_name][pass_usr]);

				}
			}
			else{
				unset($_SESSION[$this->sesion_name][email]);
				unset($_SESSION[$this->sesion_name][pass_usr]);
			}
		}
		else{
				unset($_SESSION[$this->sesion_name][email]);
				unset($_SESSION[$this->sesion_name][pass_usr]);
			}
	}		

	function check_usuario($user, $pass_usr){

		// echo "string".$this->seccion;
		
		if($user!='' or $pass_usr!='')
		{	
			// echo "check usuario";	
			$pass_check=$this->mysql->consulta_individual("pass_usr","usuario",["email"=>"$user"]);

				// echo "<pre> SESSION <br/>";
				// var_dump($data_user->pass_usr);
				// echo "</pre>";

				if (password_verify($pass_usr, $pass_check)) 
				{
					
					$_SESSION[$this->sesion_name][email]=$user;
					$_SESSION[$this->sesion_name][pass_usr]=$pass_usr;
				}
				else if ($this->seccion != "") {
				unset($_SESSION[$this->sesion_name][email]);
				unset($_SESSION[$this->sesion_name][pass_usr]); 

				 echo "
              
                 <script language='javascript' type='text/javascript'>
                setTimeout ( function(){ 
                location.href='index.php'}
                ,0);
            	</script>


            	";

				}
		
		}
		else if ($this->seccion != "") {
			
		echo "
                 <script language='javascript' type='text/javascript'>
                setTimeout ( function(){ 
                location.href='index.php'}
                ,0);
            	</script>


            ";
        // people can view your members-only content without logging in. 
        die(""); 
		}

	}

	function check_sesion(){

		// echo "<pre> SESSION<br/>";
		// 		var_dump($this->sesion_name);
		// 		echo "</pre>";

		if($_SESSION[$this->sesion_name][email]=='' or $_SESSION[$this->sesion_name][pass_usr]=='')
		{	
				 echo "
              
                 <script language='javascript' type='text/javascript'>
                setTimeout ( function(){ 
                location.href='index.php'}
                ,0);
            	</script>

            	";
				
				  die(""); 
		
		}

	}
		

// Cerramos sesion y desintanciamos las variable de session
	function cerrar_sesion($setime){
		unset($_SESSION[$this->sesion_name][email]);
		unset($_SESSION[$this->sesion_name][pass_usr]);
		session_destroy();
		$_POST = array();
		echo '
		<style>
			#menu_user{
 			   display:none;
			}
		</style>
		<script>
			var go_to = function() {
   			 	location.href="../";
			};
			
			setTimeout ("go_to();" , '.$setime.');
		</script> ';
}




// // Validamos que el correo no exista
// 	function correo_check($correo){
// 		$s1="SELECT email 
// 			FROM usuario WHERE email='".$correo."' LIMIT 1 ";
// 		$q1 = mysql_query($s1);
// 		$r1= mysql_fetch_array($q1);

// 		return $r1[0];
// 	}

// // Generar clave unica
// 	function generar_clave($longitud){ 
// 	       $cadena="[^A-Z0-9]"; 
// 	       return substr(eregi_replace($cadena, "", md5(rand())) . 
// 	       eregi_replace($cadena, "", md5(rand())) . 
// 	       eregi_replace($cadena, "", md5(rand())), 
// 	       0, $longitud); 
// 	} 

// // BUscar que no se duplique la clave de usuario
// 	function noduplicar_clave($data, $dabe, $longitud){ 

// 		do{

// 			$clave= $this->generar_clave($longitud);

// 		      	$s1="SELECT ".$data." FROM ".$dabe." WHERE ".$data."='".$clave."' LIMIT 1 ";
// 			$q1 = mysql_query($s1);
// 			$r1= mysql_fetch_array($q1);

// 			$clave_check = $r1[0];

// 		} while ( $clave_check != "") ;

// 		return $clave;
// 	} 



function cerrar_sesion_admin($setime){
		unset($_SESSION[$this->sesion_name][email]);
		unset($_SESSION[$this->sesion_name][pass_usr]);
		session_destroy();
		$_POST = array();
		echo '
		<style>
			#menu_user{
 			   display:none;
			}
		</style>
		<script>
			var go_to = function() {
   			 	location.href="../";
			};
			
			setTimeout ("go_to();" , '.$setime.');
		</script> ';
}


// // Tomamos los datos del post y reescribimos los datos que hayan cambiado 
// 	 function consulta_individual($consulta_data, $consulta_db){

// 	 	$s = 'Select '.$consulta_data.' From '.$consulta_db.' Where id_usuario="'.$_SESSION[$this->sesion_name][user_data][id_usuario].'"';
// 		$q = mysql_query($s);
// 		$r1= mysql_fetch_array($q);

// 		return $r1[0];
// }

// // Tomamos los datos del post y reescribimos los datos que hayan cambiado 
// 	 function update_individual($consulta_data, $consulta_db, $update_data){
// 		$s2 = "Update ".$consulta_db." 
// 			Set ".$consulta_data."='".$update_data."'  
// 			Where id_usuario='".$_SESSION[$this->sesion_name][user_data][id_usuario]."'
// 			";
// 		$q2 = mysql_query($s2);
// }

// // Tomamos los datos de un array y reescribimos los datos que hayan cambiado 
// 	 function data_update($array_data, $db_data){

// 		if ( isset($_SESSION[$this->sesion_name][user_data][id_usuario])) 
// 		{
// 			// Sacamos los nombres de los keys y hacemos un 
// 			//array a partir de ellos para usarlos posteriormente 
// 			$key_list=array_keys($array_data);
// 			//en base a esos nombres de los  key y el numero de ellos corremos una comparación de los datos que si cambiaron y los actualizamos en la base de datos
// 			foreach ($key_list as $key => $dato) 
// 			{
// 				//consultamos en la base de datos uno por uno los datos de acuerdo a los keys del array
// 				$key_info_bd=$this->consulta_individual($dato, $db_data);
// 				//imprimimos uno por uno los datos de acuerdo a los keys del POST
// 				$key_info_post=$array_data[$dato]; //
// 				//Hacemos la comparación para verificar cuales datos cambiaron
// 				if ($key_info_bd != $key_info_post)
// 				{	
// 					//Actualizamos en la BD uno por uno los datos que cambiaron
// 					$this->update_individual($dato,$db_data,$key_info_post);
// 				}
			
// 			}
// 		 }
// }


//  // Asignación de datos de $_SESSION[$this->sesion_name] de acuerdo a un array resultante de una consulta de la DB 
// 	 function data_display($db_display, $array_display){


// 		if ( isset($_SESSION[$this->sesion_name][user_data][id_usuario])) {
// 			//hacemos la consulta y generamos un array en base a la consulta
// 			$s = 'Select * From '.$db_display.' Where id_usuario="'.$_SESSION[$this->sesion_name][user_data][id_usuario].'"   ';
// 			$q = mysql_query($s);
// 	 		$r = mysql_fetch_array($q);
// 	 		// Sacamos los nombres de los keys y hacemos un 
// 			//array a partir de ellos para usarlos posteriormente 
// 			$key_list=array_keys($r);
// 			//El Key list trae algunos keys numericos que duplican la funcion, solamente tomamos lo key que sean string, en base a esos keys asignamos los valores a un subarray en $_SESSION[$this->sesion_name]
// 			foreach ($key_list as $key => $dato) 
// 			{	
// 				 if(is_string($dato) ){
// 				 	$_SESSION[$this->sesion_name][$array_display][$dato]= $r[$dato];
// 				 } 
// 			 } 
// 		 }
		
// 	 }




 // Asignación de datos de $_SESSION[$this->sesion_name] de acuerdo a un array resultante de una consulta de la DB 
	 function change_password($old_password, $new_password, $check_password){
	 	// $password="123";
		// echo $hash = password_hash($password, PASSWORD_DEFAULT);
	 	
		$user=$_SESSION[$this->sesion_name][email];
	 	$data_user=$this->mysql->consulta_global("usuario",["email"=>"$user"]);

	 // 	$return_data["msj"]="Se ha cmabiado tu contraseña exitosamente.";
		// $return_data["respuesta"]=true;
	 	

	 	//Revisar que esta contraseña si sea del usuario
		if (password_verify($old_password, $data_user->pass_usr)) 
		{
			
			//Vamos a verificar que el nuevo pasword si coincida
			if ($new_password === $check_password && !empty($new_password) && !empty($check_password)) {
				

				$hash=password_hash($check_password, PASSWORD_DEFAULT);

				$upd=$this->mysql->update_individual("pass_usr","usuario",$hash,["email"=>"$user"]);

				if ($upd) {
					$return_data["msj"]="Se ha cambiado tu contraseña exitosamente. Deberás volver a acceder.";
					$return_data["respuesta"]=true;
					
					unset($_SESSION[$this->sesion_name][email]);
					unset($_SESSION[$this->sesion_name][pass_usr]);
					session_destroy();
					$_POST = array();

					// echo "<pre> PASSWORD<br/>";
					// var_dump($data_user);
					// echo "</pre>";
				}
				else{
					$return_data["msj"]="Hubo un error al actualizar la contraseña";
					$return_data["respuesta"]=false;
				}
				
			}
			else{
				$return_data["msj"]="No coinciden las contraseñas, confirma la nueva contraseña";
				$return_data["respuesta"]=false;
			}
		}
		else{
			$return_data["msj"]="La contraseña actual no es valida, vuelve a intentarlo";
			$return_data["respuesta"]=false;


		
		}


		// echo "<pre> RETUR DATA<br/>";
		// 		var_dump($return_data);
		// echo "<br/>";
		// 		var_dump($data_user);
		// echo "</pre>";
		
		return $return_data;
	 }


 // Solicitamos una nueva contraseña 
	 function reset_password($array_display){
	 	$correo_data= $this->correo_check($array_display[email]);
	 	if ( isset($correo_data) ){

	 		$clave_confirmacion= $this->noduplicar_clave('clave_confirmacion','usuario',20);

	 		$s2 = "Update usuario 
			Set clave_confirmacion ='".$clave_confirmacion."'  
			Where email='".$array_display[email].
			"'";

			if (mysql_query($s2)) 
			{
				$notificaciones = new Notificaciones;
	 			$prueba=$notificaciones->do_note('recuperar_password',$array_display[email], $clave_confirmacion);
				// return'SI CAMBIO LA BASE DE DATOS';

				return'
		 		<h4 class="color text-center" >— El correo que haz ingresado si existe —</h4>
		 		'.$clave_confirmacion.'
		 		VARIABLE DE REGRESO'.$prueba.'
		 		';
			}
	 	}
	 	else
	 	{
	 		$_POST= array();
		   	return'
		   	<h4 class="color text-center" >— EL CORREO QUE HAZ INGRESADO NO EXISTE  —</h4>
			<a href="index.php?seccion=recuperar_password"> <p>Intentalo de nuevo</p> </a>
		          <script language="javascript" type="text/javascript">
		            setTimeout ( function(){ 
		            location.href="index.php?seccion=recuperar_password"}
		            ,5000);
		          </script>
		   	';
	 	}


	 }

	
/*//------------- Fin CLASS -----------------*/

}



?>