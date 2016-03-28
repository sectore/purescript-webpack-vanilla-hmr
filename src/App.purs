module App where

import Control.Monad.Eff (Eff)
import Control.Monad.Eff.Exception (EXCEPTION)
import Control.Monad.Eff
import DOM (DOM)
import Signal.Channel (CHANNEL)
import Prelude(bind, return)
import Pux (App, start, fromSimple, renderToDOM)
import App.Counter (State, Action, update, view)

type AppEffects eff = (err :: EXCEPTION, channel :: CHANNEL | eff)

main :: State -> Eff (AppEffects (dom :: DOM)) (App State Action)
main state = do
  app <- start
    { initialState: state
    , update: fromSimple update
    , view: view
    , inputs: []
    }
  renderToDOM "#app" app.html
  return app
