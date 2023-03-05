"use client";
import { Button } from "@mui/material";
import classNames from "classnames";
import React, { useEffect, useState } from "react";
import "./animation.scss";
import _ from "lodash";
import items from "./items";
import case1 from "./case";

const playChances = {
  blue: 79.92327,
  purple: 15.98465,
  pink: 3.19693,
  red: 0.89515,
};

const fakeChances = {
  blue: 63,
  purple: 23,
  pink: 9,
  red: 5,
};

const mapChances = (chances: Record<string, number>) => {
  return Object.fromEntries(
    Object.entries(chances).map(([name], i) => [
      name,
      Object.values(chances)
        .slice(0, i + 1)
        .reduce((prev, cur) => prev + cur),
    ])
  );
};

const chancedRandom = (chances: Record<string, number>) => {
  const random = Math.random();
  const arr = Object.entries(mapChances(chances)).find(([, chance]) => random * 100 < (chance as any)) || [];
  return arr[0];
};

const Animation = () => {
  const [properties, setProperties] = useState<any>({});
  const [margin, setMargin] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);

  // useEffect(() => {
  //   if (!isSpinning) return;

  //   const tm = setTimeout(() => {
  //     setIsSpinning(false);
  //   }, 10000);

  //   return () => clearTimeout(tm);
  // }, [isSpinning]);

  React.useEffect(() => {
    const getRandomItem = (chances: Record<string, number>) => {
      const rolledRarity = chancedRandom(chances);
      const rolledItems = case1.gamma.items
        .map((itemName) => ({ name: itemName, ...items[itemName] }))
        .filter(({ rarity }) => rarity === rolledRarity);
      return _.sample(rolledItems);
    };

    const result = getRandomItem(playChances);
    const itemWidth = 150 + 15;
    const resultIndex = _.random(40, 60);
    const innerOffset = _.random(0, 0.99);

    console.log(result);

    setProperties({
      result: result.name,
      items: [
        ...new Array(resultIndex).fill("").map(() => getRandomItem(fakeChances).name),
        result.name,
        ...new Array(4).fill("").map(() => getRandomItem(fakeChances).name),
      ],
      offset: itemWidth * (resultIndex + innerOffset) - 800,
    });

    // setTimeout(() => {
    //   setIsSpinning(false);
    // }, 10000);
  }, []);

  React.useEffect(() => setMargin(-properties?.offset), [properties?.offset]);

  console.log(properties, isSpinning);

  return (
    <div className="wrapper">
      <div className="inner">
        <div className="case-track">
          <div
            className={classNames("case-track__inner")}
            style={{ transform: isSpinning ? `translateX(${margin + "px"})` : "none" }}
          >
            {/* {Array(100)
              .fill(1)
              .map((c) => (
                <div className="case-track__card">
                  <img src="https://data.knifex.skin/base/15403/50.png" alt="" />
                </div>
              ))} */}

            {properties?.items?.map((item: string, i: any) => {
              return (
                <div className="case-track__card" key={i}>
                  <img src={(items as any)?.[item].image || ""} alt="" />
                </div>
              );
            })}
          </div>
          <div className="case-track__pointer"></div>
        </div>

        <Button variant="contained" onClick={() => setIsSpinning(true)}>
          Spin
        </Button>

        <div>
          <FlipCard />
        </div>
      </div>
    </div>
  );
};

export default Animation;

export const FlipCard = () => {
  const [flipped, setFlipped] = useState(false);
  return (
    <div className={classNames("flip", { flipped: flipped })} onClick={() => setFlipped(!flipped)}>
      <div className="flip__front">
        <img
          src={
            "https://img-cdn.hltv.org/playerbodyshot/3W2WeF7zohMOjpjxGpurGG.png?ixlib=java-2.1.0&w=400&s=b81a58560cecf792aa16f0ee08f82ee4"
          }
        />
      </div>
      <div className="flip__back">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vel, illum.</div>
    </div>
  );
};
