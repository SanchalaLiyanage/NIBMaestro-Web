document.addEventListener('DOMContentLoaded', function(){
    console.log('hi');
    

    loadtcombo();
    
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
        window.location.href = "../LecturerDashboard/Lec-Dashboard.html";
    });
    
    
    
    
    
    //----------------------------------------------------submit btn----------------------------------------------
    
    // Get all the form values


    
    
    
    // send profile pic to the server (to php file)
    addsubmit.addEventListener('click', function(){



        const course = document.getElementById('course').value;
        const batch = document.getElementById('batch').value;
        const title = document.getElementById('title').value;
        const description = document.getElementById('description').value;
        const deadline = document.getElementById('deadline').value;
        const marksAllocated = document.getElementById('marksAllocated').value;
        
        
        console.log('Course:', course);
        console.log('Batch:', batch);
        console.log('Title:', title);
        console.log('Description:', description);
        console.log('Deadline:', deadline);
        console.log('Marks Allocated:', marksAllocated);

if(course == ""|| batch == "" ||title == "" || description == "" || deadline == "" || marksAllocated == "")
{
    alert('Please fill all the fields');
    return;
}

else{
        console.log('Submit button clicked');
        const file1 = inputFile.files[0]; 
        
       
            var formData = new FormData(); // create a new form data object
            formData.append('input-file', file1);
            formData.append('functionname', 'submit');
            formData.append('course', course);
            formData.append('batch', batch);
            formData.append('title', title);
            formData.append('description', description);
            formData.append('deadline', deadline);
            formData.append('marksAllocated', marksAllocated);
            
            $.ajax({
                url: 'LecturerSubmition.php',
                method: 'POST',
                data: formData,
                dataType: 'json',
                contentType: false, 
                processData: false, 
    

                success: function(response){
                    console.log(response.message);
                    alert('File uploaded successfully');
                    location.reload();
                },
    
                error: function(error){
                    // console.error(response);
                    console.error(error);
                }
            });
        }
    });
   
    

//================================================loard Combox===================================================

function loadtcombo(){ 
    console.log("loadtcombo called");
    $.ajax({
        url: 'LecturerSubmition.php',
        method: 'POST',
        data: {
            functionname: 'loadcombobox',
            
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








    