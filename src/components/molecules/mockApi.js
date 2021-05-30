/* This function does some ugly data cleaning to create a JSON similar to what we would expect in an API call */
import assessRadiator from '../../components/atoms/assessRadiator';

export default function mockApi(tempBuilding, vizOptions) {
  // Remove individual radiators as appropriate
    // for each floor
    for(let i = tempBuilding.floors.length - 1; i >= 0; i--) {
      // for each unit
      for(let j = tempBuilding.floors[i].units.length - 1; j >= 0; j--) {
        // for each space in a unit
        for(let k = tempBuilding.floors[i].units[j].spaces.length - 1; k >= 0; k--) {
          // for each radiator
          for(let l = tempBuilding.floors[i].units[j].spaces[k].radiators.length - 1; l >= 0; l--) {
            const radiator = tempBuilding.floors[i].units[j].spaces[k].radiators[l];
            const radiatorStatus = assessRadiator(radiator, tempBuilding.retrieved_at);
            if(
              (radiatorStatus === 'goodRadiator' && !vizOptions.showGoodRadiators) ||
              (radiatorStatus === 'coldRadiator' && !vizOptions.showColdRadiators) ||
              (radiatorStatus === 'offlineRadiator' && !vizOptions.showOfflineRadiators) ||
              (radiatorStatus === 'devicelessRadiator' && !vizOptions.showDevicelessRadiators) ||   
              (radiator.nodes.length > 1 && !vizOptions.showLongRadiators)       
            )
              tempBuilding.floors[i].units[j].spaces[k].radiators.splice(l, 1);    
          }   
        }
      }
      // for spaces not in a unit
      for(let j = tempBuilding.floors[i].spaces.length - 1; j >= 0; j--) {
        for(let k = tempBuilding.floors[i].spaces[j].radiators.length - 1; k >= 0; k--) {
          const radiator = tempBuilding.floors[i].spaces[j].radiators[k];
          const radiatorStatus = assessRadiator(radiator, tempBuilding.retrieved_at);
          if(
            (radiatorStatus === 'goodRadiator' && !vizOptions.showGoodRadiators) ||
            (radiatorStatus === 'coldRadiator' && !vizOptions.showColdRadiators) ||
            (radiatorStatus === 'offlineRadiator' && !vizOptions.showOfflineRadiators) ||
            (radiatorStatus === 'devicelessRadiator' && !vizOptions.showDevicelessRadiators) ||   
            (radiator.nodes.length > 1 && !vizOptions.showLongRadiators)        
          )
            tempBuilding.floors[i].spaces[j].radiators.splice(k, 1);  
        }
      }
    }

  // Remove spaces without radiators
  if(!vizOptions.showEmptySpaces)
    // for each floor
    for(let i = tempBuilding.floors.length - 1; i >= 0; i--) {
      // for each unit
      for(let j = tempBuilding.floors[i].units.length - 1; j >= 0; j--) {
        // for each space in a unit
        for(let k = tempBuilding.floors[i].units[j].spaces.length - 1; k >= 0; k--) {
          const space = tempBuilding.floors[i].units[j].spaces[k];
          if(space.radiators.length === 0) {
            tempBuilding.floors[i].units[j].spaces.splice(k, 1);
          }          
        } 
      } 
      // for spaces not in a unit
      for(let j = tempBuilding.floors[i].spaces.length - 1; j >= 0; j--) {
        const space = tempBuilding.floors[i].spaces[j];
        if(space.radiators.length === 0) {
          tempBuilding.floors[i].spaces.splice(j, 1);
        }                   
      }
    }

  // Remove units without any devices if selected
  if(!vizOptions.showEmptyUnits)
    // for each floor
    for(let i = tempBuilding.floors.length - 1; i >= 0; i--) {
      // for each unit
      for(let j = tempBuilding.floors[i].units.length - 1; j >= 0; j--) {
        const unit = tempBuilding.floors[i].units[j];
        // if all spaces in that unit
        if(unit.spaces.length === unit.spaces.filter((space) => {
          // have no radiators
          if(space.radiators.length === 0) return true;
          return false;
        }).length)
          // remove that unit
          tempBuilding.floors[i].units.splice(j, 1);
      }
    }

  return tempBuilding;
}