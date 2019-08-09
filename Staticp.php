<?php
/**
 * 
 * @authors yxq (you@example.org)
 * @date    2019-01-08 16:02:21
 * @version $Id$
 */
  /**
   * 
   */
  include_once 'server_mysql.php';
   class Staticp  
  {
  
    public $arrs = array('code' => 200);
    public $arrn = array('code' => 201,'data' => 'null'); 
    public $arre = array('code' => 202,'data'=>"error");
    public $arrni = array('code' => 203,'data' => 'null id');

    public $token="1ab66e59325257b60b971d4afa1505ce";  //md5("xops123456")
    // function __construct()
    // {
    //  # code...
    // }
  
   public static function searchid($tablename,$where){
        $sqlo="Select count(*) from $tablename where $where ";

      // echo $sqlo;
      $resultlo = mysqli_query($GLOBALS["con"] ,$sqlo);
      $rowlo=mysqli_fetch_row($resultlo);
      mysqli_free_result($resultlo);
      $rowcountlo=$rowlo[0];
   
    return $rowcountlo;
  }

  public static function searchru($select,$tablename,$if)
    {
      $sqlru="Select $select from $tablename where $if";
       // file_put_contents("log.txt",date("Y-m-d H:i:s").":"."sql语句:". " ".$sqlru."\n\n",FILE_APPEND);
      // echo 'r:'.$sqlru;
      $resultru=mysqli_query($GLOBALS["con"],$sqlru);
      $newru=array();
      
      while ($rowru=mysqli_fetch_assoc($resultru)) {
        $newru[]=$rowru;
      }

       mysqli_free_result($resultru);
      // echo json_encode($newru,JSON_UNESCAPED_UNICODE);
      return $newru;

    }

   

      public static function post2($url, $data){//file_get_content
       
     $postdata = http_build_query($data);
        $opts = array('http' => 
      array( 'method'  => 'POST','header'  => 'Content-type: application/x-www-form-urlencoded', 'content' => $postdata,'timeout' => 15 * 60 ) );
        $context = stream_context_create($opts);
        $result = file_get_contents($url, false, $context);
        return $result;
    }


}
