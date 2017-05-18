<?php

//get an "n" words number abstract from paragraph description
 
function wordlimit($string, $length, $ellipsis)
	{
	    $words = explode(' ', $string);
	    if (count($words) > $length)
	    {
	            return implode(' ', array_slice($words, 0, $length)) ." ". $ellipsis;
	    }
	    else
	    {
	            return $string;
	    }
	}


// ------- Solicitamos una nueva contraseña 
function ordenar($array_to,$order,$sort) {
		
 // echo "<pre>";
 //          var_dump($sort);
 //          echo "</pre>"; 

       	foreach ($array_to as $key => $value) {
	    	$order_data[$key]=$value[$order];
	    }

        array_multisort($order_data, $sort, $array_to);

        // echo "<pre>";
        //   var_dump($order_data);
        //   echo "</pre>"; 

        // echo "<pre>";
        //   var_dump($array_to);
        //   echo "</pre>"; 

          return $array_to;
}


// ------- returns a key of the finding data
function multidimensional_search($parents, $searched) { 
  if (empty($searched) || empty($parents)) { 
    return false; 
  } 

  foreach ($parents as $key => $value) { 
    $exists = true; 
    foreach ($searched as $skey => $svalue) { 
      $exists = ($exists && IsSet($parents[$key][$skey]) && $parents[$key][$skey] == $svalue); 
    } 
    if($exists){ return $key; } 
  } 

  return false; 
} 


// ------- returns a ARRAY of the finding data
function multidimensional_search_array($parents, $searched) { 
  if (empty($searched) || empty($parents)) { 
    return false; 
  } 

  foreach ($parents as $key => $value) { 
    $exists = true; 
    foreach ($searched as $skey => $svalue) { 
      $exists = ($exists && IsSet($parents[$key][$skey]) && $parents[$key][$skey] == $svalue); 
    } 
    if($exists){ return $value; } 
  } 

  return false; 
} 

// ------- returns an Array width all data matched from the searched parameters.
function multidimensional_search_multiarray($parents, $searched) { 

  if (empty($searched) || empty($parents)) { 
    return false; 
  } 
  foreach ($parents as $key => $value) {     
        $exists = true; 
    foreach ($searched as $skey => $svalue) { 
      $exists = ($exists && IsSet($parents[$key][$skey]) && $parents[$key][$skey] == $svalue); 
    } 
    if($exists){

        $feed_back[$key]=$value;
    } 
  } 
    if (isset($feed_back)){
            return $feed_back;
    } 
    else{
        return false; 
    }    
} 



// ------- OBTENER IP REAL

function get_real_ip()
    {
 
        if (isset($_SERVER["HTTP_CLIENT_IP"]))
        {
            return $_SERVER["HTTP_CLIENT_IP"];
        }
        elseif (isset($_SERVER["HTTP_X_FORWARDED_FOR"]))
        {
            return $_SERVER["HTTP_X_FORWARDED_FOR"];
        }
        elseif (isset($_SERVER["HTTP_X_FORWARDED"]))
        {
            return $_SERVER["HTTP_X_FORWARDED"];
        }
        elseif (isset($_SERVER["HTTP_FORWARDED_FOR"]))
        {
            return $_SERVER["HTTP_FORWARDED_FOR"];
        }
        elseif (isset($_SERVER["HTTP_FORWARDED"]))
        {
            return $_SERVER["HTTP_FORWARDED"];
        }
        else
        {
            return $_SERVER["REMOTE_ADDR"];
        }
 
    }



// ------- BORRAR UNA CARPETA
function eliminarDir($carpeta)
{
    // var_dump($carpeta);
    // var_dump(glob($carpeta."*"));   
    foreach(glob($carpeta."/*") as $archivos_carpeta)
    {
        // var_dump($archivos_carpeta);
 
        if (is_dir($archivos_carpeta))
        {
            eliminarDir($archivos_carpeta);
        }
        else
        {
            unlink($archivos_carpeta);
        }
    }
 
    rmdir($carpeta);
}



// ------- BORRAR UNA CARPETA
function check_number($number)
{

    $number=intval($number);
    echo "Number".$number;
    $id_existense=$mysql->consulta("SELECT orden FROM fraccionamiento WHERE orden=".$number);

    var_dump($id_existense);

    if (!empty($id_existense)) {
      
      // return $id_existense;
    }
    else{
        // $number++;
        // echo "N NUMBer".$number;
        // check_number($number);
    }

}








?>