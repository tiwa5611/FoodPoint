class App extends React.Component {
    render() {
            return (
                <div>
                     <MyProvider>
                          <div className="App">
                          <Child1/>
                          <Child2/>
                          </div>
                   </MyProvider>
                </div>
            );
    }
}

class Child1 extends React.Component {
    render() {
        return (
            <div>
            <Mcontext.Consumer>
            {(context) => (<button onClick={()=>{context.setMessage("New Arrival")}}>Send</button>)}
            </Mcontext.Consumer>
            </div>
        ) 
    }
}

class Child2 extends React.Component {
    render() {
        return (
            <div>
            <Mcontext.Consumer>
                {(context) => (
                <p>{context.state.message}}</p>)}
            </Mcontext.Consumer>
            </div>
    )}
}

class Parent extends React.Component {
    state = { data : "Hello World" } 
    render() {
        return (
            <div>
                <Child1/>            //no data to send             
                <Child2 dataFromParent = {this.state.data} />
            </div>
        );
    }
}