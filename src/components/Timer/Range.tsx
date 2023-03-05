"use client";
import { rescale, toPercent } from "@src/helpers/math";
import cn from "classnames";
import React, { useEffect, useMemo, useRef, useState } from "react";
import "./Range.scss";

interface Props {
  min?: number;
  max?: number;
  step?: number;
  defaultValue?: number;
  className?: string;
}

const Range = ({ max = 100, min = 0, step = 2, defaultValue = 0, className }: Props) => {
  const [value, setValue] = useState(defaultValue);
  console.log(value, "val");

  const stateRef = useRef({ isDragging: false, containerWidth: 0, containerLeft: 0 }).current;
  const rangeRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLSpanElement>(null);

  const offsetToValue = (absolute: number, containerWidth: number) => {
    return rescale(absolute, [0, containerWidth], [min, max], { step });
  };

  const updateValue = (val: number) => {
    if (value > max || value < min) return;
    setValue(val);
  };

  const onThumbDown = (e: React.PointerEvent) => {
    const range = rangeRef.current;
    if (!range) return;

    const rect = range?.getBoundingClientRect();
    stateRef.containerWidth = rect.width;
    stateRef.containerLeft = rect.left;
    stateRef.isDragging = true;

    document.addEventListener("pointermove", onPointerMove);
    document.addEventListener("pointerup", onPointerUp);
    console.log(rect, e.clientX);
  };

  const onPointerMove = (e: MouseEvent) => {
    const range = rangeRef.current;
    if (!range || !stateRef.isDragging || !fillRef.current || !thumbRef.current) return;

    const relativeX = e.clientX - stateRef.containerLeft;
    const newValue = offsetToValue(relativeX, stateRef.containerWidth);
    updateValue(newValue);
  };

  const onPointerUp = (e: MouseEvent) => {
    stateRef.isDragging = false;
  };

  const onTrackClick = (e: React.MouseEvent) => {
    if (!fillRef.current || !thumbRef.current || !rangeRef.current) return;
    const rect = rangeRef.current.getBoundingClientRect();

    const relativeX = e.clientX - rect.left;
    const newValue = offsetToValue(relativeX, rect.width);
    updateValue(newValue);
  };

  const percentX = useMemo(() => `${toPercent(value, min, max)}%`, [value]);

  return (
    <div className={cn("range__wrapper", className)} ref={rangeRef} onPointerDown={onTrackClick}>
      <div className="range__track" />
      <div className="range__fill" ref={fillRef} style={{ width: percentX }} />
      <span className="range__thumb" onPointerDown={onThumbDown} ref={thumbRef} style={{ left: percentX }} />
    </div>
  );
};

export default Range;
