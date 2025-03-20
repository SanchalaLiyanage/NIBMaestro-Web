document.addEventListener('DOMContentLoaded', function(){

    
    fetch('../Navigation-bar/Nav-Bar.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('nav123').innerHTML = data;
    })
    .catch(error => {
        console.error('Error fetching content:', error);
    });
});


function loadtcombo(){ 
    console.log("../loadtcombo called");
    $.ajax({
        url: '../LecturerSubmitionAdd/LecturerSubmition.php',
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
    var viva = document.getElementById('viva');


    var option = document.createElement('option');
    option.text = coursedata;
    option.value = coursedata;

    viva.add(option);
}
function createRow(batchdata){
    var coteamrse = document.getElementById('team');


    var option = document.createElement('option');
    option.text = batchdata;
    option.value = batchdata;

    team.add(option);
}