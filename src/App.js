import React from "react";
import ClassJokeList from "./ClassJokeList";  // BUG: was './JokeList'

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <ClassJokeList />
      </div>
    );
  }
}


export default App;
