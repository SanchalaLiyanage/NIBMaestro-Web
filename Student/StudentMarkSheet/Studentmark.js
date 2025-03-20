document.addEventListener('DOMContentLoaded', function() {
   
        console.log("js file loaded");

        fetch('../Navigation-bar/Nav-Bar.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('nav123').innerHTML = data;
        })
        .catch(error => {
            console.error('Error fetching content:', error);
        });


     loadtTeamTable();
        loadtindividualTable();


        //------------------------------------------------------------------create team table------------------------------------------------------------



        function loadtTeamTable(){ 
        console.log("loadtTeamTable called");
        $.ajax({
            url: 'Studentmarks.php',
            method: 'POST',
            data: {
                functionName: 'loadTeam',
                
            },
            
            dataType: 'json',
            
            // When http request is success
            success: function(response){
                    console.log("data readed from db successfullly")
                    console.log(response);
                    var count = 1;
                    // currentDisplayItems = response; //not used
                    response.team_data.forEach(item => {
                        
                        var taskname = item.title;
                        var marks = item.marks;
                        var comment = item.comment;
                        var V_ID1=item.V_ID;
                        var doc= item.Doc;
                       
                        
                    
                            response.team_doc.forEach(item1 => {
                            
                                var doc= item1.Doc;
                                var V_ID2=item1.V_ID;
                                if(V_ID1==V_ID2){
                                    console.log("doc found");
                                    console.log(taskname, marks, comment);
                                    createRow(count,taskname, marks, comment, doc);
                                    count++;

                                }

                            });
                            // createRow(count,taskname, marks, comment, doc);
                            // count++;
                    });
                    

                
                    console.log("Item Data fetch success");
                },
        
                error: function(error){
            console.log("error");
                    console.error(error);
                }
            });
        }

        // createRow,called from loadtTeamTable

    
        function createRow(count,taskname, marks, comment, doc) {
        console.log("createRow called"+count);
        
        if(count==1){
            var title = document.createElement('h3');
            title.textContent = 'Team Marks';
            title.className = 'subtitle';
            title.style.padding = '25px';
            title.style.fontSize = '22px';


            var teamDiv = document.getElementById('team');
            teamDiv.appendChild(title);
            var table = document.createElement('table');
            table.id = 'teamTable';

        
            var headerRow = document.createElement('tr');
            var tbody = document.createElement('tbody');
            tbody.id = 'tbodyid';
            var headers = ['Task Number','Task Name', 'Marks', 'Comment', 'Document'];
            headers.forEach(function(header) {
                var th = document.createElement('th');
                th.textContent = header;
                headerRow.appendChild(th);
            });
            
            table.appendChild(headerRow);
            table.appendChild(tbody);
            teamDiv.appendChild(table);
            console.log("Row head created");
        }
        

        if(count>0){
        // Create table body
        
        
            var row = document.createElement('tr');
        
            var tasknocol = document.createElement('td');
            tasknocol.textContent = count;

            var tasknamecol = document.createElement('td');
            tasknamecol.textContent = taskname;

            var markscol = document.createElement('td');
            markscol.textContent = marks;

            var comments = document.createElement('td');
            comments.textContent = comment;
        
            var documents = document.createElement('td');
            var imeage = document.createElement('img');
            var butndonwload = document.createElement('button');
            // downloadButton.textContent = 'Download PDF';
            butndonwload.id = "btndownload"+count;
            imeage.src = "Icon/pdf.png";
        console.log('Content-Type: application/pdf' + doc);
            
        

            butndonwload.appendChild(imeage);
            documents.appendChild(butndonwload);
            row.appendChild(tasknocol);
            row.appendChild(tasknamecol);
            row.appendChild(markscol);
            row.appendChild(comments);
            row.appendChild(documents);
            var tbody1=document.getElementById('tbodyid');
            tbody1.appendChild(row);
        
        
        

            console.log(count+" Row created");

            var btndownload = document.getElementById('btndownload'+count);
            btndownload.addEventListener('click', function() {
            // Decode the base64 encoded PDF data
            var pdfData = atob(doc);
            // Trigger the download of the PDF
            downloadPDF(pdfData, 'document.pdf');
            });
           
        }
    }
    
       
    
        









function downloadPDF(pdfData, filename) {
    // Create a blob from the PDF data
    var blob = new Blob([pdfData], { type: 'application/pdf' });

    // Create a temporary link element
    var link = document.createElement('a');

    // Set the href attribute to the URL of the blob
    link.href = window.URL.createObjectURL(blob);

    // Set the download attribute to the desired filename
    link.download = filename;

    // Append the link to the document body
    document.body.appendChild(link);

    // Trigger the click event of the link to start the download
    link.click();

    // Remove the link from the document body
    document.body.removeChild(link);
}


//---------------------------------------------------------create individual marks table------------------------------------------------------------



function loadtindividualTable(){ 
    console.log("load individual Table called");
    $.ajax({
        url: 'Studentmarks.php',
        method: 'POST',
        data: {
            functionName: 'loadindividual',
            
        },
        
        dataType: 'json',
        
        // When http request is success
        success: function(response){
            console.log("data readed from db successfullly")
            console.log(response);
            var count = 1;
            // currentDisplayItems = response; //not used
            response.forEach(item => {
                // Get details from
                var taskname = item.title;
                var marks = item.marks;
                var comment = item.comment;
            
                console.log(taskname, marks, comment);
                
                
                
                createindividualRow(count,taskname, marks, comment);
                count++;
            });
            

         
            console.log("Item Data fetch success");
        },

        error: function(error){
            console.error(error);
        }
    });
}

// createRow,called from loadtTeamTable


function createindividualRow(count,taskname, marks, comment) {
console.log("createRow called".count);

if(count==1){

    var individualDiv = document.getElementById('ind');
    var table = document.createElement('table');
    table.id = 'teamTable';

 
    var headerRow = document.createElement('tr');
    var tbody1 = document.createElement('tbody');
    tbody1.id = 'tbodyid1';
    var headers = ['Task Number','Task Name', 'Marks', 'Comment'];
    headers.forEach(function(header) {
        var th = document.createElement('th');
        th.textContent = header;
        headerRow.appendChild(th);
     
        individualDiv.appendChild(table);
    });
    
    table.appendChild(headerRow);
    table.appendChild(tbody1);
    
    console.log("Row head created");
   
   
}


if(count>0){
// Create table body


    var row = document.createElement('tr');
   
    var tasknocol = document.createElement('td');
    tasknocol.textContent = count;

    var tasknamecol = document.createElement('td');
    tasknamecol.textContent = taskname;

    var markscol = document.createElement('td');
    markscol.textContent = marks;

    var comments = document.createElement('td');
    comments.textContent = comment;


   

    row.appendChild(tasknocol);
    row.appendChild(tasknamecol);
    row.appendChild(markscol);
    row.appendChild(comments);
    var tbody1=document.getElementById('tbodyid1');
    tbody1.appendChild(row);

    
 

// Append table to 'team' div



console.log("Row created");
}


}





});

document.addEventListener("DOMContentLoaded", function() {
   
});
