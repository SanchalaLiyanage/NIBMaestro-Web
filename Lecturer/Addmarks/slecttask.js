document.addEventListener('DOMContentLoaded', function(){

    loadtcombo();
    fetch('../Navigation-bar/Nav-Bar.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('nav123').innerHTML = data;
    })
    .catch(error => {
        console.error('Error fetching content:', error);
    });


var btnfilter = document.getElementById('btnfilter');

btnfilter.addEventListener('click', function(){
        console.log("Filter button clicked");
        
        var course = document.getElementById('course').value;
        var batch = document.getElementById('batch').value;
        
    
        if(course=='' || batch=='')
        {
            alert("Please select course and batch");
            return;
        }
        else{
        
        loadContent(course, batch);
    }
    
    });









});


//================================================loard Combox===================================================

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

//==============================================loard content===================================================

function loadContent(course, batch) {
    console.log("loadContent called");
    console.log("Course:", course, "Batch:", batch);
    $.ajax({
        url: 'selecttask.php',
        method: 'POST',
        data: {
            functionName: 'loadContent',
            course: course,
            batch: batch
        },
        dataType: 'json',
        success: function(response){
            console.log("success");
            // console.log( response.textdata);
            console.log(response);
           if(response.status == "success"){
            
             
			         
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


function createtable(vid,title,adddate,deadline,i){
    console.log("create table called"+i);

    if(i==0){
// Create table element
var table = document.createElement('table');
table.id = 'table123';

// Create header row
var headerRow = document.createElement('tr');
headerRow.id = 'row1';

// Define header column texts
var headers = ['Viva ID', 'Viva Name', 'Added Date', 'Dead Line'];

// Create th elements for each header
headers.forEach(function(headerText) {
    i++;
    var th = document.createElement('th');
    th.textContent = headerText;
    // if(i==1){
    //     th.className = 'clm1';
    // }
    // if(i==2){
    //     th.className = 'clmname';
    // }
    // if(i==6){
    //     th.className = 'clm2';
    // }
    headerRow.appendChild(th);

    
});
i=0;


// Append the header row to the table
table.appendChild(headerRow);
var div = document.getElementById('tdiv');
div.appendChild(table);
    }

// Create a data row
var dataRow = document.createElement('tr');
dataRow.id = vid;

// Define data cell texts
var data = [vid, title, adddate, deadline];
var y=0;
// Create td elements for each data cell
data.forEach(function(dataText) {
    y++;
    var td = document.createElement('td');
    td.textContent = dataText;
    // if(y==1){
    //     td.className = 'clm1';
    // }
    // if(y==2){
    //     td.className = 'clmname';
    // }
    // if(y==6){
    //     td.className = 'clm2';
    // }
    dataRow.appendChild(td);
});
y=0;
var table123 = document.getElementById('table123');
// Append the data row to the table
table123.appendChild(dataRow);

//add event listener to the row
dataRow.addEventListener('click', function(){
    console.log("Row clicked");
    var index = dataRow.id;
    console.log("Index:", index);
    // popupwindow1(index,name,Total);
    // popupwindow();
   
});



}