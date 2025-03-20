<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST'){
    if(isset($_POST['functionName'])){
        include '../../DataBase.php';
        switch ($_POST['functionName']){  // Check which function is going to be accessed
          

                case 'loadDescription':
                    // Call the submit function
                    loadDescription();
                    break;

                    case 'A/Rbtn':
                        // Call the submit function
                        btn();
                        break;
                        
                    case 'session':
                        // Call the submit function
                        session();
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



function loadDescription()
{
    $databaseconnection = getDbConnection();
        if($databaseconnection == null){
            $response=array("status"=>"failed","message"=>"Database connection failed");
            echo json_encode($response);
            
        }
        else{
            // $L_ID =2;
             $L_ID = $_COOKIE['L_ID'];

             $sql = "SELECT 
             request.*,
             team.*,
             course.*
         FROM 
             request
         JOIN 
             team ON request.T_ID = team.T_ID
         JOIN 
             course ON team.C_ID = course.C_ID
         WHERE 
             request.L_ID = '$L_ID' and request.replyORnot= 1 and request.mstate=0";
            $result = mysqli_query(getDbConnection(), $sql);
            $data = array();


            if(mysqli_num_rows($result) > 0){

                while ($row = mysqli_fetch_assoc($result)) {
                    
                    $data[] = $row;
                   
                }

              
            $response=array("status"=>"success","message"=>"Data loaded successfully","notif"=>"1","data"=>$data);
            echo json_encode($response);
            }
            else{
                $response=array("status"=>"success","message"=>"No data found","notif"=>"0");
                echo json_encode($response);
            }
                       
         }
}


function session(){
    $rid=$_POST['rid'];
    if($rid==''){
        $response=array("status"=>"failed","message"=>"Session not set","data"=>$rid);
        echo json_encode($response);
    }
    else{
      
        
        setcookie("R_ID", $rid, time() + (86400 ), "/");
        $response=array("status"=>"success","message"=>"Session set,","data"=>$_COOKIE['R_ID']);
        echo json_encode($response);
    }
}


?>