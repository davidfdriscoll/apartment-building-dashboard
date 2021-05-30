import assessRadiator from '../../components/atoms/assessRadiator';

export default function countRadiators(building) {
  const radiatorCount = {
    goodRadiator: 0,
    offlineRadiator: 0,
    coldRadiator: 0,
    devicelessRadiator: 0,
    longRadiator: 0,
  };

  for(let i = building.floors.length - 1; i >= 0; i--) {
    // for each unit
    for(let j = building.floors[i].units.length - 1; j >= 0; j--) {
      // for each space in a unit
      for(let k = building.floors[i].units[j].spaces.length - 1; k >= 0; k--) {
        // for each radiator
        for(let l = building.floors[i].units[j].spaces[k].radiators.length - 1; l >= 0; l--) {
          const radiator = building.floors[i].units[j].spaces[k].radiators[l];
          const radiatorStatus = assessRadiator(radiator, building.retrieved_at);
          radiatorCount[radiatorStatus]++;
          if(radiator.nodes.length > 1) {
            radiatorCount['longRadiator']++;
          }
        }   
      }
    }
    // for spaces not in a unit
    for(let j = building.floors[i].spaces.length - 1; j >= 0; j--) {
      for(let k = building.floors[i].spaces[j].radiators.length - 1; k >= 0; k--) {
        const radiator = building.floors[i].spaces[j].radiators[k];
        const radiatorStatus = assessRadiator(radiator, building.retrieved_at);
        radiatorCount[radiatorStatus]++;
        if(radiator.nodes.length > 1) {
          radiatorCount['longRadiator']++;
        }
      }
    }
  }
  return radiatorCount;
}