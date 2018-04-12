module App where

import Prelude
import Control.Monad.Eff (Eff)
import Pux (App, CoreEffects, start)
import Pux.DOM.Events (DOMEvent)
import Pux.Renderer.React (renderToDOM)
import App.Counter (Action, State, update, view)

type WebApp = App (DOMEvent -> Action) Action State

main :: forall e . State -> Eff (CoreEffects e) WebApp
main state = do
  app <- start
    { initialState: state
    , foldp: update
    , view
    , inputs: []
    }
  _ <- renderToDOM "#app" app.markup app.input
  pure app
