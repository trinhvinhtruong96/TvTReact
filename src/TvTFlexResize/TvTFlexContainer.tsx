import styles from "./TvTFlexResize.module.scss"
import {getStylingProps} from "../utilities/tvtProperties"
import cN from "classnames"

type TvTFlexContainerProps = {
	orientation?: "horizontal" | "vertical";
}

const TvTFlexContainer: React.FC<TvTFlexContainerProps & ParentProps & StyledProps> = (props) => {
	const {children, orientation = "horizontal"} = props
	const className = cN(styles.tvtFlexContainer, styles[orientation])

	return <div {...getStylingProps(props, className)}>
		{children}
	</div>
}

export default TvTFlexContainer
