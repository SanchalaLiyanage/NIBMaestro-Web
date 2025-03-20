<?php
// Check how someone accesses the PHP file, if it's not via the POST method, access will be denied
if ($_SERVER['REQUEST_METHOD'] === 'POST'){
    if(isset($_POST['functionname'])){
        
        switch ($_POST['functionname']){  // Check which function is going to be accessed
            case 'submit':
                // Call the submit function
                
                submit();
                break;

                case 'loadcombobox':
                    // Call the submit function
                    loadcombobox();
                    break;
               
            default:
                accessDenied();
        }
    }
    else
    {
        accessDenied();
    }   
     
}
else{
    accessDenied();
}

// When access is denied, this will be called to block the access
function accessDenied(){
    echo("==============Accesdenid====================");
    http_response_code(403);
    exit ('<h1 style="text-align: center; font-family: roboto; color: red; margin-top: 6%">Access Denied !</h1>');
}


//=========================================submit function=========================================
function submit(){

    // echo("submit function called");

if(isset($_FILES['input-file']))
{
    include '../../DataBase.php';
    $con = getDbConnection();
if($con == null){
    $response=array("status"=>"failed","message"=>"Database connection failed");
    echo json_encode($response);
    
}
else{

            // $T_ID=$_COOKIE['T_ID'];
            $L_ID=1;
           

        

           

// Check if the file was uploaded successfully
if ($_FILES['input-file']['error'] !== UPLOAD_ERR_OK) 
{
    echo json_encode(array("status" => "failed", "message" => "File upload failed"));
    exit;
}




// Check if the file is not empty
if ($_FILES['input-file']['size'] === 0) 
{
    echo json_encode(array("status" => "failed", "message" => "File is empty"));
    exit;
}



// Get the file content
// Assuming you have received the input values via POST method

// Retrieve input values from POST
$course = $_POST['course'];
$batch = $_POST['batch'];
$title = $_POST['title'];
$deadline = $_POST['deadline'];
$addedDate = date("Y-m-d"); 
$description= $_POST['description']; 
$markallocated = $_POST['marksAllocated']; 
$Doc = file_get_contents($_FILES['input-file']['tmp_name']); 
$fileName = $_FILES['input-file']['name']; // File name

// Prepare the SQL statement
$sql = "INSERT INTO viva_submission (Course, Batch, title, deadline, addedDate, note, time, AllocateFor, L_ID, File, FileName) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
$stmt = $con->prepare($sql);

// Check if the SQL statement is prepared successfully
if (!$stmt) {
    echo json_encode(array("status" => "failed", "message" => "Failed to prepare SQL statement"));
    exit;
}
// echo("==========SET===============");

// Bind parameters to the SQL statement
$stmt->bind_param("ssssssssiss", $course, $batch, $title, $deadline, $addedDate, $description, $times, $markallocated, $L_ID, $Doc, $fileName);

// Execute the SQL statement
$stmt->execute();
// echo("==========SET1===============");

// Check if the query was executed successfully
if ($stmt->affected_rows > 0) {
    // echo("==========SET2===============");
    echo json_encode(array("status" =>"success", "message" => "Data inserted successfully"));
    
} else {
    echo json_encode(array("status" => "failed", "message" => "Failed to insert data"));
}

// Close the statement and connection
$stmt->close();
$con->close();


    } 
}
    else{
    echo json_encode(array("status" => "failed", "message" => "No Profile Picture Found"));
    }


    
}



//=========================================Loaard ComboBox=========================================

function loadcombobox()
{
    include '../../DataBase.php';
    $con = getDbConnection();
    if($con == null){
        $response=array("status"=>"failed","message"=>"Database connection failed");
        echo json_encode($response);
        
    }
    else{
        $sql = "SELECT DISTINCT Course FROM course";
        $result = $con->query($sql);
        if ($result->num_rows > 0) {
            $response=array();
            while($row = $result->fetch_assoc()) {
                $response[]=$row;
            }
         
            $sql1 = "SELECT DISTINCT Batch FROM course";
            $result1 = $con->query($sql1);
            if ($result1->num_rows > 0) {
                $response1=array();
                while($row1 = $result1->fetch_assoc()) {
                    $response1[]=$row1;
                }
            }

            echo json_encode(array("status" => "success", "message" => "Data found", "course" => $response, "batch" => $response1));
        } 
        else {
            $response=array("status"=>"failed","message"=>"No data found");
            echo json_encode($response);
        }

        $con->close();
    }
}





?>