<?php
// Check how someone accesses the PHP file, if it's not via the POST method, access will be denied
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
            // $R_ID =1;
             $R_ID = $_COOKIE['R_ID'];
            //  echo("++++++++++++++".$_SESSION['$R_ID']."++++++++++++++");

             $sql = "SELECT * FROM request WHERE R_ID = '$R_ID'";
            $result = mysqli_query(getDbConnection(), $sql);
            
            if(mysqli_num_rows($result) > 0){
                $row = mysqli_fetch_array($result);
                $T_ID = $row['T_ID'];
               
                $sql1 = "SELECT * FROM team WHERE T_ID = '$T_ID'";

                $result1 = mysqli_query(getDbConnection(), $sql1);
                if(mysqli_num_rows($result1) > 0){
                    
                    $row1 = mysqli_fetch_array($result1);

                    $C_ID = $row1['C_ID'];

                    $sql2 = "SELECT * FROM course WHERE C_ID = '$C_ID'";
                    $result2 = mysqli_query(getDbConnection(), $sql2);
                    if(mysqli_num_rows($result2) > 0){
                        $row2 = mysqli_fetch_array($result2);
                        $response=array("status"=>"success","message"=>"Data loaded successfully","data"=>$row,"data1"=>$row1,"data2"=>$row2);
                        echo json_encode($response);
                    }
                    else{
                        echo json_encode(array("status" => "failed", "message" => "Query3 Error"));
                    }
                    


                   
                }
                else{
                    echo json_encode(array("status" => "failed", "message" => "Query2 Error"));
                }
            }
            else{
                echo json_encode(array("status" => "failed", "message" => "Query1 Error but Database connected"));
            }
         }
}



function btn(){
    $R_ID =1;
    // $R_ID = $_SESSION['R_ID'];
  $btn = $_POST['btn'];
  $date = date("Y-m-d");

    $databaseconnection = getDbConnection();
    if($databaseconnection == null){
        $response=array("status"=>"failed","message"=>"Database connection failed");
        echo json_encode($response);
        
    }
    else{
        if($btn == "1"){
            $sql = "UPDATE request SET R_date = '$date',Reply = 'Accepted',replyORnot = '1' WHERE R_ID = '$R_ID'";
        }
        elseif($btn == "0"){
            $sql = "UPDATE request SET R_date = '$date',Reply = 'Rejected',replyORnot = '1' WHERE R_ID = '$R_ID'";
        }
        elseif($btn == "2"){
            $rply=$_POST['rply'];
            $sql = "UPDATE request SET R_date = '$date',Reply = '$rply',replyORnot = '1' WHERE R_ID = '$R_ID'";
        }
        else{
            echo json_encode(array("status" => "failed","message"=>"Button Error"));
        }

        $result = mysqli_query(getDbConnection(), $sql);
        if($result){
            echo json_encode(array("status" => "success","message"=>"update success"));
        }
        else{
            echo json_encode(array("status" => "failed","message"=>"Query Error but Database connected"));
        }


    }

}










?>