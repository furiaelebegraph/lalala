<?php


    include("admin/incluir/config.php");
    include("admin/incluir/class_mysqli.php");
    include("admin/incluir/funciones.php");

    $mysql= new Con_mysqli;

    // $lista_categoria=$mysql->consulta("SELECT * FROM categoria INNER JOIN imagenes_categoria ON categoria.id_categoria=imagenes_categoria.id_categoria ORDER BY nombre");

    // $lista_clase=$mysql->consulta("SELECT * FROM clase INNER JOIN imagenes_clase ON clase.id_clase=imagenes_clase.id_clase ORDER BY nombre");
    



//-------> Sección control------->
  $seccion=$_GET['seccion'];

  $destino = array(
      '' =>'inicio',
      'inicio' => 'inicio',
      'intro' => 'intro',
      'lider' => 'lider',
      'portada' => 'portada',
      'nombre' => 'nombre',
      'escuela' => 'escuela',
      'grado' => 'grado',
      'edad' => 'edad',
      'genero' => 'genero',
      'lider' => 'lider',
      'entorno' => 'entorno',
      'productiva' => 'productiva',
      'social' => 'social',
      'personal' => 'personal',
      'plan_vida' => 'plan_vida'
    );

   echo '
    <script type="text/javascript" charset="utf-8">
      var GLOBAL_POST_DATA = '.json_encode($_POST).';
      console.log(GLOBAL_POST_DATA);
      var GLOBAL_GET_DATA = '.json_encode($_GET).';
      var GLOBAL_CATEGORIA = '.json_encode($lista_categoria).';
      var GLOBAL_CLASE = '.json_encode($lista_clase).';
    </script>';


?>
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=800px, user-scalable=no">


    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
    <title>RESCATE INTERACTIVOS</title>

    <meta name="keywords" content=""/>
    <meta name="description" content=""/>

    <meta name="robots" content="robots.txt" />
    <link rel="sitemap" type="application/xml" title="Sitemap" href="sitemap.xml" />
    <meta name="location" content="León, Guanajuato"/>
    <meta name="rating" content=""/>
    <meta name="content-language" content="spanish"/>
    <meta name="copyright" content="2017 ® CENTRO FOX"/> 
    <meta name="author" content="ELEBEGRAPH">

    



    <!-- Bootstrap -->
    <link href="css/main.css" rel="stylesheet">
    <link rel="stylesheet" href="css/font-awesome.min.css"><!-- iconos base-->
    <link rel="stylesheet" href="css/common.min.css">
    <link rel="stylesheet" href="css/circle-menu.css"><!-- Estilo menu radial-->
    <!-- <link rel="stylesheet" href="css/reset.css">  --><!-- CSS reset -->
    <link rel="stylesheet" href="css/style.css"> <!-- Resource style -->
    <link rel="stylesheet" href="css/animsition.css"> <!-- Estilo cambio página-->
    <link rel="stylesheet" href="css/intro.css"> <!-- Estilo cambio página-->
    <link rel="stylesheet" href="css/chat.css"> <!-- Estilo cambio página-->
    <link href="https://afeld.github.io/emoji-css/emoji.css" rel="stylesheet">

    <link href="bootstrap3.3.7/dist/css/bootstrap.css" rel="stylesheet">
    <link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
 <!--     <script src="css/iconos/js/modernizr.custom.js"></script> -->
    <script src="css/hover/dist/scripts/app.js"></script>

    <!-- Enlaces a scripts -->
    <script src="js/jquery3.1.1.js"></script>
    <script src="bootstrap3.3.7/dist/js/bootstrap.js"></script>


    <script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-87253518-1', 'auto');
  ga('send', 'pageview');

</script>





  </head>
  <body id="el_cuerpo">
        <div id="imagen_logo"> 
          <img id="lider_fondo" src="images/logo_lider_fondo.png">
        </div>


        <?php
      include "$destino[$seccion].php"
      ?> 

        <nav class="c-circle-menu js-menu">
          <button class="c-circle-menu__toggle js-menu-toggle" id="btn_menu">
            <span>Toggle</span>
          </button>
          <div class="animsition">
            <ul class="c-circle-menu__items">
              <li class="c-circle-menu__item">
                <a href="index.php?seccion=plan_vida" class="c-circle-menu__link animsition-link" id="plan_vida" title="plan" data-animsition-out-class="fade-out-down-sm" data-animsition-out-duration="1500"><!-- cd-nav-trigger añadir esta clase para cambio del background-->
                  <img src="images/esfera_plan_new.png" alt="Icon_plan">
                </a>
              </li>
              <li class="c-circle-menu__item">
                <a href="index.php?seccion=personal" class="c-circle-menu__link animsition-link" id="personal" title="personal" data-animsition-out-class="fade-out-down-sm" data-animsition-out-duration="1500">
                  <img src="images/esfera_personal_new.png" alt="Icon_personal">
                </a>
              </li>
              <li class="c-circle-menu__item">
                <a href="index.php?seccion=social" class="c-circle-menu__link animsition-link" id="social" title="social" data-animsition-out-class="fade-out-down-sm" data-animsition-out-duration="1500">
                  <img src="images/esfera_social_new.png" alt="Icon_social">
                </a>
              </li>
              <li class="c-circle-menu__item">
                <a href="index.php?seccion=productiva" class="c-circle-menu__link animsition-link" id="productiva" title="productiva" data-animsition-out-class="fade-out-down-sm" data-animsition-out-duration="1500">
                  <img src="images/esfera_productiva_new.png" alt="Icon_productiva">
                </a>
              </li>
              <li class="c-circle-menu__item">
                <a href="index.php?seccion=entorno" class="c-circle-menu__link animsition-link" id="entorno" title="entorno" data-animsition-out-class="fade-out-down-sm" data-animsition-out-duration="1500">
                  <img src="images/esfera_entorno_new.png" alt="Icon_entorno">
                </a>
              </li>
            </ul>
          </div>
          <div class="c-circle-menu__mask js-menu-mask"></div>
        </nav>

       
  </body>


   <!-- VALIDATOR -->
    <link rel="stylesheet" href="css/validation/validationEngine.jquery.css" type="text/css"/>
    <script src="js/validation/languages/jquery.validationEngine-es.js" type="text/javascript" charset="utf-8"></script>
    <script src="js/validation/jquery.validationEngine.js" type="text/javascript" charset="utf-8"></script>



    <!-- <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCzWwqvnHWA9TYtp62vbjIQMmv-XsyBnK4"></script> -->
<!-- <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCzWwqvnHWA9TYtp62vbjIQMmv-XsyBnK4"></script> -->
  <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
  <script src="js/detectmobilebrowser.js"></script>
    <script src="js/circleMenu.min.js"></script>
    <script src="js/modernizr.js"></script> <!-- Modernizr -->
    <script src="js/velocity.min.js"></script>
    <script src="js/animsition.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/handlebars.js/3.0.0/handlebars.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/list.js/1.1.1/list.min.js"></script>
    <script src="js/chat.js"></script>
  <script src="js/main.js"></script>
