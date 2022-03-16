

class ListGroupController {

  list: Map<number, Function> = new Map();

  subscribe(index: number, fun: Function) {
    this.list.set(index, fun);
  }

  updateSelection(index: number) {
    this.list.forEach((f, i) => {
      if(i !== index) f();
    })
  }
}

export default ListGroupController;