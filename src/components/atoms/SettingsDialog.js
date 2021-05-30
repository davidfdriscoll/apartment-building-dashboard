import React from "react";

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';

import SettingsSwitch from "../../components/atoms/SettingsSwitch";

export default function SettingsDialog(props) {
  return (
    <Dialog 
      maxWidth="md" 
      onClose={props.handleSettingsDialogClose} 
      open={props.open}
    >
      <DialogContent>
        <SettingsSwitch 
          toggle={props.showEmptyUnits} 
          setToggle={props.setShowEmptyUnits} 
          name="Show Units without Devices"
        />
        <SettingsSwitch
          toggle={props.showEmptySpaces}
          setToggle={props.setShowEmptySpaces} 
          name="Show Spaces without Radiators"
        />
        <SettingsSwitch
          toggle={props.showDevicelessRadiators}
          setToggle={props.setShowDevicelessRadiators} 
          name="Show Radiators without Installed Devices"
        />
      </DialogContent>
    </Dialog>
  );
}