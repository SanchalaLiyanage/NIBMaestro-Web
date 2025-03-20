<?php
// Check how someone accesses the PHP file, if it's not via the POST method, access will be denied
if ($_SERVER['REQUEST_METHOD'] === 'POST'){
    if(isset($_POST['functionName'])){
        
        switch ($_POST['functionName']){  // Check which function is going to be accessed
            case 'submit':
                // Call the submit function
                
                submit();
                break;

                case 'loadDescription':
                    // Call the submit function
                    loadDescription();
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
    http_response_code(403);
    exit ('<h1 style="text-align: center; font-family: roboto; color: red; margin-top: 6%">Access Denied !</h1>');
}


//=========================================submit function=========================================
function submit(){

if(isset($_FILES['input-file']))
{
    include '../../DataBase.php';
    $con = getDbConnection();
if($con == null){
    $response=array("status"=>"failed","message"=>"Database connection failed");
    echo json_encode($response);
    
}
else{

            $T_ID=$_COOKIE['T_ID'];
            // $T_ID=1;
            // $V_ID=$_SESSION['V_ID'];
            $V_ID=1;

           // Assuming $_FILES['input-file'] is set with the uploaded file data

// Check if the file was uploaded successfully
if ($_FILES['input-file']['error'] !== UPLOAD_ERR_OK) {
    echo json_encode(array("status" => "failed", "message" => "File upload failed"));
    exit;
}

// Check if the file is not empty
if ($_FILES['input-file']['size'] === 0) {
    echo json_encode(array("status" => "failed", "message" => "File is empty"));
    exit;
}

// Get the file content
$Doc = file_get_contents($_FILES['input-file']['tmp_name']);

// Prepare the SQL statement to insert the file data
$sql = "INSERT INTO doc (Doc, T_ID, V_ID, D_Name) VALUES (?, ?, ?, ?)";
$stmt = $con->prepare($sql);

// Check if the SQL statement is prepared successfully
if (!$stmt) {
    echo json_encode(array("status" => "failed", "message" => "Failed to prepare SQL statement"));
    exit;
}

// Bind parameters to the SQL statement
$stmt->bind_param("siis", $Doc, $T_ID, $V_ID, $_FILES['input-file']['name']); // 's' indicates string data

// Execute the SQL statement
$stmt->execute();

// Check if the SQL statement is executed successfully
if ($stmt->affected_rows > 0) {
    echo json_encode(array("status" => "success", "message" => "File inserted successfully"));
} else {
    echo json_encode(array("status" => "failed", "message" => "Failed to insert file"));
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


//=========================================loadDescription function=========================================


function loadDescription()
{
    include '../../DataBase.php';
    $con = getDbConnection();
    if ($con == null) {
        $response = array("status" => "failed", "message" => "Database connection failed");
        echo json_encode($response);
    } else {
        try {
            $V_ID = 1;

            $sql = "SELECT vs.title, vs.deadline, vs.addedDate, vs.time, vs.note FROM viva_submission AS vs WHERE V_ID = '$V_ID'";
            $result = mysqli_query($con, $sql);
            $data = array();
            while ($row = mysqli_fetch_assoc($result)) {
                $data[] = $row;
            }
        } catch (mysqli_sql_exception $e) {
            echo json_encode(array("status" => "failed", "message" => "Failed to load text description"));
        }
        try {
            $sql1 = "SELECT vs.File FROM viva_submission AS vs WHERE V_ID = '$V_ID'";
            $result1 = mysqli_query($con, $sql1);
            $doc_data = array();
            while ($row1 = mysqli_fetch_assoc($result1)) {
                // Base64 encode the document data
                $doc = base64_encode($row1['File']);
                $doc_data[] = $doc;
            }
        } catch (mysqli_sql_exception $e) {
            echo json_encode(array("status" => "failed", "message" => "Failed to load doc description"));
        }
        mysqli_close($con);

        header('Content-Type: application/json');
        echo json_encode(array("status" => "success", "textdata" => $data, "doc_datas" => $doc_data));
    }
}

























?>
