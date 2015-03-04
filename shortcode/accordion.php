<?php
$count = 1;
$item = 0;
$newFlag = 0;
function accordion_shortcode($attr, $content= null){
    global $item;
    global $count;
    global $newFlag;
    $newFlag = $count;
    $item++;
	$default = array(
          'style' => 'default'
		);

	$data = shortcode_atts($default, $attr);

	$content = do_shortcode($content);

	return '<div class="panel-group '.$data['style'].'"  id="accordion-'. $item .'" role="tablist" aria-multiselectable="true">
'.$content.'</div>';
}
add_shortcode('xa_acc','accordion_shortcode');

function accordion_shortcode_nested($attr, $content= null){
	global $count;
    global $item;
    global $newFlag;

	$default = array(
		'title'=> 'Insert Your Title',
		'icon' => ''

		);
	$data = shortcode_atts($default, $attr);
    
	$class = ( $count === $newFlag ) ? ' in' : '';
    
    $count++;

   
	return '<div class="panel panel-default">
    <div class="panel-heading" role="tab" id="headingOne">
      <h4 class="panel-title">
        <a data-toggle="collapse" data-parent="#accordion-'.$item.'" href="#acc-'.$count.'" aria-expanded="true" aria-controls="collapseOne">
          <i class="fa fa-'.$data['icon'].'"></i> '.$data['title'].'
        </a>
      </h4>
    </div>
    <div id="acc-'.$count.'" class="panel-collapse collapse'. $class .'" role="tabpanel" aria-labelledby="headingOne">
      <div class="panel-body">
'.$content.'</div>
    </div>
  </div>';
}
add_shortcode('xa_slide','accordion_shortcode_nested');

?>