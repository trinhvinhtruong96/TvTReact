import styles from "./TvTFlexResize.module.scss";
import { getStylingProps } from "../utilities/tvtProperties";
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
import type { ResizeData, StartResizeData } from "./TvTFlexResizeSplitter";

type TvTFlexContainerProps = {
  orientation?: "horizontal" | "vertical";
};

const TvTFlexContainer: React.FC<
  TvTFlexContainerProps & ParentProps & StyledProps
> = (props) => {
  const { children, orientation = "horizontal" } = props;

  const className = cN(styles.tvtFlexContainer, styles[orientation]);

  const containerRef = useRef<HTMLDivElement>(null);

  const [flexResizeData, setFlexResizeData] = useState<
    {
      grow: number;
    }[]
  >([]);

  const pointerPreviousPositionRef = useRef<number>();

  const getValidChildren = () => {
    return Children.toArray(children).filter((child) => child);
  };

  const computeFlexForPixel = () => {
    if (props.orientation === "vertical") {
      return 1.0 / containerRef.current.offsetWidth;
    }
  };

  useEffect(() => {
    const validChildren = getValidChildren();
    const pixelFlex = computeFlexForPixel();

    return () => {
      TvTFlexResizeEvent.off();
    };
  }, []);

  useEffect(() => {
    const getPointerAvailablePositionOffset = (
      pointerPositionByOrientation: number,
      domElement,
    ) => {
      const { left, right } = domElement.getBoundingClientRect();
      if (orientation === "vertical") {
        const offset =
          pointerPositionByOrientation - pointerPreviousPositionRef.current;

        if (offset > 0 && pointerPositionByOrientation > left) {
          return offset;
        }

        if (offset < 0 && pointerPositionByOrientation < right) {
          return offset;
        }
      }
      return 0;
    };

    TvTFlexResizeEvent.on<StartResizeData>("startResize", (data) => {
      const triggerEvent = data.event;

      if (props.orientation === "vertical") {
        document.body.classList.add("col-resize");
        pointerPreviousPositionRef.current = triggerEvent.clientX;
      }
    });

    TvTFlexResizeEvent.on<ResizeData>("resize", (data) => {
      const triggerEvent = data.event;
      const triggerSplitterElement = data.element;

      const offset = getPointerAvailablePositionOffset(
        props.orientation === "vertical"
          ? triggerEvent.clientX
          : triggerEvent.clientY,
        triggerSplitterElement,
      );

      if (props.orientation === "vertical") {
        pointerPreviousPositionRef.current = triggerEvent.clientX;
      }

      if (offset) {
        const stretchElementIndex =
          offset > 0 ? data.index + 1 : data.index - 1;
        const shrinkElementIndex = offset > 0 ? data.index - 1 : data.index + 1;

        const stretchElement = children[stretchElementIndex];
        const shrinkElement = children[shrinkElementIndex];
      }
    });

    TvTFlexResizeEvent.on<StartResizeData>("stopResize", (data) => {
      document.body.classList.remove("col-resize");
      document.body.classList.remove("row-resize");
    });
  }, [children, orientation, props.orientation]);

  const renderChildren = () => {
    const validChildren = getValidChildren();

    return Children.map(validChildren, (child, index) => {
      if (isValidElement(child)) {
        const newProps = {
          ...child.props,
          flexGrow: flexResizeData[index].grow,
          index,
        };
        return cloneElement(child, newProps);
      }

      return child;
    });
  };

  return (
    <div {...getStylingProps(props, className)} ref={containerRef}>
      {renderChildren()}
    </div>
  );
};

export default TvTFlexContainer;
