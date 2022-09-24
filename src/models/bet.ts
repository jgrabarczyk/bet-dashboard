import { Team } from "./team";

export interface Bet {
  id: number;
  teams: [Team, Team];
  draw: number;
}