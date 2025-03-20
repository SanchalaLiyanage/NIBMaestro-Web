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

// When access is denied this will called to block the access
function accessDenied(){
    http_response_code(403);
    exit ('<h1 style="text-align: center; font-family: roboto; color: red; margin-top: 6%">Access Denied !</h1>');
}




// Load Content
function loadContent()
{
     
$index=$_POST['index'];
$course=$_POST['course'];
$batch=$_POST['batch'];
$rr=$_POST['rr'];


include '../../DataBase.php';
    $databaseconnection = getDbConnection();

    if ($databaseconnection == null) {
        return array("status" => "failed", "message" => "Database connection failed");
    } 
else{
    $cid=selectcid($course,$batch,$databaseconnection);
    // echo ("++++++++++++++".$cid."++++++++++++++");

if($rr==1)
{
    $sql = "SELECT 
    S_ID,
    S_Name,
    T_ID,
    S_Index,
    (SELECT SUM(marks) FROM viva_student WHERE S_ID =student.S_ID) AS inmark,
    (SELECT SUM(marks) FROM doc WHERE T_ID = student.T_ID) AS docmark,
    (SELECT SUM(marks) FROM viva_student WHERE S_ID = student.S_ID) + (SELECT SUM(marks) FROM doc WHERE T_ID = student.T_ID) AS Tot
FROM 
    student 
WHERE 
S_Index = '$index' AND C_ID= '$cid'";

}
if($rr==0)
{
    $sql = "SELECT 
    S_ID,
    S_Name,
    T_ID,
    S_Index,
    (SELECT SUM(marks) FROM viva_student WHERE S_ID =student.S_ID) AS inmark,
    (SELECT SUM(marks) FROM doc WHERE T_ID = student.T_ID) AS docmark,
    (SELECT SUM(marks) FROM viva_student WHERE S_ID = student.S_ID) + (SELECT SUM(marks) FROM doc WHERE T_ID = student.T_ID) AS Tot
FROM 
    student 
WHERE 
C_ID= '$cid'";
}

$result = mysqli_query($databaseconnection, $sql);

$team_data = array();

while ($row = mysqli_fetch_assoc($result)) {
    $team_data[] = $row;
   
}


// if (mysqli_num_rows($result) > 0) {
// $row = mysqli_fetch_assoc($result);
// echo("===============".$row."================");
// $TeamID = $row['T_ID'];
// $inmark = $row['inmark'];
// $docmark = $row['docmark'];

echo json_encode(array("status" => "success", "team_data" => $team_data));
// }
// else{
// $response=array("status"=>"failed","message"=>"No data found");
// }



}


}


function selectcid($course, $batch, $databaseconnection) {
    $sql = "SELECT C_ID FROM course WHERE Course = '$course' AND Batch = '$batch'";
    $result = mysqli_query($databaseconnection, $sql);
    if (mysqli_num_rows($result) > 0) {
        $row = mysqli_fetch_assoc($result);
        return $row['C_ID']; // Return only the C_ID value
    } else {
        return false; // Return false if no data found
    }
}

    

function singlestudentmark(){
    $index=$_POST['index'];
    $name=$_POST['name'];

    include '../../DataBase.php';
    $databaseconnection = getDbConnection();

    if ($databaseconnection == null) {
        return array("status" => "failed", "message" => "Database connection failed");
    } 
    else{
       
        }
}










