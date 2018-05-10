# Moria v2

A Router component for Mithril in the vein of react-router, using universal-router &amp; history. Designed for the browser. Light &amp; assumptuous. 

## Go on?

Download, run `npm start`, then open the URL displayed in the CLI and navigate to `demo.html` to see a basic example.

## Yeah but

Exports an object like this:

```js
const {Router, Link, history} = require('mithril-router')
```

## Hang on

```js
// Nestable route definitions!
m(Router, {
    '/paths' : () => 'Map to views!',
    '/:404?' : () => 
        'https://github.com/pillarjs/path-to-regexp',
    '/how'   : () => [
        'https://www.kriasoft.com/universal-router/',
        // ^ simplified and extended
        'https://github.com/ReactTraining/history#usage',
    ],
    '/they'  : ({ // are given cool stuff:
            key, path, params, action,
        }) => '',

    then: sameAsAbove => {},
    catch: sameAsAbove => {}, 
    finally: sameAsAbove => {}, 
})

// Links!
m(Link, 
    m('a[href=/adsfhtyu]', 'LOL!')
)

// The constructed history object!
history.goBack()
history.replace('/_srtryq345tgv')
```
