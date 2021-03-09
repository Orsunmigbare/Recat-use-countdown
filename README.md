# react-use-countdown

> Made with create-react-library

[![NPM](https://img.shields.io/npm/v/react-use-countdown.svg)](https://www.npmjs.com/package/react-use-countdown) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-use-countdown
```

## Usage

```tsx
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
```

## License

MIT © [Orsunmigbare](https://github.com/Orsunmigbare)
