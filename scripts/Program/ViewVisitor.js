
$(document).ready(function () {  
 bindVisitorGrid();
});  
 
 function bindVisitorGrid(){
	$.ajax({
            url: "http://103.233.79.87/trainingAPI/api/Visitor/GetVisitorEntry?Dates=",
            type: "GET",
            contentType: 'application/json',
            dataType: 'json',
            cache: false,
            async: false,
            success: function (data) {
				var ItemList = '';
				if (data !== undefined && data !== '' && data !="0") {
				$.each(data, function (index, item) {
                ItemList += "<tr style='text-align: center;'><td>"+item.Contact+"</td><td>"+item.Temp_Id_No+"</td><td>"+item.Name+"</td> <td>"+item.VehicleNo+"<td>"+item.Purpose+"</td><td>"+item.Meeting_Whom+"</td> <td> <input type='button'  class='btn-danger btn-outline-success' value ='delete' onclick='DeleteVisitor("+item.Visitor_Id+")'></td></tr>";
				});
				//ItemList +="</tbody>";
        }
        $('#tblVisitor').html(ItemList);
                
            },
            error: function (xhRequest, ErrorText, thrownError) {
                alert(xhRequest.status);
				alert(xhRequest.responseText);
				alert(ErrorText);
				alert(thrownError);
            }
        }); 
 }
 
 function DeleteVisitor(id){
$.ajax({
            url: "http://103.233.79.87/trainingAPI/api/Visitor/VisitorDelete?Visitor_Id=" +id,
            type: "GET",
            contentType: 'application/json',
            dataType: 'json',
            cache: false,
            async: false,
            success: function (data) {
				alert(data);
				var ItemList = '';
				if (data == "1") {
				alert("Data Deleted Successfully.");
				bindVisitorGrid();
				}
				else {
            alert("Plese try Again");
			}
            },
            error: function (xhRequest, ErrorText, thrownError) {
                alert(xhRequest.status);
				alert(xhRequest.responseText);
				alert(ErrorText);
				alert(thrownError);
            }
        }); 
	
 }