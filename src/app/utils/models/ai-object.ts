import { DriverProfile } from "./driver-profile";

export interface AiObject {
  carClass: string;
  drivers: DriverProfile[];
}

export const VARIABLE_ALIASES  = {
  name: 'name',
  country: 'country',
  raceSkill: 'race_skill',
  qualifyingSkill: 'qualifying_skill',
  aggression: 'aggression',
  defending: 'defending',
  stamina: 'stamina',
  consistency: 'consistency',
  startReactions: 'start_reactions',
  wetSkill: 'wet_skill',
  tyreManagement: 'tyre_management',
  blueFlagConceding: 'blue_flag_conceding',
  weatherTyreChanges: 'weather_tyre_changes',
  avoidanceOfMistakes: 'avoidance_of_mistakes',
  avoidanceOfForcedMistakes: 'avoidance_of_forced_mistakes',
}
