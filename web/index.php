<?php
error_reporting( E_ALL | E_STRICT );
ini_set( 'display_errors', 1 );
ini_set( 'log_errors', 1 );

require_once __DIR__ . '/../vendor/autoload.php';

$app = new Silex\Application();

$app['debug'] = true;

require __DIR__ . '/../resources/config/prod.php';
require __DIR__ . '/../src/app.php';
require __DIR__ . '/../src/controllers.php';

$app->run();
