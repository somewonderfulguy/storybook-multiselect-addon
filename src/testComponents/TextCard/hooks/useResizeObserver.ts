import {
  MutableRefObject,
  useCallback,
  useLayoutEffect,
  useRef,
  useState
} from 'react'

import throttle from '../helpers/throttle'

const useResizeObserver = <T extends Element>(
  delay = 0,
  initialBounds = { left: 0, top: 0, width: 0, height: 0 }
) => {
  const elemRef = useRef<Element>(null)
  const [bounds, setBounds] = useState(initialBounds)

  const observer = throttle(
    ([entry]) =>
      setBounds(
        Array.isArray(entry) ? entry[0].contentRect : entry.contentRect
      ),
    delay
  )
  const [resizeObserver] = useState(() => new ResizeObserver(observer))
  const disconnect = useCallback(
    () => resizeObserver.disconnect(),
    [resizeObserver]
  )

  useLayoutEffect(() => {
    if (elemRef.current) {
      resizeObserver.observe(elemRef.current)
    }
    return disconnect
  }, [resizeObserver, disconnect])

  return [elemRef, bounds] as [MutableRefObject<T>, typeof initialBounds]
}

export default useResizeObserver
