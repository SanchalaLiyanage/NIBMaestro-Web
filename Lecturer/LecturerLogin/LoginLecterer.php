<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['functionName'])) {

        switch ($_POST['functionName']) {  // Check which function is going to access
            case 'validateLogin':
                validateLogin($_POST['email'], $_POST['password']);
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






// Validate login function
function validateLogin($email, $password) {
    include '../../DataBase.php';
   
    $dbConnection = getDbConnection();
    if ($dbConnection) {
        $sql = "SELECT * FROM lecturer WHERE L_Email = '$email' AND L_PW = '$password'";
        $result = mysqli_query($dbConnection, $sql);
        
        if ($result) {
            $num = mysqli_num_rows($result);
            if ($num > 0) {
                $row = mysqli_fetch_array($result);
                
                setcookie("L_ID", $row['L_ID'], time() + (86400 * 30), "/");
                setcookie("L_Name", $row['L_Name'], time() + (86400 * 2), "/");        
               
                echo json_encode(array("status" => "success","message"=>"---Login Successful, Data Available---"));
            } else {
                echo json_encode(array("status" => "failed","message"=>"No records found."));
            }
        } else {
            // Handle MySQL server gone away error
            echo json_encode(array("status" => "failed","message"=>"MySQL server has gone away."));
           
        }
    } else {
        echo json_encode(array("status" => "failed","message"=>"Database connection failed."));
    }
}


