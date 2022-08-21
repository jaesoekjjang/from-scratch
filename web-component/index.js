import { Element, Component } from "./Node.js";


function createElement(tag, props, children) {
  if(typeof tag === 'function') {
    return new tag(props);
  }
  
  if(typeof tag === 'string'){
    return new Element(tag, props, children);
  }
}

class App extends Component{
  constructor(props) {
    super(props);
    this.state = {
      counter: 1
    }

    setInterval(()=>{
      console.log(this.state.counter)
      // this.setState({counter: this.state.counter + 1})
    },1000)
  }

  addEvent() {
    console.log(document.querySelector('.plus'))
    document.querySelector('.plus').addEventListener('click', ()=>{
      this.setState({counter: this.state.counter + 1})
      console.log(this.state.counter)
    })
  }

  render() {
    return(
      createElement('div', null, [
        createElement(Header, null, null),
        createElement('div', null, `conter: ${this.state.counter}`),
        createElement('button', { class : 'plus' }, '+'),
        createElement('button', { class : 'minus' }, '-'),
      ])
    )
  }
}

class Header extends Component {
  render() {
    return (
      createElement('div', null, [
        createElement('h1', null, 'Counter Example')
      ])
    )
  }
}

const root = document.querySelector('#root')
const app = createElement(App, {count: 1})
app.mount(root);