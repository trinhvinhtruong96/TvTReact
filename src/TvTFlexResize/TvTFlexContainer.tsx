import styles from "./TvTFlexResize.module.scss";
import {getStylingProps } from "../utilities/tvtProperties";
import cN from "classnames";
import React, {
  Children,
  cloneElement,
  isValidElement,
  useEffect,
  useRef,
  useState,
} from "react";
import { TvTFlexResizeEvent } from "../utilities/tvtEvents";
import { ResizeData, StartResizeData } from "./TvTFlexResizeSplitter";

type TvTFlexContainerProps = {
  orientation?: "horizontal" | "vertical";
};

const TvTFlexContainer: React.FC<
  TvTFlexContainerProps & ParentProps & StyledProps
> = (props) => {
  const { children, orientation = "horizontal" } = props;

  const className = cN(styles.tvtFlexContainer, styles[orientation]);

  const [flexResizeData, setFlexResizeData] = useState();

  const pointerPreviousPositionRef = useRef<number>();

  useEffect(() => {
    const getPointerAvailablePositionOffset = (
      positionByOrientation: number,
      domElement,
    ) => {
      const { left, right } = domElement.getBoundingClientRect();
      if (orientation === "vertical") {
        const offset =
          positionByOrientation - pointerPreviousPositionRef.current;

        if (
          offset < 0 &&
          (positionByOrientation > left || positionByOrientation < right)
        ) {
          return offset;
        }
      }
      return 0;
    };

    TvTFlexResizeEvent.on<StartResizeData>("startResize", (data) => {
      const triggerEvent = data.event;

      if (props.orientation === "vertical") {
        document.body.style.cursor = "col-resize";
        pointerPreviousPositionRef.current = triggerEvent.clientY;
      }
    });

    TvTFlexResizeEvent.on<ResizeData>("resize", (data) => {
      const triggerEvent = data.event;

      const offset = getPointerAvailablePositionOffset(
        props.orientation === "vertical"
          ? triggerEvent.clientY
          : triggerEvent.clientX,
        data.element,
      );
      console.log("=>(TvTFlexContainer.tsx:68) offset", offset);

      if (props.orientation === "vertical") {
        pointerPreviousPositionRef.current = triggerEvent.clientY;
      }
    });

    TvTFlexResizeEvent.on<StartResizeData>("stopResize", (data) => {});

    return () => {
      TvTFlexResizeEvent.off();
    };
  }, [orientation, props.orientation]);

  const renderChildren = () => {
    const validChildren = Children.toArray(children).filter((child) => child);

    return Children.map(validChildren, (child, index) => {
      if (isValidElement(child)) {
        const newProps = {
          ...child.props,
          index,
        };
        return cloneElement(child, newProps);
      }

      return child;
    });
  };

  return <div {...getStylingProps(props, className)}>{renderChildren()}</div>;
};

export default TvTFlexContainer;
