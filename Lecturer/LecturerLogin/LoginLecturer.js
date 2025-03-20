document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM loaded and ready");


    let eyeopen = document.getElementById('Leye-open');

    var loginpassword = document.getElementById('login-password');
    
    eyeopen.addEventListener('click', function() {
    
        if(loginpassword.type === "password"){
        loginpassword.type = "text";
        eyeopen.src="eye-close.png"
        }
        else{
            loginpassword.type = "password";
            eyeopen.src="eye-open.png"
        }
    
    });







    // --------------------------------------login validation--------------------------------------

var btnLogin = document.getElementById('btn-Login');

    btnLogin.addEventListener('click', function(event) { //after login button clicked
       event.preventDefault();
        console.log("Login button clicked");
        var email = document.getElementById('login-email').value;
        var password = document.getElementById('login-password').value;

        if (email === "" || password === "") {
            alert("Please fill in all fields.");
            console.log("emtpy fields");
            return;
        }
     else if(!email.match(/^[A-Za-z\._\-0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/) ) {
        console.log("invalid emailpattern");
        alert("Enter valied Email.");
    
        return;

     } else {
        

        $.ajax({
            url: 'LoginLecterer.php',
            method: 'POST',
            data: {
                functionName: 'validateLogin',
                email: email,
                password: password
            },
            
            dataType: 'json',
            
            success: function(response) {
                console.log(response);
                if (response.status === "success") {
                  console.log("Login successful");
                    window.location.href = "../LecturerDashboard/Lec-Dashboard.html"; // If login is successful, redirect to home.html
                } else {
                    console.log("Login failed");
                    alert("Invalid email or password, please try again.");
                }
            },
            error: function(error) {
                console.error(error);
                console.log("Login failed error");
                alert("Invalid email or password, please try again error.");
            }
        });



    }

    });
});