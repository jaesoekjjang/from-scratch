class Element {
  constructor(tag, attrs, children = []) {
    this.element = document.createElement(tag);
    this.attrs = attrs || {};    
    this.children = Array.isArray(children) ? children :  [children];
  }

  mount(parentNode) {
    Object.keys(this.attrs).forEach((key) => {
      this.element.setAttribute(key, this.attrs[key])
    })

    this.children.forEach((child) => {
      if(typeof child === 'string' || typeof child === 'number') {
        this.element.innerText = child;
      } else {
        child.mount(this.element);
      }
    });
    parentNode.append(this.element);
    return this.element
  }
}

class Component {
  constructor(props) {
    this.props = props || {};
    this.state = {};

    this.parentNode = null;
    this.prevRendered = null;
    this.nextRendered = null;
  }

  setState(newState){
    // 만약 상태가 변경됐으면
    this.update(newState);    
    this.state = newState;
  }

  render() {}

  addEvent() {} 

  update() {
    this.parentNode.replaceChildren(this.mount(this.parentNode))
  }

  mount(parentNode) {
    const rendered = this.render();
    this.parentNode = parentNode;
    const mounted = rendered.mount(parentNode);
    this.addEvent();
    return mounted
  }
}

export { Element, Component }