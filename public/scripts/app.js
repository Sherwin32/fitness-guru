let currentUser = {};
let currentWeightHistory = {};
const adminId = ["sherwin", "tahl"];
let isAdmin = false;

/* CLIENT-SIDE JS*/
$(document).ready(function() {

  hideAll();
  $('#built-in-content').show();
    console.log('app.js loaded!');
    const timeToExpire = 0.1; //time until expire
    var isLogIn = false;
    var userCookie = getCookie("FITNESS_GURU_ID");
    console.log("userCookie: ", userCookie);
    if (userCookie) {
        $.ajax({
            method: 'GET',
            url: '/profile/cookie',
            data: userCookie,
            success: logInProfile,
            error: handleError
        })
        console.log("got an cookie!!!log in!!")
    }else{
      logOut();
    }
    //cookie end

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
        $('#show-weight').hide();
        $('#new-weight').show();
    })


    $('#update-goal-btn').on('click', function() {
        $('#show-goal').hide();
        $('#new-goal').show();
    })

    $('#create-form').on('submit', createFormOnSubmit);
    $('#log-in-submit').on('submit', logInOnSubmit);
    $('#update-weight').on('submit', updateWeight);
    $('#update-goal').on('submit', updateGoal);
    $('#log-out-btn').on('click', logOut);

    function logOut() {
        navBarToggle();
        killCookie();
        hideAll();
        $('#built-in-content').show();
        homepageChart();
    }

    function homepageChart(){
      $.ajax({
        method: 'GET',
        url: '/profile/all',
        success: homepageChartOnSuccess,
        error: handleError      
      })
    }

    function homepageChartOnSuccess(json){
      drawScatter(json);
    }

    function navBarToggle() {
        if (isLogIn) {
            $('#log-in-btn').hide();
            $('#create-btn').hide();
            $('#log-out-btn').show();
            isLogIn = false;
        } else {
            $('#log-in-btn').show();
            $('#create-btn').show();
            $('#log-out-btn').hide();
            isLogIn = true;
        }
    }

    function getWeight() {
        $.ajax({
            method: 'GET',
            url: `/weight`,
            data: `userId=${currentUser.userId}`,
            success: getWeightOnSuccess,
            error: handleError
        })
    }

    function getWeightOnSuccess(jsonList) {
        currentWeightHistory = jsonList.map(function(history) {
            history.weight = parseInt(history.weight);
            return history;
        })
        console.log("currentWeightHistory: ", currentWeightHistory);
        drawWeight(currentWeightHistory);
    }

    function updateGoal(e) {
        e.preventDefault();
        requestData = `${$(this).serialize()}&userId=${currentUser.userId}`;
        $.ajax({
            method: 'PUT',
            url: `/profile/goal`,
            data: requestData,
            success: logInProfile,
            error: handleError
        })
    }

    function updateWeight(e) {
        e.preventDefault();
        var t = Date();
        timeSerialize = `&time=${encodeURI(t)}`;
        requestData = `${$(this).serialize()}${timeSerialize}&userId=${currentUser.userId}`;
        $.ajax({
            method: 'PUT',
            url: `/profile/weight`,
            data: requestData,
            success: logInProfile,
            error: handleError
        })
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
        requestData = $(this).serialize() + timeSerialize;
        $.ajax({
            method: 'POST',
            url: '/profile',
            data: requestData,
            success: createProfile,
            error: handleError
        })
    }

    function logInProfile(json) {
        if (json === "login error") {
            console.log(json, "inside login error");
            alert("Oops! Wrong id or password");
        } else if (json === "cookie fail") {
            console.log("cookie fail");
            console.log("cookie: ", userCookie);
        } else {
            console.log(json, "inside render");
            setCookie("FITNESS_GURU_ID", `userId=${json.userId}`, 0.03);
            currentUser = json;
            renderRec(currentUser);
            isLogIn = true;
            navBarToggle();
        }
    }

    function createProfile(json) {
        if (json === "exist error") {
            console.log(json);
            alert("id already exists. Please use another one")
        } else {
            console.log(json, "inside render");
            setCookie("FITNESS_GURU_ID", `userId=${json.userId}`, 0.03);
            currentUser = json
            renderRec(currentUser);
            console.log("currentUser: ", currentUser);
            isLogIn = true;
            navBarToggle();
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

    function setCookie(cname, cvalue, expireDays) {
        var d = new Date();
        d.setTime(d.getTime() + (expireDays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }

    function getCookie(cname) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    function killCookie() {
        setCookie("FITNESS_GURU_ID", "", 0);
        console.log("killed cookie: ", getCookie("FITNESS_GURU_ID"));
    }


    function drawBMI(bmiIn) {
        google.charts.setOnLoadCallback(drawChart);

        function drawChart() {
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
    }

    function drawScatter(scatterDS) {
      google.charts.setOnLoadCallback(drawChart);
      function drawChart(){
        var dataArray = [['Age', 'Weight', {role:'style'} ]];
        for (var j=0; j<scatterDS.length; j++) {
            var age = parseInt(scatterDS[j].age);
            var weight = parseInt(scatterDS[j].weight);
            var gender = scatterDS[j].gender.toLowerCase();
            var genderColor = gender[0]==='m' ? 'blue' : 'pink';
            var babyArray = [age, weight, 'point { fill-color: ' + genderColor];
            dataArray.push(babyArray);
         }
        var data = google.visualization.arrayToDataTable(dataArray);
        var options = {
            title: 'Fitness Guru Community',
            pointSize: 7,
            legend: 'none',
            height: 250, width: 520, 
            hAxis: {title: 'Age'},
            vAxis: {title: 'Weight'}
        };
        var chart = new google.visualization.ScatterChart(document.getElementById('scatterDiv'));
        chart.draw(data, options);
    }   }

    function drawWeight(weightIn) {
        google.charts.setOnLoadCallback(drawChart);
        function drawChart() {
            var dataArray = [
                ['Date', 'Weight']
            ];
            for (var j = 0; j < weightIn.length; j++) {
                var shortTime = weightIn[j].time.substr(4, 6);
                shortTime[3] = '-';
                var babyArray = [shortTime, parseInt(weightIn[j].weight)]
                dataArray.push(babyArray);
            }
            var data = google.visualization.arrayToDataTable(dataArray);
            var options = {
                title: 'Weight History (lbs)',
                curveType: 'function',
                pointSize: 7,
                series: {
                    0: { pointShape: 'diamond' }
                },
                legend: {
                    position: 'none'
                },
                height: 250,
                width: 520

            };
            var chart = new google.visualization.LineChart(document.getElementById('weight-chart'));
            chart.draw(data, options);
        }
    }

    function getFirstName(nameIn){
      nameIn = nameIn.concat(" ");
      nameArray = nameIn.split(" ");
      return nameArray[0];
    }

    function renderRec(userProfile) {
        getWeight();
        userProfile.inch = parseInt(userProfile.inch);
        userProfile.feet = parseInt(userProfile.feet);
        userProfile.weight = parseInt(userProfile.weight);
        hideAll();
        $('#recommendation').show();
        $('#show-goal').show();
        $('#new-goal').hide();
        $('#show-weight').show();
        $('#new-weight').hide();
        var userPound = parseInt(userProfile.weight);
        // This is gonna return {'bmi':bmi,'bmiStr':bmiStr}
        var bmiObj = calcBMI(userProfile);
        drawBMI(bmiObj);
        var recObj = profileToRecomm(userProfile, bmiObj);
        $('#rec-resistance').html(recObj.resistance);
        $('#rec-cardio').html(recObj.cardio);
        $('#rec-nutrition').html(recObj.nutrition);
        $('#user-name').text(getFirstName(userProfile.name));
        $('#weightSpan').text(userPound);
        $('#goalSpan').text(userProfile.fitnessGoal.toUpperCase());
    }
});