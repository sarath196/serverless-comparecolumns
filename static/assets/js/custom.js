function recordSet(field1, field2, result, element){
        $('#id-'+element+'-diff1').find('tbody').empty()
        $.each(field1, function( index, value ) {
          if ($.inArray(value, result) != -1){
            $('#id-'+element+'-diff1').append('<tr><td class="TURQUOISE" >'+value+'</td></tr>')
          }else{
            $('#id-'+element+'-diff1').append('<tr><td>'+value+'</td></tr>')
          }
        });

        $('#id-'+element+'-diff2').find('tbody').empty()
        $.each(field2, function( index, value ) {
          if ($.inArray(value, result) != -1){
            $('#id-'+element+'-diff2').append('<tr><td class="TURQUOISE" >'+value+'</td></tr>')
          }else{
            $('#id-'+element+'-diff2').append('<tr><td>'+value+'</td></tr>')
          }
        });

        $('#id-'+element+'-result').DataTable().clear();
        $.each(result, function( index, value ) {
          $('#id-'+element+'-result').dataTable().fnAddData( [value]);
        });

        $('.dropdown-filter-dropdown').empty();
        excelFilter();
}


function excelFilter() {
      // Apply the plugin
      $('.inputtable').excelTableFilter();
      $('.resulttable').excelTableFilter();
}


function loaDatatable(){
        $('.resulttable').DataTable( {
        	"paging":false,
             "info":false,
             "searching":false,
            dom: 'Bfrtip',
            buttons: [
                {
                    extend: "copy",
                    title: "",
                    className: "btn default cust_btn"
                },
                {
                    extend: "csv",
                    title: "",
                    className: "btn default cust_btn"
                },
                {
                    extend: "print",
                    title: "",
                    className: "btn default cust_btn"
                }
            ]
        } );
}


$('#comparebtn').click(function(event){
        event.preventDefault();
        var serialized = $("form").serializeArray();
        var serialized_data = {}
        for(s in serialized){
                serialized_data[serialized[s]['name']] = serialized[s]['value']
                }
        if ($.isEmptyObject(serialized_data['field1']) || $.isEmptyObject(serialized_data['field2']) ){
            alert("Invalid Input");
            return
        }
        $.ajax({
            url:"https://6aczceqqt6.execute-api.us-east-1.amazonaws.com/dev/compare",
            type: "POST",
            dataType: 'json',
            async: true,
            crossDomain: true,
            contentType: 'application/json',
            data: JSON.stringify(serialized_data),
            success:OnSuccess,
            error:function(XMLHttpRequest,textStatus,errorThrown){
            alert("error"+errorThrown);
            console.log(XMLHttpRequest);
            console.log(textStatus);
            console.log(errorThrown);
            }
        });
});


function OnSuccess(data){
        request_response = JSON.parse(data.body);
        field1 = request_response.field1
        field2 = request_response.field2
        diff_A_B = request_response.differnce_A_B_result
        diff_B_A = request_response.difference_B_A_result
        intersection_res = request_response.intersection_result
        union_res = request_response.union_result
        symmetric_diff = request_response.symmetric_difference_result

        $('#record-panel').show();
        // render union records
        recordSet(field1, field2, union_res, 'union');
        // render intersection records
        recordSet(field1, field2, intersection_res, 'intersection');
        // render diff_A_B records
        recordSet(field1, field2, diff_A_B, 'differnce_A_B');
        // render diff_B_A records
        recordSet(field1, field2, diff_B_A, 'difference_B_A');
        // render symmetric records
        recordSet(field1, field2, symmetric_diff, 'symmetric_difference');
}

$('.copy-record').on('click', function(event){
    $('#field1').val('Cloudberry\nCoconut\nCranberry\nCucumber\nDate\nDragonfruit (or Pitaya)\nDurian\nGooseberry');
    $('#field2').val('Cloudberry\nCoconut\nGoji berry\nGooseberry\nDate\nDragonfruit (or Pitaya)\nDurian\nElderberry\nFeijoa\nGoji berry\nGrape');
})

$(document).ajaxStart(function(){
  $("#wait").css("display", "block");
});

$(document).ajaxComplete(function(){
  $("#wait").css("display", "none");
});