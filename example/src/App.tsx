import React from 'react'

import { UseCountDown } from 'react-use-countdown'
import 'react-use-countdown/dist/index.css'

const App = () => {
  const {
    realTime,
    timedOut,
    canceled
  } = UseCountDown({
    future: Date.now().valueOf() + 40000
  });


  return (
    <div>
      realttime :  {realTime}, <br />
      timedOut: {timedOut.toString()}, <br />
      canceled: {canceled.toString()}
    </div>
  )
}

export default App
