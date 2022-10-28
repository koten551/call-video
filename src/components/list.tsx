import React from "react";

class List extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = { list: props.list };
  }

  handleAnswer = (call: any) => {
    call.answer();
  };

  handleHangup = (call: any) => {
    call.hangup();
  };

  setList = (list: any) => {
    this.setState({ list: list });
  };

  render() {
    const list = this.state.list;
    return (
      <>
        {list.map((call: any, index: number) => {
          return (
            <div key={index}>
              <button onClick={() => this.handleAnswer(call)}>answer</button>
              <button onClick={() => this.handleHangup(call)}>hangup</button>
            </div>
          );
        })}
      </>
    );
  }
}

export default List;
