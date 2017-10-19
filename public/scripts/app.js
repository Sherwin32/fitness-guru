/* CLIENT-SIDE JS
 *
 * You may edit this file as you see fit.  Try to separate different components
 * into functions and objects as needed.
 *
 */
$(document).ready(function() {

  console.log('app.js loaded!');
  let currentUser = {};

  //push object when created
  var builtInInfo = {
      feet: "5",
      inch: "8",
      fitnessGoal: "building",
      gender: "male",
      age: "26",
      id: "sherwin123",
      name: "Sherwin",
      pwd: "123",
      confirmPwd: "123",
      weight: "143",
  };

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

  $('#update-weight-btn').on('click', function() {
      console.log("click")
      $('#show-weight').hide();
      $('#new-weight').show();
  })

  $('#update-goal-btn').on('click', function() {
      console.log("click")
      $('#show-goal').hide();
      $('#new-goal').show();
  })

  $('#create-form').on('submit', createFormOnSubmit);
  $('#log-in-submit').on('submit', logInOnSubmit);
  $('#update-weight').on('submit', updateWeight);

  $('#test-btn').on('click', navBarToggle);
  var isLogIn = true;
  function navBarToggle(){
    if(isLogIn){
      $('#log-in-btn').hide();
      $('#create-btn').hide();
      $('#log-out-btn').show();
      isLogIn = false;
    }else{
      $('#log-in-btn').show();
      $('#create-btn').show();
      $('#log-out-btn').hide();
      isLogIn = true
    }
  }


  function updateWeight(e) {
      e.preventDefault();
      console.log($(this).serialize())
  }


  function logInOnSubmit(e) {
      e.preventDefault();
      console.log($(this).serialize())
      $.ajax({
          method: 'GET',
          url: '/profile',
          data: $(this).serialize(),
          success: logInProfile,
          error: handleError
      })
      console.log("get request!!!log in!!")
  }

  function createFormOnSubmit(e) {
      e.preventDefault();
      var t = Date();
      timeSerialize = `&time=${encodeURI(t)}`;
      requestData = $(this).serialize()+timeSerialize;
      console.log(requestData);
      $.ajax({
          method: 'POST',
          url: '/profile',
          data: requestData,
          success: createProfile,
          error: handleError
      })
  }

  function logInProfile(json) {
      if(json === "login error"){
        console.log(json, "inside login error");
        alert("Oops! Wrong id or password");
      }else{
          console.log(json, "inside render");
          renderRec(json);
          console.log("currentUser: ", currentUser)
      }
  }

  function createProfile(json) {
      if (json === "exist error") {
          console.log(json);
          alert("id already exists. Please use another one")
      }else{
          console.log(json, "inside render");
          renderRec(json);
          console.log("currentUser: ", currentUser)
      }
  }

  function handleError(a, b, c) {
      console.log(a, b, c);
  }

  function hideAll() {
      $('#built-in-content').hide();
      $('#create-form-panel').hide();
      $('#log-in-panel').hide();
      $('#recommendation').hide();
      $('#change-profile-form').hide();
  }

  function drawBMI(bmiIn) {
      // google.charts.setOnLoadCallback(drawChart);
      var data = google.visualization.arrayToDataTable([
          ['Label', 'Value'],
          [bmiIn.bmiStr, bmiIn.bmi],
      ]);
      var options = {
          width: 400,
          height: 250,
          redFrom: 25,
          redTo: 40,
          greenFrom: 18,
          greenTo: 25,
          yellowFrom: 0,
          yellowTo: 18,
          minorTicks: 5,
          max: 35,
          min: 12,
          yellowColor: 'yellow'
      };
      var chart = new google.visualization.Gauge(document.getElementById('bmi-chart'));
      chart.draw(data, options);
  }
var weightTest = [
    {"time": "Thu Oct 19 2017 12:25:11 GMT-0700 (PDT)", "weight": 166},
    {"time": "Thu Oct 20 2017 12:25:11 GMT-0700 (PDT)", "weight": 186},
    {"time": "Thu Dec 19 2017 12:25:11 GMT-0700 (PDT)", "weight": 196},
    {"time": "Thu Jan 19 2018 12:25:11 GMT-0700 (PDT)", "weight": 206}
];

function drawWeight(weightIn) {
        var dataArray = [['Date','Weight']]
        for (var j=0; j<weightIn.length; j++) {
          var shortTime = weightIn[j].time.substr(4,6);
          shortTime[3] = '-';
          var babyArray = [ shortTime, weightIn[j].weight ]
          dataArray.push(babyArray);
        }
        var data = google.visualization.arrayToDataTable(dataArray);
        var options = {
          title: 'Weight History (lbs)',
          curveType: 'function',
          legend: { position: 'none' },
          height: 250
        };
        var chart = new google.visualization.LineChart(document.getElementById('weight-chart'));
        chart.draw(data, options);
    }
  // function drawWeight(weightIn) {
  //     var data = google.visualization.arrayToDataTable([
  //         ['Year', 'Sales', 'Expenses'],
  //         ['Oct01', 1000, 400],
  //         ['Oct02', 1170, 460],
  //         ['Oct03', 660, 1120],
  //         ['Dec02', 1030, 540]
  //     ]);
  //     var options = {
  //         title: 'Company Performance',
  //         curveType: 'function',
  //         legend: {
  //             position: 'bottom'
  //         },
  //         height: 250
  //     };
  //     var chart = new google.visualization.LineChart(document.getElementById('weight-chart'));
  //     chart.draw(data, options);
  // }

  function renderRec(userProfile) {
      currentUser = userProfile;
      hideAll()
      $('#recommendation').show();
      var userPound = parseInt(userProfile.weight);
      var userInch = feetInchToInch(parseInt(userProfile.feet), parseInt(userProfile.inch));
      // This is gonna return {'bmi':bmi,'bmiStr':bmiStr}
      var bmiObj = calcBMI(userPound, userInch);
      var recObj = profileToRecomm(userProfile, bmiObj);
      $('#rec-resistance').html(recObj.resistance);
      $('#rec-cardio').html(recObj.cardio);
      $('#rec-nutrition').html(recObj.nutrition);
      $('#user-name').text(userProfile.name)
      console.log("bmiObj: ", bmiObj)
      drawBMI(bmiObj);
      $('#weightSpan').text(userPound);
      $('#goalSpan').text(userProfile.fitnessGoal.toUpperCase());
      drawWeight(weightTest);
  }

});