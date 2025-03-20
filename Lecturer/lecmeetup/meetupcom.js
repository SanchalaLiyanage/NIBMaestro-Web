document.addEventListener('DOMContentLoaded', function(){

    fetch('../Navigation-bar/Nav-Bar.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('nav123').innerHTML = data;
    })
    .catch(error => {
        console.error('Error fetching content:', error);
    });


    loadDescription();



var btnsave = document.getElementById('sendbtn');



btnsave.addEventListener('click', function(){
    var comm = document.getElementById('textareaRequest').value;
    var target = document.getElementById('textareaRequest1').value;

    if(comm == "" && target == ""){
        alert("Please fill the fields");    
        return;
    }
    else{
        if(comm == ""){
            shortreply(1);
        }
        else if(target == ""){
            shortreply(2);
        }
        else{
            shortreply(0);
        }
    
    }
});






});

function loadDescription(){
    $.ajax({
        url: 'meetupcom.php',
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
            
                document.getElementById('groupname').textContent = response.data1.T_Name;
                document.getElementById('groupnumber').textContent = response.data1.T_ID;
                document.getElementById('date').textContent = response.data.Req_date;
                document.getElementById('message').textContent = response.data.Description;
                document.getElementById('course').textContent = response.data2.Course;
                document.getElementById('batch').textContent = response.data2.Batch;
               

         
           
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

function shortreply(btn){

console.log('A/R button clicked');
var comm = document.getElementById('textareaRequest').value;
var tar = document.getElementById('textareaRequest1').value;

$.ajax({
    url: 'meetupcom.php',
    method: 'POST',
    data: {
        functionName: 'A/Rbtn',
        btn: btn,
        Comment: comm,
        target: tar
    },
    dataType: 'json',
    success: function(response){
        console.log("success");
        console.log(response.message);
        alert("Reply sent successfully");
        window.location.href = "../lecmeetup/meetup.html";
        
    },
    error: function(error){
        console.error(error);
    }
});
}
