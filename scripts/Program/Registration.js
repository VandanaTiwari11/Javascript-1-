
$(document).ready(function () {  
$("#fromRegistration").submit(function (e) {
var dataVal={
	RoleId: "2",
	Fullname: $('#txtFullName').val(),
	TelNumber:$('#txtMobNo').val(),
	Email_id:$('#txtEmail').val(),
	password: $('#txtPwd').val(),
	MobileNumber: $('#txtMobNo').val(),
	DOB: $('#txtDob').val(),
	Gender: ($('#rbMale').is(':checked') == true ? "Male" : "Female")
};
$.ajax({
            url: "http://103.233.79.87/TrainingAPI/api/Registration/UserRegistration",
            type: "POST",
            data: dataVal,
            contentType: 'application/x-www-form-urlencoded',

            async: false,
            cache: false,
            success: function (data) {
                if(data=="1"){
				alert("registration done successfully.");	
				window.open('login.html');
				}
				else{
					alert("Please contact to administrator deparment");
				}
                ajaxCall = null;
            },
            error: function (xhRequest, ErrorText, thrownError) {
                ajaxCall = null;
				alert(xhRequest.status);
				alert(xhRequest.responseText);
				alert(ErrorText);
				alert(thrownError);
            }
        });
});  
});  
 