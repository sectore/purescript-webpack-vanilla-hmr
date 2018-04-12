module App.Counter where

import Prelude
import Pux.DOM.Events (onClick)
import Pux (EffModel, noEffects)
import Pux.DOM.HTML (HTML)
import Text.Smolder.HTML (button, h1, h3, div) as S
import Text.Smolder.Markup (text) as S
import Text.Smolder.Markup ((#!))

data Action = Increment | Decrement

type State = Int

initialState :: State
initialState = 0

update :: forall e . Action -> State ->  EffModel State Action e
update Increment state = noEffects $ state + 1
update Decrement state = noEffects $ state - 1

view :: State -> HTML Action
view state =
  S.div do
    S.h1 $ S.text "PureScript + Vanilla HMR"
    S.h3 $ S.text $ ("Count: " <> show state)
    S.div do
      S.button #! onClick (const Increment) $ S.text "Increment"
      S.button #! onClick (const Decrement) $ S.text "Decrement"
