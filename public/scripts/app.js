/* CLIENT-SIDE JS
 *
 * You may edit this file as you see fit.  Try to separate different components
 * into functions and objects as needed.
 *
 */
$(document).ready(function() {
  const $cardio = $('#rec-cardio');
  const $resistance = $('#rec-resistance');
  const $nutrition = $('#rec-nutrition');
  let currentUser = {};


//push object when created
  var builtInInfo = {
    feet: "5",
    inch: "8",
    fitnessGoal: "building",
    gender: "male",
    id: "sherwin123",
    name: "Sherwin",
    pwd: "123",
    confirmPwd: "123",
    weight: "143",
  };

  var weightHistoryDatabase = [
    {
      id:"sherwin123",
      time:"",
      wieght: 140
    },
    {
      id:"sherwin123",
      time:"",
      wieght: 140
    },
    {
      id:"sherwin123",
      time:"",
      wieght: 140
    },
    {
      id:"sherwin123",
      time:"",
      wieght: 140
    },
    {
      id:"sherwin123",
      time:"",
      wieght: 140
    }
  ];
  //ISO 8601

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
        $('#log-in-panel').show();
    })

    // On click listener for create button
    $('#create-btn').on('click', function() {
        hideAll();
        $('#create-form-panel').show();
    })

    $('#update-weight-btn').on('click', function(){
      console.log("click")
      $('#show-weight').hide();
      $('#new-weight').show();
    })

    $('#update-goal-btn').on('click', function(){
      console.log("click")
      $('#show-goal').hide();
      $('#new-goal').show();
    })

    $('#create-form').on('submit', createFormOnSubmit);
    $('#log-in-submit').on('submit', logInOnSubmit);
    $('#update-weight').on('submit', updateWeight);


    function updateWeight(e){
      e.preventDefault();
      console.log($(this).serialize())
    }
    // $('#create-id').on('input', checkIdDuplicate);

    // function checkIdDuplicate(){
    //   // console.log($(this).serialize())
    //   $.ajax({
    //     method: 'POST',
    //     url: '/profile/checkId',
    //     data: $(this).serialize(),
    //     success: checkIdSuccess,
    //     error: handleError
    //   })
    // }



    function logInOnSubmit(e){
      e.preventDefault();
      console.log($(this).serialize())
      $.ajax({
        method: 'POST',
        url: '/profile/login',
        data: $(this).serialize(),
        success: createSuccess,
        error: handleError
      })
      console.log("get request!!!log in!!")
    }

    function createFormOnSubmit(e){
      e.preventDefault();
      $.ajax({
        method: 'POST',
        url: '/profile',
        data: $(this).serialize(),
        success: createSuccess,
        error: handleError
      })
    }

    function createSuccess(json){
      if(json==="exist error"){
        console.log(json);
        alert("id already exists. Please use another one")
      }else{
        console.log(json);
        renderRec(json);
        console.log("currentUser: ", currentUser)
      }
    }

    function handleError(a,b,c){
      console.log(a,b,c);
    }

    function hideAll() {
        $('#built-in-content').hide();
        $('#create-form-panel').hide();
        $('#log-in-panel').hide();
        $('#recommendation').hide();
        $('#change-profile-form').hide();
    }

    function drawBMI(bmiIn){
            google.charts.load('current', {'packages':['gauge']});
      google.charts.setOnLoadCallback(drawChart);

      function drawChart() {

        var data = google.visualization.arrayToDataTable([
          ['Label', 'Value'],
          [bmiIn.bmiStr, bmiIn.bmi],
        ]);

        var options = {
          width: 400, height: 250,
          redFrom: 25, redTo: 40,
          greenFrom: 18, greenTo: 25,
          yellowFrom:0, yellowTo: 18,
          minorTicks: 5, max: 35, min:12,
          yellowColor: 'yellow'
        };

        var chart = new google.visualization.Gauge(document.getElementById('bmi-chart'));

        chart.draw(data, options);

        // setInterval(function() {
        //   data.setValue(0, 1, 22 + 2 * Math.random()- 2 * Math.random());
        //   chart.draw(data, options);
        // }, 1000);
      }
    }

    function drawWeight(weightIn) {
      google.charts.load('current', {'packages':['corechart']});
      google.charts.setOnLoadCallback(drawChart);

      function drawChart() {
        var data = google.visualization.arrayToDataTable([
          ['Year', 'Sales', 'Expenses'],
          ['Oct01',  1000,      400],
          ['Oct02',  1170,      460],
          ['Oct03',  660,       1120],
          ['Dec02',  1030,      540]
        ]);

        var options = {
          title: 'Company Performance',
          curveType: 'function',
          legend: { position: 'bottom' },
          height: 250
        };

        var chart = new google.visualization.LineChart(document.getElementById('weight-chart'));

        chart.draw(data, options);
      }
    }

    function renderRec(userProfile){
      currentUser = userProfile;
      hideAll()
      $('#recommendation').show();
      var userPound = parseInt(userProfile.weight);
      var userInch = feetInchToInch (parseInt(userProfile.feet), parseInt(userProfile.inch));
      // This is gonna return {'bmi':bmi,'bmiStr':bmiStr}
      var bmiObj = calcBMI(userPound, userInch);
      var recObj = profileToRecomm(userProfile, bmiObj);
      $resistance.text('');
      $cardio.text('');
      $nutrition.text('');
      $resistance.append(recObj.resistance);
      $cardio.append(recObj.cardio);
      $nutrition.append(recObj.nutrition);
      $('#user-name').text(userProfile.name)
      console.log("bmiObj: ", bmiObj)
      drawBMI(bmiObj);
      $('#weightSpan').text(userPound);
      $('#goalSpan').text(userProfile.fitnessGoal.toUpperCase());
      drawWeight();
    }

});