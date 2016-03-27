module App.Counter where

import Prelude((+), (-), (++), const, show)
import Control.Monad.Eff
import Pux.Html (Html, (!), (#), bind, h1, h3, div, button, text)
import Pux.Html.Events (onClick)

data Action = Increment | Decrement

type State = Int

initialState :: State
initialState = 0

update :: Action -> State -> State
update Increment state = state + 1
update Decrement state = state - 1

view :: State -> Html Action
view state =
  div # do
    h1 # text "PureScript + Vanilla HMR"
    h3 # text ("Count: " ++ show state)
    div # do
      button ! onClick (const Increment) # text "Increment"
      button ! onClick (const Decrement) # text "Decrement"
