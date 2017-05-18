<?
	session_start();

	include("incluir/config.php");
	include("incluir/class_mysqli.php");
	include("incluir/class_usuario.php");
	include("incluir/funciones.php");

	$mysql= new Con_mysqli;

	$usuario= new Usuario;
	$usuario->check_sesion();



	// echo 'mmmmmm';
	// echo "<pre>";
	// var_dump($_POST);
	// var_dump($_FILES);
	// var_dump($_SESSION);
	// echo "</pre>";
	

	switch($_POST["seccion"]){
		case 'contrasena':

		$old_password=$_POST["psw_actual"];
		$new_password=$_POST["psw_nueva"];
		$check_password=$_POST["psw_nueva_confirm"];

		$valores_regreso=$usuario->change_password($old_password, $new_password, $check_password);
	
		$valores_regreso = json_encode($valores_regreso,JSON_UNESCAPED_SLASHES);			
		echo $valores_regreso;	

		break;	

	}


?>










