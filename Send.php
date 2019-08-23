<?php


/**
 * 
 */

class OrderPush
{
    public $appid;
    public $secrect;
    public $accessToken;
    public $number;
    public $template_id;
    public $openid;
 
    function  __construct($appid, $secrect,$number,$template_id,$openid)
    {
        $this->appid = $appid;
        $this->secrect = $secrect;
        $this->accessToken = $this->getToken($this->appid, $this->secrect);
        $this->number=$number;
        $this->template_id=$template_id;
        $this->openid=$openid;

    }
 
    /**
     * 发送post请求
     * @param string $url
     * @param string $param
     * @return bool|mixed
     */
    function request_post($url = '', $param = '')
    {
        if (empty($url) || empty($param)) {
            return false;
        }
        $postUrl = $url;
        $curlPost = $param;
        $ch = curl_init(); //初始化curl
        curl_setopt($ch, CURLOPT_URL, $postUrl); //抓取指定网页
        curl_setopt($ch, CURLOPT_HEADER, 0); //设置header
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1); //要求结果为字符串且输出到屏幕上
        curl_setopt($ch, CURLOPT_POST, 1); //post提交方式
        curl_setopt($ch, CURLOPT_POSTFIELDS, $curlPost);
        $data = curl_exec($ch); //运行curl
        curl_close($ch);
        return $data;
    }
 
 
    /**
     * 发送get请求
     * @param string $url
     * @return bool|mixed
     */
    

   
 


    /**
     * @param $appid
     * @param $appsecret
     * @return mixed
     * 获取token
     */
    public function getToken($appid, $appsecret)
    {
         $url = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=" . $appid . "&secret=" . $appsecret;
         $value_url=$this->request_get2($url);
 		 $arr_url=json_decode($value_url,true);
         echo ':'.$value_url."\n";
 		 $access_token=$arr_url['access_token'];
        return $access_token;

        $value_url=request_get($url);
         $arr_url=json_decode($value_url,true);
        
    }
 
 
    /**
     * 发送自定义的模板消息
     * @param $touser
     * @param $template_id
     * @param $url
     * @param $data
     * @param string $topcolor
     * @return bool
     */
    public function doSend($touser, $template_id, $url, $data, $topcolor = '#7B68EE')
    {
 
        $template = array(
            'touser' => $touser,
            'template_id' => $template_id,
            'url' => $url,
            'topcolor' => $topcolor,
            'data' => $data
        );
        $json_template = json_encode($template);
        // echo $json_template."\n";
        $url = "https://api.weixin.qq.com/cgi-bin/message/template/send?access_token=" . $this->accessToken;
        $dataRes = $this->request_post($url, urldecode($json_template));
        // var_dump($dataRes);
        $dataRes=json_decode($dataRes,true);
        if ($dataRes['errcode'] == 0) {
            // echo "sussess";
            return true;
        } else {
            return false;
        }
    }

     function request_get2($url = '')
    {

        if (empty($url)) {
            return false;
        }
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        $data = curl_exec($ch);
        curl_close($ch);
        return $data;
    }
}


?>