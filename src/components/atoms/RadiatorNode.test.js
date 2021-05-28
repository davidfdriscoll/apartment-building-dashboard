import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event'; 
import RadiatorNode from "./RadiatorNode";

const now = 1617840940000;

const goodRadiatorNode = {
  "last_message" : 1617840786000,
  "lora_euid" : "658914C159839C21",
  "radiator_temperature" : 218,
  "room_temperature" : 75
};
const goodRadiatorNumber = 2;

const coldRadiatorNode =  {
  "last_message" : 1617840801000,
  "lora_euid" : "64D780CA29069144",
  "radiator_temperature" : 70,
  "room_temperature" : 62
};
const coldRadiatorNumber = 1;

const offlineRadiatorNode = {
  "last_message" : 1617376227000,
  "lora_euid" : "0456D06E0855C3A1",
  "radiator_temperature" : 212,
  "room_temperature" : 72
}
const offlineRadiatorNumber = 1;

describe("RadiatorNode component", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  afterEach(cleanup);

  it("exists on basic render as an svg icon with success rendering", () => {
    act(() => {
      const { nodeAsFragment } = render(<RadiatorNode now={now} node={goodRadiatorNode} number={goodRadiatorNumber} />);
    });

    const node = screen.getByLabelText('Radiator Node');

    expect(node).toBeInTheDocument();
    expect(node).toHaveClass('MuiSvgIcon-root');
    expect(node).not.toHaveClass('MuiSvgIcon-colorDisabled');
    expect(node).not.toHaveClass('MuiSvgIcon-colorAction');
  });

  it("renders an offline node (with an old last message) with grey disabled styling", () => {
    act(() => {    
      const { nodeAsFragment } = render(<RadiatorNode now={now} node={offlineRadiatorNode} number={offlineRadiatorNumber} />);
    });

    const node = screen.getByLabelText('Radiator Node');
    expect(node).toHaveClass('MuiSvgIcon-colorDisabled');
  });

  it("renders a cold node (with unusual temperatures) with red error styling", () => {
    act(() => {    
      const { nodeAsFragment } = render(<RadiatorNode now={now} node={coldRadiatorNode} number={coldRadiatorNumber} />);
    });

    const node = screen.getByLabelText('Radiator Node');
    expect(node).toHaveClass('MuiSvgIcon-colorError');
  });

  test('clicking on good node creates popover with appropriate text', () => {
    act(() => {
      const { nodeAsFragment } = render(<RadiatorNode now={now} node={goodRadiatorNode} number={goodRadiatorNumber} />);
    });

    const node = screen.getByRole('button'); 
    act(() => {
      userEvent.click(node);
      jest.runAllTimers();
    });
    expect(screen.getByText(/radiator temperature/i)).toBeInTheDocument();    
  });

  test('clicking on good node creates popover with appropriate radiator temperature', () => {
    act(() => {
      const { nodeAsFragment } = render(<RadiatorNode now={now} node={goodRadiatorNode} number={goodRadiatorNumber} />);
    });

    const node = screen.getByRole('button'); 
    act(() => {
      userEvent.click(node);
      jest.runAllTimers();
    });
    expect(screen.getByText(/218/i)).toBeInTheDocument();    
  });

  test('clicking on good node creates popover with accurate time of last message', () => {
    const { nodeAsFragment } = render(<RadiatorNode now={now} node={goodRadiatorNode} number={goodRadiatorNumber} />);
    const node = screen.getByRole('button'); 
    act(() => {
      userEvent.click(node);
      jest.runAllTimers();
    });
    // 1617840786000 (time of last message) = Apr 7, 2021, 8:13:06 PM (in America/New_York time)
    expect(screen.getByText(/Apr 7, 2021, 8:13:06 PM/i)).toBeInTheDocument();    
  });

  test('clicking on good node creates popover with accurate time since last message', () => {
    const { nodeAsFragment } = render(<RadiatorNode now={now} node={goodRadiatorNode} number={goodRadiatorNumber} />);
    const node = screen.getByRole('button'); 
    act(() => {
      userEvent.click(node);
      jest.runAllTimers();
    });
    // 1617840940000 (now time) - 1617840786000 (then time) = 154000 milliseconds = 154 seconds = something like '2 minutes ago'
    expect(screen.getByText(/2 minutes/i)).toBeInTheDocument();    
  });
});