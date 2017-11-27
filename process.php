<?php
    $to = "lolcano12@live.co.uk";
    // $from = $_REQUEST['email'];
    $from = "donotreply@adelaideconcepttiling.com.au";
    $firstname = $_REQUEST['firstName'];
    $lastname = $_REQUEST['lastName'];
    $fullName = "".$firstname." ".$lastname;
    $headers = "From: $from";
    $subject = "Message from Adelaide Concept Tiling Website: ".$fullName;
    $fields = array();
    $fields{"firstName"} = "First Name";
    $fields{"lastName"} = "Surname";
    $fields{"email"} = "Email";
    $fields{"phone"} = "Phone";
    $fields{"message"} = "Message";
    $body = "Here is what was sent:\n\n"; foreach($fields as $a => $b){   $body .= sprintf("%s: %s\n",$b,$_REQUEST[$a]); }
    $send = mail($to, $subject, $body, $headers);
?>
