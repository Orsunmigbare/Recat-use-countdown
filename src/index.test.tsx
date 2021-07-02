import { unmountComponentAtNode } from 'react-dom'
import { UseCountDown } from './index'
import React, { useState } from 'react'
import { render, fireEvent, cleanup } from '@testing-library/react'
import { act } from 'react-dom/test-utils'

let container: HTMLElement

beforeEach(() => {
  container = document.createElement('div')
  document.body.appendChild(container)
  cleanup()
})

afterEach(() => {
  unmountComponentAtNode(container)
  container.remove()
  cleanup()
})

const MockCompnent = ({ future }: any) => {
  const [onTimeOut, setOnTimeOut] = useState(false)
  const {
    realTime,
    timedOut,
    canceled,
    setFutureTime,
    cancelTimeout
  } = UseCountDown({
    future: future || null,
    onTimeout: () => setOnTimeOut(true)
  })

  return (
    <>
      <div id='realtime'>{realTime}</div>
      <div id='timedOut'>{`${timedOut}`}</div>
      <div id='canceled'>{`${canceled}`}</div>
      <div id='onTimeOut'>{`${onTimeOut}`}</div>
      <button
        id='setFutureTime'
        onClick={() => setFutureTime(Date.now() + 5000)}
      >
        setFutureTime
      </button>
      <button id='cancel' onClick={() => cancelTimeout()}>
        Cancel Timeout
      </button>
    </>
  )
}

it('Renders correct initial values', () => {
  const { container } = render(<MockCompnent />)
  expect(container.querySelector('#realtime')?.textContent).toEqual('')
  expect(container.querySelector('#timedOut')?.textContent).toEqual('false')
  expect(container.querySelector('#canceled')?.textContent).toEqual('false')
})

it('sets future with future prop value', () => {
  jest.useFakeTimers()
  const { container } = render(<MockCompnent future={Date.now() + 5000} />)
  act(() => {
    jest.advanceTimersByTime(1050)
  })

  expect(container.querySelector('#realtime')?.textContent?.toString()).toMatch(
    /([01]?\d|2[0-9]):([0-5]?\d|2[0-9]):([0-5]?\d|2[0-9])$/
  )
  jest.useRealTimers()
})

it('sets future value on SetFuture', () => {
  jest.useFakeTimers()
  const { container, getByText } = render(<MockCompnent />)
  const button: HTMLElement | any = getByText('setFutureTime')

  fireEvent.click(button)
  act(() => {
    jest.advanceTimersByTime(1070)
  })

  expect(container.querySelector('#realtime')?.textContent?.toString()).toMatch(
    /([01]?\d|2[0-9]):([0-5]?\d|2[0-9]):([0-5]?\d|2[0-9])$/
  )
  jest.useRealTimers()
})

it('stops countdown on cancel timeout', () => {
  jest.useFakeTimers()
  const { container, getByText } = render(
    <MockCompnent future={Date.now() + 50000} />
  )
  const button: HTMLElement | any = getByText('Cancel Timeout')
  act(() => {
    jest.advanceTimersByTime(1050)
    fireEvent.click(button)
  })

  expect(container.querySelector('#canceled')?.textContent).toEqual('true')
  expect(container.querySelector('#timedOut')?.textContent).toEqual('true')

  jest.useRealTimers()
})

it('times out on countdown end', () => {
  jest.useFakeTimers()
  const { container } = render(<MockCompnent future={Date.now() + 5000} />)

  act(() => {
    jest.advanceTimersByTime(2000)
  })
  expect(container.querySelector('#realtime')?.textContent?.toString()).toMatch(
    /([01]?\d|2[0-9]):([0-5]?\d|2[0-9]):([0-5]?\d|2[0-9])$/
  )

  act(() => {
    jest.advanceTimersByTime(6000)
  })

  expect(container.querySelector('#realtime')?.textContent).toEqual('')
  expect(container.querySelector('#timedOut')?.textContent).toEqual('true')
  jest.useRealTimers()
})

it('triggers on Timeout function after timeout', () => {
  jest.useFakeTimers()
  const { container } = render(<MockCompnent future={Date.now() + 5000} />)

  expect(container.querySelector('#onTimeOut')?.textContent).toEqual('false')

  act(() => {
    jest.advanceTimersByTime(6000)
  })

  expect(container.querySelector('#onTimeOut')?.textContent).toEqual('true')
  jest.useRealTimers()
})
