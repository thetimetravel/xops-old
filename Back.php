<?php
/**
 * 
 * @authors yxq (you@example.org)
 * @date    2019-06-03 11:59:44
 * @version $Id$
 */
header("Content-Type: text/html,text/json; charset=UTF-8");
header('Access-Control-Allow-Origin:*');
date_default_timezone_set("PRC"); //设置这个标准时间
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");


 include_once 'server_mysql.php';    //加载数据库配置项
 include_once 'Staticp.php';          //sql语句和各种参数表
 include_once 'User.php'    ;         //用户表
 include_once 'Admin.php'   ;        //管理员表
 include_once 'Schedule.php';         //课程表
 include_once 'Look.php'   ;           //
 include_once 'Teacher.php' ;        //职工表
class Back  extends Staticp  {

    public   $Staticp;
    function __construct(){
           $GLOBALS["type"]=isset($_POST['type'])?$_POST['type']:'';
         
    }
  

    function user(){

      $account=trim(isset($_POST['account'])?$_POST['account']:"");
      $password=trim(isset($_POST['password'])?$_POST['password']:"");
      $phone=trim(isset($_POST['phone'])?$_POST['phone']:"");
      $curr=(isset($_POST['curr'])?$_POST['curr']:"");  //当前页面
      $nums=(isset($_POST['nums'])?$_POST['nums']:"");  //一页显示多少条数据
      $operation=isset($_POST['operation'])?$_POST['operation']:"";
      $token=isset($_POST['token'])?$_POST['token']:""; 
    
      if($this->token==$token){
         $User=new User($account,$password,$phone,$curr,$nums);
        switch ($operation) {
          case 'login':
            if(empty($account) && empty($password)) 
              echo json_encode($this->arrni);
            elseif (empty($password)) {
               echo json_encode($this->arre);
            }elseif(empty($account) )
            {
              echo json_encode($this->arrn);
            }
            else          
              $User->login();
            
            break;
          case 'search':
             $User->search();
            break;
          case 'add':
            $User->add();
            break;
          case 'del':
            $User->del();
            break;
          case 'update':
            $User->update();
            break;
          case 'dao':
            $User->dao();
            break;
          default:
            # code...
            break;
        }
   
      
      }
     
    }


    function admin(){
           // echo "string";
      $account=trim(isset($_POST['account'])?$_POST['account']:"");
      $password=trim(isset($_POST['password'])?$_POST['password']:"");
      $phone=trim(isset($_POST['phone'])?$_POST['phone']:"");
      $sex=trim(isset($_POST['sex'])?$_POST['sex']:"");
      $operation=isset($_POST['operation'])?$_POST['operation']:"";
      $token=isset($_POST['token'])?$_POST['token']:"";

      if($this->token==$token){
        $Admin=new Admin($account,$password,$phone,$sex);
        switch ($operation){
          case 'add':
            $Admin->add();
            break;
            case 'del':
              $Admin->del();
              break;
            case 'login':
            if(empty($account) && empty($password)) 
              echo json_encode($this->arrni);
            elseif (empty($password)) {
               echo json_encode($this->arre);
            }elseif(empty($account) )
            {
              echo json_encode($this->arrn);
            }
            else          
              $User->login();
          case 'update':
            $Admin->update();
            break;
          case 'searchAt':

            $Admin->searchat();
            break;
            default:
            break;
        }

      }

    }


    function time(){
      $begin=trim(isset($_POST['begin'])?$_POST['begin']:"");
      $over=trim(isset($_POST['over'])?$_POST['over']:"");
  
      $token=isset($_POST['token'])?$_POST['token']:"";
       if($this->token==$token){
         $arr_bg=explode(",",$begin);
         $arr_ov=explode(",",$over);
         $ri=0;
         // if($arr_bg[0]!="" && $arr_ov[0]!="" )
         // {
         $sql_qc="truncate `time`";
         $result_qc=mysqli_query($GLOBALS['con'],$sql_qc);
           // echo count($arr_bg)." ".count($arr_ov);
         // }
         if(strlen(trim($arr_bg[0]))!=0){
         for($i=0;$i<count($arr_bg);$i++){
          $sql_in="Insert into `time` (begin,over) values('$arr_bg[$i]','$arr_ov[$i]')";
          // echo "sql:".$sql_in."<br/>";
          $row_in=mysqli_query($GLOBALS['con'],$sql_in);
          if($row_in<0){
            $ri=1;
          }
         }
         if($ri==0){
          echo json_encode($this->arrs);
         }else{
          echo json_encode($this->arre);
         }
              }else{
                 echo json_encode($this->arrs);
              }
       }

    }

    function schedule(){
      $roomid=trim(isset($_POST['roomid'])?$_POST['roomid']:"");
      $people=trim(isset($_POST['people'])?$_POST['people']:"");
      $week=trim(isset($_POST['week'])?$_POST['week']:"");
      $day=trim(isset($_POST['day'])?$_POST['day']:"");
      $start=trim(isset($_POST['start'])?$_POST['start']:"");
      $end=trim(isset($_POST['end'])?$_POST['end']:"");
      $activity=trim(isset($_POST['activity'])?$_POST['activity']:"");
      $hostid=trim(isset($_POST['hostid'])?$_POST['hostid']:"");

      $operation=isset($_POST['operation'])?$_POST['operation']:"";
      $token=isset($_POST['token'])?$_POST['token']:"";

      if($this->token==$token){
      $Schedule=new Schedule($roomid,$people,$week,$day,$start,$end,$activity,$hostid);
      switch($operation){
        case 'update':
          $Schedule->update();
          break;
      }

      }
    }

    function config(){

      $data=isset($_POST['data'])?$_POST['data']:"";
      $classid=isset($_POST['classid'])?$_POST['classid']:"";
      $operation=isset($_POST['operation'])?$_POST['operation']:"";
      $token=isset($_POST['token'])?$_POST['token']:"";
       if($this->token==$token){
        switch($operation){
        case 'json':
        // echo gettype($data);
//         // $path=" D:/Program File+s (x86)/xampp3/htdocs/HBuilder/vue/time/eleTree/eleTree";
        $path="index.json";
        $restlt_json=["code"=>0,"data"=>$data];

        $json_string = json_encode($restlt_json,JSON_UNESCAPED_UNICODE);
        file_put_contents($path, $json_string);
        $arr_class=explode(":",$classid);
        $len=strlen(trim(json_encode($arr_class[0])));
        // echo "len:".$len. " = ".json_encode($arr_class[0])."\n";
        if($len>2){
          $sql_up="Update `class` set yuyue=$arr_class[1] where time ='$arr_class[0]'";
           $row_up=mysqli_query($GLOBALS['con'],$sql_up);
           
        }
        echo  json_encode($this->arrs);
            break;
        case 'search':
          $json_string = file_get_contents('index.json'); 

          $data = json_decode($json_string, true); 
          // echo gettype($data).":".json_encode($data,JSON_UNESCAPED_UNICODE);
           echo json_encode($data,JSON_UNESCAPED_UNICODE);
          break;
        case 'schedule':
        $path="index1.json";
        $restlt_json=["code"=>0,"data"=>$data];

        $json_string = json_encode($restlt_json,JSON_UNESCAPED_UNICODE);
        file_put_contents($path, $json_string);
        $arr_class=explode(":",$classid);
        $len=strlen(trim(json_encode($arr_class[0])));
        // echo "len:".$len. " = ".json_encode($arr_class[0])."\n";
        if($len>2){
          $sql_up="Update `schedule` set yuyue=$arr_class[1] where time ='$arr_class[0]'";
           $row_up=mysqli_query($GLOBALS['con'],$sql_up);
           
        }
        echo  json_encode($this->arrs);
          
          break;
       
          default:
          break;
      }

       }

    }

    function sclass(){
      
      $data=isset($_POST['data'])?$_POST['data']:"";
      $yuyue=isset($_POST['yuyue'])?$_POST['yuyue']:"";
      $id=isset($_POST['id'])?$_POST['id']:"";
      $classname=isset($_POST['classname'])?$_POST['classname']:"";
      $operation=isset($_POST['operation'])?$_POST['operation']:"";
      $token=isset($_POST['token'])?$_POST['token']:"";
       if($this->token==$token){
        switch($operation){
          case 'add':
          // $result=json_encode($data,JSON_UNESCAPED_UNICODE);
            $is_id=$this->searchid("`class`","time='$id'");
            if($is_id<1){
              $sql_add="Insert into `class`(time,yuyue,data,classname)values('$id','$yuyue','$data','$classname')";
            $row_add=mysqli_query($GLOBALS['con'],$sql_add);
            // echo "pp:".$row_add;
          }else{
              $sql_up="Update `class` set yuyue='$yuyue' ,data='$data',classname='$classname' where time='$id'";
              $row_up=mysqli_query($GLOBALS['con'],$sql_up);
              // echo "p2:".$row_up;
          }
            
            break;
            case 'search':
            $is_se=$this->searchid("`class`","time='$id'");
            if($is_se>0){
               $arr_se=$this->searchru('data,yuyue',"`class`","time='$id'");
              echo $arr_se[0]["data"].":".$arr_se[0]["yuyue"];
            }
             
              break;
            case 'test':
            $arr_lo=$this->searchru("`classname`","`config`","id='1'");

              // $sql_up="Update `config` set classname='$classname' where id='1'";
              // $row_up=mysqli_query($GLOBALS['con'],$sql_up);
              // echo "p:".$sql_up;
              echo ($arr_lo[0]["classname"]);
              break;
              case 'yuyue':
                $arr_yuyue=$this->searchru("data,yuyue","`class`","classname='$classname'");
                $arr_jie=explode(",",$yuyue);
                
                // echo ($yuyue).":".count($arr_jie)." ".$arr_jie[0];
                $suc=[];
                $yy=[];

                if(count($arr_yuyue)>0){
                   $value=json_decode($arr_yuyue[0]["data"],true);
                   $value_yy=json_decode($arr_yuyue[0]["yuyue"],true);
                   for($j=0;$j<count($arr_jie);$j++){

                    $po=$value[$arr_jie[$j]-1];
                    // echo 'ji:'.$j." == ".array_key_exists($id,$po). " ++ ".count($po). " ".$id."\n";
                    if(array_key_exists($id,$po)){
                      if($po[$id]==null){
                         $suc[]=$arr_jie[$j];
                         $yy[]=$value_yy;
            // echo "null:".$arr_jie[$j]. " ".$id."\n";
                      }
                     
                    }else{
                      $suc[]=$arr_jie[$j];
                      $yy[]=$value_yy;
                        // echo "dd:".$arr_jie[$j]. " ".$id."\n";
                    }
                       
                   }
                  
                  }else{
                    for($i=0;$i<count($arr_jie);$i++){
                      $suc[]=$arr_jie[$i];
                       $yy[]=1;
                    }
                   
                  }
                  echo json_encode($suc).":".json_encode($yy);    
                
                break;
              case 'add_schedule':
                $is_id=$this->searchid("`schedule`","time='$id'");
            if($is_id<1){
              $sql_add="Insert into `schedule`(time,yuyue,data,classname)values('$id','$yuyue','$data','$classname')";
            $row_add=mysqli_query($GLOBALS['con'],$sql_add);
            // echo "pp:".$row_add;
          }else{
              $sql_up="Update `schedule` set yuyue='$yuyue' ,data='$data',classname='$classname' where time='$id'";
              $row_up=mysqli_query($GLOBALS['con'],$sql_up);
              // echo "p2:".$row_up;
          }
                break;
            case 'search_sc':
               $is_se=$this->searchid("`schedule`","time='$id'");
            if($is_se>0){
               $arr_se=$this->searchru('data,yuyue',"`schedule`","time='$id'");
              echo $arr_se[0]["data"].":".$arr_se[0]["yuyue"];
            }
              break;
            case 'search_test':
            if($classname=="room"){//教室
              $is_name=$this->searchid("`class`","classname='$id'");
              if($is_name<1)
                die(json_encode($this->arre));
              else{
                 $arr_test=$this->searchru('data',"`class`","classname='$id'");
              $show_test=["code"=>200,"data"=>$arr_test[0]["data"]];
              echo json_encode($show_test,JSON_UNESCAPED_UNICODE);
              }
             
            }else if($classname=="class"){//班级课程表
              $is_class=$this->searchid("`schedule`","classname='$id'");
              if($is_class<1)
                 die(json_encode($this->arre));
              else{
              $arr_test=$this->searchru('data',"`schedule`","classname='$id'");
              $show_test=["code"=>200,"data"=>$arr_test[0]["data"]];
              // echo $show_test;
              echo json_encode($show_test,JSON_UNESCAPED_UNICODE);
              }

            }
          
              break;
                default:
                break;
        }
      }

    }

     
    function yuorder(){
      $userid=isset($_POST['userid'])?$_POST['userid']:"";
      $yuyue=isset($_POST['yuyue'])?$_POST['yuyue']:"";
      $username=isset($_POST['username'])?$_POST['username']:"";
      $classname=isset($_POST['classname'])?$_POST['classname']:"";
      $path=isset($_POST['path'])?$_POST['path']:"";
      $section=isset($_POST['section'])?$_POST['section']:"";
      $time=isset($_POST['time'])?$_POST['time']:"";
      $operation=isset($_POST['operation'])?$_POST['operation']:"";
      $token=isset($_POST['token'])?$_POST['token']:"";
       if($this->token==$token){
        switch($operation){
            case 'add':
            $is_in=$this->searchid("`yuorder`","userid='$userid' and classname='$classname' and section='$section' and path='$path' and time='$time'");
            if($is_in>0){
              $error_in=["code"=>203,"data"=>"aleady"];
              echo  json_encode($error_in);
            }else{
              $ordernum=$this->StrOrderOne();
               $sql_in="Insert into `yuorder` (userid,username,classname,section,path,len,time,yuyue,ordernum)  values('$userid','$username','$classname','$section','$path','1','$time','$yuyue','$ordernum')";
              // echo $sql_in;
              $row_in=mysqli_query($GLOBALS['con'],$sql_in);
              $show_in=["code"=>200,"data"=>$row_in];

              $arr_num=$this->searchru("id","`yuorder`","ordernum='$ordernum'");
              $show_amid="-1,".($arr_num[0]["id"]);
              
              // $arr_socket=$this->searchru("socket_ip","`configuration`","id=1");
              $socket="http://localhost:3006";
              $show_neworder=array("type"=>"NewOrder","id"=>$show_amid);
              $neworder=$this->post2($socket,$show_neworder);
               $socket2="http://localhost:3017";
                $neworder2=$this->post2($socket2,$show_neworder);
              // echo "ki:".$socket."  =  ".$show_neworder;
              echo json_encode($show_in);
            }
             
              break;
            case 'search':
              $arr_all=$this->searchru("*","`yuorder`","yuyue=1 and accou='0'");
              $show_all=["code"=>200,"data"=>$arr_all];
              echo json_encode($show_all,JSON_UNESCAPED_UNICODE);
              break;
            case 'searchid':
              $arr_id=$this->searchru("*","`yuorder`"," id='$userid'");
              $show_id=["code"=>200,"data"=>$arr_id];
              echo json_encode($show_id,JSON_UNESCAPED_UNICODE);
              break;

            case 'delid':
              if (!isset($userid))
              {
                die(json_encode($this->arrn));
              }
              $is_id=$this->searchid("`yuorder`","id='$userid'");
              if($is_id<1){
                echo json_encode($this->arrni);
              }else{
                $sql_del="delete from `yuorder` where id='$userid'";
                $row_del=mysqli_query($GLOBALS['con'],$sql_del);
                if($row_del==1){
                  echo json_encode($this->arrs);
                }else{
                  echo json_encode($this->arre);
                }
              }
              break;
            case 'addac':
            $date=date("Y-m-d H:i:s");
               if (!isset($userid) || !isset($username) )
                echo json_encode($this->arrn);
              else{
                $is_id=$this->searchid("`admin`"," account='$username'");
                if($is_id<1)
                  die(json_encode($this->arrni));
                
                $is_id="Update `yuorder` set accou=1  where id='$userid'";
                $row_up=mysqli_query($GLOBALS['con'],$is_id);
                 $is_ac="Update `yuorder` set account='$username'  where id='$userid'";
                $row_ac=mysqli_query($GLOBALS['con'],$is_ac);
                 $is_te="Update `yuorder` set finishtime='$date'  where id='$userid'";
                $row_te=mysqli_query($GLOBALS['con'],$is_te);
                $show_uo=["code"=>200,"data"=>$is_ac];
                echo json_encode($show_uo);
              }
              break;

              case 'searchfin':
                $arr_fin=$this->searchru("*","`yuorder`","yuyue=1 and accou='1'");
                $show_fin=["code"=>200,"data"=>$arr_fin];
                echo json_encode($show_fin,JSON_UNESCAPED_UNICODE);
                break;
              case 'search_shenhe':
                $arr_shenhe=$this->searchru("*","`yuorder`","yuyue=0");
                $show_shenhe=["code"=>200,"data"=>$arr_shenhe];
                echo json_encode($show_shenhe,JSON_UNESCAPED_UNICODE);
                break;
               default:
                break;

        }
      }

    }


            static public function StrOrderOne(){
    /* 选择一个随机的方案 */
    mt_srand((double) microtime() * 1000000);
     
    return date('Ymd') . str_pad(mt_rand(1, 99999), 5, '0', STR_PAD_LEFT);
}

           function uptime(){
         
             $operation=isset($_POST['operation'])?$_POST['operation']:"";
           $token=isset($_POST['token'])?$_POST['token']:"";
       if($this->token==$token){
           if($operation=="search"){
            $arr_up=$this->searchru("*","`time`","id!='-1'");
            $show_up=["code"=>200,"data"=>$arr_up,"nums"=>count($arr_up)];
            echo json_encode($show_up,JSON_UNESCAPED_UNICODE);
         
           }
       }

    }

          function look(){
             $operation=isset($_POST['operation'])?$_POST['operation']:"";
           $token=isset($_POST['token'])?$_POST['token']:"";
       if($this->token==$token){
              $look=new Look();
              switch ($operation) {
                case 'is_search':
                  $look->is_search();
                  break;
                case 'sea_all':
                  $look->sea_all();
                  break;
                
                default:
                  # code...
                  break;
              }

          }
        }

        function teacher(){
       
           $account=isset($_POST['account'])?$_POST['account']:"";
           $password=isset($_POST['password'])?$_POST['password']:"";
           $tel=isset($_POST['tel'])?$_POST['tel']:"";
           $sex=isset($_POST['sex'])?$_POST['sex']:"";
           $ac_id=isset($_POST['ac_id'])?$_POST['ac_id']:"";
           $duty=isset($_POST['duty'])?$_POST['duty']:"";
           $operation=isset($_POST['operation'])?$_POST['operation']:"";
           $token=isset($_POST['token'])?$_POST['token']:"";
             if($this->token==$token){
              $teacher=new Teacher($account,$password,$tel,$sex,$ac_id,$duty);
              switch ($operation) {
                case 'search':
                  $teacher->search();
                  break;
                case 'add':
                  if (!isset($_POST['account']) || !isset($_POST['password']) || !isset($_POST['tel']) ||        !isset($_POST['sex']) || !isset($_POST['ac_id'] ) || !isset($_POST['duty'] ))
                  {
                        echo json_encode($this->arrn);
                  }
                    else
                      $teacher->add();

                  break;
                case 'del':
                  $teacher->del();
                  break;
                case 'dao':
                  $teacher->dao();
                  break;
                case 'update':
                  $teacher->update();
                  break;

              }

        }}

        
}


  $Back=new Back();

  switch ($type) {
  	case 'User':
  		$Back->user();
  		break;
  	case 'Admin':
      $Back->admin();
      break;
    case 'Time':
      $Back->time();
      break;
    case 'Schedule':
      $Back->schedule();
      break;
    case 'Config':

    $Back->config();
      # code...
      break;
    case 'Class':
      $Back->sclass();
      break;
    case 'Yuorder':
      $Back->yuorder();
      break;
    case 'Uptime':
      $Back->uptime();
      break;
    case 'Look':
      $Back->look();
      break;
    case 'Teacher':
      $Back->teacher();
      break;
  	default:
  		# code...
  		break;
  }
  
