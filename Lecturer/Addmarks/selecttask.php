<?php

// Check how someone access the php file, if it's not POST method, Access will be denied
if ($_SERVER['REQUEST_METHOD'] === 'POST'){
    if(isset($_POST['functionName'])){
        
        switch ($_POST['functionName']){  // Check which function is going to access
            case 'loadContent':
                loadContent();
                break;
            case 'addRequest':
                addRequest();
                break;
            case 'singlestudentmark':
                singlestudentmark();
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

// When access is denied this will be called to block the access
function accessDenied(){
    http_response_code(403);
    exit ('<h1 style="text-align: center; font-family: roboto; color: red; margin-top: 6%">Access Denied !</h1>');
}

function loadContent()
{
    if (!isset($_POST['course']) || !isset($_POST['batch'])) {
        echo json_encode(array("status" => "failed", "message" => "Course and batch parameters are required"));
        return;
    }

    $course = $_POST['course'];
    $batch = $_POST['batch'];

    include '../../DataBase.php';
    $databaseconnection = getDbConnection();

    if ($databaseconnection == null) {
        echo json_encode(array("status" => "failed", "message" => "Database connection failed"));
        return;
    }
    // echo json_encode(array("status" => "success", "message" => "Database connected"));
    // $cid=1;
    $cid = selectcid($course, $batch, $databaseconnection);
    if (!$cid) {
        echo json_encode(array("status" => "failed", "message" => "Course not found"));
        return;
    }
    else{
        $sql = "SELECT * FROM viva_submission WHERE C_ID = '$cid'";

        $result = mysqli_query($databaseconnection, $sql);
        // echo("============test==============");
        if (!$result || mysqli_num_rows($result) == 0) {
            echo("============test1==============");
            echo json_encode(array("status" => "failed", "message" => "No task found"));
            return;
        } else {
            // echo("============test2==============");
            $tasks = array();
            while ($row = mysqli_fetch_assoc($result)) {
                $tasks[] = $row;
            }
            echo json_encode(array("status" => "success", "message" => "No task found", "tasks" => $tasks));
            // return;
        }
        // echo("============test3==============");
    }
}

function selectcid($course, $batch, $databaseconnection)
{
    $sql = "SELECT C_ID FROM course WHERE Course = '$course' AND Batch = '$batch'";
    $result = mysqli_query($databaseconnection, $sql);
    if (!$result || mysqli_num_rows($result) == 0) {
        return false;
    } else {
        $row = mysqli_fetch_assoc($result);
        return $row['C_ID'];
    }
}


