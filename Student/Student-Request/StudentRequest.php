<?php

// Check how someone access the php file, if it's not POST method, Acces will be denied
if ($_SERVER['REQUEST_METHOD'] === 'POST'){
    if(isset($_POST['functionName'])){
        
        switch ($_POST['functionName']){  // Check which function is going to access
            case 'loadContent':
                loadContent();
                break;
               case 'addRequest':
                addRequest();
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

// When access is denied this will called to block the access
function accessDenied(){
    http_response_code(403);
    exit ('<h1 style="text-align: center; font-family: roboto; color: red; margin-top: 6%">Access Denied !</h1>');
}
//==============================================================Load C

function loadContent()
{
  
    $T_ID=$_COOKIE['T_ID'];
    // $T_ID=1;
   

    include '../../DataBase.php';
    $databaseconnection = getDbConnection();
if($databaseconnection == null){
    $response=array("status"=>"failed","message"=>"Database connection failed");
    echo json_encode($response);
    
}
    $sql = "SELECT *
    FROM request  WHERE T_ID = '$T_ID'";
    
    $result = mysqli_query(getDbConnection(), $sql);
    $team_data = array();
   
    while($row = mysqli_fetch_array($result)){
        $team_data[] = $row; 

    }

    mysqli_close(getDbConnection()); //Close the database connection

    header('Content-Type: application/json');
    $json_data = json_encode($team_data);
    echo $json_data;

}

//=======================================================================================Add Request================================================================================================




function addRequest()
{
    $T_ID=$_COOKIE['T_ID'];
    $L_ID=$_COOKIE['L_ID'];
    // $T_ID=1;
    $request=$_POST['request'];
    $date=date("Y-m-d");
    include '../../DataBase.php';
    $databaseconnection = getDbConnection();
    if($databaseconnection == null){
        $response=array("status"=>"failed","message"=>"Database connection failed");
        echo json_encode($response);
        
    }
    else{
    
        $sql = "INSERT INTO request (Description,Req_date,T_ID,L_ID) VALUES ('$request', '$date','$T_ID','$L_ID')";
        $result = mysqli_query(getDbConnection(), $sql);
    
        if($result){
            echo json_encode(array("status" => "success"));
        }
        else{
            echo json_encode(array("status" => "failed","message"=>"Query Error but Database connectted "));
        }
    }
    }




?>