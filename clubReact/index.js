import React from "react";
import ReactDOM from "react-dom";
import "./club.css";
import events from "./eventData1.json";
import Menu from "./menu";
import Home from "./home";
import Activities from "./activities";
import Login from "./login";
import Membership from "./membership";
import AdminActivity from "./AdminActivity"


//let contents = <><Menu /> <AddActivityForm/></>;
//ReactDOM.render(contents, document.getElementById("root"));


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { role: "guest", show: "home", click:"home", value:"", userInfo: null}; 
    }
   
homeHandler(event){
     //console.log("intro is clicked");
     this.setState({click:"home"});
     this.setState({show: "home"});
 }
    
activitiesHandler(event) {
	//console.log("activities is clicked")
    this.setState({click: "activity"});
	this.setState({show: "activity"});
  }

  loginHandler(event) {
    this.setState({click: "login"});
    this.setState({show: "login"});
  }

  membershipHandler(event) {
    this.setState({click: "membership"});
    this.setState({show: "membership"});
  }
	
manageActivityHandler(event) {
    this.setState({click: "manageActivity"});
    this.setState({show: "manageActivity"});
  }

 handleChange(event) {
	 this.setState({value: event.target.value});  
 }
	
handleSubmit(event) {
	//this.setState({value: this.state.value});
	console.log(this.state.value);
}
	
logoutHandler(event) {
        let that = this;
        fetch("/logout").then(function (res) {
        that.setState({ role: "guest", show: "home" });
      });
  }

	
setRole(role, userInfo) {
    this.setState({ role: role, userInfo: userInfo });
    if (role === "admin") {
      this.setState({ show: "manageActivity" });
    }
    if (role === "member") {
      this.setState({ show: "activity" });
    }
  }

    render() {
		let contents = null;
		let userInfo = <p className="userInfo"></p>;
		if (this.state.role !== "guest") {
		  userInfo = (
			<p className="userInfo">
			  {this.state.userInfo.firstName} {this.state.userInfo.lastName}, Role: {this.state.role}
			</p>
		  );
		}
		
		switch (this.state.show) {
			case "home":
                contents = <Home/>
                break;	
				case "login":
                contents = <Login setRole={this.setRole.bind(this)}/>;
                break;	
				case "activity":
                contents = <Activities events={events} />;
                break;	
				case "membership":
                contents = <Membership/>;
                break;
				case "manageActivity":
                contents = <AdminActivity/>;
                break;
				default:
				contents = <h2>Warning something went wrong!!!</h2>;
		}
		return (
            <>
                <Menu role={this.state.role} show={this.state.show} click={this.homeHandler.bind(this)} click1={this.activitiesHandler.bind(this)} click2={this.loginHandler.bind(this)} click3={this.membershipHandler.bind(this)} click4={this.manageActivityHandler.bind(this)} click5={this.logoutHandler.bind(this)} />
				{userInfo}
                {contents}
				
            </>
        );
    }
}

ReactDOM.render(<App />, document.getElementById("root"));



