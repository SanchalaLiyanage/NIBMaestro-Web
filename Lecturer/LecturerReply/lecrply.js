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


var btnapset = document.getElementById('appsetbtn');
var btnreject = document.getElementById('rejectbtn');
var btnsave = document.getElementById('sendbtn');

btnapset.addEventListener('click', function(){
    shortreply(1);
});
btnreject.addEventListener('click', function(){
    shortreply(0);
});
btnsave.addEventListener('click', function(){
    var rply = document.getElementById('textareaRequest').value;
    if(rply == ""){
        alert("Please enter a reply");
        return;
    }
    else{
    shortreply(2);
    }
});






});

function loadDescription(){
    $.ajax({
        url: 'lecrply.php',
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
var rply = document.getElementById('textareaRequest').value;

$.ajax({
    url: 'lecrply.php',
    method: 'POST',
    data: {
        functionName: 'A/Rbtn',
        btn: btn,
        rply: rply
    },
    dataType: 'json',
    success: function(response){
        console.log("success");
        console.log(response.message);
        alert("Reply sent successfully");
        window.location.href = "../LecturerDashboard/Lec-Dashboard.html";
        
    },
    error: function(error){
        console.error(error);
    }
});
}
