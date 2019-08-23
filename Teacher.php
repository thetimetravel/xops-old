<?php
/**
 * 
 * @authors yxq (you@example.org)
 * @date    2019-08-04 03:18:10
 * @version $Id$
 */

include_once 'server_mysql.php';    //加载数据库配置项
 include_once 'Staticp.php';          //sql语句和各种参数表
class Teacher  extends Staticp {

	private $account;
    private $password;
    private $tel;
    private $sex;
    private $ac_id;
    private $duty;

    
    function __construct($account,$password,$tel,$sex,$ac_id,$duty){
    		$this->account=$account;
    		$this->password=$password;
    		$this->tel=$tel;
    		$this->sex=$sex;
    		$this->ac_id=$ac_id;
    		$this->duty=$duty;

        
    }

    function search(){
    	$arr_se=$this->searchru("*","`teacher`",'id!=-1');
    	$show_all=["code"=>200,"data"=>$arr_se];
    	echo json_encode($show_all,JSON_UNESCAPED_UNICODE);
    }

    function add(){
    	$is_account=$this->searchid("teacher","account='$this->account'");
    	if($is_account>0){
    		$show_error_ac=["code"=>301,"data"=>"account already"];
    		die(json_encode($show_error_ac));
    	}
    	$is_tel=$this->searchid("teacher","tel='$this->tel'");
    	if($is_tel>0){
    		$show_error_tel=["code"=>302,"data"=>"tel already"];
    		die(json_encode($show_error_tel));
    	}
    	$date=Date("Y-m-d H:i:s");
    	$sql_in="Insert into `teacher`(account,password,tel,sex,time,ac_id,duty) values('$this->account','$this->password','$this->tel','$this->sex','$date','$this->ac_id','$this->duty')";
    	// echo "sql：".$sql_in;
    	$row_in=mysqli_query($GLOBALS['con'],$sql_in);
    	// echo "string:".$row_in;
    	$arr_account=$this->searchru("id","`teacher`","account='$this->account'");
    	$arr_ac=['code' => 200,"date"=>$date,"id"=>$arr_account[0]['id']];
    	if($row_in>0){
    		echo json_encode($arr_ac);
    	}else{
    		echo json_encode($this->arre);
    	}
    }



    function del(){
            $arr_del=explode(",", $this->account);
        $y=0;
        for ($i=0; $i < count($arr_del); $i++) { 
            $sql_del="Delete from `teacher` where id='$arr_del[$i]'";
            $result_del=mysqli_query($GLOBALS['con'],$sql_del);
            $count_se= mysqli_affected_rows($GLOBALS['con']);
            if($count_se<0){
                $y=1;
            }
     
            
        }
        if($y==0){
            echo json_encode($this->arrs);
        }else{
            echo json_encode($this->arre);
        }
    }

    function dao(){
         $this->account=json_decode($this->account,true);
        $password2=json_decode($this->password,true);
        $ret=[];
        $rete=[];
        $rete3=[];
        $date=Date("Y-m-d H:i:s");
        $look=0;
        $arr_ac=[];
       
        // if($this->phone!="-1"){

        for ($i=0; $i <count($password2) ; $i++) { 
          $username=json_encode($password2[$i]["account"],JSON_UNESCAPED_UNICODE);
          $password=json_encode($password2[$i]["password"]);
          $tel2=json_encode($password2[$i]["tel"]);
          $sex2=json_encode($password2[$i]["sex"],JSON_UNESCAPED_UNICODE);
          $ac_id=json_encode($password2[$i]["ac_id"],JSON_UNESCAPED_UNICODE);
          $duty=json_encode($password2[$i]["duty"],JSON_UNESCAPED_UNICODE);
          $num_user=$this->searchid("`teacher`","account=$username");
          $num_tel=$this->searchid("`teacher`","tel=$tel2");
          $num_ac_id=$this->searchid("`teacher`","ac_id=$ac_id");
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
          if ($num_ac_id>0) {
             $rete3[]=$i;
            // echo "hh".$i."\n";
           $yan=1;
          }

          if($this->tel=='-1' &&  $yan==0){
          
             $sql_up="Insert into `teacher`(account,password,tel,time,sex,ac_id,duty) values($username,$password,$tel2,'$date',$sex2,$ac_id,$duty)";
              file_put_contents("log.txt",date("Y-m-d H:i:s").":"."sql_up3====:".$sql_up."\n\n",FILE_APPEND);
              $row_row=mysqli_query($GLOBALS['con'],$sql_up);
              $look=1;
              $arr_ac[]=$this->searchru("*","`teacher`","account=$username");

          }
         
          
        }
        // file_put_contents("log.txt",date("Y-m-d H:i:s").":"."1=====================:"."\n\n",FILE_APPEND);
          if($look==0)
        echo json_encode($ret).":".json_encode($rete).":".json_encode($rete3);
      else{
         $show_ac=["code"=>200,"data"=>$arr_ac];
         echo  json_encode($show_ac,JSON_UNESCAPED_UNICODE);
      }
    }

   

    function update(){
   
      $arr_account=$this->account;
      $id_account=$this->password;

      for($i=0;$i<count($this->account);$i++){
        $account=json_encode($arr_account[$i]['account'],JSON_UNESCAPED_UNICODE);
        $password=json_encode($arr_account[$i]['password']);
        $sex=json_encode($arr_account[$i]['sex'],JSON_UNESCAPED_UNICODE);
        $tel=json_encode($arr_account[$i]['tel']);
        $ac_id=json_encode($arr_account[$i]['ac_id'].JSON_UNESCAPED_UNICODE);
        $duty=json_encode($arr_account[$i]['duty'],JSON_UNESCAPED_UNICODE);
        // echo "p:".$i." ".json_encode($this->account[$i]["account"],JSON_UNESCAPED_UNICODE)."\n";
        $sql_up="Update `teacher` set account=$account,password=$password,sex=$sex,tel=$tel,ac_id=$ac_id,duty=$duty where id='$id_account[$i]'";
        $row_in=mysqli_query($GLOBALS['con'],$sql_up);
        // echo $sql_up."\n";

      }
      echo json_encode($this->arrs);
      
      // echo gettype($this->account)." : ".count($this->account);
      //  echo gettype($this->password)." : ".count($this->password);
    }
}