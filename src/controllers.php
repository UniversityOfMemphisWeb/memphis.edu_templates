<?php

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

$app->get(
    '/',
    function (Request $request) use ($app) {
        return $app['twig']->render('index.html.twig');
    }
)->bind('homepage');

$app->get(
    '/microsite/',
    function (Request $request) use ($app) {
        return $app['twig']->render('microsite.html.twig');
    }
)->bind('microsite');

$app->get(
    '/microsite-logo/',
    function (Request $request) use ($app) {
        return $app['twig']->render('microsite-logo.html.twig');
    }
)->bind('microsite-logo');

$app->get(
    '/microsite/subpage/',
    function (Request $request) use ($app) {
        return $app['twig']->render('microsite-subpage.html.twig');
    }
)->bind('microsite-subpage');

$app->get(
    '/microsite/subpage/faculty/',
    function (Request $request) use ($app) {
        return $app['twig']->render('microsite-subpage-faculty.html.twig');
    }
)->bind('microsite-subpage-faculty');

$app->get(
    '/subpage/',
    function (Request $request) use ($app) {
        return $app['twig']->render('subpage.html.twig');
    }
)->bind('subpage-home');

$app->get(
    '/web-directory/',
    function (Request $request) use ($app) {
        return $app['twig']->render('web-directory.html.twig');
    }
)->bind('web-directory');

$app->get(
    '/alumni/',
    function (Request $request) use ($app) {
        return $app['twig']->render('alumni.html.twig');
    }
)->bind('alumni');

$app->get(
    '/alumni/subpage/',
    function (Request $request) use ($app) {
        return $app['twig']->render('alumni-subpage.html.twig');
    }
)->bind('alumni-subpage');

$app->error(function (\Exception $e, $code) use ($app) {
    if ($app['debug']) {
        return;
    }
    return $app->redirect($app["url_generator"]->generate("homepage"));
});
