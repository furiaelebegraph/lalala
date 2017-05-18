<?php
require("class.phpmailer.php");
require("class.smtp.php");

// echo "<pre>";
// var_dump($_POST);
// echo "</pre>";

$errors = '';

$nombre = $_POST['nombre']; 
$empresa= $_POST['empresa'];
$telefono= $_POST['telefono'];
$email_address = $_POST['email'];
$msj= $_POST['msj'];
$asunto="¡Hola $nombre! Gracias por contactarte con SPABRA.";   
$recipiente= $_POST['recipiente']

// $mailuser = $email;
    
// if( empty($errors))

// {
                
//              $to = $myemail .','. $mailuser.','.'israel.avila@iatmexico.com'.','.'benjamin.gomez@elebegraph.com'; 
                
                
        // $varname = $_FILES['Adjunto']['name'];
        // $vartemp = $_FILES['Adjunto']['tmp_name'];
        
       $mail = new PHPMailer;

        $mail->Host = "localhost";
        $mail->From = "ventas@spabra.com";
        $mail->FromName = $nombre;
        $mail->Subject =$asunto;
        $mail->AddAddress($email_address);
        $mail->AddAddress($recipiente);
        
        
        // if ($varname != "") {
        //     $mail->AddAttachment($vartemp, $varname);
        // }
        $link2 = "http://".$_SERVER['SERVER_NAME'];
        $body ="<html>
<html xmlns'http://www.w3.org/1999/xhtml'>
<html lang'es' class'no-js'>
<meta http-equiv'Content-Type' content'text/html; charset=UTF-8' />
<head>
</head>
<body>          


<table class='body-wrap'>
    <tr>
        <td></td>
        <td class='container' >

            <div class='content'>
            <table>
                <tr>
                    <td>
                    <img src='spabra.com/images/logo.png' alt='logo SPABRA' width='100px'>
                        <h3 style='color:black' >Gracias $nombre por contactarnos</h3>
                        <p style='color:#666' class='lead'>Confirmamos tus datos :</p>
                        <p>
                            
                           <strong style='color:#0069a4; font-ewight:bolder;' >Email:</strong>". $email_address."<br/>
//                         <strong style='color:#0069a4; font-ewight:bolder;' >Teléfono:</strong>". $telefono."<br/>
//                             <strong style='color:#0069a4; font-ewight:bolder;' >Empresa:</strong>". $empresa."<br/>
                            
//                             <strong style='color:#0069a4; font-ewight:bolder;' > Mensaje:</strong>  ".$msj. " <br/>
                            
                        </p>
                        <!-- Callout Panel -->
                        <p style='color:#666' class='callout'>
                            A la brevedad contestaremos tus dudas y comentarios.<BR/><BR/>
            
                                            
                                                
                        <!-- social & contact -->
                        <table class='social' width='100%'>
                            <tr>
                                <td>
                                                                      
                                    <!-- column 2 -->
                                    <table align='left' class='column'>
                                        <tr>
                                            <td>                
                                                                            
                                                <h5 style='color:#666' class=''>SPABRA</h5>                                               
                                                <p>Teléfono: <strong>+52 (477) 716 15 68  </strong><br/>
                Email: <strong><a href='emailto:'>ventas@spabra.com</a></strong></p>
                <p>Obreros 101 Col. Obrera C.P.37340 León, Guanajuato, México.</p>
                
                                            </td>
                                        </tr>
                                    </table><!-- /column 2 -->
                                    
                                    <span class='clear'></span> 
                                    
                                </td>
                            </tr>
                        </table><!-- /social & contact -->
                        
                    </td>
                </tr>
            </table>
            </div>
                                    
        </td>
        <td></td>
    </tr>
</table>


<table class='footer-wrap'>
    <tr>
        <td></td>
        <td class='container'>
            
                <!-- content -->
                <div class='content'>
                <table>
                <tr>
                    <td align='center'>
                        <p>
                            © Copyright 2016-2017 SPABRA
Todos los Derechos Reservados · <a href='' >Aviso de Privacidad</a>.
                        </p>
                    </td>
                </tr>
            </table>
                </div><!-- /content -->
                
        </td>
        <td></td>
    </tr>
</table>
</body>         
</html>  ";


            
            
                $mail->Body = $body;
                $mail->CharSet = 'UTF-8';
                $mail->IsHTML(true);
                // $mail->Send();
    
                var_dump($mail->Send());        
                    
             
    
 // }   
?>