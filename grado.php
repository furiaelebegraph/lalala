
<!DOCTYPE html>
  <div class="wrapper_rescate">
    <div class="animsition" data-animsition-in-class="fade-in-right" data-animsition-in-duration="1000" id="seccion_grado">
        <section id="grado">
            <div id="contenido_nombre" class="col-xs-12">
                <div class="pleca_azul_lider">
                    <img src="images/flecha_bl.png">
                    <img src="images/mini_presi.png">
                    <!-- <h2 class="lider_header">YO LÍDER</h2> -->
                </div>
            </div>
        </section>


    <!-- /////////////////////////////////////////////////////////////////////// -->





          <div class="container clearfix" id="chat_grado">
        
        <div class="chat">
          <div class="chat-history">
            <ul>
              
              
              <li>
                <div class="message-data">
              <!--     <span class="message-data-name"><i class="fa fa-circle online"></i> Vincent</span>
                  <span class="message-data-time">10:20 AM, Today</span> -->
                </div>
                <div class="message my-message">
                 Ya por último, ¿cuál es tu grado?    
                </div>
              </li>
              
              <li>
                <div class="message-data">
                  <!-- <span class="message-data-name"><i class="fa fa-circle online"></i> Vincent</span>
                  <span class="message-data-time">10:31 AM, Today</span> -->
                </div>
                <!-- <i class="fa fa-circle online"></i>
                <i class="fa fa-circle online" style="color: #AED2A6"></i>
                <i class="fa fa-circle online" style="color:#DAE9DA"></i> -->
              </li>
              
            </ul>
            
          </div> <!-- end chat-history -->
          
          <div class="chat-message clearfix">
            <textarea name="message-to-send" id="message-to-send" placeholder ="Escribir mensaje" rows="3"></textarea>
                    
          <!--   <i class="fa fa-file-o"></i> &nbsp;&nbsp;&nbsp;
            <i class="fa fa-file-image-o"></i> -->
            
            <button>Enviar</button>
            <a href="index.php?seccion=intro">
            	<button>Siguiente</button>
            </a>

          </div> <!-- end chat-message -->
          
        </div> <!-- end chat -->
        
      </div> <!-- end container -->
    </div>
  </div> 
<script id="message-template" type="text/x-handlebars-template">
  <li class="clearfix">
    <div class="message-data align-right">
      <span class="message-data-time" >{{time}}, Today</span> &nbsp; &nbsp;
      <span class="message-data-name" >Olia</span> <i class="fa fa-circle me"></i>
    </div>
    <div class="message other-message float-right">
      {{messageOutput}}
    </div>
  </li>
</script>

<script id="message-response-template" type="text/x-handlebars-template">
  <li>
    <div class="message-data">
      <span class="message-data-name"><i class="fa fa-circle online"></i> Vincent</span>
      <span class="message-data-time">{{time}}, Today</span>
    </div>
    <div class="message my-message">
      {{response}}
    </div>
  </li>
</script>
