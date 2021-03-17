import React from "react";

function Menu(props) {

    function isActive(name) {
        if (name === props.show) {
            return "active activeclass";
        } else {
            return "";
        }
    }
   

let list = [ <li key="home">
            <a onClick={props.click} className={isActive("home")}>Home</a>
            </li>,
            <li key="activity">
            <a onClick={props.click1} className={isActive("activity")}>Activities</a>
            </li>
];
	
if (props.role != "guest") {
	list.push(
		<li key="manageActivity">
		<a onClick={props.click4} className={isActive("manageActivity")}>Manage Activities</a>
		</li>
	);
} 

if (props.role === "guest") {
	list.push(
		<li key="login">
		<a onClick={props.click2} className={isActive("login")}>Login</a>
		</li>
	);
	list.push(
		<li key="membership">
		<a onClick={props.click3} className={isActive("membership")}>Membership</a>
		</li>
	);
} 
else { // user or admin
	list.push(
		<li key="logout">
		<a onClick={props.click5} className={isActive("logout")}>Logout</a>
		</li>
	);
}
return (
    <>
<div className="navbar">
<nav>
<ul>{list}</ul>
</nav>
</div>
    </>
);
}
export default Menu;