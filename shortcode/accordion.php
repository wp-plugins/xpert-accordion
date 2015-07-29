<?php
$tx_acc_count = 1;
$tx_acc_item = 0;
$tx_acc_new_flag = 0;

function accordion_shortcode($attr, $content = null)
{
    global $tx_acc_item;
    global $tx_acc_count;
    global $tx_acc_new_flag;
    $tx_acc_new_flag = $tx_acc_count;
    $tx_acc_item++;
    $default = array(
        'style' => 'default'
    );

    $data = shortcode_atts($default, $attr);

    $content = do_shortcode($content);

    return '<div class="panel-group '. $data['style'] .'"  id="accordion-'. $tx_acc_item .'" role="tablist" aria-multiselectable="true">'. $content .'</div>';
}

add_shortcode('xa_acc', 'accordion_shortcode');

function accordion_shortcode_nested($attr, $content = null)
{
    global $tx_acc_count;
    global $tx_acc_item;

    $default = array(
        'title' => 'Insert Your Title',
        'icon' => '',
        'openclose' => ''
    );

    $content = do_shortcode($content);
    $data = shortcode_atts($default, $attr);

    $tx_acc_count++;

    return '<div class="panel panel-default">
                <div class="panel-heading" role="tab" id="headingOne">
                    <h4 class="panel-title">
                        <a data-toggle="collapse" data-parent="#accordion-'. $tx_acc_item .'" href="#acc-'. $tx_acc_count .'" aria-expanded="true" aria-controls="collapseOne">
                            <i class="fa fa-'. $data['icon'] .'"></i> '. $data['title'] .'
                        </a>
                    </h4>
                </div>
                <div id="acc-'. $tx_acc_count.'" class="panel-collapse collapse '. $data['openclose'].'" role="tabpanel" aria-labelledby="headingOne">
                    <div class="panel-body">'. $content .'</div>
                </div>
            </div>';
}

add_shortcode('xa_slide', 'accordion_shortcode_nested');
