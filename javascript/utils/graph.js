const exportGraphAsJson = (fileName) => {
  const nodes = getNodes().map((node) => formatNodeInOut(node));
  downloadObj({ serialize: graph.serialize(), nodes }, fileName);
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
  const input = node.inputs.find((input) =>
    input.link ? input.link == linkId : false
  );
  if (input) return { ...input, type: "input" };

  const output = node.outputs.find((output) =>
    output.links ? output.links.includes(Number(linkId)) : false
  );
  if (output) return { ...output, type: "output" };
  return null;
};

/* 
  This function takes the current node's ID and a link object, and returns
  the node that is linked to the current node via the link.
*/
const getLinkedNode = (currentId, link) =>
  getNodeById(link.target_id === currentId ? link.origin_id : link.target_id);
