import React, { useEffect, useRef, useState } from "react";
import { getStylingProps } from "../utilities/tvtProperties";
import styles from "./TvTFlexResize.module.scss";
import cN from "classnames";
import { TvTFlexResizeEvent } from "../utilities/tvtEvents";

export type StartResizeData = {
  index: number;
  event: React.MouseEvent;
};

export type ResizeData = {
  index: number;
  element: HTMLDivElement | null;
  event: MouseEvent;
};

export type StopResizeData = {
  index: number;
  event: MouseEvent;
};

const TvTFlexResizeSplitter: React.FC<StyledProps & IndexProps> = (props) => {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  const className = cN(styles.tvtFlexSplitter, { [styles.active]: active });

  const handleResizeStart = (event: React.MouseEvent) => {
    setActive(true);

    TvTFlexResizeEvent.emit<StartResizeData>("startResize", {
      index: props.index,
      event,
    });
  };

  useEffect(() => {
    const handleResizeEnd = (event: MouseEvent) => {
      setActive(false);

      TvTFlexResizeEvent.emit<StopResizeData>("stopResize", {
        index: props.index,
        event,
      });
    };

    const handleResizing = (event: MouseEvent) => {
      if (active) {
        event.stopPropagation();
        event.preventDefault();

        TvTFlexResizeEvent.emit<ResizeData>("resize", {
          index: props.index,
          element: ref.current,
          event,
        });
      }
    };

    document.addEventListener("mouseup", handleResizeEnd);
    document.addEventListener("mousemove", handleResizing);

    return () => {
      document.removeEventListener("mouseup", handleResizeEnd);
      document.removeEventListener("mousemove", handleResizing);
    };
  }, [active, props.index]);

  return (
    <div
      ref={ref}
      onMouseDown={handleResizeStart}
      {...getStylingProps(props, className)}
    />
  );
};

export default TvTFlexResizeSplitter;
