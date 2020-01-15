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

        var union_f1_count = 0;
        var union_f2_count = 0;
        var intersection_f1_count = 0;
        var intersection_f2_count = 0;
        var differnce_A_B_f1_count = 0;
        var differnce_A_B_f2_count = 0;
        var difference_B_A_f1_count = 0;
        var difference_B_A_f2_count = 0;
        var symmetric_difference_f1_count = 0;
        var symmetric_difference_f2_count = 0;

		if (JSON.parse(data.statusCode) != 200){
			alert(JSON.parse(data.body))
			return false
		}
		
        request_response = JSON.parse(data.body);
        console.log(request_response);
        $('#record-panel').show();
        
        $('.field-f1-badge').text($('#field1').val().split('\n').length);
        $('.field-f2-badge').text($('#field2').val().split('\n').length);

		$('#id-union-diff').DataTable( {
            data: request_response.union_result,
			bPaginate: false,
			destroy: true,
			ordering: false,
			createdRow: function( row, record, recordIndex){
				if ($.inArray(record[0], request_response.union_result_set) != -1){
                    union_f1_count +=1;
                    $(row).children().eq(0).addClass('TURQUOISE');
                }
					
				
				if ($.inArray(record[1], request_response.union_result_set) != -1){
                    union_f2_count+=1
                    $(row).children().eq(1).addClass('TURQUOISE');
                }
            },
			dom: 'Bfrtip',
            buttons: [
                {
                    extend: "copy",
                    title: "",
                    className: "btn default cust_btn",
					header: false,
					exportOptions: {
						columns: [2]
					}
                },
                {
                    extend: "csv",
                    title: "",
                    className: "btn default cust_btn",
					exportOptions: {
						columns: [0,1,2]
					}
                },
                {
                    extend: "print",
                    title: "",
                    className: "btn default cust_btn",
					exportOptions: {
						columns: [0,1,2]
					}
                }
            ]
            
        } );
        $('.union-f1-badge').text(union_f1_count);
        $('.union-f2-badge').text(union_f2_count);
		$('.union-result-badge').text(request_response.union_result_set.length);
        
        $('#id-intersection-diff').DataTable( {
            data: request_response.intersection_result,
			bPaginate: false,
			destroy: true,
			ordering: false,
			createdRow: function( row, record, recordIndex){
                if ($.inArray(record[0], request_response.intersection_result_set) != -1){
                    intersection_f1_count+=1;
					$(row).children().eq(0).addClass('TURQUOISE');
                }
                
				if ($.inArray(record[1], request_response.intersection_result_set) != -1){
                    intersection_f2_count+=1;
                    $(row).children().eq(1).addClass('TURQUOISE');
                }
            },
            dom: 'Bfrtip',
            buttons: [
                {
                    extend: "copy",
                    title: "",
                    className: "btn default cust_btn",
					header: false,
					exportOptions: {
						columns: [2]
					}
                },
                {
                    extend: "csv",
                    title: "",
                    className: "btn default cust_btn",
					exportOptions: {
						columns: [0,1,2]
					}
                },
                {
                    extend: "print",
                    title: "",
                    className: "btn default cust_btn",
					exportOptions: {
						columns: [0,1,2]
					}
                }
            ]
            
        } );
        $('.intersection-f1-badge').text(intersection_f1_count);
        $('.intersection-f2-badge').text(intersection_f2_count);
		$('.intersection-result-badge').text(request_response.intersection_result_set.length);
		
		
		$('#id-differnce_A_B-diff').DataTable( {
            data: request_response.differnce_A_B_result,
			bPaginate: false,
			destroy: true,
			ordering: false,
			createdRow: function( row, record, recordIndex){
                if ($.inArray(record[0], request_response.differnce_A_B_result_set) != -1)
                {
                    differnce_A_B_f1_count+=1;
                    $(row).children().eq(0).addClass('TURQUOISE');
                }

				if ($.inArray(record[1], request_response.differnce_A_B_result_set) != -1){
                    differnce_A_B_f2_count+=1;
                    $(row).children().eq(1).addClass('TURQUOISE');
                }
            },
            dom: 'Bfrtip',
            buttons: [
                {
                    extend: "copy",
                    title: "",
                    className: "btn default cust_btn",
					header: false,
					exportOptions: {
						columns: [2]
					}
                },
                {
                    extend: "csv",
                    title: "",
                    className: "btn default cust_btn",
					exportOptions: {
						columns: [0,1,2]
					}
                },
                {
                    extend: "print",
                    title: "",
                    className: "btn default cust_btn",
					exportOptions: {
						columns: [0,1,2]
					}
                }
            ]
            
        } );
        $('.differnce_A_B-f1-badge').text(differnce_A_B_f1_count);
        $('.differnce_A_B-f2-badge').text(differnce_A_B_f2_count);
		$('.differnce_A_B-result-badge').text(request_response.differnce_A_B_result_set.length);
		
		
		$('#id-difference_B_A-diff').DataTable( {
            data: request_response.difference_B_A_result,
			bPaginate: false,
			destroy: true,
			ordering: false,
			createdRow: function( row, record, recordIndex){
				if ($.inArray(record[0], request_response.difference_B_A_result_set) != -1){
                    difference_B_A_f1_count+=1;
                    $(row).children().eq(0).addClass('TURQUOISE');
                }
					
				if ($.inArray(record[1], request_response.difference_B_A_result_set) != -1){
                    difference_B_A_f2_count+=1;
                    $(row).children().eq(1).addClass('TURQUOISE');
                }
            },
            dom: 'Bfrtip',
            buttons: [
                {
                    extend: "copy",
                    title: "",
                    className: "btn default cust_btn",
					header: false,
					exportOptions: {
						columns: [2]
					}
                },
                {
                    extend: "csv",
                    title: "",
                    className: "btn default cust_btn",
					exportOptions: {
						columns: [0,1,2]
					}
                },
                {
                    extend: "print",
                    title: "",
                    className: "btn default cust_btn",
					exportOptions: {
						columns: [0,1,2]
					}
                }
            ]
            
        } );
        $('.difference_B_A-f1-badge').text(difference_B_A_f1_count);
        $('.difference_B_A-f2-badge').text(difference_B_A_f2_count);
		$('.difference_B_A-result-badge').text(request_response.difference_B_A_result_set.length);
		
		
		$('#id-symmetric_difference-diff').DataTable( {
            data: request_response.Symmetric_difference_result,
			bPaginate: false,
			destroy: true,
			ordering: false,
			createdRow: function( row, record, recordIndex){
				if ($.inArray(record[0], request_response.Symmetric_difference_result_set) != -1){
                    symmetric_difference_f1_count+=1;
                    $(row).children().eq(0).addClass('TURQUOISE');
                }

				if ($.inArray(record[1], request_response.Symmetric_difference_result_set) != -1){
                    symmetric_difference_f2_count+=1;
                    $(row).children().eq(1).addClass('TURQUOISE');
                }
            },
            dom: 'Bfrtip',
            buttons: [
                {
                    extend: "copy",
                    title: "",
                    className: "btn default cust_btn",
					header: false,
					exportOptions: {
						columns: [2]
					}
                },
                {
                    extend: "csv",
                    title: "",
                    className: "btn default cust_btn",
					exportOptions: {
						columns: [0,1,2]
					}
                },
                {
                    extend: "print",
                    title: "",
                    className: "btn default cust_btn",
					exportOptions: {
						columns: [0,1,2]
					}
                }
            ]
            
        } );
        $('.symmetric_difference-f1-badge').text(symmetric_difference_f1_count);
        $('.symmetric_difference-f2-badge').text(symmetric_difference_f2_count);
		$('.symmetric_difference-result-badge').text(request_response.Symmetric_difference_result_set.length);
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