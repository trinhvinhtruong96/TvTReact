import {getStylingProps} from "../utilities/tvtProperties";
import styles from "./TvTFlexResize.module.scss"
import {useEffect, useRef, useState} from "react";
import cN from "classnames"
import {TvTFlexResizeEvent} from "../utilities/tvtEvents";

const TvTFlexResizeSplitter: React.FC<StyledProps> = (props) => {
	const ref = useRef<HTMLDivElement>(null)
	const [active, setActive] = useState(false)

	const className = cN(styles.tvtFlexSplitter, {[styles.active]: active})

	const handleResizeStart = (event: React.MouseEvent) => {
		setActive(true)

		TvTFlexResizeEvent.emit("startResize", {
			event
		})
	}

	useEffect(() => {
		const handleResizeEnd = (event: MouseEvent) => {
			setActive(false)

			TvTFlexResizeEvent.emit("stopResize", {
				event
			})
		}

		const handleResizing = (event: MouseEvent) => {
			if (active) {
				event.stopPropagation()
				event.preventDefault()

				TvTFlexResizeEvent.emit("resize", {
					element: ref.current,
					event
				})
			}
		}

		document.addEventListener('mouseup', handleResizeEnd)
		document.addEventListener('mousemove', handleResizing)

		return () => {
			document.removeEventListener('mouseup', handleResizeEnd)
			document.removeEventListener('mousemove', handleResizing)
		}
	}, [])

	return (
		<div ref={ref} onMouseDown={handleResizeStart} {...getStylingProps(props, className)} />
	)
}

export default TvTFlexResizeSplitter
