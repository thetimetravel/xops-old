<?php
/**
 * 
 * @authors yxq (you@example.org)
 * @date    2019-08-02 14:04:02
 * @version $Id$
 */

 include_once 'server_mysql.php';    //加载数据库配置项
 include_once 'Staticp.php';          //sql语句和各种参数表
class Look   extends Staticp{


    
    function __construct(){
        
    }

    function is_search(){
    	// $is_time=$this->searchid("`time`","id!=-1");
    	$arr_time=$this->searchru("*","`time`","id!=-1");
    	// $is_class=$this->searchid("`class`","id!=-1");
    	$show_is=["code"=>200,"time"=>count($arr_time),"data"=>$arr_time];
    	echo json_encode($show_is);
    }

    function sea_all(){
    	$is_wei=$this->searchid("`yuorder`","yuyue=1 and accou='0'");
    	$is_all=$this->searchid("`yuorder`","yuyue=1 and accou='1'");
    	$is_no=$this->searchid("`yuorder`","yuyue=0");
    	$show_is=["code"=>200,"data1"=>$is_wei,"data2"=>$is_all,"data3"=>$is_no];
    	echo json_encode($show_is);

    }
}