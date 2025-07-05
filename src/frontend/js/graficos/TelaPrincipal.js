import { fetchData } from "../extrairData.js";
import { atualizaGraficoPizzaFim, atualizaGraficoPizzaMeio, preencheGEXFim, preencheGEXMeio, preencheTotalFim, preencheTotalMeio } from "./updateGraphic.js";


$(async function() {


    // graficos gex/sr

    var options = {
        series: [{
          name: "Franquia 2",
          data: [1, 2]
        }, {
          name: "Franquia 1",
          data: [3, 2]
        }],
        chart: {
          foreColor: "#9ba7b2",
          height: 380,
          type: 'bar',
          zoom: {
            enabled: false
          },
          toolbar: {
              show: !1,
          }
        },
        plotOptions: {
          bar: {
              horizontal: !1,
              columnWidth: "60%",
              endingShape: "rounded"
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          show: !0,
          width: 4,
          colors: ["transparent"]
      },
      colors: ["#02c27a", "#0d6efd", "#9ba7b2", "#c2c202", "#fd0d15"],
        grid: {
          show: true,
          borderColor: 'rgba(0, 0, 0, 0.15)',
          strokeDashArray: 4,
        },
        tooltip: {
          theme: "dark",
        },
      xaxis: {
        categories: ['arroz', 'feijao']
      }
      };
    
    var chart = new ApexCharts(document.querySelector("#Teste"), options);
    chart.render();

    // grafico pgd
    
    var options2 = {
      
        series: [1, 2, 3],
        chart: {
            foreColor: "#9ba7b2",
            height: 380,
            type: 'pie',
        },
        labels: ['Parcial', 'Integral', 'Presencial'],
        legend: {
      position: "bottom",
      show: !0
    },
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    width: 200
                },
                legend: {
                    position: 'bottom'
                }
            }
        }]
    };
    
    var chart1 = new ApexCharts(document.querySelector("#Teste1"), options2);
    chart1.render();

    // grafico servidores gex

    var options2 = {
      
        series: [3, 4],
        chart: {
            foreColor: "#9ba7b2",
            height: 380,
            type: 'pie',
        },
        labels: ['SGREC', 'SAREC'],
        legend: {
      position: "bottom",
      show: !0
    },
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    width: 200
                },
                legend: {
                    position: 'bottom'
                }
            }
        }]
    };
    
    var chart2 = new ApexCharts(document.querySelector("Teste2"), options2);
    chart2.render();
    



});
