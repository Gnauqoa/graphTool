// convert obj to json and save to download folder
const downloadObj = (obj, fileName) => {
  const jsonString = JSON.stringify(obj, null, 2);
  const blob = new Blob([jsonString], { type: "application/json" });
  downloadFile(blob, fileName);
};

// save a blob to download folder
const downloadFile = (blob, fileName) => {
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.href = url;
  link.download = fileName || Date.now(); // file name
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
