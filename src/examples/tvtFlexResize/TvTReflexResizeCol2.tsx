import {TvTFlexContainer, TvTFlexElement, TvTFlexResizeSplitter} from "../../TvTFlexResize";
import styles from "./tvtFlexResize.module.scss"

const TvTReflexResizeCol2 = () => {

	return <TvTFlexContainer className={styles.container} orientation={"vertical"}>
		<TvTFlexElement className={styles.leftPanel}/>

		<TvTFlexResizeSplitter/>

		<TvTFlexElement className={styles.rightPanel}/>
	</TvTFlexContainer>
}

export default TvTReflexResizeCol2
