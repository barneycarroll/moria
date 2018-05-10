try {
  var UniversalRouter = require('universal-router')
  var History         = require('history')
} catch(e){}

const history = History.createBrowserHistory()

try {
  module.exports = {Router, Link, history}
} catch(e){}

const routers = new Set

history.listen((location, action) => {
  for(resolve of routers)
    resolve({
      action,
      location: history.createHref(location)
    })
})

function Link(){
  return {
    view: v => v.children,

    oncreate: ({dom}) => {
      dom.addEventListener('click', e => {
        if(e.target === dom && dom.href){
          e.preventDefault()

          history.push(dom.href.replace(dom.origin, ''))
        }
      })
    },
  }
}

function Router(v){
  let   state   = {}

  const router  = new UniversalRouter(
    Object.keys(v.attrs).map(key => ({
      path   : key,
      action : ({params, path}) => ({
        key,
        path,
        params,
      }),
    })),
  )

  const resolve = ({
    action,
    location = history.createHref(history.location),
  }) => {
    state = {action, path: location}

    const promise = router.resolve({
      action,
      pathname : location,
    })
      .then(({key, params}) => {
        Object.assign(state, {key, params})
      })
      .catch(error => {
        Object.assign(state, {error})
      })
      .finally(() => {
        m.redraw()
      })

    for(const method of ['then', 'catch', 'finally'])
      promise[method](() => {
        if(v.attrs[method])
          v.attrs[method](state)
      })
  }

  resolve({
    location: history.createHref(location)
  })

  return {
    view: v =>
        state.key
      &&
        v.attrs[state.key]
      &&
        v.attrs[state.key](state),

    oninit: () => {
      routers.add(resolve)
    },
    onremove: () => {
      routers.delete(resolve)
    },
  }
}
