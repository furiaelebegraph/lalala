<!DOCTYPE html>

<link rel="stylesheet" href="css/validation/validationEngine.jquery.css" type="text/css"/>
<script src="js/validation/languages/jquery.validationEngine-es.js" type="text/javascript" charset="utf-8"></script>
<script src="js/validation/jquery.validationEngine.js" type="text/javascript" charset="utf-8"></script>



<div class="col-xs-6  col-xs-offset-3" id="respuesta" style=""></div>

    <!-- CONTAINER -->
    <article class="container text-center">
        <div class="col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
            <form id="form_one" method="post" name="frmTipo" action="editar.php">

             <input name="seccion" type="text" value="contrasena" hidden/>


                <div class="form-group">
                        <h6 class="small color text-left">Contraseña Actual:</h6>
                        <input class="form-control validate[required]" type="password" name="psw_actual" value="" placeholder="contraseña actual">    
                </div>
                <div class="form-group">
                        <h6 class="small color text-left">Contraseña Nueva:</h6>
                        <input class="form-control validate[required]" type="text" name="psw_nueva" id="password" value="" placeholder="Nueva Contraseña">    
                </div>
                <div class="form-group">
                        <h6 class="small color text-left">Confirmar Contraseña Nueva:</h6>
                        <input class="form-control validate[required,equals[password]]" type="text" name="psw_nueva_confirm" value="" placeholder="Confirmar contraseña">    
                </div>
          

               
                <input class="btn btn-default" type="submit"   value="Guardar Cambios">
            </form>
        </div>
    </article>
    <!-- /.container -->






