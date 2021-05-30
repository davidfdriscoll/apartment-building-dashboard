/* Simple helper function that checks whether a node is not producing heat */

const radiatorMin = 205;
const radiatorMax = 225;
const roomMin = 65;
const roomMax = 80;

export default function isColdNode(node) {
  return (node.radiator_temperature < radiatorMin ||
    node.radiator_temperature > radiatorMax ||
    node.room_temperature < roomMin ||
    node.room_temperature > roomMax);
}