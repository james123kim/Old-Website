$("#select_state_rebate").change(function () {
    $('#select_utility_rebate')
    .find('option')
    .remove()
    .end()
    .append('<option>Choose Utility</option>');
    $('#select_style_rebate')
    .find('option')
    .remove()
    .end()
    .append('<option>Choose Rebate Style</option>');
    if ($("#select_state_rebate")[0].selectedIndex > 0) {
        var state_val = $("#select_state_rebate").val();
        $("#select_utility_rebate").prop("disabled", false);
        $.ajax({
            url: 'productajax.php',
            data: {
                state: state_val,
                action: "utility"
            },
            type: 'POST',
            dataType: 'JSON',
            success: function (output) {
                var results = output;
                for (var i in results) {
                    $('#select_utility_rebate').append($("<option/>", {
                        value: results[i].utility,
                        text: results[i].utility
                    }));
                }
            },
            error: function () {}
        });
    } else {
        $("#select_utility_rebate").prop("disabled", true);
        $("#select_style_rebate").prop("disabled", true);
        $("#rebate_submit").prop("disabled", true);
    }
});

$("#select_utility_rebate").change(function () {
    $('#select_style_rebate')
    .find('option')
    .remove()
    .end()
    .append('<option>Choose Rebate Style</option>');
    if ($("#select_utility_rebate")[0].selectedIndex > 0) {
        var state_val = $("#select_state_rebate").val();
        var utility_val = $("#select_utility_rebate").val();
        $("#select_style_rebate").prop("disabled", false);
        $.ajax({
            url: 'productajax.php',
            data: {
                state: state_val,
                utility: utility_val,
                action: "type"
            },
            type: 'POST',
            dataType: 'JSON',
            success: function (output) {
                var results = output;
                for (var i in results) {
                    $('#select_style_rebate').append($("<option/>", {
                        value: results[i].rebate_style,
                        text: results[i].rebate_style
                    }));
                }
                $("#rebate_submit").prop("disabled", false);
            },
            error: function () {}
        });
    } else {
        $("#select_style_rebate").prop("disabled", true);
        $("#rebate_submit").prop("disabled", true);
        $('#select_style_rebate')
        .find('option')
        .remove()
        .end()
        .append('<option>Choose Rebate Style</option>');
    }
});





$("#rebate_form").submit(function (event) {
    $('.result').remove();
    var state_val = $("#select_state_rebate").val();
    var utility_val = $("#select_utility_rebate").val();
    var style_val = $("#select_style_rebate").val();
    $.ajax({
        url: 'productajax.php',
        data: {
            state: state_val,
            utility: utility_val,
            style: style_val,
            action: "submit"
        },
        type: 'POST',
        dataType: 'JSON',
        success: function (output) {
            var rebates = output;
            console.log(rebates);

            $.ajax({
                url: 'productajax.php',
                data: {
                    action: "getproduct"
                },
                type: 'POST',
                dataType: 'JSON',
                success: function (output) {
                    $("#result_table").show();
                    var products = output;
                    console.log(products);
                    for (var i in products) {
                        for (var j in rebates) {
                            if(rebates[j].type == products[i].type || rebates[j].type===null || rebates[j].type=="") {
                                
                                if(rebates[j].location == products[i].location || rebates[j].location===null || rebates[j].location=="") {
                                    
                                    if (rebates[j].category1 == products[i].category1 || rebates[j].category1===null || rebates[j].category1=="") {
                                        
                                        if (rebates[j].wattage_high === null) {
                                            if (rebates[j].existing_wattage_high === null) {
                                                $('#result_table tr:last').after('<tr class=result><td>' + products[i].image + '</td><td>' + rebates[j].solutions_code + '</td><td>'+ products[i].description + '</td><td>$' + rebates[i].rebate + '</td><td>$' + products[i].price + '</td><td>' + rebates[j].existing_type + '</td><td></td></tr>');

                                            } else if (rebates[j].existing_wattage_low === null) {
                                                $('#result_table tr:last').after('<tr class=result><td>' + products[i].image + '</td><td>' + rebates[j].solutions_code + '</td><td>'+ products[i].description + '</td><td>$' + rebates[i].rebate + '</td><td>$' + products[i].price + '</td><td>' + rebates[j].existing_type + '</td><td>' + Math.round(rebates[j].existing_wattage_high) + '</td></tr>');

                                            } else {
                                               $('#result_table tr:last').after('<tr class=result><td>' + products[i].image + '</td><td>' + rebates[j].solutions_code + '</td><td>'+ products[i].description + '</td><td>$' + rebates[i].rebate + '</td><td>$' + products[i].price + '</td><td>' + rebates[j].existing_type + '</td><td>' + Math.round(rebates[j].existing_wattage_low) + '-' + Math.round(rebates[j].existing_wattage_high) + '</td></tr>');

                                           }

                                       } else if (rebates[j].wattage_low === null) {
                                        if (products[i].wattage == rebates[j].wattage_high) {
                                            if (rebates[j].existing_wattage_high === null) {
                                                $('#result_table tr:last').after('<tr class=result><td>' + products[i].image + '</td><td>' + rebates[j].solutions_code + '</td><td>'+ products[i].description + '</td><td>$' + rebates[i].rebate + '</td><td>$' + products[i].price + '</td><td>' + rebates[j].existing_type + '</td><td></td></tr>');

                                            } else if (rebates[j].existing_wattage_low === null) {
                                                $('#result_table tr:last').after('<tr class=result><td>' + products[i].image + '</td><td>' + rebates[j].solutions_code + '</td><td>'+ products[i].description + '</td><td>$' + rebates[i].rebate + '</td><td>$' + products[i].price + '</td><td>' + rebates[j].existing_type + '</td><td>' + Math.round(rebates[j].existing_wattage_high) + '</td></tr>');

                                            } else {
                                               $('#result_table tr:last').after('<tr class=result><td>' + products[i].image + '</td><td>' + rebates[j].solutions_code + '</td><td>'+ products[i].description + '</td><td>$' + rebates[i].rebate + '</td><td>$' + products[i].price + '</td><td>' + rebates[j].existing_type + '</td><td>' + Math.round(rebates[j].existing_wattage_low) + '-' + Math.round(rebates[j].existing_wattage_high) + '</td></tr>');

                                           }
                                       }
                                } else if (parseInt(products[i].wattage) <= parseInt(rebates[j].wattage_high) && parseInt(products[i].wattage) >= parseInt(rebates[j].wattage_low)) { //why the hell are these values strings?
                                    if (rebates[j].existing_wattage_high === null) {
                                        $('#result_table tr:last').after('<tr class=result><td>' + products[i].image + '</td><td>' + rebates[j].solutions_code + '</td><td>'+ products[i].description + '</td><td>$' + rebates[i].rebate + '</td><td>$' + products[i].price + '</td><td>' + rebates[j].existing_type + '</td><td></td></tr>');

                                    } else if (rebates[j].existing_wattage_low === null) {
                                        $('#result_table tr:last').after('<tr class=result><td>' + products[i].image + '</td><td>' + rebates[j].solutions_code + '</td><td>'+ products[i].description + '</td><td>$' + rebates[i].rebate + '</td><td>$' + products[i].price + '</td><td>' + rebates[j].existing_type + '</td><td>' + Math.round(rebates[j].existing_wattage_high) + '</td></tr>');

                                    } else {
                                       $('#result_table tr:last').after('<tr class=result><td>' + products[i].image + '</td><td>' + rebates[j].solutions_code + '</td><td>'+ products[i].description + '</td><td>$' + rebates[i].rebate + '</td><td>$' + products[i].price + '</td><td>' + rebates[j].existing_type + '</td><td>' + Math.round(rebates[j].existing_wattage_low) + '-' + Math.round(rebates[j].existing_wattage_high) + '</td></tr>');

                                   }

                               }
                           }
                       }
                   }
               }
           }
       },
       error: function () {
        console.log('error');
    }
});
},
error: function () {
    console.log('error');
}
});
event.preventDefault();

});
$("input[type='reset']").on('click', function (event) {
    $("#select_style_rebate").prop("disabled", true);
    $("#select_utility_rebate").prop("disabled", true);
});