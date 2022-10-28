import React from "react";
import Stream from "./stream";

class StreamContainer extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = { list: props.list };
  }

  setList = (list: any) => {
    this.setState({ list });
  };

  render() {
    const list = this.state.list;
    console.log({ list });

    return (
      <div>
        {list.map((call: any, index: number) => {
          return <Stream key={index} call={call} />;
        })}
      </div>
    );
  }
}

export default StreamContainer;
