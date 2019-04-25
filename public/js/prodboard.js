/* globals Chart:false, feather:false */

// (function () {
//   // 'use strict'

feather.replace()
var numOfOn = document.getElementById("On").innerText;
var numOfCom = document.getElementById("Com").innerText;
var numOfDelay = document.getElementById("Delay").innerText;
  // Graphs
var ctx = document.getElementById('productChart');
var myChart = new Chart(ctx, {
    type: 'pie',
    data: {
        labels: ['ongoing', 'complete', 'delay'],
        datasets: [{
            label: 'state of Products',
            data: [numOfOn, numOfCom, numOfDelay],
            // data: [5, 2, 1],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});
// }())


