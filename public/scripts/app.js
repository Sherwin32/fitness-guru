/* CLIENT-SIDE JS
 *
 * You may edit this file as you see fit.  Try to separate different components
 * into functions and objects as needed.
 *
 */

$(document).ready(function() {
  console.log('app.js loaded!');

  $('#log-in-btn').on('click', function(){
    $('#built-in-content').hide();
    $('#create-form').hide();
    $('#log-in-form').show();
  })

    $('#create-btn').on('click', function(){
    $('#built-in-content').hide();
    $('#log-in-form').hide();
    $('#create-form').show();
  })

    //function hideAll(){

    // }

});






