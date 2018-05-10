try {
  var Router = require('Router.js')
  var m      = require('mithril')
}
catch(e){}

m.mount(document.documentElement, {
  view: () => [
    m('head',
      m('style', `
        body {
          padding: 1em;
          font-family: sans-serif;
        }
      `)
    ),

    m('body',
      m('.bar',
      ),
      m('.main',
        m('h1', 'Hello'),

        m(Router, {
          '/': () =>
            m('p', 'Root!'),

          '/demo.html': () =>
            m('p', 'Demo!'),

          '/:404?': () =>
            m('p', '404!'),

          then: console.log.bind(console),
          catch: console.log.bind(console),
          finally: console.log.bind(console),
        })
      ),

      m('p',
        m(Link,
          m('a[href=/]', 'Root!'),
        ),
      ),

      m('p',
        m(Link,
          m('a[href=/demo.html?foo=bar]', 'Demo!'),
        ),
      ),

      m('p',
        m(Link,
          m('a[href=/aeterytry]', '...Somewhere else?'),
        ),
      ),
    ),
  ]
})
