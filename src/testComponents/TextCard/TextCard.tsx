import { CSSProperties, ReactNode, useLayoutEffect, useRef } from 'react'

import useResizeObserver from './hooks/useResizeObserver'

import './TextCard.css'

type Props = {
  /** Any valid react node, however if you want text to flow and match the shape of
   * block then `children` must be plain text or inline block. If no `children` provided
   * then there will be text "No description_". If you need to make it intentionally
   * empty - put any non `undefined` value. */
  children?: ReactNode
  /** Add class(es) to the most outer html element of the component. */
  className?: string
  /** `style` applied to the the most outer html element of the component.
   * Cannot override `height` as it used internally.
   * Use css `!important` if you need to override. */
  style?: CSSProperties
}

/** A component to wrap text (or components) with cyberpunk shaped & styled block.
 * The text will flow and match the shape of the block.
 */
const TextCard = ({ style, className, children }: Props) => {
  const [bindResizeObserver, { height }] = useResizeObserver<HTMLDivElement>()

  const outerShapeRef = useRef<HTMLDivElement | null>(null)
  const innerShapeRef = useRef<HTMLDivElement | null>(null)

  // keep useLayoutEffect - it affects how nicely position updates when content changes
  useLayoutEffect(() => {
    if (!innerShapeRef.current || !outerShapeRef.current) return

    // inner shape styling
    const innerShape = innerShapeRef.current
    const innerHeight = height - 105
    innerShape.style.setProperty(
      '--aug-tr',
      `${innerHeight < 70 ? 70 : innerHeight}px`
    )

    // outer shape top positioning
    const outerShape = outerShapeRef.current
    const outerHeightTop = height - 125
    outerShape.style.setProperty(
      '--aug-tr-extend2',
      `${outerHeightTop < 51 ? 51 : outerHeightTop}px`
    )

    // outer shape bottom positioning
    const outerHeightBottom = height - 140
    outerShape.style.setProperty(
      '--aug-br-inset2',
      `${height < 159 ? outerHeightBottom : 35}px`
    )

    // --block-height is for shape-outside (e.g. text wrapping)
    outerShape.style.setProperty(
      '--block-height',
      `${height < 175 ? 175 : height}px`
    )

    return () => {
      innerShape?.style.removeProperty('--aug-tr')
      outerShape?.style.removeProperty('--aug-tr-extend2')
      outerShape?.style.removeProperty('--aug-br-inset2')
      outerShape?.style.removeProperty('--block-height')
    }
  }, [height])

  return (
    <div
      className={`infoContainer ${className ?? ''}`}
      style={{ ...style, height: !height ? 'auto' : `${height}px` }}
      data-augmented-ui="tr-2-clip-x br-clip-y border"
      ref={outerShapeRef}
    >
      <div className="info">
        <div className="innerShapeContainer">
          <div
            className="innerShape"
            data-augmented-ui="tr-clip br-clip"
            ref={innerShapeRef}
          />
        </div>
        <div className="outerShapeContainer" />
        <div className="textCardContentWrapper" ref={bindResizeObserver}>
          <div className="shortDescription">
            {children ?? 'No description_'}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TextCard
