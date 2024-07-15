// register custom node in the system
LiteGraph.registerNodeType("Logic/mux", MyMux);

const initGraph = (canvasId) => {
  if (!canvasId) return;
  const graph = new LGraph();

  const node_mux = LiteGraph.createNode("Logic/mux", "Mux 1");
  const node_mux2 = LiteGraph.createNode("Logic/mux", "Mux 2", {
    pos: [300, 300],
  });

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