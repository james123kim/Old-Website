<?php
    session_start();
    
    if(!$_SESSION['authorized']) 
        header('Location: login.php');

    function connect() {
        try {
            $dbh = new PDO('mysql:host=127.0.0.1;dbname=usglincc_rebate', "usglincc_dlclght", "UsglUsglUsgl1!");
            return $dbh;
        } catch (PDOException $e) {
            echo "Error!: " . $e->getMessage() . "<br/>";
        }
    }
    
    $db=connect();
    $query = "SELECT state FROM rebates GROUP BY state";
    $stmt = $db->prepare($query);
    $stmt -> execute();
    $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
?>
<!DOCTYPE html>
<html>
    <head>
         <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/foundation/5.5.2/css/foundation.min.css" type="text/css" media="screen">
         <link rel="stylesheet" href="theme.css" type="text/css" media="screen">
         <title>Rebates</title>
         <script type="text/javascript" src="http://code.jquery.com/jquery-2.1.4.min.js"></script>
    </head>
    <body>
        <div class="large-12 large-centered columns">
            <div class="row spacer">
            </div>
            <div class="large-9 large-centered columns selector">
                <div class="row">
                    <div class="large-3 columns">
                        <span class="descriptor"> Available Utility Rebates </span>
                    </div>
                    <div class="large-9 columns">
                        <img src="http://static.wixstatic.com/media/b9932d_badcb7f4a8224bdb9db207d08f518a81.png_srz_p_172_44_75_22_0.50_1.20_0.00_png_srz" height="200px" width="800px">
                    </div>
                </div>
                <div class="row">
                    <div class="large-12 columns">
                        <p class="description">
                            Choose your state, utility, rebate type, and types of products below to view rebates
                            available for USGL products in your area.
                        </p>
                    </div>
             <!--       <div class="large-4 columns">
                    <a href="" class="button expand">Click to Request Rebate Flyer</a>     
                    </div>  -->  
                </div>
                <div class="row">
                    <ul class="inline-list">
                        <li><div id="on">rebate</div></li>
                        <li><a href="products.php"><div>product</div></a></li>
                    </ul>
                </div>
                <hr>
                <div class="row">
                    <form id="rebate_form">
                        <div class="row">
                            <div class="large-4 columns">    
                                <select id="select_state_rebate" class="small">
                                    <option>Choose State</option>
                                    <?php
                                     foreach($results as $state) {
                                         echo "<option value=".$state['state'].">".$state['state']."</option>";}
                                     ?>


                                </select>
                            </div>
                            <div class="large-4 columns">    
                                <select id="select_utility_rebate" class="small" disabled=true>
                                    <option>Choose Utility</option>
                                </select>
                            </div>
                            <div class="large-4 columns">    
                                <select id="select_style_rebate" class="small" disabled=true>
                                    <option>Choose Rebate Style</option>
                                </select>
                            </div>
                        </div>
<!--
                        <div class="row">
                            <div class="large-7 large-centered columns">
                                <input id="checkbox1" type="checkbox"><label for="checkbox1">Outdoor Fixture</label>
                                <input id="checkbox2" type="checkbox"><label for="checkbox1">Indoor Fixture</label>
                                <input id="checkbox3" type="checkbox"><label for="checkbox1">Lamps</label>
                                <input id="checkbox4" type="checkbox"><label for="checkbox1">Light Sources</label>
                                <input id="checkbox5" type="checkbox" checked><label for="checkbox1">All</label>
                            </div>
                        </div>
-->
                        <div class="row">
                            <div class="large-3 large-centered columns">
                                <input id="rebate_submit" type="submit" class="button small success" value="Submit" disabled=true/>
                                <input id="rebate_reset" type="reset" class="button small alert" value="Reset" />
                            </div>
                        </div>
                    </form>
                </div>
                <hr>
                <div class="row">
                    <div class="large-12 columns">
                        <table id="result_table" width="100%" hidden=true>
                            <thead>
                                <tr>
                                    <td class="header">Technology</td>
                                    <td class="header">Category</td>
                                    <td class="header" width="260">Existing Lighting</td>
                                    <td class="header">Existing Wattage</td>
                                    <td class="header">Wattage</td>
                                    <td class="header">Incentive</td>
                                    <td class="header">Required Certification</td>
                                    <td class="header" width="110">Code</td>
                                    <td class="header">Other</td>
                                </tr>
                            </thead>
                            <tr>
                                <td colspan="12">
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>  
        </div>
        <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/foundation/5.5.2/js/foundation.min.js"></script>
        <script type="text/javascript" src="rebate.js"></script>
    </body>
</html>