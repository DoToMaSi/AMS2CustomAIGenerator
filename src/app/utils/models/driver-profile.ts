export class DriverProfile {
  liveryName?: string;
  name: string;
  country: string;
  raceSkill: number;
  qualifyingSkill: number;
  aggression: number;
  defending: number;
  stamina: number;
  consistency: number;
  startReactions: number;
  wetSkill: number;
  tyreManagement: number;
  blueFlagConceding: number;
  weatherTyreChanges: number;
  avoidanceOfMistakes: number;
  avoidanceOfForcedMistakes: number;

  constructor(driver?: DriverProfile) {
    this.liveryName = driver ? driver.liveryName : null;
    this.name = driver ? driver.name : null;
    this.country = driver ? driver.country : null;
    this.raceSkill = driver ? driver.raceSkill : null;
    this.qualifyingSkill = driver ? driver.qualifyingSkill : null;
    this.aggression = driver ? driver.aggression : null;
    this.defending = driver ? driver.defending : null;
    this.stamina = driver ? driver.stamina : null;
    this.consistency = driver ? driver.consistency : null;
    this.startReactions = driver ? driver.startReactions : null;
    this.wetSkill = driver ? driver.wetSkill : null;
    this.tyreManagement = driver ? driver.tyreManagement : null;
    this.blueFlagConceding = driver ? driver.blueFlagConceding : null;
    this.weatherTyreChanges = driver ? driver.weatherTyreChanges : null;
    this.avoidanceOfMistakes = driver ? driver.avoidanceOfMistakes : null;
    this.avoidanceOfForcedMistakes = driver ? driver.avoidanceOfForcedMistakes : null;
  }
}




/*
  <name>John Smith</name>
  <country>USA</country>
  <race_skill>0.75</race_skill>
  <qualifying_skill>0.823</qualifying_skill>
  <aggression>0.3</aggression>
  <defending>0.51</defending>
  <stamina>0.998</stamina>
  <consistency>0.2</consistency>
  <start_reactions>0.36</start_reactions>
  <wet_skill>0.25</wet_skill>
  <tyre_management>0.85</tyre_management>
  <blue_flag_conceding>0.53</blue_flag_conceding>
  <weather_tyre_changes>0.12</weather_tyre_changes>
  <avoidance_of_mistakes>0.39</avoidance_of_mistakes>
  <avoidance_of_forced_mistakes>0.69</avoidance_of_forced_mistakes>
*/
