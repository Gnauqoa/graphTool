import { MyMux } from "./component/MyMux.js";

// register custom node in the system
LiteGraph.registerNodeType("Logic/mux", MyMux);

const initGraph = (canvasId) => {
  if (!canvasId) return;
  const graph = new LGraph();

  const node_mux = createNode("Logic/mux");
  const node_mux2 = createNode("Logic/mux");

  graph.add(node_mux);
  graph.add(node_mux2);

  // start graph
  new LGraphCanvas(canvasId, graph);
  graph.start();

  // init responsive
  const canvas = $(canvasId)[0];
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  window.addEventListener("resize", () => onResize(canvasId));

  return graph;
};
// init responsive
const onResize = (canvasId) => {
  if (!window || !canvasId) return;
  const canvas = $(canvasId)[0];
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
};
// generate node
const createNode = (name) => LiteGraph.createNode(name);

export { initGraph, createNode };
