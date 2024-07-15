class MyMux {
  // static obj_count = 0;
  constructor() {
    this.addInput("I_0", "*");
    this.addInput("I_1", "*");
    this.addOutput("Out", "*", "hello");
    this.addProperty("Size", "1", "number");

    var id = incr(1);
    this.nameWid = this.addWidget(
      "text",
      "Title",
      "Mux " + id,
      function (value, widget, node) {
        node.title = value;
      }
    );
    this.title = "Mux " + id;
  }
  onPropertyChanged() {
    let size = this.getInputOrProperty("Size");
    let current_length = this.inputs.length;
    let target_input = 2 ** parseInt(size);
    for (let i = 0; i < current_length + 1; i++) {
      this.removeInput(this.findInputSlot("I_" + i));
    }
    for (let i = 0; i < target_input; i++) this.addInput("I_" + i, "number");
  }
  onConnectionsChange(...props) {}
  onSelected() {
    console.log(this);
  }

  onGetInputs(arr) {
    console.log(arr);
  }
  // onAdded(){
  //   this.obj_count++;
  // }
  // onRemoved(){
  //   incr(-1)
  // }
}

//name to show
// MyMux.title = "Mux";

let incr = (function (delta) {
  var i = 0;
  return function (delta) {
    return (i += delta);
  };
})();
