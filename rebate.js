$("#select_state_rebate").change(function() {
    $('#select_utility_rebate')
    .find('option')
    .remove()
    .end()
    .append('<option>Choose Utility</option>')
    ;
    $('#select_style_rebate')
    .find('option')
    .remove()
    .end()
    .append('<option>Choose Rebate Style</option>')
    ;
    if($("#select_state_rebate")[0].selectedIndex > 0) {
        var state_val = $("#select_state_rebate").val();
        $("#select_utility_rebate").prop("disabled", false);
        $.ajax({ 
            url: 'rebateajax.php', 
            data: {
                state: state_val, 
                action: "utility"
            },
            type: 'POST',
            dataType: 'JSON',
            success: function(output) {
                var results = output;
                for(var i in results) {
                    $('#select_utility_rebate').append($("<option/>", {
                        value: results[i].utility,
                        text: results[i].utility
                    }));
                };
            },
            error: function() {
            }
        });
    }
    else {
        $("#select_utility_rebate").prop("disabled", true);
        $("#select_style_rebate").prop("disabled", true);
        $("#rebate_submit").prop("disabled", true);
    }
});

$("#select_utility_rebate").change(function() {
    $('#select_style_rebate')
    .find('option')
    .remove()
    .end()
    .append('<option>Choose Rebate Style</option>')
    ;
    if($("#select_utility_rebate")[0].selectedIndex > 0) {
        var state_val = $("#select_state_rebate").val();
        var utility_val = $("#select_utility_rebate").val();
        $("#select_style_rebate").prop("disabled", false);
        $.ajax({ 
            url: 'rebateajax.php', 
            data: {
                state: state_val, 
                utility: utility_val,
                action: "type"
            },
            type: 'POST',
            dataType: 'JSON',
            success: function(output) {
                var results = output;
                for(var i in results) {
                    $('#select_style_rebate').append($("<option/>", {
                        value: results[i].rebate_style,
                        text: results[i].rebate_style
                    }));
                };
                $("#rebate_submit").prop("disabled", false);
            },
            error: function() {
            }
        });
    }
    else {
        $("#select_style_rebate").prop("disabled", true);
        $("#rebate_submit").prop("disabled", true);
        $('#select_style_rebate')
        .find('option')
        .remove()
        .end()
        .append('<option>Choose Rebate Style</option>')
        ;
    }
});

$( "#rebate_form" ).submit(function( event ) {
    $('.result').remove();
    var state_val = $("#select_state_rebate").val();
    var utility_val = $("#select_utility_rebate").val();
    var style_val = $("#select_style_rebate").val();
    $.ajax({ 
        url: 'rebateajax.php', 
        data: {
            state: state_val, 
            utility: utility_val,
            style: style_val,
            action: "submit"
        },
        type: 'POST',
        dataType: 'JSON',
        success: function(output) {
            $("#result_table").show();
            var results = output;
            console.log(results);
            for(var i in results) {

                if(results[i].existing_wattage_high==null){
                    if(results[i].wattage_high==null)
                    {
                        $('#result_table tr:last').after('<tr class="result"><td>' +results[i].tech + '</td><td>' + results[i].category2 + '</td><td width="260">' + results[i].existing_type + '</td><td></td><td class="header">' + '</td><td class="header">$' + results[i].rebate + '</td><td class="header">' + results[i].certification + '</td><td class="header" width="90">' + results[i].solutions_code + '</td><td>' +results[i].other + '</td></tr>');
                    }
                    else if(results[i].wattage_low==null)
                    {
                        $('#result_table tr:last').after('<tr class="result"><td>' +results[i].tech + '</td><td>' + results[i].category2 + '</td><td width="260">' + results[i].existing_type + '</td><td></td><td class="header">' + Math.round(results[i].wattage_high) + '</td><td class="header">$' + results[i].rebate + '</td><td class="header">' + results[i].certification + '</td><td class="header" width="90">' + results[i].solutions_code + '</td><td>' +results[i].other + '</td></tr>');
                    }
                    else
                    {
                        $('#result_table tr:last').after('<tr class="result"><td>' +results[i].tech + '</td><td>' + results[i].category2 + '</td><td width="260">' + results[i].existing_type + '</td><td></td><td class="header">' + Math.round(results[i].wattage_low) + '-' + Math.round(results[i].wattage_high) + '</td><td class="header">$' + results[i].rebate + '</td><td class="header">' + results[i].certification + '</td><td class="header" width="90">' + results[i].solutions_code + '</td><td>' +results[i].other + '</td></tr>');
                    }
                    
                }
                else if(results[i].existing_wattage_low==null)
                {
                    if(results[i].wattage_high==null)
                    {
                        $('#result_table tr:last').after('<tr class="result"><td>' +results[i].tech + '</td><td>' + results[i].category2 + '</td><td width="260">' + results[i].existing_type + '</td><td>' + Math.round(results[i].existing_wattage_high) + '</td><td class="header">' + '</td><td class="header">$' + results[i].rebate + '</td><td class="header">' + results[i].certification + '</td><td class="header" width="90">' + results[i].solutions_code + '</td><td>' +results[i].other + '</td></tr>');
                    }
                    else if(results[i].wattage_low==null)
                    {
                        $('#result_table tr:last').after('<tr class="result"><td>' +results[i].tech + '</td><td>' + results[i].category2 + '</td><td width="260">' + results[i].existing_type + '</td><td>' + Math.round(results[i].existing_wattage_high) + '</td><td class="header">' + Math.round(results[i].wattage_high) + '</td><td class="header">$' + results[i].rebate + '</td><td class="header">' + results[i].certification + '</td><td class="header" width="90">' + results[i].solutions_code + '</td><td>' +results[i].other + '</td></tr>');
                    }
                    else
                    {
                        $('#result_table tr:last').after('<tr class="result"><td>' +results[i].tech + '</td><td>' + results[i].category2 + '</td><td width="260">' + results[i].existing_type + '</td><td>' + Math.round(results[i].existing_wattage_high) + '</td><td class="header">' + Math.round(results[i].wattage_low) + '-' + Math.round(results[i].wattage_high) + '</td><td class="header">$' + results[i].rebate + '</td><td class="header">' + results[i].certification + '</td><td class="header" width="90">' + results[i].solutions_code + '</td><td>' +results[i].other + '</td></tr>');
                    }
                    
                }
                else
                {
                    if(results[i].wattage_high==null)
                    {
                        $('#result_table tr:last').after('<tr class="result"><td>' +results[i].tech + '</td><td>' + results[i].category2 + '</td><td width="260">' + results[i].existing_type + '</td><td>'+ Math.round(results[i].existing_wattage_low) + '-' + Math.round(results[i].existing_wattage_high) + '</td><td class="header">' + '</td><td class="header">$' + results[i].rebate + '</td><td class="header">' + results[i].certification + '</td><td class="header" width="90">' + results[i].solutions_code + '</td><td>' +results[i].other + '</td></tr>');
                    }
                    else if(results[i].wattage_low==null)
                    {
                        $('#result_table tr:last').after('<tr class="result"><td>' +results[i].tech + '</td><td>' + results[i].category2 + '</td><td width="260">' + results[i].existing_type + '</td><td>'+ Math.round(results[i].existing_wattage_low) + '-' + Math.round(results[i].existing_wattage_high) + '</td><td class="header">' + Math.round(results[i].wattage_high) + '</td><td class="header">$' + results[i].rebate + '</td><td class="header">' + results[i].certification + '</td><td class="header" width="90">' + results[i].solutions_code + '</td><td>' +results[i].other + '</td></tr>');
                    }
                    else
                    {
                        $('#result_table tr:last').after('<tr class="result"><td>' +results[i].tech + '</td><td>' + results[i].category2 + '</td><td width="260">' + results[i].existing_type + '</td><td>'+ Math.round(results[i].existing_wattage_low) + '-' + Math.round(results[i].existing_wattage_high) + '</td><td class="header">' + Math.round(results[i].wattage_low) + '-' + Math.round(results[i].wattage_high) + '</td><td class="header">$' + results[i].rebate + '</td><td class="header">' + results[i].certification + '</td><td class="header" width="90">' + results[i].solutions_code + '</td><td>' +results[i].other + '</td></tr>');
                    }
                    
                }
            }
        },
        error: function() {
            console.log('error');
        }
    });
event.preventDefault();

});
$( "input[type='reset']" ).on('click', function( event ) {
    $("#select_style_rebate").prop("disabled", true);
    $("#select_utility_rebate").prop("disabled", true);
});