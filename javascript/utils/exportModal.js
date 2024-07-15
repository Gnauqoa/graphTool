const handleClickExport = () => {
  exportGraphAsJson($("#design-name")[0].value);
  $("#export-modal").modal("hide");
};
