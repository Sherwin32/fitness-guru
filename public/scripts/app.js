/* CLIENT-SIDE JS
 *
 * You may edit this file as you see fit.  Try to separate different components
 * into functions and objects as needed.
 *
 */
$(document).ready(function() {
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
            console.log(data[key]);
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