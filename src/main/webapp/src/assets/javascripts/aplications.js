// Start dropdown
$('.ui.dropdown').dropdown({})

//// Chart.js
//const CHART = document.getElementById("js-lineChart")
//let lineChart = new Chart(CHART, {
//    type: 'line',
//    data: {
//        labels: ["1 Fevereiro", "10 Fevereiro ", "15 Fevereiro", "18 Fevereiro", "25 Fevereiro", "1 Março"],
//        datasets: [
//            {
//                fill: false,
//                label: 'Autorizadas', 
//                data: [1000, 20, 50, 300, 540, 735],
//                borderColor: ['rgba(85,189,77,100)'],
//                borderWidth: 5
//            },
//            {
//                fill: false,
//                label: 'Rejeitadas', 
//                data: [1, 6, 10, 64, 100, 158],
//                borderColor: ['rgba(249,0,2,100)'],
//                borderWidth: 5
//            },
//            {
//                fill: false,
//                label: 'Uso denegado', 
//                data: [10, 30, 400, 75, 2890, 102],
//                borderColor: ['rgba(242,223,2,100)'],
//                borderWidth: 5
//            },
//            {
//                fill: false,
//                label: 'Canceladas', 
//                data: [12, 25, 37, 50, 69, 100],
//                borderColor: ['rgba(1,159,242,100)'],
//                borderWidth: 5
//            },
//            {
//                fill: false,
//                label: 'Inutilizadas', 
//                data: [1, 2, 0, 1800, 0, 3],
//                borderColor: ['rgba(109,2,248,100)'],
//                borderWidth: 5
//            },
//        ]
//    },
//    options: {
//        maintainAspectRatio: false,
//        scales: {
//            yAxes: [{
//                ticks: {
//                    suggestedMax: 3000
//                }
//            }],
//            xAxes: [{
//                gridLines: {
//                  display: false
//                }
//            }]
//        }
//    }
//});