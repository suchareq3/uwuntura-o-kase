import type { Team } from "./types";

export const getTeamColor = (name: Team['name']) => {
  const colors: Record<string, string> = {
    'niebiescy': 'blue',
    'zieloni': 'green',
    'zolci': 'yellow',
    'mistrzowie': 'gray',
  };
  return colors[name];
};