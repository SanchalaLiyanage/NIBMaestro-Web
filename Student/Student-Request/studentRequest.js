document.addEventListener('DOMContentLoaded', function(){
// var rr =0; 

// if (rr == 0) {
//     console.log("View Request");
//     document.getElementById("addRequest").style.display = "none";
//     document.getElementById("viewRequest").style.display = "flex";
// } else if (rr == 1) {
//     console.log("Add Request");
//     document.getElementById("viewRequest").style.display = "none";
//     document.getElementById("addRequest").style.display = "flex";
// }

loadContent();

fetch('../Navigation-bar/Nav-Bar.html')
.then(response => response.text())
.then(data => {
    document.getElementById('nav123').innerHTML = data;
})
.catch(error => {
    console.error('Error fetching content:', error);
});
// ===========================================Load page===========================================



function loadContent(){ 
    console.log(" load Content called");
    $.ajax({
        url: 'StudentRequest.php',
        method: 'POST',
        data: {
            functionName: 'loadContent',
            
        },
        
        dataType: 'json',
        
        // When http request is success
        success: function(response){
            console.log("data readed from db successfullly")
            console.log(response);
            var count = 0;
            var tt=0;
            // currentDisplayItems = response; //not used
            response.forEach(item => {
                // Get details from
                var request = item.Description;
                var requestdate = item.Req_date;
                var reply = item.Reply;
                var replydate = item.R_date;
                var members = item.members;
                var next = item.nextTarget;
                var comment = item.comment;
                var meetdate = item.meetdate;
                var replyORnot = item.replyORnot;

                if(replyORnot == 0){
                        tt=1;  
                        var dd=displayarea1();
                }
                else{

                    if(next=="" && comment==""){
                        tt=2;
                        displayarea2(reply,request);
                        // console.log("hgggjgjgggggg"+tt);
                    }
                    else{
                        console.log(count, members, next, comment, meetdate);
                        // createtable(count,request, requestdate, reply, replydate, members, next, comment, meetdate);
                        createtable(count, meetdate, members,comment,next);          
                              }
                }

            
               
        
                count++;
                if(tt==0){
                    console.log("Add Request displayed");
        document.getElementById("viewRequest").style.display = "none";
        document.getElementById("addRequest").style.display = "flex";
                }
                
                
            });

            
    

         
            console.log("Item Data fetch success");
        },

        error: function(error){
            console.error(error);
        }
    });
}

// createRow,called from loadtTeamTable


function createtable(count, meetdate, members,comment,next) {
console.log("createRow called"+count);

if(count==0){
    console.log("Table head created");

    var tablediv = document.getElementById('tablediv');
    var table = document.createElement('table');
    table.id = 'teamTable';

 
    var headerRow = document.createElement('tr');
    var tbody1 = document.createElement('tbody');
    tbody1.id = 'tbodyid1';
    var headers = ['Meeting Number','Date', 'Members', 'Comment','Next Target'];
    headers.forEach(function(header) {
        var th = document.createElement('th');
        th.textContent = header;
        headerRow.appendChild(th);
     
        tablediv.appendChild(table);
    });
    
    table.appendChild(headerRow);
    table.appendChild(tbody1);
    tablediv.appendChild(table);
    
    console.log("Row head created");
   
   
}


if(count>-1){
// Create table body


    var row = document.createElement('tr');
   
    var tasknocol = document.createElement('td');
    tasknocol.textContent = count;

    var datecol = document.createElement('td');
    datecol.textContent = meetdate;

    var memberscol = document.createElement('td');
    memberscol.textContent = members;

    var comments = document.createElement('td');
    comments.textContent = comment;
    var next1 = document.createElement('td');
    next1.textContent = next;
    console.log(next1);

   

    row.appendChild(tasknocol);
    row.appendChild(datecol);
    row.appendChild(memberscol);
    row.appendChild(comments);
    row.appendChild(next1);
    var tbody1=document.getElementById('tbodyid1');
    tbody1.appendChild(row);
    

    
 

// Append table to 'team' div



console.log("Row created");
}


}
function  displayarea1(){
    console.log("displayarea1 called");
    document.getElementById("addRequest").style.display = "none";
   document.getElementById("viewRequest").style.display = "flex";

   var lable1=document.getElementById('view-label');
    lable1.style.display="flex";
    lable1.style.justifyContent="center";
   lable1.style.alignItems="center";
    lable1.style.fontSize="28px";
    lable1.textContent=("you have a pending request!!!");
    return;
    
}
function displayarea2(reply,request){
    console.log("displayarea2 called");
    document.getElementById("addRequest").style.display = "none";
    document.getElementById("viewRequest").style.display = "flex";
    // var view123=document.getElementById("viewRequest").style.display = "flex";
    // var disdiv = document.getElementById('addRequest');

    var label2 = document.getElementById('view-lable1');
    var label3 = document.getElementById('view-lable2'); 
    var label4 = document.getElementById('view-lable3');
    var label5 = document.getElementById('view-lable4');

    label2.textContent = "Request  : ";
    label3.textContent = request;
    label4.textContent = "Reply  : ";
    label5.textContent = reply;

// view123.appendChild(disdiv);

}
btnback.addEventListener('click', function(){
    console.log("Back button clicked");
    //go to dashboard
    window.location.href = "../Stu-Dashboard/Stu-Dashboard.html";

});




// ===========================================Add Request===========================================

btnrequest.addEventListener('click', function(){
    console.log("add button clicked");
    var request = document.getElementById('textareaRequest').value;

    $.ajax({
        url: 'StudentRequest.php',
        method: 'POST',
        data: {
            functionName: 'addRequest',
            request: request,
        },
        dataType: 'json',
        success: function(response){
            console.log("Request added successfully");
            console.log(response);
            alert("Request added successfully");
            location.reload();
        },
        error: function(error){
            console.error(error);
        }

    });
    
});






















});
