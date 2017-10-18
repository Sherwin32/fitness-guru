/* CLIENT-SIDE JS
 *
 * You may edit this file as you see fit.  Try to separate different components
 * into functions and objects as needed.
 *
 */
$(document).ready(function() {

  var builtInInfor = {
    feet: "5",
    inch: "8",
    'fitness-goal': "building",
    gender: "male",
    id: "sherwin123",
    name: "Sherwin",
    pwd: "123",
    'confirm-pwd': "123",
    weight: "143",
  };


      google.charts.load('current', {'packages':['gauge']});
      google.charts.setOnLoadCallback(drawChart);

      function drawChart() {

        var data = google.visualization.arrayToDataTable([
          ['Label', 'Value'],
          ['BMI', 22],
        ]);

        var options = {
          width: 400, height: 250,
          redFrom: 24, redTo: 40,
          greenFrom: 17, greenTo: 25,
          yellowFrom:0, yellowTo: 17,
          minorTicks: 5, max: 40
        };

        var chart = new google.visualization.Gauge(document.getElementById('bmi-chart'));

        chart.draw(data, options);

        setInterval(function() {
          data.setValue(0, 1, 22 + 2 * Math.random()- 2 * Math.random());
          chart.draw(data, options);
        }, 1000);
      }


  // $('#create-form').validator({
  //       framework: 'bootstrap',
  //       icon: {
  //           valid: 'glyphicon glyphicon-ok',
  //           invalid: 'glyphicon glyphicon-remove',
  //           validating: 'glyphicon glyphicon-refresh'
  //       },
  //       fields: {
  //           confirmPassword: {
  //               validators: {
  //                   identical: {
  //                       field: 'password',
  //                       message: 'The password and its confirm are not the same'
  //                   }
  //               }
  //           }
  //       }
  //   });


    console.log('app.js loaded!');
    // On click listener for log in (sign in) button
    $('#log-in-btn').on('click', function() {
        hideAll();
        $('#log-in-form').show();
    })

    // On click listener for create button
    $('#create-btn').on('click', function() {
        hideAll();
        $('#create-form-panel').show();
    })

    $('#create-form').on('submit', function(e) {
        e.preventDefault();
        var data = $(this).serialize().split("&");
        console.log(data);
        var obj = {};
        for (var key in data) {
            // console.log(data[key]);
            obj[data[key].split("=")[0]] = data[key].split("=")[1];
        }
        console.log(obj);
    })

    function hideAll() {
        $('#built-in-content').hide();
        $('#create-form-panel').hide();
        $('#log-in-form').hide();
        $('#recommendation').hide();
    }

});