<?php
/**
 * 
 * @authors yxq (you@example.org)
 * @date    2019-06-26 10:11:13
 * @version $Id$
 */
 include_once 'server_mysql.php';    //加载数据库配置项
 include_once 'Staticp.php'; 
class Schedule extends  Staticp{
	private $roomid;
	private $people;
	private $week;
	private $day;
	private $start;
	private $end;
	private $activity;
	private $hostid;
    
    function __construct($roomid,$people,$week,$day,$start,$end,$activity,$hostid){
        $this->roomid=$roomid;
        $this->people=$people;
        $this->week=$week;
        $this->day=$day;
        $this->start=$start;
        $this->end=$end;
        $this->activity=$activity;
        $this->hostid=$hostid;

    }

    function update(){
    	$arr_up=explode(",",$this->roomid);
    	$arr_peo=explode(",",$this->people);
    	$arr_host=explode(",",$this->hostid);
    	$yi=0;
    	// echo "U:".$this->roomid."--".$this->people."--".$this->hostid;
    	for($i=0;$i<count($arr_up);$i++){

    		$value_up=trim(json_encode($arr_up[$i],JSON_UNESCAPED_UNICODE));
    		$do_roomid=strpos($value_up, 'rmid');
    		$do_peo=strpos($value_up, 'peo');
    		$do_week=strpos($value_up, 'week');
    		$do_day=strpos($value_up, 'day');
    		$do_start=strpos($value_up, 'start');
    		$do_end=strpos($value_up, 'end');
    		$do_at=strpos($value_up, 'at');
    		$do_host=strpos($value_up, 'host');
    		$domain="";
    		$value="";
    		
    	   if($do_roomid!=""){
           $domain="roomid";
           $value=(int)substr($value_up,1,$do_roomid-1);

    	   }elseif ($do_peo) {
    	   	$domain="people";
    	   	 $value=(int)substr($value_up,1,$do_peo-1);
    	   }elseif ($do_week!="") {
    	   	$domain="week";
    	   	 $value=(int)substr($value_up,1,$do_week-1);
    	   }elseif ($do_day!="") {
    	   	$domain="day";
    	   	 $value=(int)substr($value_up,1,$do_day-1);
    	   }elseif ($do_start!="") {
    	   	$domain="start";
    	   	 $value=(int)substr($value_up,1,$do_start-1);
    	   }elseif ($do_end!="") {
    	   	 $value=(int)substr($value_up,1,$do_end-1);
    	   	$domain="end";
    	   }elseif ($do_at!="") {
    	   	$domain="activity";
    	   	 $value=(int)substr($value_up,1,$do_at-1);
    	   }elseif ($do_host!="") {
    	   	$domain="hostid";
    	   	 $value=(int)substr($value_up,1,$do_host-1);
    	   }
    	    --$value;
    	      $value_peo=json_encode($arr_peo[$i],JSON_UNESCAPED_UNICODE);
    	      $value_host=$arr_host[$value];

    		$sql_up="Update `schedule` set $domain=$value_peo where id= '$value_host' ";
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
}