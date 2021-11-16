<?php
    if(true) {
        error_reporting(E_ALL);
        ini_set("display_errors", 1);
    }
    
    require 'password.php';
    session_start();
    
    if($_SERVER['REQUEST_METHOD'] === 'POST') {
        
        try {
            $db = connect();
            $query = "SELECT password FROM users WHERE username=:user";
            $stmt = $db->prepare($query); 
            $stmt->bindParam(":user", $_POST['username']);
            $stmt->execute();
            $result = $stmt->fetchColumn();
        } catch (PDOException $e) {
            echo 'Connection failed: ' . $e->getMessage();
            exit;
        }
        
        if(password_verify($_POST['password'], $result)) {
            header('Location: rebates.php');
            $_SESSION['authorized'] = true;
        }
        else
            $error = "Error logging in";
    }
    
    function connect() {
        try {
            $dbh = new PDO('mysql:host=127.0.0.1;dbname=usglincc_rebate', "usglincc_dlclght", "UsglUsglUsgl1!");
            return $dbh;
        } catch (PDOException $e) {
            print "Error!: " . $e->getMessage() . "<br/>";
            die();
        }
    }
?>
<!DOCTYPE html>
<html>
    <head>
         <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/foundation/5.5.2/css/foundation.min.css" type="text/css" media="screen">
         <link rel="stylesheet" href="theme.css" type="text/css" media="screen">
         <title>Login</title>
         <script type="text/javascript" src="http://code.jquery.com/jquery-2.1.4.min.js"></script>
    </head>
    <body>
        <div class="large-3 large-centered columns">
            <div class="login-box">
                <div class="row">
                    <div class="large-12 columns">
                        <form action="" method="post">
                            <div class="row">
                                <div class="large-12 columns">
                                    <input type="text" name="username" placeholder="Username" />
                                </div>
                            </div>
                            <div class="row">
                                <div class="large-12 columns">
                                    <input type="password" name="password" placeholder="Password" />
                                </div>
                            </div>
                            <div class="row">
                                <div class="large-12 large-centered columns">
                                    <input type="submit" class="button expand login" value="Log In"/>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <?php 
                    if(isset($error))
                        echo "<h4 class=\"alert\">Incorrect username or password</h4>";
                ?>
            </div>
        </div>
        <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/foundation/5.5.2/js/foundation.min.js"></script>
    </body>
</html>