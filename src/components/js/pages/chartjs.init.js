/*
Template Name: Lexa - Admin & Dashboard Template
Author: Themesbrand
Website: https://themesbrand.com/
Contact: themesbrand@gmail.com
File: Chartjs
*/

// get colors array from the string
function getChartColorsArray(chartId) {
  if (document.getElementById(chartId) !== null) {
    var colors = document.getElementById(chartId).getAttribute('data-colors');
    if (colors) {
      colors = JSON.parse(colors);
      return colors.map(function (value) {
        var newValue = value.replace(' ', '');
        if (newValue.indexOf(',') === -1) {
          var color = getComputedStyle(document.documentElement).getPropertyValue(newValue);
          if (color) return color;
          else return newValue;
        } else {
          var val = value.split(',');
          if (val.length == 2) {
            var rgbaColor = getComputedStyle(document.documentElement).getPropertyValue(val[0]);
            rgbaColor = 'rgba(' + rgbaColor + ',' + val[1] + ')';
            return rgbaColor;
          } else {
            return newValue;
          }
        }
      });
    }
  }
}

!(function ($) {
  'use strict';

  var ChartJs = function () {};

  (ChartJs.prototype.respChart = function (selector, type, data, options) {
    (Chart.defaults.global.defaultFontColor = '#adb5bd'), (Chart.defaults.scale.gridLines.color = 'rgba(108, 120, 151, 0.1)');
    // get selector by context
    var ctx = selector.get(0).getContext('2d');
    // pointing parent container to make chart js inherit its width
    var container = $(selector).parent();

    // enable resizing matter
    $(window).resize(generateChart);

    // this function produce the responsive Chart JS
    function generateChart() {
      // make chart width fit with its container
      var ww = selector.attr('width', $(container).width());
      switch (type) {
        case 'Line':
          new Chart(ctx, { type: 'line', data: data, options: options });
          break;
        case 'Doughnut':
          new Chart(ctx, { type: 'doughnut', data: data, options: options });
          break;
        case 'Pie':
          new Chart(ctx, { type: 'pie', data: data, options: options });
          break;
        case 'Bar':
          new Chart(ctx, { type: 'bar', data: data, options: options });
          break;
        case 'Radar':
          new Chart(ctx, { type: 'radar', data: data, options: options });
          break;
        case 'PolarArea':
          new Chart(ctx, { data: data, type: 'polarArea', options: options });
          break;
      }
      // Initiate new chart or Redraw
    }
    // run function - render chart at first load
    generateChart();
  }),
    //init
    (ChartJs.prototype.init = function () {
      //creating lineChart
      var LinechartLinechartColors = getChartColorsArray('lineChart');
      if (LinechartLinechartColors) {
        var lineChart = {
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October'],
          datasets: [
            {
              label: 'Sales Analytics',
              fill: true,
              lineTension: 0.5,
              backgroundColor: LinechartLinechartColors[0],
              borderColor: LinechartLinechartColors[1],
              borderCapStyle: 'butt',
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: 'miter',
              pointBorderColor: LinechartLinechartColors[1],
              pointBackgroundColor: '#fff',
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: LinechartLinechartColors[1],
              pointHoverBorderColor: '#fff',
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: [65, 59, 80, 81, 56, 55, 40, 55, 30, 80],
            },
            {
              label: 'Monthly Earnings',
              fill: true,
              lineTension: 0.5,
              backgroundColor: 'rgba(235, 239, 242, 0.2)',
              borderColor: '#ebeff2',
              borderCapStyle: 'butt',
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: 'miter',
              pointBorderColor: '#ebeff2',
              pointBackgroundColor: '#fff',
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: '#ebeff2',
              pointHoverBorderColor: '#eef0f2',
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: [80, 23, 56, 65, 23, 35, 85, 25, 92, 36],
            },
          ],
        };

        var lineOpts = {
          scales: {
            yAxes: [
              {
                ticks: {
                  max: 100,
                  min: 20,
                  stepSize: 10,
                },
              },
            ],
          },
        };

        this.respChart($('#lineChart'), 'Line', lineChart, lineOpts);
      }

      //donut chart
      var DountchartColors = getChartColorsArray('doughnut');
      if (DountchartColors) {
        var donutChart = {
          labels: ['Desktops', 'Tablets'],
          datasets: [
            {
              data: [300, 210],
              backgroundColor: [DountchartColors[0], DountchartColors[1]],
              hoverBackgroundColor: [DountchartColors[0], DountchartColors[1]],
              hoverBorderColor: '#fff',
            },
          ],
        };
        this.respChart($('#doughnut'), 'Doughnut', donutChart);
      }

      //Pie chart
      var PiechartColors = getChartColorsArray('pie');
      if (PiechartColors) {
        var pieChart = {
          labels: ['Desktops', 'Tablets'],
          datasets: [
            {
              data: [300, 180],
              backgroundColor: [PiechartColors[0], PiechartColors[1]],
              hoverBackgroundColor: [PiechartColors[0], PiechartColors[1]],
              hoverBorderColor: '#fff',
            },
          ],
        };
        this.respChart($('#pie'), 'Pie', pieChart);
      }

      //barchart
      var BarchartColors = getChartColorsArray('bar');
      if (BarchartColors) {
        var barChart = {
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
          datasets: [
            {
              label: 'Sales Analytics',
              backgroundColor: BarchartColors[0],
              borderColor: BarchartColors[0],
              borderWidth: 1,
              hoverBackgroundColor: BarchartColors[1],
              hoverBorderColor: BarchartColors[1],
              data: [65, 59, 81, 45, 56, 80, 50, 20],
            },
          ],
        };
        this.respChart($('#bar'), 'Bar', barChart);
      }

      //radar chart
      var radarchartColors = getChartColorsArray('radar');
      if (radarchartColors) {
        var radarChart = {
          labels: ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'],
          datasets: [
            {
              label: 'Desktops',
              backgroundColor: radarchartColors[0],
              borderColor: radarchartColors[1],
              pointBackgroundColor: radarchartColors[1],
              pointBorderColor: '#fff',
              pointHoverBackgroundColor: '#fff',
              pointHoverBorderColor: radarchartColors[1],
              data: [65, 59, 90, 81, 56, 55, 40],
            },
            {
              label: 'Tablets',
              backgroundColor: radarchartColors[2],
              borderColor: radarchartColors[3],
              pointBackgroundColor: radarchartColors[3],
              pointBorderColor: '#fff',
              pointHoverBackgroundColor: '#fff',
              pointHoverBorderColor: radarchartColors[3],
              data: [28, 48, 40, 19, 96, 27, 100],
            },
          ],
        };
        this.respChart($('#radar'), 'Radar', radarChart);
      }

      //Polar area  chart
      var PolarchartColors = getChartColorsArray('polarArea');
      if (PolarchartColors) {
        var polarChart = {
          datasets: [
            {
              data: [11, 16, 7, 18],
              backgroundColor: PolarchartColors,
              label: 'My dataset', // for legend
              hoverBorderColor: '#fff',
            },
          ],
          labels: ['Series 1', 'Series 2', 'Series 3', 'Series 4'],
        };
        this.respChart($('#polarArea'), 'PolarArea', polarChart);
      }
    }),
    ($.ChartJs = new ChartJs()),
    ($.ChartJs.Constructor = ChartJs);
})(window.jQuery),
  //initializing
  (function ($) {
    'use strict';
    $.ChartJs.init();
  })(window.jQuery);
