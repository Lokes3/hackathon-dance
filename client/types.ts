export type Formation = {
  index: number;
  description: string;
  positions: Position[];
};

export type Position = {
  name: string;
  color: string;
  x: number;
  y: number;
};
