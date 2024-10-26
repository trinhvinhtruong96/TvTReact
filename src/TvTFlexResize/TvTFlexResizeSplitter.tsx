import {getStylingProps} from "../utilities/tvtProperties";
import styles from "./TvTFlexResize.module.scss"

const TvTFlexResizeSplitter: React.FC<StyledProps> = (props) => {

	return (
		<div {...getStylingProps(props, styles.tvtFlexSplitter)} />
	)
}

export default TvTFlexResizeSplitter
