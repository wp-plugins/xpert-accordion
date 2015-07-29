(function ($) {
    var $document = $(document);

    var counter = 1;

    // Init function for selectize to work each time we clone a panel
    function init($el) {
        $('.icons', $el).selectize({
            sortField: 'text'
        }).removeClass("icons");
    }

    function generateAccordionShortcode($title, $openclose, $icon, $content){
        return '[xa_slide title="' + $title + '" openclose="' + $openclose + '" icon="' + $icon + '"]' + $content + '[/xa_slide]';
    }


    $(function () {
        var $actionNew = $('.action-new');
        var $repeatable = $('#repeatable');


        /** Start for cloning Text Panel **/
        $actionNew.on('click', function () {
            counter++;
            var $template = $('.clonable').clone();
            var newId = 'acc-' + counter;

            // Remove clonable class and in class from cloned element
            $template.removeClass('clonable');
            $template.find('.in').removeClass('in');

            // Assign random id and attr for newly added panel
            $template.find('#acc-1').attr('id', newId);
            $template.find('[href=#acc-1]').attr('href', '#' + newId);

            // Now append it to parent div #repeatable
            $repeatable.append($template);
            $template.show(); // Show the item

            init($template);
        });

        /** Trigger the action-new click event **/
        $actionNew.trigger("click");

        /** Start for draggin Panel **/
        $repeatable.sortable({
            revert: true
        });

        /** Start Panel Remove **/
        $document.on('click', '.action-remove', function () {
            var panel = $(this).closest('.panel-acc'),
                totalPanel = $repeatable.find('.panel-acc').length;

            if (totalPanel != 2) {
                var result = confirm("Are Your sure");
                if (result === true) {
                    panel.remove();
                }

            } else {
                alert("Hey Dude! You can't delete last item :)");
            }
        });

        /** Start Live change Title **/
        $document.on('keyup', '.title-acc', function () {
            var newValue = $(this).val();
            $(this).closest('.panel-acc').find('.panel-title > a  > .tx-title').text(newValue);

            if (!(newValue.length) === 0 && ($(this).closest('.panel-acc').hasClass('panel-danger'))) {
                $(this).closest('.panel-acc').removeClass('panel-danger').addClass('panel-default');
            }
        });

        /** Start Icon change **/
        $document.on('change', '.selectized', function () {
            var newIcon = $('i').attr('class');
            var newIconChange = $(this).val();

            if (newIcon !== newIconChange) {
                var $titleIcon = $(this).closest('.panel-acc').find('#title-icon');
                $titleIcon.removeClass();
                $titleIcon.addClass('fa fa-' + newIconChange);
            }
        });


        /** Open Close select box **/
        //$document.on('change', '.openclose', function () {
        //    var checked = $(this).prop('checked');
        //});


        /** Start Insert into Editor Panel **/
        $document.on('click', '.action-insert', function () {
            var $presets = $('.presets').val();
            var $accordions = [];
            var $error = false;

            $('.panel-acc').each(function () {
                if ($(this).hasClass("clonable")) {
                    return;
                }

                var $title = $(this).find('.title-acc').val();
                var $icon = $(this).find('.selectized').val();
                var $content = $(this).find('.content').val();
                var $openclose = $(this).find('.openclose').prop('checked') ? "in": "";

                if (($title.length === 0) || ($content.length === 0)) {
                    $(this).removeClass('panel-default').addClass('panel-danger');
                    $error = true;
                } else {
                    $(this).removeClass('panel-danger').addClass('panel-default ');
                }

                $accordions.push(generateAccordionShortcode($title, $openclose, $icon, $content));
            });

            if (!$error) {
                wp.media.editor.insert('[xa_acc style="' + $presets + '" ]' + $accordions.join('') + '[/xa_acc]');
                $('#xa-modal').modal('hide');
            }

        });

        var $panelCollapse = $('.panel-collapse-acc');

        if (!$panelCollapse.hasClass('in')) {
            $panelCollapse.addClass('in');
        }

        /** Admin Style Change **/
        $document.on('change', '.presets', function () {
            var newIconChange = $(this).val();
            var newIcon = $repeatable.attr('class');

            if (newIcon !== newIconChange) {
                $(this).next('#repeatable').removeClass(newIcon);
                $(this).next('#repeatable').addClass('panel-group ui-sortable ' + newIconChange);
            }
        });
    });

})(jQuery);