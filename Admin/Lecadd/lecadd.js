document.addEventListener('DOMContentLoaded', function () {
    // loadtcombo();


//================================================loard Combox===================================================

function loadtcombo(){ 
    console.log("loadtcombo called");
    $.ajax({
        url: 'lecadd.php',
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

            fetchUserData();
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

















    console.log("loadtcombo called================");
    // fetch the navbar from the incluedes folder
    var btnSave = document.getElementById('btn-save');
    var btnCancel = document.getElementById('btn-cancel');
    var inputNewProfile = document.getElementById('newProfile');
    var preview = document.getElementById('profilePreview'); //img

    // These are '<input>' not the values
    var nameInput = document.getElementById('name');
 
    var emailInput = document.getElementById('email');
    var psswdInput = document.getElementById('psswd');
    var batchInput = document.getElementById('batch');
    var indexInput = document.getElementById('index');
    var courseInput = document.getElementById('course');

 



    var file = null; // file to be uploaded (image)

    // fetch the nav bar
        fetch('../Navigation-bar/Nav-Bar.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('nav123').innerHTML = data;
    })
    .catch(error => {
        console.error('Error fetching content:', error);
    });
    

    // ============================== Fetch and Fill User Data ================================
    // fetch and fill user data 
    // fetchUserData();

    // fetch the user data from the server
    function fetchUserData(){
        console.log('==========Fetching User Data=========');
        $.ajax({
            url: 'lecadd.php',
            method: 'POST',
            data: {
                functionName: 'getUserData',
            },
            dataType: 'json',
            success: function(response){
                console.log(response);
                console.log('==========User Data Fetched=========');
                var name= response.data.S_Name;
                var email= response.data.S_Email;
                var pw= response.data.S_PW;
                var index= response.data.S_Index;
                var batch= response.batch;
                var course= response.course;
                console.log(name,email,pw,index,batch,course);

                autofill(name,email,pw,index,batch,course);
                fetchProfilePic();
            },
            error: function(error){
                console.error(error);
            }
        });
    }

    function autofill(name,email,pw,index,batch,course){
        nameInput.value = name;
        emailInput.value = email;
        psswdInput.value = pw;
       indexInput.value = index;
       courseInput.value= course;
    //    console.log(courseInput);
       batchInput.value = batch;
       
    

    }
    function fillUserData(userData){
        nameInput.value = userData.FullName;
        emailInput.value = userData.Email;
        dobInput.value = userData.BirthDate;
       

        var favCatIDList = null;

        // If user has fave categories, then set favCatIDList to that list, otherwise it remains empty
        if(userData.categories){
            favCatIDList = userData.categories;
        }
        requestFillCatCmb(favCatIDList);
    }

   




    // ============================== Update Data ================================
    // preview the image before uploading
    inputNewProfile.addEventListener('change', function(event){
        var preview = document.getElementById('profilePreview'); //img
        file = event.target.files[0];
        var reader = new FileReader();

        //validate the file type
        if(file != null && file.type != 'image/jpeg' && file.type != 'image/png'){
            alert('Invalid file type. Please upload a valid image file');
            return;
        }
        
        //validate the file size
        if(file != null && file.size > 2097152){
            alert('File size is too large. Please upload a file less than 2MB');
            return;
        }
        // read the file and display the preview
        reader.onloadend = function () {
            preview.src = reader.result;
        }
        
        // if a file is selected then read the file
        if (file) {
            reader.readAsDataURL(file);
        } 
        else { // if no file is selected then remove the preview
            preview.src = "";
        }
    });

    // ------------------- validate the input fields -------------------


    nameInput.addEventListener('input', function(){
        if(nameInput.value.length < 5){
            nameInput.style.borderColor = 'red';
            nameNew = null;
            nameNewNoError = false;
        }
        else{
            nameInput.style.borderColor = 'green';
            nameNew = nameInput.value;
            nameNewNoError = true;
        }
    });

   

    emailInput.addEventListener('input', function(){
        if(emailInput.value.indexOf('@') == -1 || emailInput.value.indexOf('.') == -1 || emailInput.value.length < 12){
            emailInput.style.borderColor = 'red';
            emailNew = null;
            emailNewNoError = false;
        }
        else{
            emailInput.style.borderColor = 'green';
            emailNew = emailInput.value;
            emailNewNoError = true;
        }
    });

    psswdInput.addEventListener('input', function(){
        if(psswdInput.value.length < 8){
            psswdInput.style.borderColor = 'red';
            psswdHashNew = null;
            psswdHashNewNoError = false;
        }
        else{
            psswdInput.style.borderColor = 'green';
            psswdHashNew = psswdInput.value;
            psswdHashNewNoError = true;
        }
    });

   


   
// ------------------- save button------------------
  



   
    btnSave.addEventListener('click', function(){
        catIDListNew = []; 
        updateUserData();

        // if a new profile picture is selected
       

       
    });
    
    // cancel the profile picture upload
    btnCancel.addEventListener('click', function(){
        preview.src = "";
        inputNewProfile.value = "";
    });



    function updateUserpic(lid){
        if(file != null){ 
            var formData = new FormData(); // create a new form data object
            formData.append('newProfile', file);
            formData.append('functionName', 'updateProfilePic');
            formData.append('L_ID', lid);
            
            // request to the server to update the profile picture in the database
            // profile img update part
            $.ajax({
                url: 'lecadd.php',
                method: 'POST',
                data: formData,
                dataType: 'json',
                contentType: false, // means no content type is required
                processData: false, // means no processing of data is required

                success: function(response){
                    console.log(response);
                    console.log('==========Profile Picture Updated=========');
                   
                    // location.reload();
                },

                error: function(error){
                    console.error(error);
                }
            });
        }
    }

    // ============================== Update Data ================================






    function updateUserData(){
        console.log('==========Updating User Data called=========');
        var nameNew =document.getElementById('name').value;
        console.log(nameNew);
        var emailNew = document.getElementById('email').value;
        var psswdHashNew = document.getElementById('psswd').value;
        var des= document.getElementById('address').value;
        console.log(nameNew,emailNew,psswdHashNew);
        if(nameNew=="" || emailNew=="" || psswdHashNew==""){
            alert('Please fill all the fields');
            return;
        }

        console.log('==========Updating User Data=========');
        $.ajax({
            url: 'lecadd.php',
            method: 'POST',
            data: {
                functionName: 'updateUserData',
                name: nameNew,
                email: emailNew,
                psswd: psswdHashNew,
                des: des
            },
            dataType: 'json',
            success: function(response){
                console.log(response);
                console.log('==========User Data Updated=========');
                var lid=response.lid;
                updateUserpic(lid);
                
                // location.reload();
            },
            error: function(error){
                console.error(error);
            }
        });
    }





 





});

function fetchProfilePic(lid) {
   
    $.ajax({
        url: 'lecadd.php', 
        method: 'POST',
        data: {
            functionName: 'fetchProfilePic',
            lid: lid 
        },
        dataType: 'json',
        success: function(response) {
            console.log("Profile picture fetch status: " + response.status);
            
            if (response.status === "success") {
                // Display the profile picture
                var profilePicData = response.profilePic;
                var imgElement = document.getElementById("profilePreview");
                imgElement.src = "data:image/jpeg;base64," + profilePicData;
            } else {
                console.log("Error: " + response.message);
            }
        },
        error: function(xhr, status, error) {
            console.error("Error fetching profile picture:", error);
        }
    });
}
