export type Work = {
  id: number;
  state: WorkState;
};

const workState = [
  0, //未達成
  1, //達成
  2, //達成不要
] as const;
export type WorkState = (typeof workState)[number];
