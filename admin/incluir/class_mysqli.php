<?php
//INIT CLASS
class Con_mysqli
{ 
    private $server;
    private $user;
    private $pass;
    private $data_base;
    
    private $conexion;
    private $flag = false;
    public  $error_conexion = "Error en la conexion a MYSQL";
    private $mysqli;



    function __construct()
    {
        global $HOSTNAME, $USERNAME, $PASSWORD, $DATABASE;

        $this->server = $HOSTNAME;
        $this->user = $USERNAME;
        $this->pass = $PASSWORD;
        $this->data_base = $DATABASE;

        
    }


// /////----/////----//////////----/////----//////////----/////----//////////----/////----//////////----/////----//////////----/////----//// C O R E - - F U N C T I O N S //////----/////----//////////----/////----//////////----/////----//////////----/////----//////////----/////----//////////----/////----//////////----

    private function connect() {
        $this->mysqli = new mysqli($this->server, $this->user, $this->pass, $this->data_base) or die($this->error_conexion);
        $this->flag = true;
        $this->mysqli->query("SET NAMES utf8");
    }

    private function close() {
        if ($this->flag == true) {
            $this->mysqli->close();
        }
    }

    private function query($query) {
        $result = $this->mysqli->query($query) or die(mysqli_error($this->mysqli));
        return $result;
    }

    private function f_obj($query) {
       return $query->fetch_object();
    }

    private function f_array($query) {
        return $query->fetch_array(MYSQLI_ASSOC);
    }

    private function f_all($query) {            
        while ($row = $query->fetch_array(MYSQLI_ASSOC)) 
        {
            $results_array[] = $row;
        }
        return $results_array;
    }

    private function f_row($query) {
        return $query->fetch_row();
    }

    private function f_num($query) {
        //Obtiene el número de filas de un resultado
        return $query->num_rows;
    }
    
    private function f_id() {
        //  Devuelve el id autogenerado que se utilizó en la última consulta
        return $this->mysqli->insert_id;
    }

    private function select($db) {
        //Selecciona la base de datos por defecto para realizar las consultas
        if ($this->mysqli->select_db($db)) {
            $this->data_base = $db;
            return true;
        } else {
            return false;
        }
    }

    private function free_sql($query) {
        $query->free_result();
    }

    private function getMysqli() {
        return $this->mysqli;
    }


// /////----/////----//////////----/////----//////////----/////----//////////----/////----//////////----/////----//////////----/////----//// APLICATION - - F U N C T I O N S //////----/////----//////////----/////----//////////----/////----//////////----/////----//////////----/////----//////////----/////----//////////----  

    public function consulta_individual($consulta_data,$consulta_db,$data_limit) {
        
        $this->connect();

        $str="";
        $index=0;
        //make string query sentence
        foreach ($data_limit as $key => $value)
        {
            if ($index>0) {
                $str.=" AND ";  
            }
            $campo_filtro=$key;
            $dato_filtro=$value;
            $str.= $campo_filtro.'="'.$dato_filtro.'"';
            $index++;
        }
        $s = 'Select '.$consulta_data.' From '.$consulta_db.' Where '.$str;

        // echo "string".$s;
        $row = $this->query($s);    
        $data_response = $this->f_obj($row);
        $this->close();

        return $data_response->$consulta_data;
    }




    public function consulta_global($consulta_db,$data_limit){
        $this->connect();

        $str="";
        $index=0;
        // //make string query sentence
        foreach ($data_limit as $key => $value)
        {
            if ($index>0) {
                $str.=" AND ";  
            }
            $campo_filtro=$key;
            $dato_filtro=$value;
            $str.= $campo_filtro.'="'.$dato_filtro.'"';
            $index++;
        }
        $s = 'Select * From '.$consulta_db.' Where '.$str;
        $row = $this->query($s);    
        $data_response = $this->f_obj($row);
        $this->close();

        return $data_response;
    }




    public function consulta($consulta_param){
        
        $this->connect();
        $s = $consulta_param;
        $row = $this->query($s);    
        $data_response = $this->f_all($row);
        $this->close();

        return $data_response;
    }



    public function update_individual($consulta_data, $consulta_db, $update_data,$data_limit){
        $this->connect();
        $str="";
        $index=0;
        foreach ($data_limit as $key => $value)
        {
            if ($index>0) {
                $str.=" AND ";  
            }

            $campo_filtro=$key;
            $dato_filtro=$value;
            $str.= $campo_filtro.'="'.$dato_filtro.'"';
            $index++;
        }

        $s = 'Update '.$consulta_db.' 
        SET '.$consulta_data.'="'.$update_data.'"   
        Where '.$str;
        $result = $this->query($s);    
        if ($result) {
            $id=  $update_data;
        }
        else{
            $id= 'Error : ('. $this->mysqli->errno .') '. $this->mysqli->error;
        }
        $this->close();
        return $id;
    }


    // ---------DOBLE ARRAY UPDATE COMBO!!!!!!!!!
    public function update_general($consulta_db, $update_data,$data_limit){
        $this->connect();
        $str="";
        $str_update="";
        $index=0;
        $index_update=0;
    //---DATA STRING
        foreach ($update_data as $key => $value)
        {
            if ($index_update>0) {
                $str_update.=", ";  
            }
            $campo=$key;
            $dato=$value;
            $str_update.= $campo.'= "'.$dato.'"';
            $index_update++;
        }
    //---WHERE STRING
        foreach ($data_limit as $key => $value)
        {
            if ($index>0) {
                $str.=" AND ";  
            }
            $campo_filtro=$key;
            $dato_filtro=$value;
            $str.= $campo_filtro.'= "'.$dato_filtro.'"';
            $index++;
        }
        $s = 'UPDATE '.$consulta_db.' 
        SET '.$str_update.'   
        WHERE '.$str
        ;
        $result = $this->query($s);    
        if ($result) {
            $id= $result;
        }
        else{
            $id= 'Error : ('. $this->mysqli->errno .') '. $this->mysqli->error;
        }
        $this->close();
        return $id;
    }


// Tomamos los datos de un array y reescribimos los datos que hayan cambiado 
     public function data_update($array_data, $db_data, $data_limit){

            $value_return=false;
        // if ( isset($_SESSION[user_data][id_usuario])) 
        // {
            // Sacamos los nombres de los keys y hacemos un 
            //array a partir de ellos para usarlos posteriormente 
            $key_list=array_keys($array_data);
            
            //en base a esos nombres de los  key y el numero de ellos corremos una comparación de los datos que si cambiaron y los actualizamos en la base de datos
            foreach ($key_list as $key => $dato) 
            {
                //consultamos en la base de datos uno por uno los datos de acuerdo a los keys del array
                $key_info_bd=$this->consulta_individual($dato, $db_data, $data_limit);
                //imprimimos uno por uno los datos de acuerdo a los keys del POST
                
                $key_info_post=$array_data[$dato]; //
               
                //Hacemos la comparación para verificar cuales datos cambiaron
                if ($key_info_bd != $key_info_post)
                {   
                   
                    //Actualizamos en la BD uno por uno los datos que cambiaron
                    $value_return=$this->update_individual($dato,$db_data,$key_info_post,$data_limit);
                }
            
            }
            return $value_return;
         // }
}


    public function insert_individual($consulta_db,$data_limit){
        $this->connect();
        $str_key="";
        $str_dato="";

        $index=0;
        foreach ($data_limit as $key => $value)
        {
            if ($index>0) {
                $str_key.=", "; 
                $str_dato.='", "';  
            }
            $str_key.=$key;
            $str_dato.=$value;
            $index++;
        }
        $s = 'INSERT INTO '.$consulta_db.' ('.$str_key.' ) VALUES("'.$str_dato.'")'; 
        
        $result = $this->query($s);    
        if ($result) {
            $id= $this->f_id();
        }
        else{
            $id= 'Error : ('. $this->mysqli->errno .') '. $this->mysqli->error;
        }
        $this->close();
        return $id;
    }



    //SUBIR ARCHIVOS debemos pasar el nombre del archivo, 
    // $data_insert=array(
    //                 'id_proyecto' =>$id,
    //                 'file_name'=>$target_file,// se agrega desde adentro
    //                 );

    public function upload_files_individual($file_data,$dir_name,$file_filter, $max_size, $data_insert, $imagen_db, $callback){

        $file_name=basename($file_data["name"]);


        $target_file=$dir_name.$file_name;
        
        $upLoadOk=1;

        $imageFileType = pathinfo($target_file, PATHINFO_EXTENSION);

         // var_dump($target_file);

        if (file_exists($target_file)) {

            $respose["respuesta"]=false;
            $respose["msj"]='<h3 style="text-align: center;color: red;">Lo sentimos ya existe un archivo con este nombre, el archivo no se puede cargar </h3>';

            $upLoadOk = 0;

            return $respose;

        }
        if ($file_data["size"] > $max_size) {

            $respose["respuesta"]=false;
            $respose["msj"]='<h3 style="text-align: center;color: red;">Lo sentimos Tu archivo es muy grande debe ser menor a 5 megas, este archivo no se puede cargar </h3>';

            $upLoadOk = 0;

            return $file_data;
        }
        // echo "FILTER___!".$file_filter;
        // Allow certain file formats
        switch ($file_filter) {
            case 'image':
                $file_filter_data=$imageFileType != "jpg" && $imageFileType != "JPG" && $imageFileType != "PNG" && $imageFileType != "png" && $imageFileType != "jpeg" && $imageFileType != "gif" && $imageFileType != "JPEG";
                break;
            case 'docs':
                $file_filter_data=$imageFileType != "pdf" && $imageFileType != "doc" && $imageFileType != "docx";
                break;
            case 'excel':
                $file_filter_data=$imageFileType != "xls" && $imageFileType != "xlsx";
                break;
            case 'imgAndDocs':
            $file_filter_data=$imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg" && $imageFileType != "gif" && $imageFileType != "pdf" && $imageFileType != "doc" && $imageFileType != "docx";
                break;
            case 'all':
            $file_filter_data=$imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg" && $imageFileType != "gif" && $imageFileType != "pdf" && $imageFileType != "doc" && $imageFileType != "docx" && $imageFileType != "xls" && $imageFileType != "xlsx";
                break;
            
            default:
                # code...
                break;
        }
        if($file_filter_data) 
        {

            $respose["respuesta"]=false;
            $respose["msj"]='<h3 style="text-align: center;color: red;">El formato de archivo que deseas subir no es admitido</h3>';

            $upLoadOk = 0;

            return $respose;

            
        }
            // Check if $uploadOk is set to 0 by an error
        if ($upLoadOk == 0) {
             $respose["respuesta"]=false;
            $respose["msj"]='<h3 style="text-align: center;color: red;">Lo sentimos tu archivo no ha sido cargado </h3>';

            $upLoadOk = 0;
            
            return $respose;
            
        // if everything is ok, try to upload file
        } 
        else {


            if (move_uploaded_file($file_data["tmp_name"], $target_file)) 
            {
                //  echo "DATA INSERT____:::::::<br>";     
                // echo "<pre>";
                // var_dump($file_filter);
                // echo "</pre>";

                if (empty($callback)) {
                    // echo "si estavacio";
    //////////////////////////////////////////////////////////////////////   <--------change data
                    $data_insert["file_name"]=$target_file;
    //////////////////////////////////////////////////////////////////////   <--------change data                             
                    $id_foto=$this->insert_individual($imagen_db,$data_insert);
                }
                else{
    //////////////////////////////////////////////////////////////////////   <--------change data
                    $data_insert["file_name"]=$target_file;
                   
                    // echo "no estavacio";
                    // var_dump($data_insert);
    //////////////////////////////////////////////////////////////////////   <--------change data                             
                    // function calling($imagen_db,$data_insert){
                    //     $id_foto=$this->data_update($data_insert,$imagen_db, ["id_tipo"=>$data_insert["id_tipo"]]);                           
                    //     //insert_individual($imagen_db,$data_insert);
                    // }
                    $callback($imagen_db,$data_insert);

                }

                 
                if ($file_filter =="image")
                {
                        
                    
                    $scale=3;


                  //aquí empieza el código de creación del thumbnail 
                    $source=$target_file; // archivo de origen 
                    $dest=$dir_name."thumb_".$file_name; // archivo de destino 
                    $source_data=getimagesize($source);

                    // echo "FILTER IMAGE____:::::::<br>";   
                    // echo "<pre>";
                    // var_dump($source_data);
                    // echo "</pre>";
                    // echo  $source_data[0];
                    // echo $source_data[1];

                    list($width_s, $height_s, $type, $attr) = getimagesize($source); // obtengo información del archivo 

                    $width_d=$width_s/$scale; // ancho de salida 
                    $height_d=$height_s/$scale; // alto de salida 

                    // switch($_FILES['image']['type'])
                    // {
                    //   case "image/gif": $gd_s = imagecreatefromgif($source); break;
                    //   case "image/jpeg": // Both regular and progressive jpegs
                    //   case "image/pjpeg": $gd_s = imagecreatefromjpeg($source); break;
                    //   case "image/png": $gd_s = imagecreatefrompng($source); break;
                    //   default:  break;
                    // }

                    $gd_s = imagecreatefromjpeg($source); // crea el recurso gd para el origen 
                    $gd_d = imagecreatetruecolor($width_d, $height_d); // crea el recurso gd para la salida 

                    imagecopyresampled($gd_d, $gd_s, 0, 0, 0, 0, $width_d, $height_d, $width_s, $height_s); // redimensiona 
                    $confirm=imagejpeg($gd_d, $dest); // graba 
               
                    // Se liberan recursos 
                    imagedestroy($gd_s); 
                    imagedestroy($gd_d); 
                    
                      // echo "si pasa";
                      //     var_dump($confirm);

                    if ($confirm){
                          
                            $respose["respuesta"]=true;
                            $respose["id_foto"]=$id_foto;
                            $respose["file"]=basename($this->update_individual("thumb", $imagen_db,$dest,["id_imagen"=>$id_foto]));

                        $upLoadOk = 0;
                        
                        return $respose;

                    }
                    else {
                        
                       $respose["respuesta"]=false;
                        $respose["msj"]='<h3 style="text-align: center;color: red;">Lo sentimos, ha ocurrido un problema durante la carga del thumbnail de tu archivo, no se ha cargado.</h3>';

                        $upLoadOk = 0;
                        
                        return $respose;
                    }

                    return $upLoadOk;
                }
                else{

                     // var_dump($file_data);

                    $respose=$file_data; 
                    $respose["file"]=basename($file_data["name"]);
                    $respose["respuesta"]=true;
                    $respose["id_foto"]=$id_foto;
                    

                
                    return $respose;

                       
                }
            } else {
                   
                       $respose["respuesta"]=false;
                        $respose["msj"]='<h3 style="text-align: center;color: red;">Lo sentimos, ha ocurrido un problema durante al tratar de guardar tu archivo, no se ha cargado.</h3>';

                        $upLoadOk = 0;
                        return $respose;
            }
        }
    }


    // si se desea subir varios archivos al mismo tiempo
    public function upload_files_general($dir_name,$file_filter,$max_size,$id,$imagen_db,$callback){
        
        
        $data_return = array();
        // $id=$_GET["id_proyecto"];
        
        foreach ($_FILES as $file_key => $file_data) 
        {
            // var_dump($id);

            $file_name=basename($file_data["name"]);

            if ($file_name != "")
            {
                $confirmacion = $this->upload_files_individual($file_data,$dir_name,$file_filter,$max_size, $id, $imagen_db,$callback);
                array_push($data_return,$confirmacion);
            }
        }

        return $data_return;
    }




    public function delete_files_individual($file_data,$dir_name){
       $target_file=$dir_name.$file_data;
       // echo"target_file"; 
       // var_dump($target_file);
       // var_dump($dir_name);
        if (file_exists($target_file)) {


            if (unlink($target_file)) {

                // echo "file delete";
                // echo '<h1 style="text-align: center;color: green;">Su archivo se borro exitosamente</h1>';
                $response["respuesta"]=true;
                $response["msj"]='<h3 style="text-align: center;color: orange;">Su archivo se borro exitosamente</h3>';
                return $response;
            }
            else{
                $response["respuesta"]=false;
                $response["msj"]="<h3 style='color:red;'>Lo sentimos, el archivo no se pudo borrar.</h3>";
                 return $response;
            }
        }
        else
        {
            $response["respuesta"]=false;
                $response["msj"]="<h3 style='color:red;'>Lo sentimos, el archivo que desea borrar no existe.</h3>";
                return $response;
               
        }
    }




    public function delete_individual($consulta_db,$data_limit){
       $this->connect();
        $str="";
        $index=0;
        
        foreach ($data_limit as $key => $value)
        {
            if ($index>0) {
                $str.=" AND ";  
            }

            $campo_filtro=$key;
            $dato_filtro=$value;
            $str.= $campo_filtro.'="'.$dato_filtro.'"';
            $index++;
        }

        $s = 'DELETE FROM '.$consulta_db.' Where '.$str;

        $result = $this->query($s);    
        if ($result) {
            $id= $result;
        }
        else{
            $id= 'Error : ('. $this->mysqli->errno .') '. $this->mysqli->error;
        }
        $this->close();
        return $id;
    }


// /*- END CLASS
}
?>