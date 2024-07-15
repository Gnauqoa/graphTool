import { getNodes, formatNodeInOut } from "./graphUtils.js";

// get all format all node inputs, outputs then save as json in download folder 
const exportAllNodeAsJson = () => {
  const nodes = getNodes().map((node) => formatNodeInOut(node));
  downloadObj(nodes);
};

// convert obj to json and save to download folder
const downloadObj = (obj) => {
  const jsonString = JSON.stringify(obj, null, 2);
  const blob = new Blob([jsonString], { type: "application/json" });
  downloadFile(blob);
};

// save a blob to download folder
const downloadFile = (blob) => {
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.href = url;
  link.download = Date.now(); // file name
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export { downloadObj, downloadFile, exportAllNodeAsJson };
