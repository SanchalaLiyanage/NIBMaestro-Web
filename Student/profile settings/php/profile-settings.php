<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['functionName'])) {
        include '../../../DataBase.php';
        

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
       
                case 'loadcombobox':
                    // Call the submit function
                    loadcombobox();
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
        $sid = $_COOKIE['S_ID'];
     

        // Get the file content
        $profilePic = file_get_contents($_FILES['newProfile']['tmp_name']);

       // Check if a record with the given S_ID already exists
$checkSql = "SELECT COUNT(*) AS count FROM student_profile_pics WHERE S_ID = ?";
$checkStmt = $con->prepare($checkSql);
$checkStmt->bind_param("i", $sid);
$checkStmt->execute();
$checkResult = $checkStmt->get_result();
$row = $checkResult->fetch_assoc();

if ($row['count'] > 0) {
    // Record with the given S_ID already exists, perform an update
    $sql = "UPDATE student_profile_pics SET Profile = ? WHERE S_ID = ?";
    $stmt = $con->prepare($sql);
    $stmt->bind_param("bi", $profilePic, $sid);
} else {
    // No record with the given S_ID exists, perform an insert
    $sql = "INSERT INTO student_profile_pics (Profile, S_ID) VALUES (?, ?)";
    $stmt = $con->prepare($sql);
    $stmt->bind_param("bi", $profilePic, $sid);
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

                setcookie("S_ID", $row['S_ID'], time() + (86400 * 30), "/");
                setcookie("Name", $row['S_Name'], time() + (86400 * 30), "/");
                setcookie("C_ID", $row['C_ID'], time() + (86400 * 30), "/");
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
    $sid = $_COOKIE['S_ID'];
    $name = $_POST['name'];
    $email = $_POST['email'];
    $pw = $_POST['psswd'];
    $course = $_POST['course'];
    $batch = $_POST['batch'];
    $index = $_POST['index'];
    $sql1 = "SELECT C_ID FROM course WHERE Course = '$course' AND Batch = '$batch'";
    $result1 = mysqli_query(getDbConnection(), $sql1);
   

    if(mysqli_num_rows($result1) > 0){
        $row = mysqli_fetch_array($result1);
        $cid = $row['C_ID'];
        $sql = "UPDATE student SET S_Name = '$name', S_Email = '$email', S_PW='$pw',S_Index='$index',C_ID='$cid' WHERE S_ID = '$sid'";
        $result = mysqli_query(getDbConnection(), $sql);
        if($result){
            echo json_encode(array("status" => "success", "message" => "Data Updated Successfully"));
        }
        else{
            echo json_encode(array("status" => "failed", "message" => "Failed to Update Data"));
        }

    }
    else{
        echo json_encode(array("status" => "failed", "message" => "Failed to Update Data haven't found the course and batch"));
    }

   

   

    $con->close();

}
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


function fetchProfilePic(){
    $sid = $_COOKIE['S_ID'];
    $con = getDbConnection();

    // Prepare and execute the SQL query to select profile picture based on S_ID
    $sql = "SELECT Profile FROM student_profile_pics WHERE S_ID = ?";
    $stmt = $con->prepare($sql);
    $stmt->bind_param("i", $sid);
    $stmt->execute();
    $stmt->store_result();

    // Bind the result
    $stmt->bind_result($profilePic);

    // Fetch the profile picture data
    if ($stmt->fetch()) {
        // Profile picture data fetched successfully
        $response = array("status" => "success", "profilePic" => base64_encode($profilePic));
    } else {
        // No profile picture found for the given S_ID
        $response = array("status" => "failed", "message" => "No Profile Picture Found");
    }

    // Close the statement and connection
    $stmt->close();
    $con->close();

    // Return the response as JSON
    echo json_encode($response);
}
