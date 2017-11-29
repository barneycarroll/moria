moria
=====

<a name=origin_version></a>A routing system for [Mithril v0.X](http://lhorie.github.io/mithril/)[*](#footnote_version).

Mithril has a beautiful lightweight routing paradigm, but as [legends recount](http://en.wikipedia.org/wiki/Durin), sometimes you need to [dig deep](http://en.wikipedia.org/wiki/Moria_(Middle-earth)) to get at the good bits: it's difficult to express the routing of a complex application when [m.route( rootElement, defaultRoute, routesHash )](http://lhorie.github.io/mithril/mithril.route.html#defining-routes) can only be invoked once and the routes hash has to be flat.

Moria aims to solve these problems by producing a Mithril-compatible route hash from nested hierarchies.

# Features

* Hierarchical route structures
* Route match functions
* Declarative redirects

# Install
```
npm install --save moria
```

```html
<script src=https://unpkg.com/moria></script>
```

# Use

```javascript
var moria = require( 'moria' );

var routeHash = moria( {
  ''          : loginModule,            // Results in '/loginModule',
  'search'    : '../shop/search',       // Redirect '/search' to '/shop/search'
  'shop'      : {
    ''         : browseModule,          // Results in '/shop'
    'search'   : searchModule,
    'checkout' : {
      'payment'  : foo,                 // Results in '/shop/checkout/payment'
      'delivery' : bar,
      'confirm'  : baz
    }
  },
  ':userName' : [                       // When '/:userName' is matched...
    function(){                         // This function will be executed...
      initUserModel();
    },
    profileModule                       // And this module will render
  ],
  'admin'     : [
    initAdminModel,                     // Another setup function
    {
      ''      : 'users',                // Redirect '/admin' to '/admin/users'
      'users' : [                       // When route matches '/admin/users'...
        initUsersModel,                 // Run initAdminModel && initUserModel...
        {
          ''          : usersListModule,// When we render usersListModule...
          ':userName' : editUserModule  // And when we render editUserModule
        }
      ]
    }
  ]
} );

m.route( document.body, '/', routeHash );
```

***

<a name=footnote_version></a>* Moria's last functional release was contemporaneous with Mithril v0.1.22, but it should work with any version below v1. It will not work with Mithril v1. Mithril v1 features a new component model which overlaps with Moria in an incompatible way & introduces semantic ambiguities into the routing model (Route Components vs Route Resolvers) which make routing plugins like Moria difficult to apply consistently. [↩︎](#origin_version)