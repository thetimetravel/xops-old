<?php
/**
 * 
 * @authors yxq (you@example.org)
 * @date    2018-12-13 11:53:15
 * @version $Id$
 */
header('Access-Control-Allow-Origin:*'); 
$host="localhost";  //IP地址
$username="root";  //数据库用户名
$password="root"; //数据库密码
$port=3306;       //端口
$dbname="xops"; //数据库名称
//连接数据库
$con = mysqli_connect($host.":".$port,$username,$password,$dbname);


if ($con->connect_error) {
   die('Connect Error (' . $mysqli->connect_errno . ') ' . $mysqli->connect_error);

}

$con->query("set names utf8"); // 设置输出字符集


