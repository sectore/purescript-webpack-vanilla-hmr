module App where

import App.Counter (update, view)
import Prelude(bind, return)
import Control.Monad.Eff
import Pux (start, fromSimple, renderToDOM)

main state = do
  app <- start
    { initialState: state
    , update: fromSimple update
    , view: view
    , inputs: []
    }
  renderToDOM "#app" app.html
  return app
