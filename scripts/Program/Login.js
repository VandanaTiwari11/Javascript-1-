
$(document).ready(function () {  
$("#GetForm").submit(function (e) {  
$.ajax({
            url: "http://103.233.79.87/TrainingAPI/api/Login/GetLogin?Id="+$('#txtUserID').val()+"&password=" + $('#txtPassword').val(),
            type: "GET",
            contentType: 'application/json',
            dataType: 'json',
            cache: false,
            async: false,
            success: function (data) {
				if(data=="1"){
					window.open('home.html');
				}
				else{
					alert("Please enter corrent UserId and Password.");
				}
				
                
            },
            error: function (xhRequest, ErrorText, thrownError) {
                alert(xhRequest.status);
				alert(xhRequest.responseText);
				alert(ErrorText);
				alert(thrownError);
            }
        });
});  
});  
 