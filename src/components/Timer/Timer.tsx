"use client";
import useClickOutside from "@src/hooks/useClickOutside";
import { useCombinedRef } from "@src/hooks/useCombindedRef";
import { usePrevious } from "@src/hooks/usePrevious";
import { useToggle } from "@src/hooks/useToggle";
import classNames from "classnames";
import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Range from "./Range";
import "./styles.scss";

const Timer = () => {
  const [time, setTime] = React.useState(0);
  const [isRun, setIsRun] = React.useState(false);

  const menuRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const { isOn, setFalse, setTrue, toggleValue } = useToggle();
  useClickOutside(menuRef, setFalse);

  useEffect(() => {
    if (!isRun) return;

    let timer = setInterval(() => {
      setTime((prev) => prev + 1);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [isRun]);

  // const prev = usePrevious(time);
  // console.log(prev, "prev");

  useEffect(() => {
    return () => {
      console.log("cleanup");
    };
  }, [time]);

  // ================================================== contxt menu
  const onCtx = (e: React.MouseEvent) => {
    e.preventDefault();
    setTrue();
    setCoords({ x: e.clientX, y: e.clientY });
  };

  useEffect(() => {
    if (menuRef.current) {
      const rect = menuRef.current.getBoundingClientRect();

      if (rect.width + coords.x > window.innerWidth) {
        menuRef.current.style.left = coords.x - rect.width + "px";
        menuRef.current.style.top = coords.y + "px";
      } else {
        menuRef.current.style.left = coords.x + "px";
        menuRef.current.style.top = coords.y + "px";
      }

      console.log(rect);
      console.log(coords);
    }
  }, [coords, menuRef.current]);

  //=============================================== combo ref
  const someRef = useRef(null);
  console.log(someRef.current, "someRef");

  return (
    <div className="bg" onContextMenu={onCtx}>
      <Range max={100} step={2} />
      <Range max={100} step={2} className={"my-range"} />

      <div>{time}</div>
      <button onClick={() => setIsRun((prev) => !prev)}>{isRun ? "stop" : "start"}</button>
      <CircularProgress progressValue={(time * 100) / 60} someRef={someRef} />
      {isOn &&
        createPortal(
          <div className="menu" ref={menuRef}>
            HAX
          </div>,
          document.body
        )}
    </div>
  );
};

export default Timer;

export function CircularProgress({ progressValue, someRef }: any) {
  const circleRef = useRef<SVGCircleElement>(null);

  const comboRef = useCombinedRef(circleRef);
  console.log(circleRef.current, "circRef");

  useEffect(() => {
    if (!circleRef.current || !circleRef.current.r) return;

    const circleRadius = circleRef.current?.r.baseVal.value;
    if (circleRadius && circleRef.current) {
      const circleLength = 2 * Math.PI * circleRadius;
      circleRef.current.style.strokeDasharray = `${circleLength} ${circleLength}`;
      circleRef.current.style.strokeDashoffset = `${circleLength}`;

      const offset = circleLength - ((progressValue as number) / 100) * circleLength;
      circleRef.current.style.strokeDashoffset = `${offset}`;
    }
  }, [circleRef, progressValue]);

  return (
    <div className={classNames("indicator_circular", "indeterminate")} role="progressbar">
      <svg className="indicator_circular__svg">
        <circle className="indicator_circular__circle" cx="30" cy="30" r="28" ref={comboRef} />
      </svg>
    </div>
  );
}
