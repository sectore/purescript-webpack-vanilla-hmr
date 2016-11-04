module App where

import Control.Monad.Eff (Eff)
import Prelude(bind, pure)
import Pux (App, CoreEffects, start, fromSimple, renderToDOM)
import App.Counter (State, Action, update, view)

main :: forall e. State -> Eff (CoreEffects e) (App State Action)
main state = do
  app <- start
    { initialState: state
    , update: fromSimple update
    , view: view
    , inputs: []
    }
  renderToDOM "#app" app.html
  pure app
