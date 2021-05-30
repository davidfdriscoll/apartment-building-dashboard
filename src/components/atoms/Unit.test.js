import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import { act } from 'react-dom/test-utils';
import Unit from "./Unit";

const now = 1617840940000;

const sampleUnit = {
  "name" : "1C",
  "spaces" : [
     {
        "name" : "Bedroom 1",
        "radiators" : [
           {
              "nodes" : [
                 {
                    "last_message" : 1617840763000,
                    "lora_euid" : "FE55275B554461AF",
                    "radiator_temperature" : 219,
                    "room_temperature" : 75
                 }
              ],
              "number" : 1
           }
        ]
     },
     {
        "name" : "Bedroom 2",
        "radiators" : [
           {
              "nodes" : [
                 {
                    "last_message" : 1617657051000,
                    "lora_euid" : "4F23C11506976B0F",
                    "radiator_temperature" : 211,
                    "room_temperature" : 74
                 }
              ],
              "number" : 1
           }
        ]
     },
     {
        "name" : "Dining Room",
        "radiators" : []
     },
     {
        "name" : "Hallway",
        "radiators" : [
           {
              "nodes" : [
                 {
                    "last_message" : 1617840811000,
                    "lora_euid" : "1CAFB11E12EC4D6F",
                    "radiator_temperature" : 219,
                    "room_temperature" : 76
                 }
              ],
              "number" : 1
           }
        ]
     },
     {
        "name" : "Living Room",
        "radiators" : [
           {
              "nodes" : [
                 {
                    "last_message" : 1617840665000,
                    "lora_euid" : "42FFB09C97242CA6",
                    "radiator_temperature" : 215,
                    "room_temperature" : 70
                 }
              ],
              "number" : 1
           }
        ]
     }
  ]
};

describe("Unit component", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  afterEach(cleanup);

  it("exists on basic render, and the sample unit has 4 radiators", () => {
    act(() => {
      render(<Unit now={now} unit={sampleUnit} />);
    });

    expect(screen.getAllByLabelText('Radiator').length).toBe(4);
  });
});