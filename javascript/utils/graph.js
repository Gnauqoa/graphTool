const exportGraphAsJson = (fileName) => {
  const nodes = getNodes().map((node) => formatNodeInOut(node));
  downloadObj({ serialize: graph.serialize(), nodes }, fileName);
};

const importGraphFromJson = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const graphData = e.target.result;
      if (graphData) {
        const { serialize, nodes } = JSON.parse(graphData);
        graph.stop();
        graph.clear();
        try {
          graph.configure(serialize);
          graph.start();
          nodes.map((node) => {
            const currentNode = getNodeById(node.id);
console.log(currentNode)
            currentNode.outputs.map((output, index) => {
              console.log(output);
              if (output.links)
                output.links.map((link) => {
                  console.log({
                    currentNode,
                    index,
                    node: getNodeById(link.id),
                    port: link.port.id,
                  });
                  currentNode.connect(
                    index,
                    getNodeById(link.id),
                    link.port.id
                  );
                });
            });
          });
          // new LGraphCanvas("graphCanvas", graph);
        } catch (error) {
          console.error("Error configuring graph:", error);
          alert(
            "There was an error importing the graph. Please check the console for more details."
          );
        }
      }
    };
    reader.readAsText(file);
  }
};

const objToArr = (obj) => Object.keys(obj).map((key) => obj[key]);

const getLinks = () => objToArr(graph.links);
// graph.links is a Object with data as { 1 :{}, 2: {} }, so we need convert it to array

const getNodes = () => graph._nodes;

const getNodeById = (id) => getNodes().find((ele) => ele.id == id);

const getLinkById = (id) => getLinks().find((ele) => ele.id == id);

/* 
  This function formats a node's input and output ports by replacing the link IDs
  with detailed information about the linked nodes and ports. It processes the
  node's inputs and outputs to provide a more descriptive representation of the
  node's connections
*/
const formatNodeInOut = (node) => ({
  id: node.id,
  title: node.title,
  properties: node.properties,
  properties_info: node.properties_info,
  inputs: node.inputs.map((input) => {
    if (!input.link) return input;

    const link = getLinkById(input.link);
    const linkedNode = getLinkedNode(node.id, link);

    return {
      ...input,
      link: {
        id: linkedNode.id,
        name: linkedNode.title,
        type: linkedNode.type,
        port: getPort(linkedNode, link.id),
      },
    };
  }),
  outputs: node.outputs.map((output) => {
    if (!output.links) return output;
    return {
      ...output,
      links: output.links.map((linkId) => {
        const link = getLinkById(linkId);
        const linkedNode = getLinkedNode(node.id, link);

        return {
          id: linkedNode.id,
          name: linkedNode.title,
          type: linkedNode.type,
          port: getPort(linkedNode, link.id),
        };
      }),
    };
  }),
});

/* 
  getPort:
  This function takes a node and a linkId, and determines if the linkId
  corresponds to an input or output port on the node. It then returns the
  port details along with its type ('input' or 'output'). If no matching 
  port is found, it returns null.
*/
const getPort = (node, linkId) => {
  // Find the input port and its index
  const inputIndex = node.inputs.findIndex((input) =>
    input.link ? input.link == linkId : false
  );
  if (inputIndex !== -1) {
    const input = node.inputs[inputIndex];
    return { ...input, type: "input", id: inputIndex + 1 };
  }

  // Find the output port and its index
  const outputIndex = node.outputs.findIndex((output) =>
    output.links ? output.links.includes(Number(linkId)) : false
  );
  if (outputIndex !== -1) {
    const output = node.outputs[outputIndex];
    return { ...output, type: "output", id: outputIndex + 1 };
  }

  // Return null if no port is found
  return null;
};

/* 
  This function takes the current node's ID and a link object, and returns
  the node that is linked to the current node via the link.
*/
const getLinkedNode = (currentId, link) =>
  getNodeById(link.target_id === currentId ? link.origin_id : link.target_id);
