$(document).on("pagebeforeshow", "#pgPassword", function () {
    try {
        $('#flipPassword').on('change', function () {
            if ($('#flipPassword').val() === 'on') {

                $('#txtChangePassword').attr('type', 'password');
            } else {
                $('#txtChangePassword').attr('type', 'text');
            }
        });

        $('#btnChangePassword').click(function () {
            //change password call goes here
            var response = GetJson(loginUrl + '/api/Mobile/changepassword?password=' + $('#txtChangePassword').val(), false);
            if (response == "1") {

                var translatedText = TranslateText('Password had been re-set successfully');

                ShowToast(translatedText, 'short', 'center',
                    function (action) {
                        onLogoutConfirm('1');
                    },
                   noAction
                );
            } else {
                var txtValue = TranslateText('Please try again');
                navigator.notification.confirm(
                    txtValue,
                    null,
                    'Alert',
                    'OK'
                );
            }
        });
    } catch (error) {
        handleException(error);
    }
    TranslateHtmlText();
});

$(document).on("pagebeforecreate", "#pgPhoto", function () {
    try {
        $('#btnChangePhoto').click(function () {
            var photoUserId;

            if (window.localStorage.getItem("photoUserId") !== undefined && window.localStorage.getItem("photoUserId") !== '' && window.localStorage.getItem("photoUserId") !== null) {
                photoUserId = window.localStorage.getItem("photoUserId");
            } else {
                photoUserId = window.localStorage.getItem("UserId");
            }
            var options;
            var imageURI = $('#avatar').attr('src');
            imageURI = imageURI.split("?")[0];
            options = new FileUploadOptions();
            options.fileKey = "Photo";
            options.fileName = imageURI.substr(imageURI.lastIndexOf('/') + 1);
            options.mimeType = "text/plain";
            options.chunkedMode = false;
            var headers = { "Authorization": "bearer " + window.localStorage.getItem("token") };
            options.headers = headers;

            var params = {};
            params.userid = photoUserId;
            options.params = params;

            ft = new FileTransfer();
            if (checkConnection()) {
                showSpinner();
                ft.onprogress = function (progressEvent) {
                    if (progressEvent.lengthComputable) {
                        loadingStatus.setPercentage(progressEvent.loaded / progressEvent.total);
                    } else {
                        loadingStatus.increment();
                    }
                };
                ft.upload(imageURI, loginUrl + '/api/Mobile/changephoto', photoUploadSuccess, photoUploadFail, options);
            }
        });
    } catch (error) {
        handleException(error);
    }
});

function photoUploadSuccess(response) {
    var isStudentProfile = false;
    hideSpinner();
    var message = "Photo has been submitted for approval! Your new photo will be activated after approval.";

    $('#avatar').attr('src','');
    if (window.localStorage.getItem("photoUserId") !== undefined && window.localStorage.getItem("photoUserId") !== '' && window.localStorage.getItem("photoUserId") !== null) {
        message = "Photo has been submitted and will reflect after sometime.";
        isStudentProfile = true;
        $('#avatar').attr('src','');
    }

    var translatedText = TranslateText(message);

    ShowToast(translatedText, 'short', 'center',
                   function (action) {

                       if (isStudentProfile) {
                           window.localStorage.setItem("photoUserId", '');
                           $.mobile.changePage('#pgStudents', { transition: "flip" });
                       }
                       else {
                           $.mobile.changePage('#pgProfile', { transition: "flip" });
                       }
                   },
                  noAction
               );
};

function photoUploadFail(error) {
    hideSpinner();
    navigator.notification.beep(1);
    var translatedText = TranslateText("Photo upload has been failed. Kindly check internet connection and try again.");
    ShowToast(translatedText, 'short', 'center',
                  function (action) {
                      if (window.localStorage.getItem("photoUserId") !== undefined && window.localStorage.getItem("photoUserId") !== '' && window.localStorage.getItem("photoUserId") !== null) {
                          $('#linkBackFromPhoto').attr('href', '#pgStudents');
                      }
                  },
                 noAction
              );
};

$(document).on("pagebeforeshow", "#pgPhoto", function () {
    try {
        if (window.localStorage.getItem("photoUserId") !== undefined && window.localStorage.getItem("photoUserId") !== '' && window.localStorage.getItem("photoUserId") !== null) {
            $('#linkBackFromPhoto').attr('href', '#pgStudents');
        }
        else {
            $('#linkBackFromPhoto').attr('href', '#pgProfile');
        }

        $('#btnChangePhoto').hide();
        $('#avatarEmp').hide();

        $('#btnBrowsePhoto').show();
        $('#btnCapturePhoto').show();
    } catch (error) {
        handleException(error);
    }
});