import { MyMux } from "./component/MyMux.js"

//register in the system
LiteGraph.registerNodeType("Logic/mux", MyMux );


const graph = new LGraph();
const node_mux = LiteGraph.createNode("Logic/mux");
const node_mux2 = LiteGraph.createNode("Logic/mux");

graph.add(node_mux);
const node2 = graph.add(node_mux2);

// node_mux.addConnection(node_mux2.title)

const graphCanvas = new LGraphCanvas("#mycanvas", graph);
graph.start()

export { graph }