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

// function popupwindow(){
//     console.log('click');
//     var blur = document.getElementById('marks');
//     blur.classList.toggle('active');
//     var popup = document.getElementById('popup');
//     popup.classList.toggle('active');


// }
//add event listener to the button
// document.getElementById('btnfilter').addEventListener('click', popupwindow);

document.getElementById('btnclose').addEventListener('click', popupwindow);


btnfilter.addEventListener('click', function(){
    console.log("Filter button clicked");
    
    var course = document.getElementById('course').value;
    var batch = document.getElementById('batch').value;
    var index = document.getElementById('index').value;

    if(course=='' || batch=='')
    {
        alert("Please select course and batch");
        return;
    }
    else{
    var rr=1;
    if(index=='')
    {
       rr=0; 
    }
    loadContent(course, batch, index,rr);
}

});

});






function popupwindow(){


    console.log('click');
    var blur = document.getElementById('marks');
    blur.classList.toggle('active');
    var popup = document.getElementById('popup');
    popup.classList.toggle('active');


}


function loadContent(course, batch, index,rr) {
    console.log("loadContent called");
    $.ajax({
        url: 'studentmarkview.php',
        method: 'POST',
        data: {
            functionName: 'loadContent',
            course: course,
            batch: batch,
            rr:rr,
            index: index
        },
        dataType: 'json',
        success: function(response) {
            console.log("Data received from PHP script:", response);
            if (response.team_data.length == 0) {
                console.log("No data found for the selected course and batch");
                alert("No data found for the selected course and batch");
                return;
            }
    
            // Check if the response contains team_data array
            if (response.hasOwnProperty('team_data')) {
                var teamData = response.team_data;
                console.log("Team data array:", teamData);
                var i=0;
                console.log("for each first i====="+i);
              
                teamData.forEach(function(row) {
                    console.log("for each i====="+i);
                    // Access properties of each row
                    var index1 = row.S_Index;
                    var name = row.S_Name;
                    var T_ID = row.T_ID;
                    var inmark = row.inmark;
                    var docmark = row.docmark;
                    var Total = row.Tot;
                   
    
                    // Do whatever you need with the data
                    console.log("T_ID:", T_ID, "inmark:", inmark, "docmark:", docmark, "Total:", Total, "index:", index1, "name:", name);
                    createtable(index1, name, inmark, docmark, Total,i);
                    i++;
                console.log("header row created==="+i);
                });
            } else {
                console.error("team_data array not found in response");
            }
        },
        error: function(xhr, status, error) {
            console.error("Error fetching data:", error);
        }
    });
}


function createtable(index,name,docmark,inmark,Total,i){
    console.log("create table called"+i);

    if(i==0){
// Create table element
var table = document.createElement('table');
table.id = 'table123';

// Create header row
var headerRow = document.createElement('tr');
headerRow.id = 'row1';

// Define header column texts
var headers = ['Student ID', 'Student Name', 'Team Marks', 'Individual Marks', 'Total Marks'];

// Create th elements for each header
headers.forEach(function(headerText) {
    i++;
    var th = document.createElement('th');
    th.textContent = headerText;
    if(i==1){
        th.className = 'clm1';
    }
    if(i==2){
        th.className = 'clmname';
    }
    if(i==6){
        th.className = 'clm2';
    }
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
dataRow.id = index;

// Define data cell texts
var data = [index, name, docmark, inmark, Total];
var y=0;
// Create td elements for each data cell
data.forEach(function(dataText) {
    y++;
    var td = document.createElement('td');
    td.textContent = dataText;
    if(y==1){
        td.className = 'clm1';
    }
    if(y==2){
        td.className = 'clmname';
    }
    if(y==6){
        td.className = 'clm2';
    }
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
//=======================pop up========================================
function popupwindow1(name,index,mark){



    $.ajax({
        url: 'studentmarkview.php',
        method: 'POST',
        data: {
            functionname: 'singlestudentmark',
            index: index,
            name: name
            
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
























    

// Create div element with class "title" and h1 element inside
const titleDiv = document.createElement("div");
titleDiv.className = "title";
const titleHeading = document.createElement("h1");
titleHeading.textContent = "Student Mark Sheet";
titleDiv.appendChild(titleHeading);

// Create div element with class "filter" and labels inside
const filterDiv = document.createElement("div");
filterDiv.className = "filter";

const labels = [
  { labelText: "Student Name:", replyText: name, id: "stname" },
  { labelText: "Student ID:", replyText: index, id: "stindex" },
  { labelText: "Total:", replyText: mark, id: "sttot" },
  
];

labels.forEach(labelInfo => {
  const label = document.createElement("label");
  label.className = "qq";
  label.textContent = labelInfo.labelText;
  
  const replyLabel = document.createElement("label");
  replyLabel.className = "rply";
  replyLabel.id = labelInfo.id;
  replyLabel.textContent = labelInfo.replyText;

  filterDiv.appendChild(label);
  filterDiv.appendChild(replyLabel);
});
popupwindow2();
}
function popupwindow2(){
    

// Create table element with headers
const table = document.createElement("table");

const headers = ["Task Number", "Task Name", "Team Mark", "Individual Mark", "Total Mark", "Grade"];
const headerRow = document.createElement("tr");

headers.forEach(headerText => {
  const th = document.createElement("th");
  th.textContent = headerText;
  headerRow.appendChild(th);
});

table.appendChild(headerRow);

// Append everything to the body or another desired element
document.body.appendChild(titleDiv);
document.body.appendChild(filterDiv);
document.body.appendChild(table);


}