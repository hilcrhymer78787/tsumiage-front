import { Work } from "./work";

export type Task = {
  id: number;
  name: string;
  createdAt: string;
  deletedAt?: string;
  work: Work;
};
