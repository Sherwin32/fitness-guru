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