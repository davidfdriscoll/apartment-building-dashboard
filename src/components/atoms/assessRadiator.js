import isColdNode from "./isColdNode";
import isOfflineNode from "./isOfflineNode";

export default function assessRadiator(radiator, now) {
  if (radiator.nodes.length === 0) return "devicelessRadiator";
  if (radiator.nodes.filter((node) => isColdNode(node)).length > 0)
    return "coldRadiator";
  if (radiator.nodes.filter((node) => isOfflineNode(now, node)).length > 0)
    return "offlineRadiator";
  return "goodRadiator";
}
