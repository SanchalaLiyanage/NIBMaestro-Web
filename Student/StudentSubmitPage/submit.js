document.addEventListener('DOMContentLoaded', function(){
console.log('hi');

loadDescription();
fetch('../Navigation-bar/Nav-Bar.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('nav123').innerHTML = data;
        })
        .catch(error => {
            console.error('Error fetching content:', error);
        });



var filedata = document.getElementById('input-file');
var btnRegister = document.getElementById('btnsubmit');

const dropArea = document.getElementById('drop-area');
const inputFile = document.getElementById('input-file');
const imageView = document.getElementById('img-view');




// Event listener for file input change
inputFile.addEventListener('change', uploadFile);

// Drag and drop event listeners
dropArea.addEventListener('dragover', function (e) {
    e.preventDefault();
});

dropArea.addEventListener('drop', function (e) {
    e.preventDefault();
    inputFile.files = e.dataTransfer.files;
    uploadFile();
});












//------------------------------------upload file----------------------------------------------





function uploadFile() {
    const file = inputFile.files[0]; // Get the selected file

    // Check if file type is valid (allow only docx, pdf, txt, ppt, and pptx)
    const allowedTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain', 'application/vnd.ms-powerpoint', 'application/vnd.openxmlformats-officedocument.presentationml.presentation'];
    
    if (!allowedTypes.includes(file.type))
     {
        alert('Please upload only Word (docx), PDF, Text (txt), PowerPoint (ppt/pptx) files.');
        return;
    }
     //validate the file size
    //  if(file != null && file.size > 2097152){
    //     alert('File size is too large. Please upload a file less than 2MB');
    //     return;
    // }

    const imgLink = URL.createObjectURL(file); // Create URL for the file
    imageView.style.backgroundImage = 'none'; // Clear any background image
 

    imageView.innerHTML = '';

    // Create image element based on file type
    const imgElement = document.createElement('img');
    if (file.type === 'application/pdf') {
        imgElement.src = 'Icon/pdf.png'; 
    } else if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        imgElement.src = "Icon/word.png"; 
    } else if (file.type === 'text/plain') {
        imgElement.src = 'Icon/tet.jpg'; 
    } else if (file.type === 'application/vnd.ms-powerpoint' || file.type === 'application/vnd.openxmlformats-officedocument.presentationml.presentation') {
        imgElement.src = 'powerpoint.png'; 
    }
    imgElement.classList.add('uploaded-image'); // Add a class to the image element

    // Append the image element to the image view
    imageView.appendChild(imgElement);

    // Display a message indicating the file type
    const fileTypeText = document.createElement('p');
    fileTypeText.textContent = `Uploaded ${file.name}`;
    imageView.appendChild(fileTypeText);


    // Create FormData object to send file
    const formData = new FormData();
    formData.append('file', file);

  
}



//---------------------------------------------------------back btn-------------------------------------------------

// var btnback = document.getElementById('btnback');
btnback.addEventListener('click', function(){
    window.location.href = "../Stu-Dashboard/Stu-Dashboard.html";
});





//----------------------------------------------------submit btn----------------------------------------------





// send profile pic to the server (to php file)
btnsubmit.addEventListener('click', function(){
    console.log('Submit button clicked');
    const file1 = inputFile.files[0]; 
    
    if(file1 != null){
        var formData = new FormData(); // create a new form data object
        formData.append('input-file', file1);
        formData.append('functionName', 'submit');
        
        $.ajax({
            url: 'submit.php',
            method: 'POST',
            data: formData,
            dataType: 'json',
            contentType: false, // means no content type is required
            processData: false, // means no processing of data is required

            success: function(response){
                console.log(response);
                // location.reload();
            },

            error: function(error){
                console.error(error);
            }
        });
    }
});






//---------------------------------------------description load---------------------------------------------------------


function loadDescription(){
    $.ajax({
        url: 'submit.php',
        method: 'POST',
        data: {
            functionName: 'loadDescription'
        },
        success: function(response){
            console.log("success");
            // console.log( response.textdata);
            console.log(response);
           if(response.status == "success"){
            response.textdata.forEach(function(data){
                document.getElementById('taskname').textContent = data.title;
                document.getElementById('subdate').textContent = data.addedDate;
                document.getElementById('time').textContent = data.time;
                document.getElementById('deadline').textContent = data.deadline;
                document.getElementById('note').textContent = data.note;
                console.log(data.title);
            });
            console.log('Content-Type: application/pdf' + response.doc_datas);
            console.log(response.doc_datas);
            if (response.doc_datas && response.doc_datas.length > 0) {
                response.doc_datas.forEach(function(doc1) {
                    document.getElementById('docview').textContent = doc1.File;
                });
            } else {
                console.log("No document data available");
                console.log(response.doc_datas);
                document.getElementById('docview').style.display = "none";
            }
            
           
        }
        else{
            
            console.log("error");
            console.error(error);
        }
        
            
        },
        error: function(error){
            console.error(error);
        }
    });




 

}
});














 



    


