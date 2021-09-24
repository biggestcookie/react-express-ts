import { User } from "./user";

export interface Speedrun {
  id: number;
  user: User;
  startTime: number;
  endTime: number;
}
