import React from "react";
import JokeList from "./JokeList";
import "./JokeList.css";
import Joke from "./Joke";


class JokeList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { jokes: [] }
    this.generateNewJokes = this.generateNewJokes.bind(this);
  }

  async componentDidMount() {
    {
      let j = [...this.state.jokes]; //could be hard-coded as empty array?
      let seenJokes = new Set();
      try {
        while (j.length < numJokesToGet) {
          let res = await axios.get("https://icanhazdadjoke.com", {
            headers: { Accept: "application/json" }
          });
          let { status, ...jokeObj } = res.data;

          if (!seenJokes.has(jokeObj.id)) {
            seenJokes.add(jokeObj.id);
            j.push({ ...jokeObj, votes: 0 });
          } else {
            console.error("duplicate found!");
          }
        }
        this.setState({ jokes: j })
      } catch (e) {
        console.log(e);
      }
    }
  }

  /* empty joke list and then call getJokes */
  generateNewJokes() {
    this.setState({ jokes: [] });
  }

  /* change vote for this id by delta (+1 or -1) */
  vote(id, delta) {
    this.setState((state, props) => {
      return { jokes: state.jokes.map(j => (j.id === id ? { ...j, votes: j.votes + delta } : j)) }
    })
  }

  render() {

    if (this.state.jokes.length) {
      let sortedJokes = [...this.state.jokes].sort((a, b) => b.votes - a.votes);

      return (
        <div className="JokeList">
          <button className="JokeList-getmore" onClick={this.generateNewJokes}>
            Get New Jokes
        </button>

          {sortedJokes.map(j => (
            <Joke text={j.joke} key={j.id} id={j.id} votes={j.votes} vote={vote} />
          ))}
        </div>
      );
    }
    return null;
  }

} // end class comp

JokeList.defaultProps = {
  numJokesToGet: 10
}

export default JokeList;