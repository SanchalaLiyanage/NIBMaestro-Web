document.addEventListener('DOMContentLoaded', function() {
    loadtcombo();

    const signInBtnLink = document.querySelector('.signInBtn-link');
    const signUpBtnLink = document.querySelector('.signUpBtn-link');
    const wrapper = document.querySelector('.wrapper');
    
    signUpBtnLink.addEventListener('click', () => {
        // consolloge.log("clicked signUpBtnLink");
        wrapper.classList.toggle('active');
    });
    
    signInBtnLink.addEventListener('click', () => {
        // console.log("clicked signInBtnLink");
        wrapper.classList.toggle('active');
    });


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
let eyeopen1 = document.getElementById('Reye-open');
var registerpassword = document.getElementById('register-Password');
eyeopen1.addEventListener('click', function() {
    
        if(registerpassword.type === "password"){
        registerpassword.type = "text";
        eyeopen1.src="eye-close.png"
        }
        else{
            registerpassword.type = "password";
            eyeopen1.src="eye-open.png"
        }

});
 







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
            url: 'Slogin.php',
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
                    window.location.href = "../Stu-Dashboard/Stu-Dashboard.html"; 
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


// -------------------------------------------REGISTER----------------------------------------------

    var btnRegister = document.getElementById('btn-Register');

    btnRegister.addEventListener('click', function(event) { //after register button clicked
        event.preventDefault();
        console.log("Register button clicked");
        var email = document.getElementById('register-Email').value;
        var password = document.getElementById('register-Password').value;
        var username = document.getElementById('register-UserName').value;
        var batch = document.getElementById('batch').value;
        var course= document.getElementById('course').value;
        var indexnumber=document.getElementById('index').value;
        var checkbox = document.getElementById('register-check').checked;

if (email === "" || password === "" || username === "" || batch === "" || course === "" || indexnumber === "") 
{
    console.log("emtpy fields");
    alert("Please fill in all fields.");
   
    return;
}
// else if(!email.match(/^[A-Za-z\._\-0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/) )
//      {
//     console.log("invalid emailpattern");
//     alert("Enter valied Email.");
//     return;
//     }
//     else if(!password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,12}$/))
//     {
//         console.log("invalid password pattern");
//         alert("Password must be 8 to 12 characters long and must contain at least one lowercase letter, one uppercase letter, and one digit.");
//         return;
//     }
//     //check if the checkbox is checked
//     else if (!checkbox) {
//         console.log("checkbox not checked");
//         alert("Please agree to the terms and conditions.");
//         return;
//     }
    else {
        console.log("all fields filled & Have Valied Email");
        console.log(email, password, username, batch, course, indexnumber)
    
    
        $.ajax({
            url: 'Slogin.php',
            method: 'POST',
            data: {
                functionName: 'Singup',
                email: email,
                password: password,
                username: username,
                batch: batch,
                course: course,
                indexnumber: indexnumber
                
            },
            
            dataType: 'json',
            
            success: function(response) {
                console.log(response);
                if (response.status === "success") {
                    
                  console.log("Login successful");
                    alert("Sing up successfull.");
                    //reload the page
                    window.location.href = "../StudentLogin/LoginStudent.html";
                    // window.location.href = "../home.html"; // If login is successful, redirect to home.html
                } else {
                    console.log("Login failed");
                    alert("Invalid Sing up try again.");
                }
            },
            error: function(error) {
                console.error(error);
                console.log("Login failed error");
                alert("Wrong Course selected");
            }
        });



    }

    });

    
    
    //================================================loard Combox===================================================

function loadtcombo(){ 
    console.log("loadtcombo called");
    $.ajax({
        url: 'Slogin.php',
        method: 'POST',
        data: {
            functionName: 'loadcombobox',
            
        },
        
        dataType: 'json',
        
        // When http request is success
        success: function(response){
            console.log("data readed from db successfullly")
            console.log(response);
         
           
            response.course.forEach(item => {
                
                var course = item.Course;              
                console.log(course);
                
                createRow1(course);
            });
            response.batch.forEach(item => {
                
                var batch = item.Batch;              
                console.log(batch);
                
                createRow(batch);
            });
            console.log("Item Data fetch success");
        },

        error: function(error){
    console.log("error");
            console.error(error);
        }
    });
}

function createRow1(coursedata){
    var course = document.getElementById('course');


    var option = document.createElement('option');
    option.text = coursedata;
    option.value = coursedata;

    course.add(option);
}
function createRow(batchdata){
    var course = document.getElementById('batch');


    var option = document.createElement('option');
    option.text = batchdata;
    option.value = batchdata;

    course.add(option);
}
    





    });



     
     
       








































