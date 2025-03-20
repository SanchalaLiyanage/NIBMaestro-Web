<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['functionName'])) {

        switch ($_POST['functionName']) {  // Check which function is going to access
            case 'validateLogin':
                validateLogin($_POST['email'], $_POST['password']);
                break;
                case 'Singup':
                    Singup($_POST['email'], $_POST['password'],$_POST['username'],$_POST['batch'],$_POST['course'],$_POST['indexnumber']);
                    break;

                    case 'loadcombobox':
                        // Call the submit function
                        loadcombobox();
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





// ---------------------------------------------------Student Singup---------------------------------------------------

function Singup($email, $password, $username, $batch, $course, $indexnumber) {
    include '../../DataBase.php';
    $databaseconnection = getDbConnection();
    if ($databaseconnection == null) {
        $response = array("status" => "failed", "message" => "Database connection failed");
        echo json_encode($response);
    } else {
        // Fetch C_ID from course table based on course and batch
        $fetchCourseIdSql = "SELECT C_ID FROM course WHERE Course = '$course' AND Batch = '$batch'";
        $courseIdResult = mysqli_query(getDbConnection(), $fetchCourseIdSql);
// echo("course id fetched");
// echo($courseIdResult);
if ($courseIdResult) {
    $courseRow = mysqli_fetch_assoc($courseIdResult);
    $cId = $courseRow['C_ID'];
    // echo "Course ID fetched: " . $cId; // Echo the fetched course ID for debugging
    
    // Insert data into student table along with fetched C_ID
    $insertSql = "INSERT INTO student (S_Email, S_PW, S_Name, S_Index, C_ID) 
                  VALUES ('$email', '$password', '$username', '$indexnumber', '$cId')";
    $result = mysqli_query(getDbConnection(), $insertSql);

    if ($result) {
        echo json_encode(array("status" => "success"));
    } else {
        echo json_encode(array("status" => "failed", "message" => "Query Error but Database connected"));
    }
} else {
    echo json_encode(array("status" => "success", "message" => "Failed to fetch Course ID"));
}

    }
}

    

























// ---------------------------------------------------logging in the student---------------------------------------------------







function validateLogin($email, $password){ // check for the login credentials in database
include '../../DataBase.php';
    $databaseconnection = getDbConnection();
if($databaseconnection == null){
    $response=array("status"=>"failed","message"=>"Database connection failed");
    echo json_encode($response);
    
}
// else{

    $sql = "SELECT * FROM student WHERE S_Email = '$email' AND S_PW = '$password'";
    $result = mysqli_query(getDbConnection(), $sql);
    
    if(mysqli_num_rows($result) > 0){
        $row = mysqli_fetch_array($result);
        setcookie("S_ID", $row['S_ID'], time() + (86400 * 30), "/");
        setcookie("Name", $row['S_Name'], time() + (86400 * 30), "/");
        setcookie("C_ID", $row['C_ID'], time() + (86400 * 30), "/");
       
        $TEAMID = $row['T_ID'];
        
     if($TEAMID == ''){
        $TEAMID = 0;
        setcookie("T_ID", $TEAMID, time() + (86400 * 30), "/");
        echo json_encode(array("status" => "success", "message" => "No team found"));
        }
    else{
        $sql1 = "SELECT * FROM team WHERE T_ID = '$TEAMID' ";
        $result1 = mysqli_query(getDbConnection(), $sql1);
    
        if($result){
            $row1 = mysqli_fetch_array($result1);
            setcookie("T_ID", $row1['T_ID'], time() + (86400 * 30), "/");
            setcookie("L_ID", $row1['L_ID'], time() + (86400 * 30), "/");
            echo json_encode(array("status" => "success", "message" => "teame found"));
            
        }
        else{
            echo json_encode(array("status" => "failed", "message" => "2Query Error but Database connected"));
        }
    }
  

    }

        else{
            echo json_encode(array("status" => "failed", "message" => "1Query Error but Database connected"));
        }
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




?>