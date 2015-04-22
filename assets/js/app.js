(function ($) {

    // Init function for selectize to work each time we clone a panel
    var init = function ($el) {
        $('.icons', $el).selectize({
            sortField: 'text'
        }).removeClass("icons");

    };

    var counter = 1;

    $(document).ready(function () {
        //___Start for cloning Text Panel___//
        $('.action-new').on('click', function () {
            counter++;
            var $template = $('.clonable').clone();
            var  newId = 'acc-' + counter;
            // Remove clonable class and in class from cloned element
            $template.removeClass('clonable');
            $template.find('.in').removeClass('in');
            // Assign random id and attr for newly added panel
            $template.find('#acc-1').attr('id', newId);
            $template.find('[href=#acc-1]').attr('href', '#' + newId);
            // Now append it to parent div #repeatable
            $('#repeatable').append($template);
            $template.show(); // Show the item
            init($template);
        });
        // Trigger the action-new click event
        $('.action-new').trigger("click");

        //__Start for draggin Panel__//
        $("#repeatable").sortable({
            revert: true
        });

        //___Start Panel Remove___//
        $(document).on('click', '.action-remove', function () {
            var panel = $(this).closest('.panel-acc'),
                totalPanel = $('#repeatable').find('.panel-acc').length;

            if (totalPanel != 2) {
                var result = confirm("Are Your sure");
                if (result == true) {
                    panel.remove();
                }

            } else {
                alert("Hey Dude! You can't delete last item :)");
            }
        });
        //___Start Live change Title___//
        $(document).on('keyup', '.title-acc', function () {
            var newValue = $(this).val();
            $(this).closest('.panel-acc').find('.panel-title > a  > .tx-title').text(newValue);
            if(!(newValue.length) == 0 && ($(this).closest('.panel-acc').hasClass('panel-danger'))){
                $(this).closest('.panel-acc').removeClass('panel-danger').addClass('panel-default');
            }
            // console.log($(this).closest('.panel'));
        });
        //___Start Icon change___//
        $(document).on('change', '.selectized', function () {
            var newIcon = $('i').attr('class');
            var newIconChange = $(this).val();

            if (newIcon !== newIconChange) {
                $(this).closest('.panel-acc').find('#title-icon').removeClass();
                $(this).closest('.panel-acc').find('#title-icon').addClass('fa fa-' + newIconChange);
            }
        });

        //___Start Insert into Editor Panel___//

        $(document).on('click', '.action-insert', function () {
            var $presets = $('.presets').val(),
                $acc = $title = $content = $icon = '',
                $allIsWell = true;

            $('.panel-acc').each(function () {
                if (!$(this).hasClass("clonable")) {
                    $title = $(this).find('.title-acc').val(),
                        $content = $(this).find('.content').val(),
                        $icon = $(this).find('.selectized').val();
                    //  alert($content.length);
                    if( ($title.length == 0) || ($content.length == 0))
                    {
                        $(this).removeClass('panel-default').addClass('panel-danger');
                        $allIsWell = false;

                    }else {
                        $(this).removeClass('panel-danger').addClass('panel-default ');
                    }
                    $acc += '[xa_slide title="' + $title + '" icon="' + $icon + '"]' + $content + '[/xa_slide]';
                }
            });

            if ( $allIsWell )
            {
                wp.media.editor.insert('[xa_acc style="' + $presets + '" ]' + $acc + '[/xa_acc]');
                $('#xa-modal').modal('hide')
            }

        });

        if(!$('.panel-collapse-acc').hasClass('in')) {
            $('.panel-collapse-acc').addClass('in');

        }


    });

// Preset Style

    $(document).on('change', '.presets', function(){

        var newIcon = $('#repeatable').attr('class');
        var newIconChange = $(this).val();

        if(newIcon!==newIconChange){

            $(this).next('#repeatable').removeClass(newIcon);
            $(this).next('#repeatable').addClass('panel-group ui-sortable ' + newIconChange);
        }

    });
//___Admin Style Change___//


})(jQuery);