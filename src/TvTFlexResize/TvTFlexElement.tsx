import styles from "./TvTFlexResize.module.scss";
import { getStylingProps } from "../utilities/tvtProperties";
import React, { forwardRef } from "react";

type TvTFlexElementProps = {
  flexGrow?: number;
  innerRef?: React.Ref<HTMLElement>;
} & ParentProps &
  StyledProps &
  IndexProps;

const TvTFlexElement: React.FC<TvTFlexElementProps> = (props) => {
  const { children } = props;

  return (
    <div
      {...getStylingProps(props, styles.tvtFlexElement, {
        flexShrink: 1,
        flexBasis: "0%",
        flexGrow: props.flexGrow,
      })}
    >
      {children}
    </div>
  );
};

export default forwardRef<HTMLElement, TvTFlexElementProps>((props, ref) => {
  return <TvTFlexElement innerRef={ref} {...props} />;
});
