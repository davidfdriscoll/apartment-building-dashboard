import React from 'react';
import Box from '@material-ui/core/Box';
import StyledRadiatorIcon from '../../components/atoms/StyledRadiatorIcon';
import SettingsSwitch from '../../components/atoms/SettingsSwitch';

export default function Legend(props) {
  return (
    <Box display="flex" flexDirection="column">
      <SettingsSwitch
        toggle={props.vizOptions.showGoodRadiators}
        setToggle={(val) => props.setVizOptions({...props.vizOptions, showGoodRadiators: val})} 
        name={`Devices and Radiators without issues (${props.radiatorCount.goodRadiator} in building)`}
        icon={<StyledRadiatorIcon coldRadiator={false} offlineRadiator={false} width={1} />}
      />
      <SettingsSwitch
        toggle={props.vizOptions.showColdRadiators}
        setToggle={(val) => props.setVizOptions({...props.vizOptions, showColdRadiators: val})} 
        name={`Radiators with an unusual temperature (${props.radiatorCount.coldRadiator} in building)`}
        icon={<StyledRadiatorIcon coldRadiatorDemo={true} width={1} />}
      />
      <SettingsSwitch
        toggle={props.vizOptions.showOfflineRadiators}
        setToggle={(val) => props.setVizOptions({...props.vizOptions, showOfflineRadiators: val})} 
        name={`Devices that are offline (${props.radiatorCount.offlineRadiator} in building)`}
        icon={<StyledRadiatorIcon offlineRadiator={true} width={1} />}
      />
      <SettingsSwitch
        toggle={props.vizOptions.showDevicelessRadiators}
        setToggle={(val) => props.setVizOptions({...props.vizOptions, showDevicelessRadiators: val})} 
        name={`Radiators without any devices (${props.radiatorCount.devicelessRadiator} in building)`}
        icon={<StyledRadiatorIcon devicelessRadiator={true} width={1} />}
      />
      <SettingsSwitch
        toggle={props.vizOptions.showLongRadiators}
        setToggle={(val) => props.setVizOptions({...props.vizOptions, showLongRadiators: val})} 
        name={`Long radiators with multiple devices (${props.radiatorCount.longRadiator} in building)`}
        icon={<StyledRadiatorIcon coldRadiator={false} offlineRadiator={false} width={2} />}
      />
      <SettingsSwitch 
        toggle={props.vizOptions.showEmptyUnits} 
        setToggle={(val) => props.setVizOptions({...props.vizOptions, showEmptyUnits: val})} 
        name="Show All Units"
      />
      <SettingsSwitch
        toggle={props.vizOptions.showEmptySpaces}
        setToggle={(val) => props.setVizOptions({...props.vizOptions, showEmptySpaces: val})} 
        name="Show All Spaces"
      />
    </Box>
  );
}