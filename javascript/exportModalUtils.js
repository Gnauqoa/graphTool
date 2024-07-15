const handleClickExport = () => {
  exportAllNodeAsJson($("#design-name")[0].value);
  $("#export-modal").modal("hide");
};
