$(document).ready(function() {

    var $html = $('html'),
        $header_menu_button = $('#header--menu__button'),
        $header_menu_button_bars = $('#header--menu__button__bars', $header_menu_button),
        $header_menu = $('#header--menu'),
        $header_bottom = $('#header--bottom'),
        $header_bottom_links = $('nav > ul > li', $header_bottom),
        $header_box = $('#header--box'),
        $header_box_click = $('.header--box__click', $header_box),
        $header_box_arrow = $('#header--box__arrow', $header_box),
        $header_box_list = $('#header--box__list', $header_box),
        $header_box_links = $('a', $header_box_list),
        $header_mega_close = $('#header--mega__close', $header_box),
        $circle = $('.icon--circle'),
        $nav_list__top__title = $('#nav--list__top .sidebar--box__title'),
        $nav_list = $('.nav--list'),
        $nav_list_link = $('.has-subpage > a', $nav_list),
        $footer = $('footer'),
        $footer_sitemap = $('#footer--full__sitemap', $footer),
        $footer_lists = $('#footer--lists', $footer),
        class_no_height = 'wrap--home__no-height',
        hidden = 'hidden',
        show = 'show',
        class_horizontal = 'fa-flip-horizontal',
        class_vertical = 'fa-flip-vertical',
        class_90 = 'fa-rotate-90',
        class_vh = 'visuallyhidden',
        menu_open = '',
        menu_mega_open = '',
        fancybox_option = {
            padding: 0
        };

    (function($,sr){
        var debounce = function (func, threshold, execAsap) {
            var timeout;

            return function debounced () {
                var obj = this, args = arguments;
                function delayed () {
                    if (!execAsap) {
                        func.apply(obj, args);
                    }

                    timeout = null;
                }

                if (timeout) {
                    clearTimeout(timeout);
                } else if (execAsap) {
                    func.apply(obj, args);
                }

                timeout = setTimeout(delayed, threshold || 100);
            };
        };

        $.fn[sr] = function(fn){  return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr); };

    })($,'smartresize');

    //$(window).smartresize(function(){
    //});

    var menu_list = function(that, type) {
        var $that = $(that),
            that_link = $(' > a', $that),
            $that_lists = $(' > ul', $that),
            that_text = $.trim(that_link.text()),
            $that_icon = $('i', that_link),
            type = typeof type !== 'undefined' ? Boolean(type) : false;

        if (type) {
            if (that_text !== menu_open) {
                menu_open = that_text;
                $that.addClass('selected');
                $that_icon.removeClass('fa-plus').addClass('fa-minus');
                $that_lists.removeClass('col-xs-hidden').addClass('col-xs-show');
                return;
            } else {
                menu_open = '';
            }
        }

        $that.removeClass('selected');
        $that_icon.removeClass('fa-minus').addClass('fa-plus');
        $that_lists.removeClass('col-xs-show').addClass('col-xs-hidden');
    };

    var menu_mega_list = function(that, type) {
        var $that = $(that),
            that_data = $that.data('box'),
            that_data_mega = $('[data-box-mega='+that_data+']'),
            type = typeof type !== 'undefined' ? Boolean(type) : false,
            selected = 'selected';

        if (type) {
            if (that_data !== menu_mega_open) {
                $that.addClass(selected);
                $header_mega_close.removeClass('col-xs-hidden').addClass('col-xs-show');
                that_data_mega.removeClass('col-xs-hidden').addClass('col-xs-show');
                menu_mega_open = that_data;
                return;
            } else {
                menu_mega_open = '';
            }
        }

        $that.removeClass(selected);

        if ($header_mega_close.hasClass('col-xs-show')) {
            $header_mega_close.removeClass('col-xs-show').addClass('col-xs-hidden');
        }

        that_data_mega.removeClass('col-xs-show').addClass('col-xs-hidden');
    };

    var menu_close_all = function() {
        $header_bottom_links.each(function() {
            menu_list(this);
        });
    };

    var menu_mega_close_all = function() {
        $header_box_links.each(function() {
            menu_mega_list(this);
        });
    };

    var is_header_bottom_mobile = function() {
        if ($header_bottom.css('position') !== 'absolute') {
            return true;
        }

        return false;
    };

    $('.popup').fancybox(fancybox_option);

    $('a[href*=#]:not([href=#])').click(function() {
        if (location.pathname.replace(/^\//,'') === this.pathname.replace(/^\//,'') || location.hostname === this.hostname) {

            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
            if (target.length) {
                $('html,body').animate({
                    scrollTop: target.offset().top
                }, 1000);
                return false;
            }
        }
    });

    $('.form-email').on('submit', function(e) {
        e.preventDefault();
        $.fancybox($.extend(fancybox_option, {
            href: '#overlay--email'
        }));
    });

    if ($('#menu--expand').length > 0) {
        var $menu_expand = $('#menu--expand'),
            $menu_expand_link = $('a', $menu_expand),
            $menu_expand_icon = $('i', $menu_expand_link),
            $menu_list = $('ul.top--links');

        $menu_expand_link.on('click', function(e) {
            e.preventDefault();

            if ($menu_expand_icon.hasClass(class_vertical)) {
                $menu_expand_icon.removeClass(class_vertical);
                $menu_list.removeClass('col-xs-show').addClass('col-xs-hidden');
            } else {
                $menu_expand_icon.addClass(class_vertical);
                $menu_list.removeClass('col-xs-hidden').addClass('col-xs-show');
            }
        });
    }

    if ($('div').hasClass('slideshow--slider')) {
        var $slideshow_slider = $('.slideshow--slider');

        $slideshow_slider.on('cycle-initialized', function() {
            $slideshow_slider.css('opacity', '1');
        });

        $slideshow_slider.cycle({
            'captionPlugin': 'caption2',
            'carouselFluid': true,
            'fx': 'scrollHorz',
            'log': false,
            'overlay': '.slideshow--overlay__wrapper',
            'overlayFxOut': 'slideUp',
            'overlayFxIn': 'slideDown',
            'overlayTemplate': '<a href="{{href}}"><div class="slideshow--overlay__title">{{title}}</div><div class="slideshow--overlay__desc">{{desc}}</div></a>',
            'pager': '.slideshow--slider__pager__wrapper',
            'pagerActiveClass': 'slideshow--slider__pager__active',
            'pauseOnHover': true,
            'slides': '> .slideshow--slider__slide',
            'swipe': true,
            'timeout': 5000
        });
    }

    if ($('div').hasClass('slideshow-page--slider')) {
        var $slideshow_page_slider = $('.slideshow-page--slider');

        $slideshow_page_slider.on('cycle-initialized', function(event, optionHash) {
            $slideshow_page_slider.css('opacity', '1');
            var $slideshowSlide = $('> .slideshow-page--slider__slide', $slideshow_page_slider),
                $slideshowSlideTextCount = 0;
            $slideshowSlide.each(function(i, val) {
                if (val.getAttribute('data-cycle-desc') || val.getAttribute('data-cycle-title')) {
                    $slideshowSlideTextCount++;
                }
            });

            if ($slideshowSlideTextCount) {
                $('.slideshow-page--slider__pager').addClass('slideshow-page--slider__pager__text');
            }
        });

        $slideshow_page_slider.cycle({
            'captionPlugin': 'caption2',
            'carouselFluid': true,
            'fx': 'scrollHorz',
            'log': false,
            'overlay': '.slideshow-page--overlay',
            'overlayTemplate': '<div></div>',
            'pager': '.slideshow-page--slider__pager__wrapper',
            'pagerActiveClass': 'slideshow-page--slider__pager__active',
            'pauseOnHover': true,
            'slides': '> .slideshow-page--slider__slide',
            'swipe': true,
            'timeout': 5000
        }).on('cycle-update-view', function(event, optionHash, slideOptionsHash, currentSlideEl) {
            if (!currentSlideEl.getAttribute('data-cycle-desc') || !currentSlideEl.getAttribute('data-cycle-title')) {
                slideOptionsHash.overlayTemplate = '<div></div>';
            } else {
                slideOptionsHash.overlayTemplate = '<a href="{{href}}"><div class="slideshow-page--overlay__wrapper"><div class="slideshow-page--overlay__title">{{title}}</div><div class="slideshow-page--overlay__desc">{{desc}}</div></div></a>';
            }
        });
    }

    $('html').on('click', function() {
        var $ul = $('ul ul', $header_bottom);

        if ($ul.is(':visible')) {
            menu_close_all();
            menu_open = '';
        }
    });

    $header_menu_button_bars.on('click', function(e) {
        e.preventDefault();

        var $that = $(this);

        if ($header_menu.hasClass('col-xs-'+hidden)) {
            $header_menu.removeClass('col-xs-'+hidden).addClass('col-xs-'+show);
            $that.removeClass('fa-bars').addClass('fa-close');
        } else {
            $header_menu.removeClass('col-xs-'+show).addClass('col-xs-'+hidden);
            $that.removeClass('fa-close').addClass('fa-bars');
        }
    });

    $header_bottom_links.on('click mouseenter', function(e) {
        if (e.type === 'mouseenter') {

            if (is_header_bottom_mobile()) {
                return;
            }
        }

        menu_close_all();
        menu_list(this, true);

        if ($(e.target).is('a, i')) {
            e.stopPropagation();
            return false;
        }
    });

    $header_bottom_links.on('mouseleave', function(e) {

        if (is_header_bottom_mobile()) {
            return;
        }

        menu_close_all();
        menu_open = '';

        if ($(e.target).is('a, i')) {
            e.stopPropagation();
            return false;
        }
    });

    $header_box_click.on('click', function(e) {
        e.preventDefault();

        if ($header_box_list.hasClass(class_vh)) {
            $header_box_list.removeClass(class_vh);
            $header_box_arrow.addClass(class_horizontal);
        } else {
            $header_box_list.addClass(class_vh);
            $header_box_arrow.removeClass(class_horizontal);
            menu_mega_close_all();
            menu_mega_open = '';
        }
    });

    $header_box_links.on('click', function(e) {
        e.preventDefault();

        menu_mega_close_all();
        menu_mega_list(this, true);
    });

    $header_mega_close.on('click', function(e) {
        e.preventDefault();

        menu_mega_close_all();
        menu_mega_open = '';
    });

    if ($('#masonry').length > 0) {
        var $masonry = $('#masonry'),
            $masonry_item = $('.item', $masonry),
            $masonry_item_layer = $('.item--layer', $masonry_item),
            $masonry_item_layer_second = $('.item--layer__second', $masonry_item),
            $masonry_item_link = $('.item--layer__link', $masonry_item);

        $html.on('click', function() {
            $masonry_item_layer_second.each(function() {
                var $that = $(this);

                if (!$that.hasClass(class_vh)) {
                    $that
                        .stop()
                        .animate({
                            opacity: 0.25
                        }, 300, function() {
                            $(this).addClass(class_vh).css({opacity: 1});
                        })
                        .siblings('.item--layer')
                        .removeClass(class_vh);
                }
            });
        });

        $masonry_item_link.on('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            var $that = $(this),
                $that_item = $that.closest('.item'),
                that_count = 0,
                that_length = $masonry_item_layer_second.length,
                animation_after = function(){
                    $that_item.children('.item--layer').addClass(class_vh);
                    $that_item.children('.item--layer__second').removeClass(class_vh);
                };

            $masonry_item_layer.each(function() {
                $(this).removeClass(class_vh);
            });

            $masonry_item_layer_second.each(function() {
                var $that = $(this);

                $that
                    .stop()
                    .animate({
                        opacity: 0.25
                    }, 300, function() {
                        $that.addClass(class_vh).css({opacity: 1});
                        if (++that_count >= that_length) {
                            animation_after();
                        }
                    }
                );
            });
        });
    }

    $circle.on('click', function(e) {
        e.preventDefault();

        var $that = $(this),
            $parent = $that.closest('.wrap--home');

        if ($that.hasClass(class_vertical)) {
            $that.removeClass(class_vertical);
            $parent.removeClass(class_no_height).find('.mobile-'+hidden).removeClass('mobile-'+hidden).addClass('mobile-'+show);
        } else {
            $that.addClass(class_vertical);
            $parent.addClass(class_no_height).find('.mobile-'+show).removeClass('mobile-'+show).addClass('mobile-'+hidden);
        }
    });

    $nav_list__top__title.on('click', function(e) {
        e.preventDefault();

        var $that = $(this),
            $that_icon = $('i', $that),
            $that_list = $that.siblings('.nav--list');

        if ($that_icon.hasClass('fa-angle-up')) {
            $that_icon.removeClass('fa-angle-up').addClass('fa-angle-down');
            $that_list.addClass('col-xs-show');
        } else {
            $that_icon.removeClass('fa-angle-down').addClass('fa-angle-up');
            $that_list.removeClass('col-xs-show');
        }

    });

    $nav_list_link.on('click', function(e) {
        e.preventDefault();

        var $that = $(this),
        $that_parent = $that.parent('li');

        if ($that_parent.hasClass('selected')) {
            $that_parent.removeClass('selected');
        } else {
            $that_parent.addClass('selected');
        }
    });

    $footer_sitemap.on('click', function(e) {
        e.preventDefault();

        var $that = $(this),
            $that_child = $('i', $that);

        if ($that_child.hasClass(class_90)) {
            $that_child.removeClass(class_90);
            $footer_lists.addClass('col-xs-'+hidden);
        } else {
            $that_child.addClass(class_90);
            $footer_lists.removeClass('col-xs-'+hidden);
        }
    });
});

$(window).load(function() {
    $('.lazy').show().lazyload({
        skip_invisible : false,
        threshold : 200
    });
});