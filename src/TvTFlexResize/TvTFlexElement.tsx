import styles from "./TvTFlexResize.module.scss"
import {getStylingProps} from "../utilities/tvtProperties"

const TvTFlexElement: React.FC<ParentProps & StyledProps> = (props) => {
	const {children} = props

	return <div {...getStylingProps(props, styles.tvtFlexElement)}>
		{children}
	</div>
}

export default TvTFlexElement
