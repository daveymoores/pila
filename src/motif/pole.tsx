import { motion, useCycle } from "framer-motion";
import React from "react";
import styled from "styled-components";

interface PoleProps {
  index: number;
  style?: any;
  parentIndex: number;
  sequence: any;
  color: string;
}

const Pole3: React.FC<PoleProps> = ({
  index,
  parentIndex,
  sequence,
  color,
}) => {
  const [animate, cycle] = useCycle(...sequence.sequence3[index]);

  React.useEffect(() => {
    cycle(parentIndex);
  }, [parentIndex, cycle]);

  return (
    <Pole2Container
      style={{ opacity: parentIndex >= 4 && parentIndex <= 5 ? 1 : 0 }}
    >
      <StyledPole3
        animate={animate}
        color={color}
        transition={{
          duration: 0.4,
          ease: "easeInOut",
        }}
      />
    </Pole2Container>
  );
};

const Pole2: React.FC<PoleProps> = ({
  index,
  parentIndex,
  style,
  sequence,
  color,
}) => {
  const [animate, cycle] = useCycle(...sequence.sequence2[index]);

  React.useEffect(() => {
    cycle(parentIndex);
  }, [parentIndex, cycle]);

  return (
    <Pole3Container style={{ opacity: parentIndex >= 2 ? 1 : 0 }}>
      <StyledPole2
        animate={animate}
        color={color}
        transition={{
          duration: 0.4,
          ease: "easeInOut",
        }}
        style={style}
      />
    </Pole3Container>
  );
};

const Pole1: React.FC<PoleProps> = ({
  index,
  parentIndex,
  sequence,
  color,
}) => {
  const [animate, cycle] = useCycle(...sequence.sequence1[index]);

  React.useEffect(() => {
    cycle(parentIndex);
  }, [parentIndex, cycle]);

  return (
    <StyledPole
      animate={animate}
      color={color}
      transition={{
        duration: 0.4,
        ease: "easeInOut",
      }}
    />
  );
};

const StyledPole = styled(motion.div)<{ color: string }>`
  background-color: ${(props) => props.color};
  height: calc(2 * var(--base));
  width: calc(0.6 * var(--base));
  border-radius: calc(0.5 * var(--base));
  position: absolute;
`;

const StyledPole2 = styled(motion.div)`
  height: calc(0.6 * var(--base));
  width: calc(2 * var(--base));
`;

const StyledPole3 = styled(motion.div)`
  width: calc(0.6 * var(--base));
  height: calc(2 * var(--base));
`;

const Pole2Container = styled(motion.div)`
  left: calc(-0.75 * var(--base));
  position: absolute;
`;

const Pole3Container = styled(motion.div)`
  left: calc(0.75 * var(--base));
  top: calc(-1.5 * var(--base));
  position: absolute;
`;

export { Pole1, Pole2, Pole3 };
