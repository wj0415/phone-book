import React, { Component } from "react";

class PhoneForm extends Component {
  state = {
    name: "",
    phone: ""
  };

  //e.target.value 값을 통하여 이벤트 객체에 담겨있는 현재의 텍스트 값을 읽어온다.
  handleChange = e => {
    this.setState({
      // name: e.target.value //이 값은 state의 name 이다.
      [e.target.name]: e.target.value //input의 name속성에 따라 텍스트 값 구분.
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.onCreate(this.state); //state값을 onCreate를 통해 부모에게 전달.
    this.setState({ name: "", phone: "" }); //상태 초기화
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          placeholder="이름"
          value={this.state.name}
          onChange={this.handleChange}
          name="name"
        />
        <input
          placeholder="전화번호"
          value={this.state.phone}
          onChange={this.handleChange}
          name="phone"
        />
        <button type="submit">등록</button>
      </form>
    );
  }
}
export default PhoneForm;
