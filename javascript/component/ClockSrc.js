function ClkSrc()
{
  this.addInput("I_0","number");
  this.addInput("I_1","number");
  this.addOutput("Out","number");
  this.addProperty("Size","1","number")
}

//name to show
MyMux.title = "Mux";

MyMux.prototype.onPropertyChanged = function () {
    var size = this.getInputOrProperty("Size")
    var current_length = this.inputs.length
    var target_input = 2**parseInt(size)
    console.log("target "+target_input)
    console.log("length "+current_length)
    for (var i = 0; i < current_length+1; i++){
      console.log("Remove "+i)
      this.removeInput(this.findInputSlot("I_"+i))
    }
    for (let i = 0; i < target_input; i++)
        this.addInput("I_"+i,"number")
    }