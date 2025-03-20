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






function validateLogin($email, $password){ // check for the login credentials in database
    include '../../DataBase.php';
        $databaseconnection = getDbConnection();
    if($databaseconnection == null){
        $response=array("status"=>"failed","message"=>"Database connection failed");
        echo json_encode($response);
        
    }
    else{
        
    
        $sql = "SELECT * FROM Admin WHERE A_Name = '$email' AND A_PW = '$password'";
        $result = mysqli_query(getDbConnection(), $sql);
        $num=mysqli_num_rows($result);
    
        if(mysqli_num_rows($result) > 0){
            $row = mysqli_fetch_array($result);
            
            setcookie("studentID", $row['A_ID'], time() + (86400 * 30), "/");
            setcookie("email", $email, time() + (86400 * 2), "/");        
            setcookie("password", $password, time() + (86400 * 30), "/");
            
            echo json_encode(array("status" => "success","message"=>"---Login Successfull HAVE DATA---"));
            
        }
        else{
            echo json_encode(array("status" => "failed","message"=>"Query Error but Database connectted $email $password $num"));
            
        }
    }
    }

