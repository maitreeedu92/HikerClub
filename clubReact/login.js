import React from "react";
import { render } from "react-dom";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { email: "", password: "",  role: ""};
  }

  updateEmail(event) {
    this.setState({ email: event.target.value });
  }

  updatePass(event) {
    this.setState({ password: event.target.value });
  }

  loginClick() {
    let that = this;
    console.log("Button pressed");
    fetch("./login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email: that.state.email,
        password: that.state.password,
      }),
    })
      .then(function (response) {
        console.log(
          "Request status code: ",
          response.statusText,
          response.status,
          response.type
        );
        if (response.ok) {
          return response.json(); // a promise
        } else {
          let info = `Status code: ${response.status}, ${response.statusText}`;
          console.log(response);
          return Promise.reject(info); //rejected promise!
        }
      })
      .then(function (userInfo) {
		console.log(userInfo);
        that.props.setRole(userInfo.role, userInfo);
        console.log(userInfo);
      })
      .catch(function (info) {
        console.log(info);
        that.props.setRole("guest", null);
      });
  }

  render() {
    return (
      <main>
		<h1>Welcome To Login Page</h1>
		
	  	<div className="login_form">
			<form>
				<label>Email:</label>
				<input type="email" id="email" name="email" onChange={this.updateEmail.bind(this)}
				value={this.state.email} required />
				<label>Password:</label>
				<input type="password" id="password" name="password" onChange={this.updatePass.bind(this)}
				value={this.state.password} required />
				<input type="button" id="login" onClick={this.loginClick.bind(this)} value="Login" />
			</form>
		</div>
	</main>
    );
  }
}

export default Login;