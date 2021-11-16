<?php
    session_start();
    
    if(!$_SESSION['authorized']) {
        header('Location: login.php');
    }
    
    if($_SERVER['REQUEST_METHOD'] === 'POST') {
        if(isset($_POST['action']) && $_POST['action'] === "utility") {
            try {
                $state = $_POST['state'];
            
                $db = connect();
            
                $query = "SELECT utility FROM rebates WHERE state=:state GROUP BY utility";
                $stmt = $db->prepare($query);
                $stmt->bindParam(":state", $state);
                $stmt->execute();
                $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
            
            } catch(PDOException $e) {
                echo 'Connection failed: ' . $e->getMessage();
            }
        
            echo json_encode($result);
        }
        else if(isset($_POST['action']) && $_POST['action'] === "type") {
            try {
                $state = $_POST['state'];
                $utility = $_POST['utility'];
            
                $db = connect();
            
                $query = "SELECT rebate_style FROM rebates WHERE state=:state AND utility=:utility GROUP BY rebate_style";
                $stmt = $db->prepare($query);
                $stmt->bindParam(":state", $state);
                $stmt->bindParam(":utility", $utility);
                $stmt->execute();
                $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
            
            } catch(PDOException $e) {
                echo 'Connection failed: ' . $e->getMessage();
            }
        
            echo json_encode($result);
        }
        else if(isset($_POST['action']) && $_POST['action'] === "submit") {
            
            try {
                $state = $_POST['state'];
                $utility = $_POST['utility'];
                if(isset($_POST['style']) && !empty($_POST['style']) && $_POST['style'] !== "Choose Rebate Style")
                    $style = $_POST['style'];

                $db = connect();
                
                if(isset($style))
                    $query = "SELECT solutions_code,tech,location,type,category1,category2,existing_type,existing_wattage_low,existing_wattage_high,wattage_low,wattage_high,rebate,certification,other FROM rebates WHERE state=:state AND utility=:utility AND rebate_style=:style";
                else
                    $query = "SELECT solutions_code,tech,location,type,category1,category2,existing_type,existing_wattage_low,existing_wattage_high,wattage_low,wattage_high,rebate,certification,other FROM rebates WHERE state=:state AND utility=:utility";
                
                $stmt = $db->prepare($query);
                $stmt->bindParam(":state", $state);
                $stmt->bindParam(":utility", $utility);
                if(isset($style))
                    {$stmt->bindParam(":style", $style);}
                $stmt->execute();
                $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
            } catch(PDOException $e) {
                echo 'Connection failed: ' . $e->getMessage();
            }
            echo json_encode($result);
        }
        
    }
    
    function connect() {
        try {
            $dbh = new PDO('mysql:host=127.0.0.1;dbname=usglincc_rebate', "usglincc_dlclght", "UsglUsglUsgl1!");
            return $dbh;
        } catch (PDOException $e) {
            echo "Error!: " . $e->getMessage() . "<br/>";
        }
    }
    
?>