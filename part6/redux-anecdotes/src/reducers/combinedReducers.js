import filterReducer from './filterReducer'
import anecdoteReducer from './anecdoteReducer'
import { combineReducers, createStore } from 'redux'

const reducer = combineReducers({
  anecdotes: anecdoteReducer,
  filter: filterReducer,
})

const store = createStore(reducer)

export default store
