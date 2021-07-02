import React from 'react'

import { UseCountDown } from 'react-use-countdown'
import 'react-use-countdown/dist/index.css'

const App = () => {
  const {
    setFutureTime,
    realTime,
    timedOut,
    canceled,
    cancelTimeout
  } = UseCountDown({
    future: undefined
  });


  const setFuture = () => {
    setFutureTime(Date.now().valueOf() + 40000)
  }
  console.log("Canceled -->", canceled);

  return (
    <div>
      <div>
        realttime :  {realTime}, <br />
        timedOut: {timedOut.toString()}, <br />
        canceled: {canceled.toString()}
      </div>
      <button onClick={() => cancelTimeout()}> Cancel </button>
      <button onClick={setFuture}> setFuture </button>
    </div>

  )
}

export default App
