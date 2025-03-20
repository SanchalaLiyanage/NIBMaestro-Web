document.addEventListener('DOMContentLoaded', function(){

    fetch('../Navigation-bar/Nav-Bar.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('nav123').innerHTML = data;
    })
    .catch(error => {
        console.error('Error fetching content:', error);
    });


	notification();
});



function notification()
{
	console.log("Notification");
	$.ajax({
        url: 'meetup.php',
        method: 'POST',
        data: {
            functionName: 'loadDescription'
        },
        dataType: 'json',
        success: function(response){
            console.log("success");
            // console.log( response.textdata);
            console.log(response);
           if(response.status == "success"){
            
             
			 if(response.notif==1){
			 var i=0;
			 response.data.forEach(item1 => {
			 var des=item1.Description;
			 var course=item1.Course;
			 var batch=item1.Batch;
			 var rid=item1.R_ID;
			 
			 console.log(i);
			 console.log(des);
			 console.log(course);
			 console.log(batch);

				createnotification(des,course,batch,i,rid);
				i++;
			 });
			//  notification(response.data);

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

function createnotification(des,course,batch,i,rid){
	console.log("create notification");

	
// Create Course and Batch table
var courseTable = document.createElement('table');
var courseRow = document.createElement('tr');

var courseHeaderCell = document.createElement('td');
courseHeaderCell.classList.add('m1', 'c1');
courseHeaderCell.innerHTML = '<h2>Course :</h2>';
courseRow.appendChild(courseHeaderCell);

var courseDataCell = document.createElement('td');
courseDataCell.classList.add('c2');
courseDataCell.innerHTML = '<h3 class="course"></h3>';
courseRow.appendChild(courseDataCell);

var batchHeaderCell = document.createElement('td');
batchHeaderCell.classList.add('m1', 'c1');
batchHeaderCell.innerHTML = '<h2>Batch :</h2>';
courseRow.appendChild(batchHeaderCell);

var batchDataCell = document.createElement('td');
batchDataCell.classList.add('c2');
batchDataCell.innerHTML = '<h3 class="batch"></h3>';
courseRow.appendChild(batchDataCell);

courseTable.appendChild(courseRow);

// Create Title table
var titleTable = document.createElement('table');
var titleRow = document.createElement('tr');

var titleHeaderCell = document.createElement('td');
titleHeaderCell.classList.add('m1');
titleHeaderCell.innerHTML = '<h2>Title :</h2>';
titleRow.appendChild(titleHeaderCell);

var titleDataCell = document.createElement('td');
titleDataCell.classList.add('cd1');
titleDataCell.innerHTML = '<h3 class="title"></h3>';
titleRow.appendChild(titleDataCell);

titleTable.appendChild(titleRow);

var moddiv=document.createElement('div');
moddiv.classList.add('moddiv');
moddiv.id='moddiv'+i;
var maindiv=document.getElementsByClassName('teamupdate');
// console.log(maindiv);
// console.log(des,course,batch);
moddiv.appendChild(courseTable);
moddiv.appendChild(titleTable);
maindiv[0].appendChild(moddiv);
// moddiv.style.backgroundColor = 'red';

document.getElementsByClassName('title')[i].textContent = des;
                document.getElementsByClassName('course')[i].textContent =course;
                document.getElementsByClassName('batch')[i].textContent = batch;
moddiv.addEventListener('click', function(){
	console.log("click");
	$.ajax({
		url: 'meetup.php',
		method: 'POST',
		data: {
			functionName: 'session',
			rid:rid
		},
		dataType: 'json',
		success: function(response){
			console.log("success");
			console.log(response);
			if(response.status == "success"){
				
				console.log("success");
				window.location.href = "../lecmeetup/meetupcom.html";
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

});

// Append the container to the document body




}
