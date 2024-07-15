import { initGraph } from "./canvas.js";
import { exportAllNodeAsJson } from "./exportNodes.js";

const graph = initGraph("#graphCanvas");

window.exportAllNodeAsJson = exportAllNodeAsJson;

export { graph };
