import cN from 'classnames';

// Function to extract data-* attributes from props
const getDataProps = <T extends object>(props: T) => {
	return Object.keys(props).reduce((prev, key) => {
		if (key.substr(0, 5) === 'data-') {
			return {
				...prev,
				[key]: props[key]
			}
		}
		return prev
	}, {})
}

// Function to extract className and style properties from props
const getStylingProps = <T extends object>(props: T, className = "", style: React.CSSProperties = {}) => {
	const returnClassName = "className" in props && typeof props.className === "string" ? cN(props.className, className) : className;
	const returnStyle = "style" in props && typeof props.style === "object" ? {...props.style, ...style} : style;

	return {
		className: returnClassName,
		style: returnStyle
	}
}

export {
	getDataProps,
	getStylingProps
}
