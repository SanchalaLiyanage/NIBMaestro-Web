<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['functionName'])) {
        include '../../DataBase.php';
        

        switch ($_POST['functionName']) {  // Check which function is going to access
            case 'updateProfilePic':
                updateProfilePic();
                break;
            case 'getUserData':
                getUserData();
                break;
                case 'fetchProfilePic':
                    fetchProfilePic();
                    break;
       
                
                    case 'updateUserData':
                        // Call the submit function
                        updateUserData();
                        break;
            default:
                accessDenied();
        }
    } else {
        accessDenied();
    }
} else {
    accessDenied();
}
function accessDenied()
{
    http_response_code(403);
    exit('<h1 style="text-align: center; font-family: roboto; color: red; margin-top: 6%">Access Denied !</h1>');
}


function updateProfilePic()
{
    if (isset($_FILES['newProfile'])) {
        $con = getDbConnection();
        // $sid = $_COOKIE['S_ID'];
        $LID= $_POST['L_ID'];
     

        // Get the file content
        $profilePic = file_get_contents($_FILES['newProfile']['tmp_name']);

       // Check if a record with the given S_ID already exists
$checkSql = "SELECT COUNT(*) AS count FROM lecturer_profile_pics WHERE L_ID = ?";
$checkStmt = $con->prepare($checkSql);
$checkStmt->bind_param("i", $LID);
$checkStmt->execute();
$checkResult = $checkStmt->get_result();
$row = $checkResult->fetch_assoc();

if ($row['count'] > 0) {
    // Record with the given S_ID already exists, perform an update
    $sql = "UPDATE lecturer_profile_pics SET Profile = ? WHERE L_ID = ?";
    $stmt = $con->prepare($sql);
    $stmt->bind_param("bi", $profilePic, $LID);
} else {
    // No record with the given S_ID exists, perform an insert
    $sql = "INSERT INTO lecturer_profile_pics (Profile, L_ID) VALUES (?, ?)";
    $stmt = $con->prepare($sql);
    $stmt->bind_param("bi", $profilePic, $LID);
}

// Bind the file content to the SQL statement
$null = NULL; // Placeholder for BLOB parameter
$stmt->send_long_data(0, $profilePic); // Bind BLOB data separately

// Execute the SQL statement
$stmt->execute();

if ($stmt->affected_rows > 0) {
    echo json_encode(array("status" => "success", "message" => "Profile Picture Updated Successfully"));
} else {
    echo json_encode(array("status" => "failed", "message" => "Failed to Update Profile Picture"));
}

// Close the statement and connection
$stmt->close();
$con->close();

    } else {
        echo json_encode(array("status" => "failed", "message" => "No Profile Picture Found"));
    }
}


function getUserData() // Get the user data from the database
{
    
    $databaseconnection = getDbConnection();
        if($databaseconnection == null){
            $response=array("status"=>"failed","message"=>"Database connection failed");
            echo json_encode($response);
            
        }
        else{
            $sid = $_COOKIE['S_ID'];
            $sql = "SELECT * FROM student WHERE S_ID = '$sid'";
            $result = mysqli_query(getDbConnection(), $sql);
            
            if(mysqli_num_rows($result) > 0){
                $row = mysqli_fetch_array($result);

               
                $cid= $row['C_ID'];
                $sql1 = "SELECT * FROM course WHERE C_ID = '$cid'";
                $result1 = mysqli_query(getDbConnection(), $sql1);
                if(mysqli_num_rows($result1) > 0){
                    $row1 = mysqli_fetch_array($result1);
                    $coursename = $row1['Course'];
                    $batch = $row1['Batch'];
                
                }
                else{
                    setcookie("C_ID", '', time() + (86400 * 30), "/");
                    echo json_encode(array("status" => "success"));
                }

                echo json_encode(array("status" => "success", "data" => $row,"course" => $coursename,"batch" => $batch));
            
               
            }
            else{
                echo json_encode(array("status" => "failed", "message" => "Query Error but Database connected"));
            }
         }
        }



function updateUserData()
{
    $con = getDbConnection();
    
    $name = $_POST['name'];
    $email = $_POST['email'];
    $pw = $_POST['psswd'];
   $des = $_POST['des'];

   

  
       
        $sql = "INSERT INTO lecturer (L_Name, L_email, L_PW, Des) VALUES ('$name', '$email', '$pw', '$des')";
        $result = mysqli_query(getDbConnection(), $sql);
        if($result){

            $sql1 = "SELECT * FROM lecturer WHERE L_email = '$email' AND L_PW = '$pw'";

            $result1 = mysqli_query(getDbConnection(), $sql1);
            $row = mysqli_fetch_array($result1);
            $lid = $row['L_ID'];
            // updateProfilePic($lid);

            echo json_encode(array("status" => "success", "message" => "Data Updated Successfully", "lid" => $lid));
        }
        else{
            echo json_encode(array("status" => "failed", "message" => "Failed to Update Data"));
        }

    

   

   

    $con->close();

}

