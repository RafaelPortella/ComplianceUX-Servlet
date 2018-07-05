<%-- 
    Document   : index
    Created on : Jul 5, 2018, 4:10:37 PM
    Author     : mateusgobo
--%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%
    String codigo       = request.getParameter("cd");
    String codigoHash   = request.getParameter("codigoHash");
    String part         = request.getParameter("participante");
%>
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Compliance - Dashboard</title>
        <link rel="stylesheet" href="./src/assets/stylesheets/css/semantic.min.css">
        <link rel="stylesheet" href="./src/assets/stylesheets/css/main.css">
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.11/css/all.css" integrity="sha384-p2jx59pefphTFIpeqCcISO9MdVfIm4pNnsL08A6v5vaQc4owkQqxMV8kg4Yvhaw/" crossorigin="anonymous">        
    </head>
    <body>
        <header class="header-dashboard">    
            <div class="ui menu stackable padding__for-block">
                <div class="item">
                    <img src="./src/assets/images/logo.png" class="ui image" alt="">
                </div>
                <div class="right menu">
                    <div class="item">
                        <img class="ui avatar image" src="src/assets/images/avatar-model.png">
                        <div class="content">
                            <div class="header" id="participante"></div>
                        </div>
                    </div>
                </div>
            </div>
        </header>

        <div class="ui grid stackable padded padding__for-block">
            <div class="twelve wide column">
                <div class="ui header text__light text__2rem">
                    Total de <b id="qtd-total-nf"></b> notas emitidas
                    <div class="sub header">
                        Valor total referente ao período <span id="dtIni"></span> à <span id="dtFin"></span>.
                    </div>
                </div>
            </div>
            <div class="four wide column">
                <!-- Period select -->
                <h4 class="ui header right floated">
                    <i class="calendar alternate outline icon"></i>
                    <div class="content text__normal">
                        Visualizar dados
                        <div class="ui inline dropdown">
                            <div class="text">de hoje</div>
                            <i class="dropdown icon"></i>
                            <div class="menu">
                                <div class="header">Selecione um período</div>
                                <div class="active item date-filter" data-text="de hoje">de hoje</div>
                                <div class="item date-filter" data-text="dos últimos 7 dias">dos últimos 7 dias</div>
                                <div class="item date-filter" data-text="do último mês">do último mês</div>
                                <div class="item date-filter" data-text="dos últimos 3 meses">dos últimos 3 meses</div>
                                <div class="item date-filter" data-text="dos últimos 6 meses">dos últimos 6 meses</div>
                                <div class="item date-filter" data-text="do último ano">do último ano</div>
                            </div>
                        </div>
                    </div>
                </h4>
            </div>
        </div>

        <div class="ui stackable grid padded padding__for-block">
            <div class="twelve wide column">
                <div class="ui stackable equal width grid text__center">
                    <div class="column">
                        <div class="ui segment tiny padded">
                            <div class="ui tiny statistic">
                                <div id="qtd-nf-aut" class="value text__light">
                                    <br>
                                </div>
                                <div class="label">
                                    Autorizadas
                                </div>
                                <!--              <a href="javascript:void(0)">Ver detalhes</a>-->
                            </div>
                        </div>
                    </div>
                    <div class="column">
                        <div class="ui segment tiny padded">
                            <div class="ui tiny statistic">
                                <div id="qtd-nf-rej" class="value text__light">
                                    <br>
                                </div>
                                <div class="label">
                                    Rejeitadas
                                </div>
                                <!--              <a href="javascript:void(0)">Ver detalhes</a>-->
                            </div>
                        </div>
                    </div>
                    <div class="column">
                        <div class="ui segment tiny padded">
                            <div class="ui tiny statistic">
                                <div id="qtd-nf-den" class="value text__light">
                                    <br>
                                </div>
                                <div class="label">
                                    Uso denegado
                                </div>
                                <!--              <a href="javascript:void(0)">Ver detalhes</a>-->
                            </div>
                        </div>
                    </div>
                    <div class="column">
                        <div class="ui segment tiny padded">
                            <div class="ui tiny statistic">
                                <div id="qtd-nf-can" class="value text__light">
                                    <br>
                                </div>
                                <div class="label">
                                    Canceladas
                                </div>
                                <!--              <a href="javascript:void(0)">Ver detalhes</a>-->
                            </div>
                        </div>
                    </div>
                    <div class="column">
                        <div class="ui segment tiny padded">
                            <div class="ui tiny statistic">
                                <div id="qtd-nf-inu" class="value text__light">
                                    <br>
                                </div>
                                <div class="label">
                                    Inutilizadas
                                </div>
                                <!--              <a href="javascript:void(0)">Ver detalhes</a>-->
                            </div>
                        </div>
                    </div>
                </div>
                <div class="ui one column grid">
                    <div class="column">
                        <div class="ui segments">
                            <div class="ui segment">
                                <h2 class="ui small header">
                                    Variação no tempo
                                    <div class="sub header">Resultado baseado no período selecionado.</div>
                                </h2>
                            </div>
                            <div class="ui segment">
                                <div class="chart-container">
                                    <canvas id="js-lineChart"></canvas>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="four wide column">
                <div class="ui one column grid">
                    <div class="column">
                        <div class="ui segments">
                            <div class="ui segment height-in-floating-titles">
                                <h4 class="ui small red left floated header text__uppercase"><i class="small exclamation triangle icon icon__normal"></i>Situação de erros</h4>
                                <h4 id="qtd-total-erros" class="ui small red right floated header">0</h4>
                            </div>
                            <div class="ui segment">
                                <div class="ui divided selection list">
                                    <a class="item">
                                        Integração
                                        <div id="qtd-err-int" class="ui red horizontal label right floated"><br></div>
                                    </a>
                                    <a class="item">
                                        Montagem do XML
                                        <div id="qtd-err-mont" class="ui red horizontal label right floated"><br></div>
                                    </a>
                                    <a class="item">
                                        Envio do SEFAZ
                                        <div id="qtd-err-env" class="ui red horizontal label right floated"><br></div>
                                    </a>
                                    <a class="item">
                                        Consulta do SEFAZ
                                        <div id="qtd-err-cons" class="ui red horizontal label right floated"><br></div>
                                    </a>
                                    <a class="item">
                                        Cancelamento
                                        <div id="qtd-err-canc" class="ui red horizontal label right floated"><br></div>
                                    </a>
                                    <a class="item">
                                        Inutilização
                                        <div id="qtd-err-inu" class="ui red horizontal label right floated"><br></div>
                                    </a>
                                    <a class="item">
                                        Geral
                                        <div id="qtd-err-geral" class="ui red horizontal label right floated"><br></div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div> 
                    <div class="column">
                        <div class="ui segments">     
                            <div class="ui segment height-in-floating-titles">
                                <h4 class="ui small yellow left floated header text__uppercase"><i class="small exclamation triangle icon icon__normal"></i>Situação de envios</h4>
                                <h4 id="qtd-total-sit" class="ui small yellow right floated header">0</h4>
                            </div>
                            <div class="ui segment">
                                <div class="ui divided selection list">
                                    <a class="item">
                                        Validação/integração
                                        <div id="qtd-sit-val" class="ui yellow horizontal label right floated"><br></div>
                                    </a>
                                    <a class="item">
                                        Processamento
                                        <div id="qtd-sit-proc" class="ui yellow horizontal label right floated"><br></div>
                                    </a>
                                    <a class="item">
                                        Envio
                                        <div id="qtd-sit-env" class="ui yellow horizontal label right floated"><br></div>
                                    </a>
                                    <a class="item">
                                        Retorno
                                        <div id="qtd-sit-ret" class="ui yellow horizontal label right floated"><br></div>
                                    </a>
                                    <a class="item">
                                        Contigência
                                        <div id="qtd-sit-cont" class="ui yellow horizontal label right floated"><br></div>
                                    </a>
                                    <a class="item">
                                        Liberação
                                        <div id="qtd-sit-lib" class="ui yellow horizontal label right floated"><br></div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- scripts -->
        <script src="https://code.jquery.com/jquery-3.1.1.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.2/Chart.min.js"></script>        
        <script src="./src/assets/javascripts/variables.js"></script>
        <script>
            attribValues('<%=codigo%>', '<%=codigoHash%>', '<%=part%>');
        </script>        
        <script src="./src/assets/javascripts/semantic.min.js"></script>
        <script src="./src/assets/javascripts/blockUI.js"></script>
        <script src="./src/assets/javascripts/aplications.js"></script>  
        <script src="./src/assets/javascripts/dashboard.loader.js"></script>        
    </body>
</html>
