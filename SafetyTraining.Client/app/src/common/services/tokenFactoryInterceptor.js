/*************************
Pixis | Safety Training App 

tokenFactoryInterceptor

Auth: TmAck.072 <tonymclaughlin72@gmail.com> 
Date: 3/11/15
*************************/

'use strict';


app.factory('tokenFactoryInterceptor', function($q, $window) {
  return {
    'request': function(config) {
        // clean URL strip out odata $
        config.url = config.url.replace(/\$/g, '');

        var token = $window.localStorage.getItem('token');

        if (token) {
          config.headers['UserId'] = token;
          console.log(token);
          console.log(config);
        }

        return config;
    },

   'requestError': function(rejection) {
       // on error
       $location.path('/');
    },

  };
})
