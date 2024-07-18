<?php
header("Access-Control-Allow-Origin: http://localhost:3000"); 
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

require_once 'DAL.php';
$dal = new DAL();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $profileImage = "";

    if (isset($_FILES["fileToUpload"]) && $_FILES["fileToUpload"]["error"] === UPLOAD_ERR_OK) {
        $profileImage = handleFileUpload();
        if ($profileImage === false) {
            $profileImage = ""; 
        }
    }
    
    if (isset($_POST['create'])) {
        $dal->createStudent($_POST['name'], $_POST['age'], $_POST['email'], $profileImage);
    } elseif (isset($_POST['update'])) {
        $dal->updateStudent($_POST['id'], $_POST['name'], $_POST['age'], $_POST['email'], $profileImage);
    } elseif (isset($_POST['delete'])) {
        $dal->deleteStudent($_POST['id']);
    }
}


$students = $dal->getStudents();
echo json_encode($students);

function handleFileUpload() {
    $targetDir = "uploads/";
    $targetFile = $targetDir . basename($_FILES["fileToUpload"]["name"]);
    $uploadOk = 1;
    $imageFileType = strtolower(pathinfo($targetFile, PATHINFO_EXTENSION));

   
    $check = getimagesize($_FILES["fileToUpload"]["tmp_name"]);
    if ($check === false) {
        echo json_encode(["error" => "File is not an image."]);
        $uploadOk = 0;
    }


    if ($_FILES["fileToUpload"]["size"] > 5000000) {
        echo json_encode(["error" => "File is too large."]);
        $uploadOk = 0;
    }

    // Allow certain file formats
    if ($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg" && $imageFileType != "gif") {
        echo json_encode(["error" => "Only JPG, JPEG, PNG & GIF files are allowed."]);
        $uploadOk = 0;
    }

    // Check if $uploadOk is set to 0 by an error
    if ($uploadOk == 0) {
        echo json_encode(["error" => "Your file was not uploaded."]);
        return false;
    } else {
        if (move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $targetFile)) {
            return basename($_FILES["fileToUpload"]["name"]);
        } else {
            echo json_encode(["error" => "There was an error uploading your file."]);
            return false;
        }
    }
}
?>
