import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import { act } from 'react-dom/test-utils';
import Floor from "./Floor";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";

const now = 1617840940000;

const sampleFloor =  {
   "level" : 1,
   "name" : "1",
   "spaces" : [],
   "units" : [
      {
         "name" : "1A",
         "spaces" : [
            {
               "name" : "Kitchen",
               "radiators" : []
            },
            {
               "name" : "Studio",
               "radiators" : [
                  {
                     "nodes" : [
                        {
                           "last_message" : 1617840671000,
                           "lora_euid" : "D1E720CCCC347E6F",
                           "radiator_temperature" : 215,
                           "room_temperature" : 71
                        },
                        {
                           "last_message" : 1617840671000,
                           "lora_euid" : "3C53C5A4B807AD39",
                           "radiator_temperature" : 215,
                           "room_temperature" : 71
                        }
                     ],
                     "number" : 1
                  },
                  {
                     "nodes" : [
                        {
                           "last_message" : 1617840786000,
                           "lora_euid" : "658914C159839C21",
                           "radiator_temperature" : 218,
                           "room_temperature" : 75
                        }
                     ],
                     "number" : 2
                  }
               ]
            }
         ]
      },
      {
         "name" : "1B",
         "spaces" : [
            {
               "name" : "Bedroom 1",
               "radiators" : [
                  {
                     "nodes" : [
                        {
                           "last_message" : 1617840815000,
                           "lora_euid" : "F6965BF0B621748E",
                           "radiator_temperature" : 213,
                           "room_temperature" : 72
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
                           "last_message" : 1617840803000,
                           "lora_euid" : "DD2C8A5966757DA9",
                           "radiator_temperature" : 219,
                           "room_temperature" : 68
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
                           "last_message" : 1617840919000,
                           "lora_euid" : "C3D3B94292D78BBA",
                           "radiator_temperature" : 220,
                           "room_temperature" : 69
                        }
                     ],
                     "number" : 1
                  },
                  {
                     "nodes" : [
                        {
                           "last_message" : 1617840823000,
                           "lora_euid" : "E3517F273EBC311E",
                           "radiator_temperature" : 212,
                           "room_temperature" : 71
                        }
                     ],
                     "number" : 2
                  }
               ]
            }
         ]
      },
      {
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
      }
   ]
};

const SizeWrapper = (props) => {
  const theme = createMuiTheme({
    props: { MuiWithWidth: { initialWidth: "sm" } },
  });

  return <MuiThemeProvider theme={theme}>{props.children}</MuiThemeProvider>;
};

describe("Floor component", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  afterEach(cleanup);

  it("exists on basic render, and the sample floor has 11 radiators", () => {
    act(() => {
      render(<Floor now={now} floor={sampleFloor} />, { wrapper: SizeWrapper });
    });

    expect(screen.getAllByLabelText('Radiator').length).toBe(10);
  });
});