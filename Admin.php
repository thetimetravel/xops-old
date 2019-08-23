<?php
/**
 * 
 * @authors yxq (you@example.org)
 * @date    2019-06-04 10:21:28
 * @version $Id$
 */
 include_once 'server_mysql.php';    //加载数据库配置项
 include_once 'Staticp.php';          //sql语句和各种参数表
class Admin extends Staticp  {
    
    private $account;
    private $password;
    private $phone;
    private $sex;

    function __construct($account,$password,$phone,$sex){
    	$this->account=$account;
    	$this->password=$password;
    	$this->phone=$phone;
    	$this->sex=$sex;
        
    }

    function login(){
    	   $count=$this->searchid("`admin`","account='$this->account'");
    	   if($count==0) {
    	   	    $error_act=['code'=>301];
                echo json_encode($error_act,JSON_UNESCAPED_UNICODE);
    	   }else{
           $count_pwd=$this->searchid("`admin`","account='$this->account' and password='$this->password'");
           if($count_pwd<0){
           	 $error_pwd=['code'=>302];
           	 echo json_encode($error_pwd);
           }else{
           	echo json_encode($this->arrs);
           }
      
    	   }
}
   
   function add(){
           $num_add=$this->searchid("`admin`","account='$this->account'");
           if($num_add>0){
           	 $arr_account=["code"=>207,"data"=>"already"];
           echo json_encode($arr_account);
           }else{
           $num_add_ph=$this->searchid("`admin`","tel='$this->phone'");
           if($num_add_ph>0){
           	 $arr_ph=["code"=>208,"data"=>"tel"];
           	 echo  json_encode($arr_ph);
           }else{

   	       $date=Date("Y-m-d H:i:s");
           $sql_add="Insert into `admin` (account,password,tel,datetime,sex) values('$this->account','$this->password','$this->phone','$date','$this->sex')";
           $row_add=mysqli_query($GLOBALS['con'],$sql_add);
           // $sql_con="Update `config` set adurl=1 where id='1'";
           // $row_con=mysqli_query($GLOBALS['con'],$sql_con);
           if($row_add>0){
           	echo json_encode($this->arrs);
           }else{
             echo json_encode($this->arre);
           }
           }
       }
   }
    function add2(){
        $is_account=$this->searchid("admin","account='$this->account'");
      if($is_account>0){
        $show_error_ac=["code"=>301,"data"=>"account already"];
        die(json_encode($show_error_ac));
      }
      $is_tel=$this->searchid("admin","tel='$this->phone'");
      if($is_tel>0){
        $show_error_tel=["code"=>302,"data"=>"tel already"];
        die(json_encode($show_error_tel));
      }
      $date=Date("Y-m-d H:i:s");
      $sql_in="Insert into `admin`(account,password,tel,sex,datetime) values('$this->account','$this->password','$this->phone','$this->sex','$date')";
      // echo "sql：".$sql_in;
      $row_in=mysqli_query($GLOBALS['con'],$sql_in);
      // echo "string:".$row_in;
      $arr_account=$this->searchru("id","`admin`","account='$this->account'");
      $arr_ac=['code' => 200,"date"=>$date,"id"=>$arr_account[0]['id']];
      if($row_in>0){
        echo json_encode($arr_ac);
      }else{
        echo json_encode($this->arre);
      }
    }

      function search(){
      	$arr_all=$this->searchru("id,account,password","`admin`","amid!='-5'");
      	echo json_encode($arr_all);
      }

      function searchall(){
        $arr_all=$this->searchru("*","`admin`","id!=-1");
        $show_all=["code"=>200,"data"=>$arr_all];
        echo json_encode($show_all,JSON_UNESCAPED_UNICODE);
      }

      function del(){
      	$arr_del=explode(",", $this->account);
      	$y=0;
        // $arr_aa=[];
      	for ($i=0; $i < count($arr_del); $i++) { 
      	    $sql_del="Delete from `admin` where id='$arr_del[$i]'";
      	    $result_del=mysqli_query($GLOBALS['con'],$sql_del);
      	    $count_se= mysqli_affected_rows($GLOBALS['con']);
      	    if($count_se==0){
      	    	$y=1;
      	    }
             // $sql_ss="Select count(*) from `user`  where id<='$arr_del[$i]'";
             // $result_ss=mysqli_query($GLOBALS['con'],$sql_ss);
             // $row=mysqli_fetch_row($result_ss)[0];
             // $arr_aa[]=$row;
      	    
      	}
      	if($y==0){
           // $str_aa=implode(",",$arr_aa);          
           // $show_aa=["code"=>200,"data"=>$str_aa];
      		echo json_encode($this->arrs);
      	}else{
      		echo json_encode($this->arre);
      	}
      }


      function update(){
      	  $arr_up=explode(",",$this->account);
      $arr_peo=explode(",",$this->password);
      $arr_host=explode(",",$this->phone);
      $yi=0;
      // echo "U:".$this->account."--".$this->password."++".$this->phone;
      for($i=0;$i<count($arr_up);$i++){

        $value_up=trim(json_encode($arr_up[$i],JSON_UNESCAPED_UNICODE));
        $do_roomid=strpos($value_up, 'at');
        $do_peo=strpos($value_up, 'pd');
        $do_week=strpos($value_up, 'tel');
        $do_sex=strpos($value_up, 'sex');
       
        $domain="";
        $value="";
         // echo "DD:".$value_up;
         if($do_roomid!=""){
           $domain="account";
           $value=(int)substr($value_up,1,$do_roomid-1);

         }elseif ($do_peo) {
          $domain="password";
           $value=(int)substr($value_up,1,$do_peo-1);
         }elseif ($do_week!="") {
          $domain="tel";
           $value=(int)substr($value_up,1,$do_week-1);
         }
         elseif ($do_sex!="") {
          $domain="sex";
           $value=(int)substr($value_up,1,$do_sex-1);
         }
          --$value;
            $value_peo=json_encode($arr_peo[$i],JSON_UNESCAPED_UNICODE);

            $value_host=$arr_host[$value];
            // echo "KK:".$value_host." ".$value_peo."<h>";

        $sql_up="Update `admin` set $domain=$value_peo where id= '$value_host' ";
        $row_up=mysqli_query($GLOBALS['con'],$sql_up);
        if($row_up<0){
          $yi==1;
        }
        // echo $sql_up."<br></br><h>";
      }

      if($yi==0){
        echo json_encode($this->arrs);
      }else{
        echo json_encode($this->arre);
      }
      }

      function update2(){
          $arr_account=$this->account;
      $id_account=$this->password;

      for($i=0;$i<count($this->account);$i++){
        $account=json_encode($arr_account[$i]['account'],JSON_UNESCAPED_UNICODE);
        $password=json_encode($arr_account[$i]['password']);
        $sex=json_encode($arr_account[$i]['sex'],JSON_UNESCAPED_UNICODE);
        $tel=json_encode($arr_account[$i]['tel']);
       
        // echo "p:".$i." ".json_encode($this->account[$i]["account"],JSON_UNESCAPED_UNICODE)."\n";
        $sql_up="Update `admin` set account=$account,password=$password,sex=$sex,tel=$tel where id='$id_account[$i]'";
        $row_in=mysqli_query($GLOBALS['con'],$sql_up);
        // echo $sql_up."\n";

      }
      echo json_encode($this->arrs);
      
      }


      function searchat(){
      	echo "log";
      }

    function dao(){
         $this->account=json_decode($this->account,true);
        $password2=json_decode($this->password,true);
        $ret=[];
        $rete=[];
        $look=0;
        $arr_ac=[];
        $date=Date("Y-m-d H:i:s");
       
        // if($this->phone!="-1"){

        for ($i=0; $i <count($password2) ; $i++) { 
          // echo "Lp:".$i." ".($this->password);
          $username=json_encode($password2[$i]["account"],JSON_UNESCAPED_UNICODE);
          $password=json_encode($password2[$i]["password"]);
          $tel2=json_encode($password2[$i]["tel"]);
          // echo "tel2:".$this->phone."\n";
          $sex2=json_encode($password2[$i]["sex"],JSON_UNESCAPED_UNICODE);
        
          $num_user=$this->searchid("`admin`","account=$username");
          $num_tel=$this->searchid("`admin`","tel=$tel2");
        
           $yan=0;
          if($num_user>0){
            $ret[]=$i;
            // echo "g".$i."\n";
             $yan=1;
             // echo $this->phone
          }
          if ($num_tel>0) {
             $rete[]=$i;
            // echo "hh".$i."\n";
           $yan=1;
          }
         

          if($this->phone=='-1' &&  $yan==0){
          
          $sql_up="Insert into `admin`(account,password,tel,datetime,sex) values($username,$password,$tel2,'$date',$sex2)";
              // file_put_contents("log.txt",date("Y-m-d H:i:s").":"."sql_up2====:".$sql_up."\n\n",FILE_APPEND);
              $row_row=mysqli_query($GLOBALS['con'],$sql_up);
              $look=1;
              $arr_ac[]=$this->searchru("*","`admin`","account=$username");

          }
         
          
        }
        // file_put_contents("log.txt",date("Y-m-d H:i:s").":"."1=====================:"."\n\n",FILE_APPEND);
        if($look==0)
        echo json_encode($ret).":".json_encode($rete);
      else{
        $show_ac=["code"=>200,"data"=>$arr_ac];
         echo  json_encode($show_ac,JSON_UNESCAPED_UNICODE);
      }
    }

}