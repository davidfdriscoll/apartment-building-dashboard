import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import Space from "./Space";

const now = 1617840940000;

const sampleSpace = {
  name: "Studio",
  radiators: [
    {
      nodes: [
        {
          last_message: 1617840671000,
          lora_euid: "D1E720CCCC347E6F",
          radiator_temperature: 215,
          room_temperature: 71,
        },
        {
          last_message: 1617840671000,
          lora_euid: "3C53C5A4B807AD39",
          radiator_temperature: 215,
          room_temperature: 71,
        },
      ],
      number: 1,
    },
    {
      nodes: [
        {
          last_message: 1617840786000,
          lora_euid: "658914C159839C21",
          radiator_temperature: 218,
          room_temperature: 75,
        },
      ],
      number: 2,
    },
  ],
};

describe("Space component", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  afterEach(cleanup);

  it("exists on basic render, and the sample space has 2 radiators", () => {
    act(() => {
      render(<Space now={now} space={sampleSpace} />);
    });

    // 3 nodes in the sample radiator
    expect(screen.getAllByLabelText("Radiator").length).toBe(2);
  });
});
