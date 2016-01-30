import React from 'react'
import { Provider } from 'react-redux'
import Playground from './components/Playground'
import store from './redux/store'

const CodePlayground = (props) => {
  return (
    <Provider store={store}>
      <Playground
        {...props}
      />
    </Provider>
  )
}

export default CodePlayground
