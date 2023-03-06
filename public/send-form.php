<?php

	error_reporting(0);

    /**
     * Clean incoming value from trash.
     *
     * @param	mixed	$value	Some value to clean.
     * @return	mixed	$value	The same value, but cleaned.
     */
    function as_clean_value( $value )
    {
        $value = trim( $value );
        $value = stripslashes( $value );
        $value = strip_tags( $value );

        return htmlspecialchars( $value );
    }

    /**
     * Function checks if value length is between min and max parameters.
     *
     * @param   string	$value  Specific string..
     * @param   int		$min    Minimum symbols value length.
     * @param   int		$max	Maximum symbols value length.
     * @return  bool            True if OK, false if value length is too small or large.
     */
    function as_check_length( string $value, int $min, int $max ): bool
    {
        return ! ( mb_strlen( $value ) < $min || mb_strlen( $value ) > $max );
    }

    /**
     * Function checks name symbols.
     *
     * @param   string  $name   Some name.
     * @return  bool            True if OK, false if string has bad symbols.
     */
    function as_check_name( string $name ): bool
    {
        return preg_match('/^[a-zа-я\s]+$/iu', $name );
    }

    /**
     * Function checks phone symbols.
     *
     * @param   string  $phone  Some phone number.
     * @return  bool            True if OK, false if string has bad symbols.
     */
    function as_check_phone( string $phone ): bool
    {
        return preg_match('/^[0-9()+\-\s]+$/iu', $phone );
    }

    /**
     * Function get user IP.
     *
     * @return string IP
     */
    function getUserIP()
    {
        if (isset($_SERVER["HTTP_CF_CONNECTING_IP"])) {
            $_SERVER['REMOTE_ADDR'] = $_SERVER["HTTP_CF_CONNECTING_IP"];
            $_SERVER['HTTP_CLIENT_IP'] = $_SERVER["HTTP_CF_CONNECTING_IP"];
        }

        $client  = @$_SERVER['HTTP_CLIENT_IP'];
        $forward = @$_SERVER['HTTP_X_FORWARDED_FOR'];
        $remote  = $_SERVER['REMOTE_ADDR'];

        if(filter_var($client, FILTER_VALIDATE_IP))
        {
            $ip = $client;
        }
        elseif(filter_var($forward, FILTER_VALIDATE_IP))
        {
            $ip = $forward;
        }
        else
        {
            $ip = $remote;
        }

        return $ip;
    }

    if( ! empty( $_POST ) && isset( $_POST['func'] ) ){
        switch( $_POST['func'] ){
            case 'consultation':
                as_send_consultation_form();
                break;

            case 'book':
                as_send_book_form();
                break;

            default:
                as_send_online_form();
        }
    }

    // Consultation.
    function as_send_consultation_form(){
        $radio	= isset( $_POST['radio'] ) ? as_clean_value( $_POST['radio'] ) : null;
        $name	= isset( $_POST['name'] ) ? as_clean_value( $_POST['name'] ) : null;
        $tel	= isset( $_POST['tel'] ) ? as_clean_value( $_POST['tel'] ) : null;
        $promo	= isset( $_POST['promo'] ) ? as_clean_value( $_POST['promo'] ) : '---';
        $title	= isset( $_POST['title'] ) ? as_clean_value( $_POST['title'] ) : 'Заголовок не задан, свяжитесь с разработчиком';

        // Required fields.
        if( ! $radio || ! $name || ! $tel ){
            echo json_encode( [
                'success'	=> 0,
                'message'	=> 'Пожалуйста, заполните все поля.'
            ] );
            die();
        }

        // Only letters & spaces in name.
        if( ! as_check_name( $name ) ){
            echo json_encode( [
                'success'	=> 0,
                'message'	=> 'Пожалуйста, введите корректное имя.'
            ] );
            die();
        }

        // Check length to avoid very large text.
        if( ! as_check_length( $name, 1, 50 ) ){
            echo json_encode( [
                'success'	=> 0,
                'message'	=> 'Имя не должно превышать 50 символов.'
            ] );
            die();
        }

        if( ! as_check_length( $tel, 3, 30 ) ){
            echo json_encode( [
                'success'	=> 0,
                'message'	=> 'Телефон не должен превышать 30 символов или быть меньше 3 символов.'
            ] );
            die();
        }

        // Check phone symbols.
        if( ! as_check_phone( $tel ) ){
            echo json_encode( [
                'success'	=> 0,
                'message'	=> 'Пожалуйста, введите корректный телефон.'
            ] );
            die();
        }
    }

    // Book.
    function as_send_book_form(){
        $tel = isset( $_POST['tel'] ) ? as_clean_value( $_POST['tel'] ) : null;
        $title	= isset( $_POST['title'] ) ? as_clean_value( $_POST['title'] ) : 'Заголовок не задан, свяжитесь с разработчиком';

        if(isset($_POST["uri"])){
            $uri = $_POST["uri"];
        } else { $uri = '---'; }

        if(isset($_POST["yid"])){
            $yid = $_POST["yid"];
        } else { $yid = '---'; }

        if(isset($_POST["gid"])){
            $gid = $_POST["gid"];
        } else { $gid = '---'; }

        if(isset($_POST["nb"])){
            $nb = '1';
        } else { $nb = '0'; }

        // Required fields.
        if( ! $tel ){
            echo json_encode( [
                'success'	=> 0,
                'message'	=> 'Пожалуйста, заполните все поля.'
            ] );
            die();
        }

        if( ! as_check_length( $tel, 3, 30 ) ){
            echo json_encode( [
                'success'	=> 0,
                'message'	=> 'Телефон не должен превышать 30 символов или быть меньше 3 символов.'
            ] );
            die();
        }

        // Check phone symbols.
        if( ! as_check_phone( $tel ) ){
            echo json_encode( [
                'success'	=> 0,
                'message'	=> 'Пожалуйста, введите корректный телефон.'
            ] );
            die();
        }
    }

    // Online.
    function as_send_online_form(){
        $name	= isset( $_POST['name'] ) ? as_clean_value( $_POST['name'] ) : null;
        $tel	= isset( $_POST['tel'] ) ? as_clean_value( $_POST['tel'] ) : null;
        $title	= isset( $_POST['title'] ) ? as_clean_value( $_POST['title'] ) : 'Заголовок не задан, свяжитесь с разработчиком';

        // Required fields.
        if( ! $name ||  ! $tel ){
            echo json_encode( [
                'success'	=> 0,
                'message'	=> 'Пожалуйста, заполните все поля.'
            ] );
            die();
        }

        // Only letters & spaces in name.
        if( ! as_check_name( $name ) ){
            echo json_encode( [
                'success'	=> 0,
                'message'	=> 'Пожалуйста, введите корректное имя.'
            ] );
            die();
        }

        // Check length to avoid very large text.
        if( ! as_check_length( $name, 1, 50 ) ){
            echo json_encode( [
                'success'	=> 0,
                'message'	=> 'Имя не должно превышать 50 символов.'
            ] );
            die();
        }

        if( ! as_check_length( $tel, 3, 30 ) ){
            echo json_encode( [
                'success'	=> 0,
                'message'	=> 'Телефон не должен превышать 30 символов или быть меньше 3 символов.'
            ] );
            die();
        }

        // Check phone symbols.
        if( ! as_check_phone( $tel ) ){
            echo json_encode( [
                'success'	=> 0,
                'message'	=> 'Пожалуйста, введите корректный телефон.'
            ] );
            die();
        }
    }

    $url_parsed = parse_url($_SERVER['HTTP_REFERER']);
    $get_params = array();
    $get_params_additional = array();
    $param_filter = array('utm_source', 'utm_medium', 'utm_campaign', 'utm_term');

    $params = json_decode($_POST['params'], true);

    if ($params){
        foreach ($params as $k=>$v){
            $get_params[$k] = $v;
            if (!in_array($k, $param_filter)){
                $get_params_additional[] = "{$k}={$v}";
            }
        }
    }

    if (!empty($get_params_additional)){
        $get_params_stroke = implode(', ', $get_params_additional); 
    }
    else{
        $get_params_stroke = "";
    }

	$radio	= isset( $_POST['radio'] ) ? as_clean_value( $_POST['radio'] ) : null;
	$name	= isset( $_POST['name'] ) ? as_clean_value( $_POST['name'] ) : null;
	$tel	= isset( $_POST['tel'] ) ? as_clean_value( $_POST['tel'] ) : null;
	$promo	= isset( $_POST['promo'] ) ? as_clean_value( $_POST['promo'] ) : null;
    $title	= isset( $_POST['title'] ) ? as_clean_value( $_POST['title'] ) : 'Заголовок не задан, свяжитесь с разработчиком';

    $nameStr = ($name != "") ? "Имя: <b>$name</b>" . '<br>' : "";
    $telStr = ($tel != "") ? "Телефон: <b>$tel</b>" . '<br>' : "";
    $promoStr = ($promo != "") ? "Промокод: <b>$promo</b>" . '<br>' : "";
    $radioStr = ($radio != "") ? "Желаемая консультация: <b>$radio</b>" . '<br>' : "";

    $title = ($title != "") ? $title : "Заголовок не задан, свяжитесь с разработчиком";

    $ip = getUserIP();

    $yandex = $_COOKIE['_ym_uid'];
    $google = $_COOKIE['_ga'];
    
    if (strlen($google) > 1){
        $google_array = explode('.', $_COOKIE['_ga']);
        $google_array[2] = substr($google_array[2], 1);
        $google = "{$google_array[2]}.{$google_array[3]}";
    }

    $utm_source = $get_params['utm_source'];
    $utm_medium = $get_params['utm_medium'];
    $utm_campaign = $get_params['utm_campaign'];
    $utm_content = $get_params['utm_content'];
    $utm_term = $get_params['utm_term'];
    $gets = $get_params_stroke;
    $page_reffer = "{$url_parsed['scheme']}://{$url_parsed['host']}{$url_parsed['path']}";

    $text = $nameStr
        . $telStr
        . $radioStr
        . $promoStr
        . '<br>' 
        . "Google ID: <b>$google</b>" . '<br>' 
        . "Yandex ID: <b>$yandex</b>" . '<br>' 
        . '<br>' 
        . "Источник трафика: <b>$utm_source</b>" . '<br>' 
        . "Тип канала: <b>$utm_medium</b>" . '<br>' 
        . "Название РК: <b>$utm_campaign</b>" . '<br>' 
        . "Доп информация о РК: <b>$utm_content</b>" . '<br>' 
        . "Ключевая фраза: <b>$utm_term</b>" . '<br>' 
        . '<br>' 
        . "Остальные GET параметры: <b>$gets</b>" . '<br>' 
        . '<br>' 
        . "IP клиента: <b>$ip</b>" . '<br>' 
        . "Заявка со страницы: <b>{$page_reffer}</b>"
    ;

    as_send_email($title, $text);

/**
 * @param string $subject
 * @param string $message
 * @return void
 */
function as_send_email( string $subject, string $message , string $flag = '' ){
	// Mail headers.
	$headers = "From: no-reply@" . $_SERVER['HTTP_HOST'] . "\r\n" .
		"Reply-To: no-reply@" . $_SERVER['HTTP_HOST'] . "\r\n" .
		"X-Mailer: PHP/" . phpversion() . "\r\n" .
        "MIME-Version: 1.0" . "\r\n" .
        "Content-Type: text/html; charset=UTF-8" . "\r\n" .
	$uri	= isset( $_POST['uri'] ) ? as_clean_value( $_POST['uri'] ) : '';

    $result = mail('ilya@instant-issue.ru', $subject, $message, $headers );
	$result = mail('andr.lobanov2020@mail.ru', $subject, $message, $headers );
	$result = mail('krasotyv@yandex.ru', $subject, $message, $headers );

	if( $result )
		echo json_encode( [
			'success'	=> 1,
			'message'	=> 'Спасибо за Ваше сообщение! Мы свяжемся с Вами в ближайшее время.'
		] );	// Success.
	else
		echo json_encode( [
			'success'	=> 0,
			'message'	=> 'Ошибка отправки. Пожалуйста, попробуйте позже.'
		] );	// Failed.
}

die();

