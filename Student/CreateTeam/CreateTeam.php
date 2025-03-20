<?php
// Check how someone accesses the PHP file, if it's not via the POST method, access will be denied
if ($_SERVER['REQUEST_METHOD'] === 'POST'){
    if(isset($_POST['functionname'])){
        
        switch ($_POST['functionname']){  // Check which function is going to be accessed
     
                case 'loadcombobox':
                    // Call the submit function
                    loadcombobox();
                    break;
                    case 'addteam':
                        // Call the submit function
                        addteam();
                        break;
                        case 'viewteam':
                            // Call the submit function
                            viewteam();
                            break;
                            case 'team':
                               
                                team();
                                break;
                                case 'lecturer':
                                    // Call the submit function
                                    lecturer();
                                    break;
                                    case 'team1':
                               
                                        team1();
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
    echo("==============Accesdenid====================");
    http_response_code(403);
    exit ('<h1 style="text-align: center; font-family: roboto; color: red; margin-top: 6%">Access Denied !</h1>');
}

// ===========================================team============================
function team(){ // check for the login credentials in database


    // $tid=$_COOKIE['T_ID'];
    $tid="";
    
        header('Content-Type: application/json');
        $json_data = json_encode($tid);
        echo $json_data;

    
        

   
    
    }

// ===========================================team1============================
function team1(){ 
    $tid=$_COOKIE['T_ID'];
    include '../../DataBase.php';   
    $con = getDbConnection();
    if($con == null){
        $response=array("status"=>"failed","message"=>"Database connection failed");
        echo json_encode($response);
        
    }
    else{
        $sql = "SELECT * FROM team WHERE T_ID='$tid'";
       
        $result = $con->query($sql);
        if ($result->num_rows > 0) {
            $data=array();
            // echo("==============Data found====================");
            while($row = $result->fetch_assoc()) {
                $data[]=$row;
            }

            echo json_encode(array("status" => "success", "message" => "Data found", "data" => $data));

        }
        else {
            $response=array("status"=>"failed","message"=>"No data found");
            echo json_encode($response);
        }

        $con->close();

    }
}



// ===========================================load combo box============================


function loadcombobox()
{


    // $course=$_COOKIE['C_ID'];
    $course=1;


    include '../../DataBase.php';
    $con = getDbConnection();
    if($con == null){
        $response=array("status"=>"failed","message"=>"Database connection failed");
        echo json_encode($response);
        
    }
    else{
        $sql = "SELECT S_Index FROM student WHERE C_ID='$course'";
        $result = $con->query($sql);
        if ($result->num_rows > 0) {
            $response=array();
            // echo("==============Data found====================");
            while($row = $result->fetch_assoc()) {
                $response[]=$row;
            }
         
          

            echo json_encode(array("status" => "success", "message" => "Data found", "index" => $response));
        } 
        else {
            $response=array("status"=>"failed","message"=>"No data found");
            echo json_encode($response);
        }

        $con->close();
    }
}

// ===========================================add team============================


function addteam()
{
    $member1=$_POST['member1'];
    $member2=$_POST['member2'];
    $member3=$_POST['member3'];
    $member4=$_POST['member4'];
    $member5=$_POST['member5'];
    $teamname=$_POST['teamname'];
    // $cid-$_COOKIE['C_ID'];
    $cid=1;

    include '../../DataBase.php';
    $con = getDbConnection();
    if($con == null){
        $response=array("status"=>"failed","message"=>"Database connection failed");
        echo json_encode($response);
        
    }
else{

$sql1= "INSERT INTO team(T_Name)values('$teamname')";
if ($con->query($sql1) === TRUE) {
    $sql2 = "SELECT T_ID FROM team WHERE T_Name='$teamname'";
    $result = $con->query($sql2);
            if ($result->num_rows > 0) {
                while($row = $result->fetch_assoc()) {
                    $tid=$row['T_ID'];
                }
                $sql = "UPDATE student SET T_ID = '$tid' WHERE 
        (S_Index = '$member1' OR S_Index = '$member2' OR S_Index = '$member3' OR S_Index = '$member4' OR S_Index = '$member5')
        AND C_ID = '$cid'";
if ($con->query($sql) === TRUE) {
//set cookies
                        $cookie_name = "T_ID";
                        $cookie_value = $tid;
                        setcookie($cookie_name, $cookie_value, time() + (86400 * 30), "/"); // 86400 = 1 day


                        $response=array("status"=>"success","message"=>"New record created successfully");
                        echo json_encode($response);
                    } else {
                        $response=array("status"=>"failed","message"=>"Error SQL: " . $sql . "<br>" . $con->error);
                        echo json_encode($response);
                    }
            
                    $con->close();
           
            }
            else {
                $response=array("status"=>"failed","message"=>"Error SQL2: " . $sql2 . "<br>" . $con->error);
                echo json_encode($response);
            }
   
} else {
    $response=array("status"=>"failed","message"=>"Error SQL1: " . $sql1 . "<br>" . $con->error);
    echo json_encode($response);

}


}
}



// ===========================================view team============================



function  viewteam(){


    $tid=$_COOKIE['T_ID'];
    // $tid=1;
    
        include '../../DataBase.php';
        $con = getDbConnection();
        if($con == null){
            $response=array("status"=>"failed","message"=>"Database connection failed");
            echo json_encode($response);
            
        }
        else{
            $sql = "SELECT * FROM student WHERE T_ID='$tid'";
            $result = $con->query($sql);
            if ($result->num_rows > 0) {
                $data=array();
                // echo("==============Data found====================");
                while($row = $result->fetch_assoc()) {
                    $data[]=$row;
                }

                echo json_encode(array("status" => "success", "message" => "Data found", "data" => $data));

            }
            else {
                $response=array("status"=>"failed","message"=>"No data found");
                echo json_encode($response);
            }
        }
    
                    



}

//========================================================lecturer request==================================== 


function lecturer()
{
    $tid=$_COOKIE['T_ID'];
    $lec=$_POST['lec'];


    include '../../DataBase.php';
    $con = getDbConnection();
    if($con == null){
        $response=array("status"=>"failed","message"=>"Database connection failed");
        echo json_encode($response);
        
    }
else{

    $sql = "UPDATE team SET L_ID = '$lec', states = '1' WHERE T_ID = '$tid'";

if ($con->query($sql) === TRUE) {
    $response=array("status"=>"success","message"=>"New record created successfully");
    echo json_encode($response);
} else {
    $response=array("status"=>"failed","message"=>"Error: " . $sql . "<br>" . $con->error);
    echo json_encode($response);

}

}


}



?>