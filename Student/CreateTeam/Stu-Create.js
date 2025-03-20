document.addEventListener('DOMContentLoaded', function() {

    



    fetch('../Navigation-bar/Nav-Bar.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('nav123').innerHTML = data;
    })
    .catch(error => {
        console.error('Error fetching content:', error);
    });


    team123();



   
document.getElementById('add').addEventListener('click', function() {
    console.log("add button clicked");
    var member1 = document.getElementById('firstcom').value;
    var member2 = document.getElementById('secondcom').value;
    var member3 = document.getElementById('thirdcom').value;
    var member4 = document.getElementById('fourthcom').value;
    var member5 = document.getElementById('fifthcom').value;
    var teamname = document.getElementById('teamname').value;

    $.ajax({
        url: 'CreateTeam.php',
        method: 'POST',
        data: {
            functionname: 'addteam',
            member1: member1,
            member2: member2,
            member3: member3,
            member4: member4,
            member5: member5,
            teamname: teamname
        },
        dataType: 'json',
        success: function(response){
            console.log("data added successfully");
            console.log(response);
        
        },
        error: function(error){
            console.error(error);
        }
    });


});





    
document.getElementById('lec1').addEventListener('click', function() {
    console.log("lec1 button clicked");
    lecturer(1);
});
document.getElementById('lec2').addEventListener('click', function() {
    console.log("lec2 button clicked");
    lecturer(2);
});
document.getElementById('lec3').addEventListener('click', function() {
    console.log("lec3 button clicked");
    lecturer(3);
});
document.getElementById('lec4').addEventListener('click', function() {
    console.log("lec4 button clicked");
    lecturer(4);
});





});

//=======================================================================================================loadinterface=======================================================================================================
function team123() {
    console.log("team123 called");
    $.ajax({
        url: 'CreateTeam.php',
        method: 'POST',
        data: {
            functionname: 'team'
            
        },
        
        dataType: 'json',
        
        success: function(response) {
            console.log(response);
            
                if(response == ''){
                    console.log("No team found");
                   
                // teamupdate();
                teamview();
                team1();
                    
                }
                else{
                    console.log("Team found");
                    console.log(response);
                    teamview();
                    team1();
                }
                
            
            
        },
        error: function(error) {
            console.error(error);
            console.log("Login failed error");
            alert("Invalid email or password, please try again error.");
        }
    });
}






//=======================================================================================================load combobox=======================================================================================================
function loadtcombo(){ 
    console.log("loadtcombo called");
    $.ajax({
        url: 'CreateTeam.php',
        method: 'POST',
        data: {
            functionname: 'loadcombobox',
            
        },
        
        dataType: 'json',
        
        // When http request is success
        success: function(response){
            console.log("data readed from db successfullly")
            console.log(response);
         
           
            response.index.forEach(item => {
                
                var id = item.S_Index;              
                console.log(id);
                
                createRow1(id);
                createRow2(id);
                createRow3(id);
                createRow4(id);
                createRow5(id);
            });
            
        },

        error: function(error){
    console.log("error");
            console.error(error);
        }
    });
}

function createRow1(coursedata){
    var course = document.getElementById('firstcom');

    var option = document.createElement('option');
    option.text = coursedata;
    option.value = coursedata;

    course.appendChild(option);
}

function createRow2(batchdata){
    var course = document.getElementById('secondcom');


    var option = document.createElement('option');
    option.text = batchdata;
    option.value = batchdata;

    course.appendChild(option);
    
}
function createRow3(batchdata){
    var course = document.getElementById('thirdcom');


    var option = document.createElement('option');
    option.text = batchdata;
    option.value = batchdata;

    course.appendChild(option);
}
function createRow4(batchdata){
    var course = document.getElementById('fourthcom');


    var option = document.createElement('option');
    option.text = batchdata;
    option.value = batchdata;

    course.appendChild(option);
}
function createRow5(batchdata){
    var course = document.getElementById('fifthcom');


    var option = document.createElement('option');
    option.text = batchdata;
    option.value = batchdata;

    course.appendChild(option);
}


function viewteam(){
    console.log("viewteam called");
    $.ajax({
        url: 'CreateTeam.php',
        method: 'POST',
        data: {
            functionname: 'viewteam',
            
        },
        
        dataType: 'json',
        
        // When http request is success
        success: function(response){
            console.log("data readed from db successfullly")
            console.log(response);
            var i=0;
           
        if(response.status=='success'){
            response.data.forEach(item => {
                
                var id = item.S_Index;              
                var name = item.S_Name;
                createteamrow(id,name,i);
                i++;
                
            });
            btnup();

        }else{
            console.log("No team member found");
            teamupdate();
        }
        },

        error: function(error){
    console.log("error");
            console.error(error);
        }
    });




}

function createteamrow(id,name,i){
    console.log("createteamrow called");
    var viewdiv=document.getElementById('viewteammember');
    

if(i==0){
    var title=document.createElement('h3');
    var table=document.createElement('table');
    var viewdiv=document.getElementById('viewteammember');
   table.id='table1';
    viewdiv.appendChild(table);
    var rowh=document.createElement('tr');
    var cell1h=document.createElement('td');
cell1h.textContent='number';
    var cell2h=document.createElement('td');
cell2h.textContent='Name';
    var cell3h=document.createElement('td');
    cell3h.textContent='Index';

    rowh.appendChild(cell1h);
    rowh.appendChild(cell2h);
    rowh.appendChild(cell3h);
    table.appendChild(rowh);

}
console.log(i);
var table1=document.getElementById('table1');

   var row=document.createElement('tr');
   var cell0=document.createElement('td');
    var cell1=document.createElement('td');
    var cell2=document.createElement('td');
    cell0.textContent=i+1;
   cell1.textContent=name;
    cell2.textContent=id;
    cell0.className='clmv';
    cell1.className='clmv';
    cell2.className='clmv';
    row.appendChild(cell0);
    row.appendChild(cell1);
    row.appendChild(cell2);
    // viewdiv.style.backgroundColor='cyan';

    table1.appendChild(row);
}

function teamupdate(){
document.getElementById('addteammember').style.display='block';
document.getElementById('viewteammember').style.display='none';
document.getElementById('requsetadd').style.display='block';
loadtcombo();


}
function teamview(){
document.getElementById('addteammember').style.display='none';
document.getElementById('viewteammember').style.display='flex';
document.getElementById('viewteammember').style.width='100%';
viewteam();
}


function team1(){
    console.log("team1 called");
    $.ajax({
        url: 'CreateTeam.php',
        method: 'POST',
        data: {
            functionname: 'team1'
            
        },
        
        dataType: 'json',
        
        success: function(response) {
            console.log(response);
            console.log("team1 called=====================");
            
            response.data.forEach(item => {
                var state = item.states;
                var lid=item.L_ID;
                console.log(lid);
                console.log(state);
                if(lid==''){
                    console.log("No team found");
                    document.getElementById('requsetadd').style.display='block';
                    document.getElementById('requsetview').style.display='none'; 
                //     document.getElementById('requsetadd').style.display='none';
                //     document.getElementById('requsetview').style.display='block'; 
                }                       
               else{
                    console.log(state);
                    console.log(response);
                var view=document.getElementById('requsetview');

                if(lid==1){
                   console.log("lec1");
                    var infor=document.getElementById('lecinfro1');
                    document.getElementsByClassName('request')[0].style.display='none';
                }
                else if( lid==2){
                    console.log("lec2");
                    
                    var infor=document.getElementById('lecinfro2');
                    // document.getElementsByClassName('request').style.display='none';
                    document.getElementsByClassName('request')[1].style.display='none';
                  infor.style.padding='10rem';


                }
                else if(lid==3){
                    console.log("lec3");
                    var infor=document.getElementById('lecinfro3');
                    document.getElementsByClassName('request')[2].style.display='none';
                }
                else if( lid==4){
                    console.log("lec4");
                    var infor=document.getElementById('lecinfro4');
                    document.getElementsByClassName('request').style.display='none';
                    document.getElementsByClassName('request')[3].style.display='block';
                }
                else{
                    console.log("No team found");
                   
                }
              
                view.appendChild(infor);
                



                
                    document.getElementById('requsetadd').style.display='none';
                    view.style.display='flex';
                    infor.style.alignContent='center';

       

               }

            });
                
            
            
        },
        error: function(error) {
            console.error(error);
            console.log("Login failed error");
            alert("Invalid email or password, please try again error.");
        }
    });
}

function btnup(){
    var btn=document.createElement('button');
    btn.textContent='Update';
    btn.id='update';
    btn.className='add';
    btn.style.marginTop='4rem';
    btn.style.alignSelf='center';
    var viewdiv=document.getElementById('viewteammember');
    viewdiv.appendChild(btn);
    document.getElementById('update').addEventListener('click', function() {
        console.log("update button clicked");
        teamupdate();
    });
}

//=========================================lectuers request=======================================================================================================


function lecturer(lec){

    console.log("lec called");
    $.ajax({
        url: 'CreateTeam.php',
        method: 'POST',
        data: {
            functionname: 'lecturer',
            lec:lec
            
        },
        
        dataType: 'json',
        
        // When http request is success
        success: function(response){
            console.log("data readed from db successfullly");
            console.log(response);
            alert("Request sent to lecturer ");
          
        },

        error: function(error){
    console.log("error");
            console.error(error);
        }
    });

}

