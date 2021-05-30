import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SvgIcon from '@material-ui/core/SvgIcon';
import ReportRoundedIcon from '@material-ui/icons/ReportRounded';
import { ReactComponent as RadiatorNodeIcon } from '../../icons/radiator.svg';
import clsx from 'clsx';

/* Given props of coldRadiator, offlineRadiator, coldRadiatorDemo, and devicelessRadiator, return the appropriate icon with styling */

const useStyles = makeStyles((theme) => ({
  stretchRadiator: props => ({
    width: props.width > 1 && 72,
  }),
  goodRadiator: {
    color: '#88B447',
  },
  coldRadiator: {
    borderRadius: '50%',
    boxShadow: '0 0 0 0 rgba(0, 0, 0, 1)',
    transform: 'scale(1)',
    animation: '$pulse 2s infinite',  
  },
  "@keyframes pulse": {
    "0%": {
      transform: 'scale(0.95)',
      boxShadow: '0 0 0 0 rgba(0, 0, 0, 0.7)',
    },  
    "70%": {
      transform: 'scale(1)',
      boxShadow: '0 0 0 10px rgba(0, 0, 0, 0)',
    },  
    "100%": {
      transform: 'scale(0.95)',
      boxShadow: '0 0 0 0 rgba(0, 0, 0, 0)',
    },
  },
}));

export default function StyledRadiatorIcon(props) {
  const classes = useStyles(props);

  if(props.coldRadiator) return (
    <ReportRoundedIcon
    aria-label='Radiator'
    fontSize = 'large'
    preserveAspectRatio='none'
    color = 'error'
    className = {clsx(classes.stretchRadiator, classes.coldRadiator)}
  />     
  );
  if(props.offlineRadiator) return (
    <SvgIcon 
      aria-label='Radiator'
      component={RadiatorNodeIcon} 
      viewBox="0 0 600 600" 
      preserveAspectRatio='none'
      fontSize = 'large'
      color = 'disabled'
      className={classes.stretchRadiator}
    />   
  );
  if(props.coldRadiatorDemo) return (
    <ReportRoundedIcon
      aria-label='Radiator'
      fontSize = 'large'
      preserveAspectRatio='none'
      color = 'error'
    />   
  );
  if(props.devicelessRadiator) return (
    <SvgIcon 
      aria-label='Radiator'
      component={RadiatorNodeIcon} 
      viewBox="0 0 600 600" 
      preserveAspectRatio='none'
      fontSize = 'large'
      className={clsx(classes.stretchRadiator)} 
    />
  );
  if(!props.coldRadiator && !props.offlineRadiator) return (
    <SvgIcon 
      aria-label='Radiator'
      component={RadiatorNodeIcon} 
      viewBox="0 0 600 600" 
      preserveAspectRatio='none'
      fontSize = 'large'
      className={clsx(classes.stretchRadiator, classes.goodRadiator)} 
    />
  );
}