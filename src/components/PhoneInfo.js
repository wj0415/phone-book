import React, { Component } from "react";

class PhoneInfo extends Component {
  //밑에 비구조적할당이 info값을 전달해주지 못해서 info가 undefined가 된다면 내부의 값을 받지못한다.
  static defaultProps = {
    info: {
      name: "이름",
      phone: "010-0000-0000",
      id: 0
    }
  };
  state = {
    editing: false,
    name: "",
    phone: ""
  };

  handleRemove = () => {
    //삭제 버튼이 클릭되면 onRemove 에 id 넣어서 호출
    const { info, onRemove } = this.props;
    onRemove(info.id);
  };

  handleToggleEdit = () => {
    const { editing } = this.state;
    this.setState({ editing: !editing });
  };

  //input에서 onChange이벤트가 발생했을때 호출
  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  componentDidUpdate(prevProps, prevState) {
    const { info, onUpdate } = this.props;
    if (!prevState.editing && this.state.editing) {
      //editing 값이 false->true
      //info의 값을 state에 넣어준다.
      this.setState({ name: info.name, phone: info.phone });
    }
    if (prevState.editing && !this.state.editing) {
      // editing 값이 true -> false 로 전환 될 때
      onUpdate(info.id, {
        name: this.state.name,
        phone: this.state.phone
      });
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    //수정상태가 아니고, info 값이 같다면 리렌더링 안함
    if (
      !this.state.editing &&
      !nextState.editing &&
      nextProps.info === this.props.info
    ) {
      return false;
    }
    return true;
  }
  render() {
    console.log("render PhoneInfo" + this.props.info.id);
    const style = {
      border: "1px solid black",
      padding: "8px",
      margin: "8px"
    };

    //수정모드
    const { editing } = this.state;
    if (editing) {
      return (
        <div style={style}>
          <div>
            <input
              value={this.state.name}
              name="name"
              placeholder="이름"
              onChange={this.handleChange}
            />
          </div>
          <div>
            <input
              value={this.state.phone}
              name="phone"
              placeholder="전화번호"
              onChange={this.handleChange}
            />
          </div>
          <button onClick={this.handleToggleEdit}>적용</button>
          <button onClick={this.handleRemove}>삭제</button>
        </div>
      );
    }

    //일반모드
    const { name, phone } = this.props.info; // info 라는 객체를 props로 받아온다.
    return (
      <div style={style}>
        <div>
          <b>{name}</b>
        </div>
        <div>{phone}</div>
        <button onClick={this.handleToggleEdit}>수정</button>
        <button onClick={this.handleRemove}>삭제</button>
      </div>
    );
  }
}

export default PhoneInfo;
