import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event'; 
import Radiator from "./Radiator";

const now = 1617840940000;

const goodRadiator = {
  "nodes" : [
     {
        "last_message" : 1617840786000,
        "lora_euid" : "658914C159839C21",
        "radiator_temperature" : 218,
        "room_temperature" : 75
     }
  ],
  "number" : 2
};

const coldRadiator =  {
  "nodes" : [
     {
        "last_message" : 1617840801000,
        "lora_euid" : "64D780CA29069144",
        "radiator_temperature" : 70,
        "room_temperature" : 62
     }
  ],
  "number" : 1
};

const offlineRadiator = {
  "nodes" : [
     {
        "last_message" : 1617376227000,
        "lora_euid" : "0456D06E0855C3A1",
        "radiator_temperature" : 212,
        "room_temperature" : 72
     }
  ],
  "number" : 1
};

describe("Radiator component", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  afterEach(cleanup);

  it("exists on basic render as an svg icon with success rendering", () => {
    act(() => {
      render(<Radiator now={now} radiator={goodRadiator} />);
    });

    const radiator = screen.getByLabelText('Radiator');

    expect(radiator).toBeInTheDocument();
    expect(radiator).toHaveClass('MuiSvgIcon-root');
    expect(radiator).not.toHaveClass('MuiSvgIcon-colorDisabled');
    expect(radiator).not.toHaveClass('MuiSvgIcon-colorAction');
  });

  it("renders an offline radiator (with an old last message) with grey disabled styling", () => {
    act(() => {    
      render(<Radiator now={now} radiator={offlineRadiator} />);
    });

    const node = screen.getByLabelText('Radiator');
    expect(node).toHaveClass('MuiSvgIcon-colorDisabled');
  });

  it("renders a cold radiator (with unusual temperatures) with red error styling", () => {
    act(() => {    
      render(<Radiator now={now} radiator={coldRadiator} />);
    });

    const radiator = screen.getByLabelText('Radiator');
    expect(radiator).toHaveClass('MuiSvgIcon-colorError');
  });

  test('clicking on good radiator creates popover with good temperature and times', () => {
    act(() => {
      render(<Radiator now={now} radiator={goodRadiator} />);
    });

    const radiator = screen.getByRole('button'); 
    act(() => {
      userEvent.click(radiator);
      jest.runAllTimers();
    });
    expect(screen.getByText(/radiator temperature/i)).toBeInTheDocument();    
    expect(screen.getByText(/218/i)).toBeInTheDocument();    
    // 1617840786000 (time of last message) = Apr 7, 2021, 8:13:06 PM (in America/New_York time)
    expect(screen.getByText(/Apr 7, 2021, 8:13:06 PM/i)).toBeInTheDocument();    
    // 1617840940000 (now time) - 1617840786000 (then time) = 154000 milliseconds = 154 seconds = '3 minutes ago'
    // discarding the smaller seconds count
    expect(screen.getByText(/3 minutes ago/i)).toBeInTheDocument();    
  });

  test('clicking on cold radiator creates popover with bad temperature and styled text', () => {
    render(<Radiator now={now} radiator={coldRadiator} />);
    const radiator = screen.getByRole('button'); 
    act(() => {
      userEvent.click(radiator);
      jest.runAllTimers();
    });
    expect(screen.getByText(/70/i)).toBeInTheDocument();    // cold temperature
    expect(screen.getByText(/70/i)).toHaveClass('MuiTypography-colorError');
  });
});