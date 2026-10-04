import { Component, useState } from "react";

function GreetingFunction() {
  const [name, setName] = useState("Student");

  return (
    <section>
      <h2>Functional component</h2>
      <p>Hello, {name}!</p>
      <button onClick={() => setName("React learner")}>Change name</button>
    </section>
  );
}

class GreetingClass extends Component {
  state = { name: "Student" };

  render() {
    return (
      <section>
        <h2>Class component</h2>
        <p>Hello, {this.state.name}!</p>
        <button onClick={() => this.setState({ name: "React learner" })}>
          Change name
        </button>
      </section>
    );
  }
}

export default function App() {
  return (
    <main>
      <h1>React Components</h1>
      <GreetingFunction />
      <GreetingClass />
    </main>
  );
}
