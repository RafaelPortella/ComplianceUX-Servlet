var intervalo = "1d";
var dadosNfe = [];
var datasGrafico = [];
var lineChart = null;
var totalGeral = null;
var CHART = document.getElementById("js-lineChart");
var domainUrl = 'http://52.67.9.62:9000/csf-nfe/nfe/notas';
var urlService = null;
var dtIni = null;
var dtFin = null;
var startNfPorSituacaoUrl = null;//domainUrl + "/" + cd + "/" + hash + "/";
var startTotalDeNfUrl = null;//domainUrl + "/" + cd + "/" + hash + "/";
var eixoY = 0;


function atualizarCamposDeData() {
    $('#dtIni').text(dtIni.replace(/-/g, '/').replace(/\/$/, ''));
    $('#dtFin').text(dtFin.replace(/-/g, '/').replace(/\/$/, ''));
}

function formatarData(date) {
    var dd = date.getDate();
    var mm = date.getMonth() + 1; // A API conta os meses de 0 a 11
    var yyyy = date.getFullYear();

    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }

    return dd + '-' + mm + '-' + yyyy + '/';
}

function calcularDtIni(date, periodo) {
    var diferenca = null;
    var elemento; // 0 - dia, 1 - mês, 2 - ano

    if (periodo.includes('hoje')) {
        intervalo = "1d";
        return date;
    } else if (periodo.includes('7')) {
        diferenca = 7;
        elemento = 0;
        intervalo = "7d";
    } else if (periodo.includes('mês')) {
        diferenca = 30;
        elemento = 0;
//        elemento = 1;
        intervalo = "1M";
    } else if (periodo.includes('3')) {
        diferenca = 90;
        elemento = 0;
//        elemento = 1;
        intervalo = "3M";
    } else if (periodo.includes('6')) {
        diferenca = 180;
        elemento = 0;
//        elemento = 1;
        intervalo = "6M";
    } else if (periodo.includes('ano')) {
        diferenca = 360;
        elemento = 0;
//        elemento = 2;
        intervalo = "12M";
    }

    var dtTemp = new Date(date);
    switch (elemento) {
        case 0:
            dtTemp.setDate(dtTemp.getDate() - diferenca);
            break;

        case 1:
            dtTemp.setMonth(dtTemp.getMonth() - diferenca);
            break;

        case 2:
            dtTemp.setFullYear(dtTemp.getFullYear() - diferenca);
            break;

        default:
            break;
    }
    return dtTemp;
}

function carregarDados() {
    carregarQtds();
}

function definirUrlParaQtdTotal() {
    return startTotalDeNfUrl + dtIni + dtFin + participante;
}

function definirUrlParaQtdPorSit(situacao, dtIniQuery, dtFinQuery) {
    return startNfPorSituacaoUrl + dtIniQuery + dtFinQuery + situacao + '/' + participante;

}
function definirTotalDeErros(qtdErros) {
    try {
        if (qtdErros === undefined) {
            qtdErros = 0;
        }

        var totalErros = parseInt($('#qtd-total-erros').text());
        totalErros += qtdErros;

        $('#qtd-total-erros').text(totalErros);
        return "go";
    } catch (e) {
        return "break;";
    }
}

function definirTotalEmProc(qtdErros) {
    try {
        if (qtdErros === undefined) {
            qtdErros = 0;
        }

        var totalErros = parseInt($('#qtd-total-sit').text());
        totalErros += qtdErros;

        $('#qtd-total-sit').text(totalErros);
        return "go";
    } catch (e) {
        return "break";
    }
}

function carregarQtds() {
    carregarTotalNf();
}

function carregarTotalNf() {
    urlService = definirUrlParaQtdTotal();

    $.ajax({
        type: 'GET',
        url: urlService,
        dataType: 'json',
        success: function (data) {
            totalGeral = data.totalSituacao;
            $('#qtd-total-nf').text(totalGeral);
            $('#participante').text(data.participante);
            carregarQtdNfAut(dtIni, dtFin);
        }
    });
}

function carregarQtdNfAut(dtIniQuery, dtFinQuery) {
    urlService = definirUrlParaQtdPorSit('4', dtIniQuery, dtFinQuery);
    $.ajax({
        type: 'GET',
        url: urlService,
        dataType: 'json',
        success: function (data) {
            $('#qtd-nf-aut').text(data.totalSituacao);            
            carregarQtdNfRej(dtIni, dtFin);
        }
    });
}

function carregarQtdNfRej(dtIniQuery, dtFinQuery) {
    urlService = definirUrlParaQtdPorSit('5', dtIniQuery, dtFinQuery);

    $.ajax({
        type: 'GET',
        url: urlService,
        dataType: 'json',
        success: function (data) {
            $('#qtd-nf-rej').text(data.totalSituacao);            
            carregarQtdNfDen(dtIni, dtFin);
        }
    });
}

function carregarQtdNfDen(dtIniQuery, dtFinQuery) {
    urlService = definirUrlParaQtdPorSit('6', dtIniQuery, dtFinQuery);

    $.ajax({
        type: 'GET',
        url: urlService,
        dataType: 'json',
        success: function (data) {
            $('#qtd-nf-den').text(data.totalSituacao);            
            carregarQtdNfCan(dtIni, dtFin);
        }
    });
}

function carregarQtdNfCan(dtIniQuery, dtFinQuery) {
    urlService = definirUrlParaQtdPorSit('7', dtIniQuery, dtFinQuery);

    $.ajax({
        type: 'GET',
        url: urlService,
        dataType: 'json',
        success: function (data) {
            $('#qtd-nf-can').text(data.totalSituacao);            
            carregarQtdNfInu(dtIni, dtFin);
        }
    });
}

function carregarQtdNfInu(dtIniQuery, dtFinQuery) {
    urlService = definirUrlParaQtdPorSit('8', dtIniQuery, dtFinQuery);

    $.ajax({
        type: 'GET',
        url: urlService,
        dataType: 'json',
        success: function (data) {
            $('#qtd-nf-inu').text(data.totalSituacao);
            carregarQtdNfErrInt(dtIni, dtFin);
            
            dadosNfe = [];
            datasGrafico = [];
            inicializarGrafico();
        }
    });
}

function carregarQtdNfErrInt(dtIniQuery, dtFinQuery) {
    urlService = definirUrlParaQtdPorSit('10', dtIniQuery, dtFinQuery);

    $.ajax({
        type: 'GET',
        url: urlService,
        dataType: 'json',
        success: function (data) {
            $('#qtd-err-int').text(data.totalSituacao);
            var result = definirTotalDeErros(data.totalSituacao);
            if (result === "go") {
                carregarQtdNfErrMont(dtIni, dtFin);
            }
        }
    });
}

function carregarQtdNfErrMont(dtIniQuery, dtFinQuery) {
    urlService = definirUrlParaQtdPorSit('11', dtIniQuery, dtFinQuery);

    $.ajax({
        type: 'GET',
        url: urlService,
        dataType: 'json',
        success: function (data) {
            $('#qtd-err-mont').text(data.totalSituacao);
            var result = definirTotalDeErros(data.totalSituacao);
            if (result === "go") {
                carregarQtdNfErrEnv(dtIni, dtFin);
            }
        }
    });
}

function carregarQtdNfErrEnv(dtIniQuery, dtFinQuery) {
    urlService = definirUrlParaQtdPorSit('12', dtIniQuery, dtFinQuery);

    $.ajax({
        type: 'GET',
        url: urlService,
        dataType: 'json',
        success: function (data) {
            $('#qtd-err-env').text(data.totalSituacao);
            var result = definirTotalDeErros(data.totalSituacao);
            if (result === "go") {
                carregarQtdNfErrCons(dtIni, dtFin);
            }
        }
    });
}

function carregarQtdNfErrCons(dtIniQuery, dtFinQuery) {
    urlService = definirUrlParaQtdPorSit('13', dtIniQuery, dtFinQuery);

    $.ajax({
        type: 'GET',
        url: urlService,
        dataType: 'json',
        success: function (data) {
            $('#qtd-err-cons').text(data.totalSituacao);
            var result = definirTotalDeErros(data.totalSituacao);
            if (result === "go") {
                carregarQtdNfErrCanc(dtIni, dtFin);
            }
        },
    });
}

function carregarQtdNfErrCanc(dtIniQuery, dtFinQuery) {
    urlService = definirUrlParaQtdPorSit('15', dtIniQuery, dtFinQuery);

    $.ajax({
        type: 'GET',
        url: urlService,
        dataType: 'json',
        success: function (data) {
            $('#qtd-err-canc').text(data.totalSituacao);
            var result = definirTotalDeErros(data.totalSituacao);
            if (result === "go") {
                carregarQtdNfErrInu(dtIni, dtFin);
            }
        }
    });
}

function carregarQtdNfErrInu(dtIniQuery, dtFinQuery) {
    urlService = definirUrlParaQtdPorSit('16', dtIniQuery, dtFinQuery);

    $.ajax({
        type: 'GET',
        url: urlService,
        dataType: 'json',
        success: function (data) {
            $('#qtd-err-inu').text(data.totalSituacao);
            var result = definirTotalDeErros(data.totalSituacao);
            if (result === "go") {
                carregarQtdNfErrGeral(dtIni, dtFin);
            }
        }
    });
}

function carregarQtdNfErrGeral(dtIniQuery, dtFinQuery) {
    urlService = definirUrlParaQtdPorSit('99', dtIniQuery, dtFinQuery);

    $.ajax({
        type: 'GET',
        url: urlService,
        dataType: 'json',
        success: function (data) {
            $('#qtd-err-geral').text(data.totalSituacao);
            var result = definirTotalDeErros(data.totalSituacao);
            if (result === "go") {
                carregarQtdNfSitVal(dtIni, dtFin);
            }
        }
    });
}

function carregarQtdNfSitVal(dtIniQuery, dtFinQuery) {
    urlService = definirUrlParaQtdPorSit('1', dtIniQuery, dtFinQuery); // Não Processada. Aguardando Processamento

    $.ajax({
        type: 'GET',
        url: urlService,
        dataType: 'json',
        success: function (data) {
            $('#qtd-sit-val').text(data.totalSituacao);
            var result = definirTotalEmProc(data.totalSituacao);
            if (result === "go") {
                carregarQtdNfSitProc(dtIni, dtFin);
            }
        }
    });
}

function carregarQtdNfSitProc(dtIniQuery, dtFinQuery) {
    urlService = definirUrlParaQtdPorSit('19', dtIniQuery, dtFinQuery); // Processada

    $.ajax({
        type: 'GET',
        url: urlService,
        dataType: 'json',
        success: function (data) {
            $('#qtd-sit-proc').text(data.totalSituacao);
            var result = definirTotalEmProc(data.totalSituacao);
            if (result === "go") {
                carregarQtdNfSitEnv(dtIni, dtFin);
            }
        }
    });
}

function carregarQtdNfSitEnv(dtIniQuery, dtFinQuery) {
    urlService = definirUrlParaQtdPorSit('2', dtIniQuery, dtFinQuery); // Processada. Aguardando Envio

    $.ajax({
        type: 'GET',
        url: urlService,
        dataType: 'json',
        success: function (data) {
            $('#qtd-sit-env').text(data.totalSituacao);
            var result = definirTotalEmProc(data.totalSituacao);
            if (result === "go") {
                carregarQtdNfSitRet(dtIni, dtFin);
            }
        }
    });
}

function carregarQtdNfSitRet(dtIniQuery, dtFinQuery) {
    urlService = definirUrlParaQtdPorSit('3', dtIniQuery, dtFinQuery); // Enviada ao SEFAZ. Aguardando Retorno

    $.ajax({
        type: 'GET',
        url: urlService,
        dataType: 'json',
        success: function (data) {
            $('#qtd-sit-ret').text(data.totalSituacao);
            var result = definirTotalEmProc(data.totalSituacao);
            if (result === "go") {
                carregarQtdNfSitCont(dtIni, dtFin);
            }
        }
    });
}

function carregarQtdNfSitCont(dtIniQuery, dtFinQuery) {
    urlService = definirUrlParaQtdPorSit('14', dtIniQuery, dtFinQuery); // Sefaz em contingência

    $.ajax({
        type: 'GET',
        url: urlService,
        dataType: 'json',
        success: function (data) {
            $('#qtd-sit-cont').text(data.totalSituacao);
            var result = definirTotalEmProc(data.totalSituacao);
            if (result === "go") {
                carregarQtdNfSitLib(dtIni, dtFin);
            }
        }
    });
}

function carregarQtdNfSitLib(dtIniQuery, dtFinQuery) {
    urlService = definirUrlParaQtdPorSit('21', dtIniQuery, dtFinQuery); // Aguardando Liberação

    $.ajax({
        type: 'GET',
        url: urlService,
        dataType: 'json',
        success: function (data) {
            $('#qtd-sit-lib').text(data.totalSituacao);
            definirTotalEmProc(data.totalSituacao);
        }
    });
}

function inicializarGrafico() {
    urlService = startTotalDeNfUrl + intervalo + '/' + participante;    
    $.ajax({
        type: 'GET',
        url: urlService,
        dataType: 'json',
        success: function (data) {
            count = 0;
            var dates = data.dates;
            var totais = data.totalIntervalo;

            clearArray(dates);            
            pushArray(totais, dadosNfe);

            $('#qtd-sit-lib').text(data.totalSituacao);            
            
            eixoY = 0;
            defineYCoordinateValue();            
            repaintGraph();
        }
    });
}

function blockUI() {
    $.blockUI({
        centerY: 0,
        css: {top: '10px', left: '', right: '10px'},
        message: "Aguarde..."
    });
}
function hideBlockUI() {
    setTimeout($.unblockUI, 500);
}

function splitQuery(query) {
    var data = query;
    var querySplit = data.split("&");
    if (querySplit.length === 3) {
        cd = querySplit[0].split("=")[1];
        hash = querySplit[1].split("=")[1];
        participante = querySplit[2].split("=")[1];

        return "go";
    }
    return "break";
}

function clearArray(array) {   
    var allValues = [];
    var countArray = 0;
    while (countArray < array.length) {
        var countSplit = 0;
        var splitValues = array[countArray].split(",");
        while (countSplit < splitValues.length) {
            allValues.push(splitValues[countSplit]);
            countSplit++;
        }
        countArray++;
    }    
    var values  = uniqueValue(allValues);        
    if(intervalo !== "1d" && intervalo !== "7d"){
        var fatorDel= Math.ceil(values.length/2);        

        var countTrueValue = 0;
        while(countTrueValue < values.length){
            if(countTrueValue !== fatorDel){
                datasGrafico.push(values[countTrueValue]);
            }
            countTrueValue++;
        }
    }else{
        datasGrafico = values;
    }        
}

function uniqueValue(values) {
    var prims = {"boolean": {}, "number": {}, "string": {}}, objs = [];
    return values.filter(function (item) {
        var type = typeof item;
        if (type in prims) {
            return prims[type].hasOwnProperty(item) ? false : (prims[type][item] = true);
        } else {
            return objs.indexOf(item) >= 0 ? false : objs.push(item);
        }
    });
}

function pushArray(values, array) {
    var count = 0;
    while (count < values.length) {
        array.push(values[count]);
        count++;
    }
}

function repaintGraph() {    
    if (lineChart === null) {
        lineChart = new Chart(CHART, {
            type: 'line',
            data: {
                labels: datasGrafico,
                datasets: [
                    {
                        fill: false,
                        label: 'Autorizadas',
                        data: dadosNfe[0],
                        borderColor: ['rgba(85,189,77,100)'],
                        borderWidth: 5
                    },
                    {
                        fill: false,
                        label: 'Rejeitadas',
                        data: dadosNfe[1],
                        borderColor: ['rgba(249,0,2,100)'],
                        borderWidth: 5
                    },
                    {
                        fill: false,
                        label: 'Uso denegado',
                        data: dadosNfe[2],
                        borderColor: ['rgba(242,223,2,100)'],
                        borderWidth: 5
                    },
                    {
                        fill: false,
                        label: 'Canceladas',
                        data: dadosNfe[3],
                        borderColor: ['rgba(1,159,242,100)'],
                        borderWidth: 5
                    },
                    {
                        fill: false,
                        label: 'Inutilizadas',
                        data: dadosNfe[4],
                        borderColor: ['rgba(109,2,248,100)'],
                        borderWidth: 5
                    }
                ]
            },
            options: {
                maintainAspectRatio: false,
                scales: {
                    yAxes: [{
                            ticks: {
                                suggestedMax: eixoY
                            }
                        }],
                    xAxes: [{
                            gridLines: {
                                display: false
                            }
                        }]
                }
            }
        });
    } else {
        lineChart.reset();
        lineChart.data.labels = [];
        updateScales(lineChart);
        
        var count = 0;
        while (count < datasGrafico.length) {
            lineChart.data.labels.push(datasGrafico[count]);
            count++;
        }
        var countAux    = 0;        
        while(countAux < lineChart.data.datasets.length){            
            
            var countValues = 0;
            while(countValues < dadosNfe[countAux].length){
                lineChart.data.datasets[countAux].data[countValues] = dadosNfe[countAux][countValues];
                countValues++;
            }
            countAux++;
        }               
    }
    lineChart.update();    
    hideBlockUI();
}
function removeData(chart) {
    chart.data.labels.pop();
    chart.data.datasets.forEach(function (dataset) {
        dataset.data.pop();
    });
    chart.update();
}
function updateScales(chart) {
    chart.options.scales = {
        yAxes: [{
                ticks: {
                    suggestedMax: eixoY
                }
            }],
        xAxes: [{
                gridLines: {
                    display: false
                }
            }]
    },
    chart.update();
}

function defineYCoordinateValue(){
    var countValuesNfe = 0;
    var countDadosNfe  = 0;
    while(countDadosNfe < dadosNfe.length){
        while(countValuesNfe < dadosNfe[countDadosNfe].length){            
            if(eixoY === 0){
                eixoY = dadosNfe[countDadosNfe][countValuesNfe];
            }else{
                if(parseInt(dadosNfe[countDadosNfe][countValuesNfe]) > eixoY){
                    eixoY = parseInt(dadosNfe[countDadosNfe][countValuesNfe]);
                }
            }
            countValuesNfe++;
        }
        countDadosNfe++;
    }        
}

(function ($) {
//    'use strict'
    /* 
     * Load da quantidade de notas por situação:
     * URL: /notas/{cd}/{hash}/{dtIni}/{dtFin}/{situacao}/{participante}
     * 
     * Load da quantidade total de notas fiscais
     * URL: /notas/{cd}/{hash}/{dtIni}/{dtFin}/{participante}
     */
//    var query = window.location.search.substring(1);
//    if (query !== null && query !== "" && query !== undefined) {
//
//        var loaderCsfParams = splitQuery(query);
//        if (loaderCsfParams === "go") {
            $(document).ready(function () {
                dtIni = formatarData(new Date());
                dtFin = formatarData(new Date());

                startNfPorSituacaoUrl = domainUrl + "/" + cd + "/" + hash + "/";
                startTotalDeNfUrl = domainUrl + "/" + cd + "/" + hash + "/";

                blockUI();
                carregarDados();
                atualizarCamposDeData();
            });

            $('.date-filter').on('click', function () {
                var periodo = $(this).text();
                dtFin = new Date();
                dtIni = calcularDtIni(dtFin, periodo);

                /* calcularGrafico() */
                //defGrafico()

                dtIni = formatarData(new Date(dtIni));
                dtFin = formatarData(new Date(dtFin));

                $('#qtd-total-erros').text('0');
                $('#qtd-total-sit').text('0');

                blockUI();
                carregarDados();
                atualizarCamposDeData();
            });
//        }
//    }
})(jQuery);