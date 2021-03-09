import { useEffect, useRef, useState } from "react";

const millisToMinutesAndSeconds = (millis: any) => {
  let h, m, s;
  h = Math.floor(millis / 1000 / 60 / 60);
  m = Math.floor((millis / 1000 / 60 / 60 - h) * 60);
  s = Math.floor(((millis / 1000 / 60 / 60 - h) * 60 - m) * 60);
  return h + ":" + m + ":" + (s < 10 ? "0" : "") + s;
};

export const UseCountDown = ({ future, onTimeout }: CountDownProps): ReturnProps => {
  const intervalRef: any = useRef();
  const [state, setState] = useState({
    realTime: "",
    canceled: false,
    futureTime: future,
    timedOut: false,
  });

  const { realTime, canceled, futureTime, timedOut } = state;

  useEffect(() => {
    if (!futureTime) return;
    if (futureTime - Date.now().valueOf() <= 0) return cancelTimeout(false);

    intervalRef.current = window.setInterval(() => {
      setState({
        ...state,
        realTime: millisToMinutesAndSeconds(futureTime - Date.now().valueOf()),
      });
    }, 1050);

    window.setTimeout(
      () => cancelTimeout(false),
      futureTime - Date.now().valueOf()
    );

    return () => cancelTimeout(false);
  }, [futureTime]);

  const cancelTimeout = (canceled = true) => {
    window.clearInterval(intervalRef.current);

    setState({ ...state, timedOut: true, canceled: canceled, realTime: "" });
    onTimeout?.();
  };

  return {
    realTime,
    timedOut,
    setFutureTime: (time: any) => setState({ ...state, futureTime: time }),
    canceled,
    cancelTimeout,
  };
};



interface CountDownProps {
  /**
   *  (milliseconds) a future date to countdown to
   */
  future?: number
  /**
   * function to be called when the coundown ends
   */
  onTimeout?: () => void
}

interface ReturnProps {
  /**
   * the current value ot the timeout, which changes every second
   */
  realTime: string
  /**
   * boolean value representing if the countdown timed out i.e if it reached 0:0:0
   */
  timedOut: boolean
  /**
   * function to override or set the count down time anytime and from anywhere in the code
   */
  setFutureTime: (time: number) => void
  /**
   * boolean value representing if the user cancelled the timeout i.e the countdown did not timeout but the user canceled
   */
  canceled: boolean
  /**
   * user canceled the timeout
   */
  cancelTimeout: () => void
}
