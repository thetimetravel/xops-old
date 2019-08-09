<?php
/**
 * 
 * @authors yxq (you@example.org)
 * @date    2019-06-04 10:21:28
 * @version $Id$
 */
 include_once 'server_mysql.php';    //加载数据库配置项
 include_once 'Staticp.php';          //sql语句和各种参数表
class User extends Staticp  {
    
    private $account;
    private $password;
    private $phone;
    private $curr;
    private $nums;

    function __construct($account,$password,$phone,$curr,$nums){
    	$this->account=$account;
    	$this->password=$password;
    	$this->phone=$phone;
      $this->curr=$curr;
      $this->nums=$nums;
        
    }

    function login(){
    	   $count=$this->searchid("`admin`","account='$this->account'");
    	   if($count==0) {
    	   	    $error_act=['code'=>301];
                echo json_encode($error_act,JSON_UNESCAPED_UNICODE);
    	   }else{
           $count_pwd=$this->searchid("`admin`","account='$this->account' and password='$this->password'");
           if($count_pwd==0){
           	 $error_pwd=['code'=>302];
           	 echo json_encode($error_pwd);
           }else{
           $arr_id=$this->searchru("id","`admin`","account='$this->account'");
           $show_id=["code"=>200,"data"=>$arr_id[0]["id"]];
           	echo json_encode($show_id);
           }
      
    	   }
}
   
   function add(){
           $num_add=$this->searchid("`user`","account='$this->account'");
           if($num_add>0){
           	 $arr_account=["code"=>207,"data"=>"already"];
           echo json_encode($arr_account);
           }else{
           $num_add_ph=$this->searchid("`user`","tel='$this->phone'");
           if($num_add_ph>0){
           	 $arr_ph=["code"=>208,"data"=>"tel"];
           	 echo  json_encode($arr_ph);
           }else{

   	       $date=Date("Y-m-d H:i:s");
           $sql_add="Insert into `user` (account,password,tel,datetime) values('$this->account','$this->password','$this->phone','$date')";
           $row_add=mysqli_query($GLOBALS['con'],$sql_add);
           $arr_account=$this->searchru("id","`user`","account='$this->account'");
           if($row_add>0){
            $arr_s=['code' => 200,"date"=>$date,"id"=>$arr_account[0]['id']];
           	echo json_encode($arr_s);
           }else{
             echo json_encode($this->arre);
           }
           }
       }
   }

      function search(){
        $zq=($this->curr-1)*$this->nums;
        $this->nums++;
        // echo "zq:".$this->curr." ".$this->nums."\n";
        // $arr_ll=$this->searchid("user_copy","id!=-1");
      	$arr_all=$this->searchru("*","`user`","id!='-5'  ");
        $date=Date("Y:m:d h:m:s");
        // echo "ty:".gettype($arr_ll)." ".$arr_ll."\n";
        // for($i=0;$i<100000;$i){
          // $sql_in="INSERT into `user_copy`(account,password,tel,datetime) values('dd','dsf','df','$date')";
         // $row_in=mysqli_query($GLOBALS['con'],$sql_in);
        // }
         
         // echo $sql_in."\n";
        // $arr_true=["status"=>0,"hint"=>"","total"=>35,"data"=>$arr_all];
      
          $arr_true=["code"=>0,"count"=> count($arr_all),"data"=>$arr_all];
             // file_put_contents("log.txt",date("Y-m-d H:i:s").":".":arr_all:".json_encode($arr_true)."\n\n",FILE_APPEND);
      	echo json_encode($arr_true);
      }

      function del(){
      	$arr_del=explode(",", $this->account);
      	$y=0;
        // $arr_aa=[];
      	for ($i=0; $i < count($arr_del); $i++) { 
      	    $sql_del="Delete from `user` where id='$arr_del[$i]'";
      	    $result_del=mysqli_query($GLOBALS['con'],$sql_del);
      	    $count_se= mysqli_affected_rows($GLOBALS['con']);
      	    if($count_se<0){
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
      //   $arr_up=explode(",",$this->account);
      // $arr_peo=explode(",",$this->password);
      // $arr_host=explode(",",$this->phone);
      // $yi=0;
      // // echo "U:".$this->roomid."--".$this->people."--".$this->hostid;
      // for($i=0;$i<count($arr_up);$i++){

      //   $value_up=trim(json_encode($arr_up[$i],JSON_UNESCAPED_UNICODE));
      //   $do_roomid=strpos($value_up, 'at');
      //   $do_peo=strpos($value_up, 'pd');
      //   $do_week=strpos($value_up, 'tel');
       
      //   $domain="";
      //   $value="";
        
      //    if($do_roomid!=""){
      //      $domain="account";
      //      $value=(int)substr($value_up,1,$do_roomid-1);

      //    }elseif ($do_peo) {
      //     $domain="password";
      //      $value=(int)substr($value_up,1,$do_peo-1);
      //    }elseif ($do_week!="") {
      //     $domain="tel";
      //      $value=(int)substr($value_up,1,$do_week-1);
      //    }
      //     --$value;
      //       $value_peo=json_encode($arr_peo[$i],JSON_UNESCAPED_UNICODE);
      //       $value_host=$arr_host[$value];

      //   $sql_up="Update `user` set $domain=$value_peo where id= '$value_host' ";
      //   $row_up=mysqli_query($GLOBALS['con'],$sql_up);
      //   if($row_up<0){
      //     $yi==1;
      //   }
        
      // }

      // if($yi==0){
      //   echo json_encode($this->arrs);
      // }else{
      //   echo json_encode($this->arre);
      // }
      
      if($this->password=="account" || $this->password=="tel"){
        $arr_account=$this->searchid("`user`","$this->password='$this->phone'");
        if($arr_account>0){
          $show_erroe_al=["code"=>202];
           die(json_encode($show_erroe_al));
        }
        // echo "p1:".$this->account." ".$this->password." ".$this->phone." ".$arr_account;
      }
         $sql_up="Update `user` set $this->password='$this->phone' where account='$this->account'";
         $row_up=mysqli_query($GLOBALS['con'],$sql_up);
         if($row_up>0){
          echo json_encode($this->arrs);
         }else{
          echo json_encode($this->arre);
         }

         // echo $sql_up;
      }

      function dao(){
        $this->account=json_decode($this->account,true);
        $password2=json_decode($this->password,true);
        $ret=[];
        $rete=[];
        $date=Date("Y-m-d H:i:s");
       
        // if($this->phone!="-1"){

        for ($i=0; $i <count($password2) ; $i++) { 
          $username=json_encode($password2[$i]["account"],JSON_UNESCAPED_UNICODE);
          $password=json_encode($password2[$i]["password"]);
          $tel=json_encode($password2[$i]["tel"]);
          $num_user=$this->searchid("`user`","account=$username");
          $num_tel=$this->searchid("`user`","tel=$tel");
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
          
             $sql_up="Insert into `user`(account,password,tel,datetime) values($username,$password,$tel,'$date')";
              file_put_contents("log.txt",date("Y-m-d H:i:s").":"."sql_up====:".$sql_up."\n\n",FILE_APPEND);
              $row_row=mysqli_query($GLOBALS['con'],$sql_up);
          }
         
          
        }
        file_put_contents("log.txt",date("Y-m-d H:i:s").":"."=====================:"."\n\n",FILE_APPEND);
        echo json_encode($ret).":".json_encode($rete).":".gettype($this->phone)." =". $this->phone;
      // }else{
      //   echo "[]2:".gettype($this->phone)."\n";
        
      // }
      }
}