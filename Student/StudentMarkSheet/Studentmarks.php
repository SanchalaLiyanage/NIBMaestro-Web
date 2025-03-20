<?php



// Check how someone access the php file, if it's not POST method, Acces will be denied
if ($_SERVER['REQUEST_METHOD'] === 'POST'){
    if(isset($_POST['functionName'])){
        
        switch ($_POST['functionName']){  // Check which function is going to access
            case 'loadTeam':
                getStudentMarks();
                break;
                case 'loadindividual':
                getStudentindividualMarks();
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










function getStudentMarks()
{
 
    $T_ID=$_COOKIE['T_ID'];
    // $T_ID = 1;

    include '../../DataBase.php';
    $databaseconnection = getDbConnection();
    if ($databaseconnection == null) {
        $response = array("status" => "failed", "message" => "Database connection failed");
        echo json_encode($response);
        return;
    }

    $sql = "SELECT d.D_Name, d.marks, d.marks, d.comment, d.V_ID, vs.title
            FROM doc AS d
            JOIN viva_submission AS vs ON d.V_ID = vs.V_ID
            WHERE d.T_ID = '$T_ID'";

    $result = mysqli_query($databaseconnection, $sql);
    $team_data = array();
    while ($row = mysqli_fetch_assoc($result)) {
        $team_data[] = $row;
       
    }
    

    $sql1 = "SELECT d.V_ID, d.Doc FROM doc d WHERE d.T_ID = '$T_ID'";
    $result1 = mysqli_query($databaseconnection, $sql1);
    $team_doc = array();
    while ($row1 = mysqli_fetch_assoc($result1)) {
        // Check if the document data is not null
        if ($row1['Doc'] !== null) {
            // Base64 encode the document data
            $doc_data = base64_encode($row1['Doc']);
            $team_doc[] = array('V_ID' => $row1['V_ID'], 'Doc' => $doc_data);
        } else {
            // If the document data is null, handle it accordingly (e.g., set it to an empty string or handle as needed)
            $doc_data = ""; // Or any other suitable value or handling
            $team_doc[] = array('V_ID' => $row1['V_ID'], 'Doc' => $doc_data);
        }
    }
    

    mysqli_close($databaseconnection);

    header('Content-Type: application/json');
    echo json_encode(array("status" => "success", "team_data" => $team_data, "team_doc" => $team_doc));
}





// ---------------------------------------------------------------getStudent individual Marks()---------------------------------------------------------------

function getStudentindividualMarks()
{
  
    $S_ID=$_COOKIE['S_ID'];
    // $S_ID=1;
   

    include '../../DataBase.php';
    $databaseconnection = getDbConnection();
if($databaseconnection == null){
    $response=array("status"=>"failed","message"=>"Database connection failed");
    echo json_encode($response);
    
}
    $sql = "SELECT vs.*, v.title
    FROM viva_student AS vs
    JOIN viva_submission AS v ON vs.V_ID = v.V_ID
    WHERE vs.S_ID = '$S_ID'";
    
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



?>