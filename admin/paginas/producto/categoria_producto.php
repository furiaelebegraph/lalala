

<br/>
<br/>

<a href="#" class="btn btn-default" id="ad_btn">Nueva categoria</a>
<!-- FORM NEW tienda -->
<div  id="n_contenedor" class="col-xs-10 offset-xs-2">

  <a href="#" class="btn_close smaler_btn_close" id="close_nuevo"> X </a>
  <h2>Crea una nueva categoria</h2>
  <br>

  <form id="form_one" method="post" action="paginas/producto/control_categoria.php">
    <input name="seccion" type="text" value="nuevo" hidden/>
    
    <div class="col-sm-12">
    <h6>Nombre de la nueva categoria</h6>
    <input type="text" id="text_field" class="validate[required]" placeholder="" name="nombre" value=""/>
  </div>
  
  <!-- <div class="col-sm-6">
     <h6>Name for the new type</h6>

    
    <input type="text" id="text_field" class="validate[required]" placeholder="" name="name" value=""/>

    </div> -->
    
    <div class="col-sm-12">
    <div class="border-bottom" id="content_img">
      <label><h6>Imagenes:</h6></label>
      <p class="small">Seleccione el archivo PNG:
      <input type="file" class="validate[required]" name="foto_1" id="foto_1"/> </p>
    </div>
     
     <div class="col-sm-12">
    <input class="btn btn-default small" type="submit" value="Crear">
     <div id="ya_existe" class="color small" style="color: red ! important;display:none;"> <h2> NO SE HA PODIDO CREAR TU categoria</h2></div></div>
     </div>
  </form>          
</div>
<!--/. FORM NEW tienda -->
<br>
<br>

<!-- POSITIVE ANOUNCE -->
<div class="col-xs-10" id="respuesta" style="">    
    <h1> Se ha cargado tu categoria</h1> 
    <div class="respuesta_cont"> </div>
    <br>
    <br>
</div>
<!--/. POSITIVE ANOUNCE -->
<br>
  
<!--/. TABLE DISPLAY -->
<table cellspacing="0" width="100%" id="example" class="hover">
  <thead>
      <tr>
          <th width="5%">Orden</th>
          <th width="40%">Nombre</th>
          <th width="40%">Imagen</th>
          <th width="7.5%"></th>
          <th width="7.5%"></th>
          
    </tr>
  </thead>
  <tbody>
    <div id="content_img"></div>
<?
    // $data=$mysql->consulta("SELECT * FROM tienda INNER JOIN imagenes_tienda ON tienda.id_tienda=imagenes_tienda.id_tienda");



    $data_img=$mysql->consulta("SELECT * FROM imagenes_categoria");
    $data_categoria=$mysql->consulta("SELECT * FROM categoria ORDER BY orden");

     // echo "<pre>";
     //        var_dump($data_img);
     //        echo "</pre>";   

    if (!empty($data_categoria)) {
      # code...
    

      foreach ($data_categoria as $key => $value) {
          
            $img_data =multidimensional_search_array($data_img,["id_categoria"=>$value["id_categoria"]]);
            // echo "<pre>";
            // var_dump($img_data);
            // echo "</pre>"; 
            if (empty($img_data)) {
              $img_data=["id_imagen"=>NULL];              
            }

            $data[$key]=$value;
            $data[$key]["images"][0]=$img_data;

            // $data[$key]=array_merge($value,$img_data);
            
      }
    }


  echo '
    <script type="text/javascript" charset="utf-8">
      var list_categoria = '.json_encode($data).';
      console.log(list_categoria);
      if (list_categoria == null) {
        list_categoria=[];
      }
    </script>';

    if (!empty($data)) {
     # code...

    


    foreach ($data as $key => $value) {

      // echo "<pre>";
      // var_dump($value);
      // echo "</pre>"; 
      
      $id=$value['id_categoria'];
      $orden=$value['orden'];  
      $nombre=$value['nombre'];  
      $file_name=$value['images'][0]['file_name'];
      $img_name=basename($file_name);

      $enlace_detalle="#";//'index.php?seccion=catalogo_categoria&id_tienda='.$id;

?>
   <tr id="row<?=$id?>">
      
      <td class="border_bottom_green bordesini" nowrap="nowrap" valign="top">
        <p style="display:none;"><?=$orden?></p>
        <input  type="text" class="order_field" title="Cambia el orden" value="<?=$orden?>"  name="orden" id-data=" <?=$id;?> " >
      </td>
         
        
      <td class="nombre_td border_bottom_green bordesini" nowrap="nowrap" valign="top">
        <a class="" href= "<?=$enlace_detalle?>" >
          <?echo $nombre ?>
        </a>
      </td> 

      <td class="imagen_td border_bottom_green bordesini" nowrap="nowrap" valign="top">
        <a href= "paginas/producto/<?=$file_name?>" target="blank" >
           <img src= "paginas/producto/<?=$file_name?>" alt="" style="height:70px;"/>
        </a>
      </td> 

          <td class="bordes editar_td" nowrap="nowrap" valign="top" align="center">
        <a href= "#" title="Ver el detalle" class="editar"  id-element="<?=$id;?>" >
          <img src="img/btn_ver.jpg" border="0"/>
        </a>
        </td>

          <td class="bordes borrar_cont" nowrap="nowrap" valign="top" align="center">
        <a class="borrar" id="noti_borrar" id-element="<?=$id;?>" href="#"  method="post" action="paginas/producto/control_categoria.php" seccion="borrar">
          <img src="img/btn_borrar.jpg" border="0"/>
        </a>
      </td>

    </tr>
<?
  }
}
?>  
  </tbody>
</table>

  



