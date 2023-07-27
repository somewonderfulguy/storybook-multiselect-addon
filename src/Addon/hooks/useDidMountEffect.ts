import { useEffect, useRef, EffectCallback, DependencyList } from 'react'

/** A hook very much like `useEffect` but executes only once */
export const useDidMountEffect = (
  fn: EffectCallback,
  deps?: DependencyList
) => {
  const didMountRef = useRef(false)

  useEffect(() => {
    if (didMountRef.current) return
    else didMountRef.current = true
    return fn()
  }, deps)
}
