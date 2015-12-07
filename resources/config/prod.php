<?php

$app['cache.path']           = __DIR__ . '/../cache';
$app['http_cache.cache_dir'] = $app['cache.path'] . '/http';
$app['twig.options.cache']   = $app['cache.path'] . '/twig';