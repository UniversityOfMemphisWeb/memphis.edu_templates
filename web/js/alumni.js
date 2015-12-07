$(document).ready(function() {
    var $alumni_form = $('.type--alumni__form'),
        $alumni_form_click = $('.type--alumni__form__click', $alumni_form);

    $('.select-style').selectBox({
        mobile: true
    });
    $('.select-style2').selectBox({
        mobile: true
    });

    if ($('div').hasClass('type--alumni__switcher')) {
        var $alumniSwitcher = $('.type--alumni__switcher__images');

        $alumniSwitcher.on('cycle-initialized', function() {
            $alumniSwitcher.css('opacity', '1');
        });

        $alumniSwitcher.cycle({
            'carouselFluid': true,
            'log': false,
            'prev': '.type--alumni__switcher__prev',
            'next': '.type--alumni__switcher__next',
            'pager': '.type--alumni__switcher__lists',
            'pagerActiveClass': 'selected',
            'pagerTemplate': '<li><span>{{title}}</span></li>',
            'pauseOnHover': true,
            'slides': '> .type--alumni__switcher__image',
            'swipe': true,
            'timeout': 5000
        });
    }

    if ($('div').hasClass('type--alumni__umma-partners--slider__overlay')) {
        var $ummaPartnersSlider = $('.type--alumni__umma-partners--slider__overlay');

        $ummaPartnersSlider.on('cycle-initialized', function() {
            $ummaPartnersSlider.css('opacity', '1');
        });

        $ummaPartnersSlider.cycle({
            'carouselFluid': true,
            'fx': 'scrollHorz',
            'log': false,
            'prev': '.type--alumni__umma-partners--slider__prev',
            'next': '.type--alumni__umma-partners--slider__next',
            'pauseOnHover': true,
            'slides': '> .type--alumni__umma-partners--slider__slide',
            'swipe': true,
            'timeout': 5000
        });
    }
});