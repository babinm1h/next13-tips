"use client";
import classNames from "classnames";
import React, { useEffect, useRef } from "react";
import "./styles.scss";

const Timer = () => {
  const [time, setTime] = React.useState(0);
  const [isRun, setIsRun] = React.useState(false);

  useEffect(() => {
    if (!isRun) return;

    let timer = setInterval(() => {
      setTime((prev) => prev + 1);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [isRun]);

  return (
    <div className="bg">
      <div>{time}</div>
      <button onClick={() => setIsRun((prev) => !prev)}>{isRun ? "stop" : "start"}</button>
      <CircularProgress progressValue={(time * 100) / 60} />
    </div>
  );
};

export default Timer;

export function CircularProgress({ progressValue }: any) {
  const circleRef = useRef<SVGCircleElement>(null);

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
        <circle className="indicator_circular__circle" cx="30" cy="30" r="28" ref={circleRef} />
      </svg>
    </div>
  );
}
