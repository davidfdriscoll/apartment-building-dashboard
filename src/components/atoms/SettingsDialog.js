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
          name="Show Empty Units"
        />
        <SettingsSwitch
          toggle={props.showEmptySpaces}
          setToggle={props.setShowEmptySpaces} 
          name="Show Empty Spaces"
        />
      </DialogContent>
    </Dialog>
  );
}