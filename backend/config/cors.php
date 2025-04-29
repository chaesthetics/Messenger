<?php

return [

'supports_credentials' => false,

'allowed_origins' => [
    'http://35.232.205.217',  // Your frontend domain
    'https://messenger-chaesthetics-projects.vercel.app/login',
    'https://messenger-nine-murex.vercel.app/login',
],

'allowed_origins_patterns' => [],

'allowed_headers' => ['*'],
'allowed_methods' => ['*'],
'exposed_headers' => [],
'max_age' => 0,
];
