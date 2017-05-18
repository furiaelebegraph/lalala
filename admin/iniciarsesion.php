
<div class="text-center">
		
<?

// echo "<pre> ";
// var_dump($_SESSION);
// echo "</pre> ";
	
	if($_SESSION[$sesion_name][email] == '' or $_SESSION[$sesion_name][pass_usr] == '')
	{
		echo '
		<h1 class="color">No haz ingresado los datos correctos</h1>
		<a href="index.php?seccion=login&logini=iniciar"> <p>Intentalo de nuevo</p> </a>
		
		<script language="javascript" type="text/javascript">
			setTimeout ( function(){ 
			location.href=" index.php?seccion=login&logini=iniciar"}
			,5000);
		</script>
		';
	}
	else if($_SESSION[$sesion_name][user_data][tipo]=="admin")
	{
		echo '

			<img id="loader_icon" src="img/loader.gif" alt="cargando">
			<h1 class="color">INICIANDO SESIÓN</h1>
			<p>Bienvenido</p>
			
			<script language="javascript" type="text/javascript">
				setTimeout ( function(){ 
				location.href=" index.php?seccion=inicio"}
				,2500);
			</script>
			';

	}

?>
	</div>
