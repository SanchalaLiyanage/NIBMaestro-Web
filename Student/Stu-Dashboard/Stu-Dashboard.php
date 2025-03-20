<?php

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['functionName'])) {

        switch ($_POST['functionName']) {  // Check which function is going to access
            case 'team':
                team();
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






function team(){ // check for the login credentials in database


    $tid=$_COOKIE['T_ID'];
    // $tid="";
    
        header('Content-Type: application/json');
        $json_data = json_encode($tid);
        echo $json_data;
        

   
    
    }







?>