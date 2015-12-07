<?php

use Silex\Provider\UrlGeneratorServiceProvider;
use Silex\Provider\TwigServiceProvider;

$app->register( new UrlGeneratorServiceProvider() );

$app->register(
    new TwigServiceProvider(),
    array(
        'twig.options' => array(
            'cache'            => isset( $app['twig.options.cache'] ) ? $app['twig.options.cache'] : false,
            'strict_variables' => true
        ),
        'twig.path'    => array( __DIR__ . '/../resources/views' )
    )
);
