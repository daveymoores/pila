import { motion } from "framer-motion";
import { Box } from "grommet";
import React, { CSSProperties, SyntheticEvent } from "react";
import styled from "styled-components";

import animationSequences from "./animation-sequences/square/square";
import squareSequence from "./animation-sequences/square/square";
import forwardTriangleSequence from "./animation-sequences/triangle/forward";
import reverseTriangleSequence from "./animation-sequences/triangle/reverse";
import getRandomInt from "./helpers/getRandomInt";
import { Pole1, Pole2, Pole3 } from "./pole";

export enum PatternVariant {
  triangle,
  square,
  freeform,
}

const sequences = [
  squareSequence,
  forwardTriangleSequence,
  reverseTriangleSequence,
];

const items = [0, 1];

export const Pattern: React.FC<{
  color: string;
  className?: string;
  variant?: PatternVariant;
}> = ({ className, color }) => {
  const sequenceLength = animationSequences.sequence1[0].length;
  const [parentIndex, setParentIndex] = React.useState(getRandomInt(0));
  const [isAnimating, setIsAnimating] = React.useState(false);
  const [mouseEvent, setMouseEvent] = React.useState<SyntheticEvent["type"]>();
  const [sequenceInt, setSequenceInt] = React.useState<any>(sequences[0]);
  const [sequence, setSequence] = React.useState<any>(sequences[0]);

  React.useEffect(() => {
    if (!parentIndex) {
      const randomInt = getRandomInt(3);
      setSequenceInt(randomInt);
      setSequence(sequences[randomInt]);
    }
  }, [parentIndex]);

  const onInteractionHandler = React.useCallback(
    (event: SyntheticEvent) => {
      setMouseEvent(event.type);
      setIsAnimating(!isAnimating);
    },
    [isAnimating]
  );

  React.useEffect(() => {
    setParentIndex(getRandomInt(3));
  }, []);

  React.useEffect(() => {
    let timerId: NodeJS.Timeout | undefined = undefined;
    if (isAnimating) {
      if (mouseEvent === "mouseenter") {
        setParentIndex((index) =>
          index + 1 > sequenceLength - 1 ? 0 : index + 1
        );
      }
      timerId = setInterval(
        () =>
          setParentIndex((index) =>
            index + 1 > sequenceLength - 1 ? 0 : index + 1
          ),
        400
      );
    } else {
      clearInterval(timerId);
    }

    return () => {
      if (timerId) clearInterval(timerId);
    };
  }, [isAnimating, sequenceLength, mouseEvent]);

  return (
    <Container
      className={className}
      onMouseEnter={onInteractionHandler}
      onMouseLeave={onInteractionHandler}
      style={{ "--base": `40px` } as CSSProperties}
    >
      <PoleWrapper>
        {items.map((item) => (
          <Pole1
            key={item}
            sequence={sequence}
            parentIndex={parentIndex}
            index={item}
            color={color}
          />
        ))}
        {!sequenceInt && (
          <Pole2
            sequence={sequence}
            parentIndex={parentIndex}
            index={0}
            color={color}
          />
        )}
        {!sequenceInt && (
          <Pole3
            sequence={sequence}
            parentIndex={parentIndex}
            index={0}
            color={color}
          />
        )}
      </PoleWrapper>
    </Container>
  );
};

interface MotifProps {
  containerRef: React.MutableRefObject<HTMLDivElement | null>;
  color: string;
}

const Motif: React.FC<MotifProps> = ({ containerRef, color }) => {
  const [squares, setSquares] = React.useState(0);

  React.useEffect(() => {
    if (containerRef?.current) {
      const { width, height } = containerRef.current.getBoundingClientRect();
      const area = width * height;
      setSquares(Math.round(area / (100 * 100)));
    }
  }, [containerRef?.current]);

  return (
    <MotifWrapper>
      {!!squares &&
        [...Array(squares)].map((_, index) => {
          return <Pattern color={color} key={index} />;
        })}
    </MotifWrapper>
  );
};

const MotifWrapper = styled(Box)`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  position: absolute;
  left: 50%;
  top: 0;
  transform: translate(-50%, 0);
  z-index: 0;
`;

const Container = styled(motion.div)`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: calc(6 * var(--base));
  height: calc(6 * var(--base));
  cursor: pointer;
`;

const PoleWrapper = styled.div`
  position: relative;
  width: calc(2 * var(--base));
  height: calc(2 * var(--base));
  display: flex;
  justify-content: center;
`;

export default Motif;
