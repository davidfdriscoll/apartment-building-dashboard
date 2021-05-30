/* Simple helper function that checks whether a node is offline */

const lastMessageMax = 10 * 60 * 10000; // 10 minutes -> milliseconds

export default function isOfflineNode(now, node) {
  return now - node.last_message > lastMessageMax;
}
