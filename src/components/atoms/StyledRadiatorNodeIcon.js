import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SvgIcon from '@material-ui/core/SvgIcon';
import ReportRoundedIcon from '@material-ui/icons/ReportRounded';
import { ReactComponent as RadiatorNodeIcon } from '../../icons/radiator.svg';

/* Given two props of coldNode and offlineNode, return the appropriate icon with styling */

const useStyles = makeStyles((theme) => ({
  goodRadiatorNode: {
    color: '#88B447',
  },
}));

export default function StyledRadiatorNodeIcon(props) {
  const classes = useStyles();

  return (
    <>
      {(!props.coldNode && !props.offlineNode) &&
        <SvgIcon 
          aria-label='Radiator Node'
          component={RadiatorNodeIcon} 
          viewBox="0 0 600 600" 
          fontSize = 'large'
          className={classes.goodRadiatorNode} 
        />
      }
      {props.offlineNode && 
        <SvgIcon 
          aria-label='Radiator Node'
          component={RadiatorNodeIcon} 
          viewBox="0 0 600 600" 
          fontSize = 'large'
          color = 'disabled'
        />            
      }
      {props.coldNode &&
        <ReportRoundedIcon
          aria-label='Radiator Node'
          fontSize = 'large'
          color = 'error'
        />         
      }
    </>
  )
}