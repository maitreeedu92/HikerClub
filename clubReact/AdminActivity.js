import React from "react";

function ActivityTable(props) {
  let trows = props.activities.map(function (act, i) {
    return (
      <tr key={"act" + i}>
        <td>
          <button onClick={props.del.bind(null, i)}>Delete</button>
        </td>
        <td>{act.name}</td>
        <td>{act.dates}</td>
	    <td>{act.description}</td>
      </tr>
    );
  });
  return (
    <table className="activityTable">
      <thead>
        <tr>
          <th></th>
          <th>Name</th>
          <th>Date(s)</th>
		  <th>Description</th>
        </tr>
      </thead>
      <tbody>{trows}</tbody>
    </table>
  );
}

class AdminActivities extends React.Component {
  constructor(props) {
    super(props);
    this.state = { activities: [], addName: "", addDate: "", addDescription: "" };
  }

  componentDidMount() {
    let that = this;
    fetch("./activities")
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
      .then(function (activities) {
        that.setState({ activities: activities });
        console.log(activities);
      })
      .catch(function (info) {
        console.log(info);
      });
  }

  nameHandler(event) {
    this.setState({ addName: event.target.value });
  }

  dateHandler(event) {
    this.setState({ addDate: event.target.value });
  }
	
descriptionHandler(event) {
	this.setState({ addDescription: event.target.value });
}

  addActivity() {
    let that = this;
    console.log("Button pressed");
    fetch("./addThing", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        name: that.state.addName,
        dates: [that.state.addDate],
	    description: that.state.addDescription
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
      .then(function (activities) {
        that.setState({
          activities: activities,
        });
      })
      .catch(function (info) {
        console.log(info);
      });
  }

  delActivity(index) {
    console.log(`Id to delete ${this.state.activities[index]._id}`);
    let that = this;
    console.log("Button pressed");
    fetch(`./delete-activity/${this.state.activities[index]._id}`, {
      method: "DELETE",
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
      .then(function (activities) {
        that.setState({
          activities: activities,
        });
      })
      .catch(function (info) {
        console.log(info);
      });
  }

  render() {
    return (
      <main>
        <h1>Activity Management</h1>
        <details>
          <summary>Add Activity</summary>
          <div className="addActivityGrid">
            <label>Name</label>
            <input
              type="text"
              onChange={this.nameHandler.bind(this)}
              value={this.state.addName}
            />
            <label>Date(s)</label>
            <input
              type="text"
              value={this.state.addDate}
              onChange={this.dateHandler.bind(this)}
            />
			<label>Description</label>
			<input
              type="text"
              value={this.state.addDescription}
              onChange={this.descriptionHandler.bind(this)}
            />
            <button onClick={this.addActivity.bind(this)}>Add</button>
          </div>
        </details>
        <h2>Activities</h2>
        <ActivityTable
          activities={this.state.activities}
          del={this.delActivity.bind(this)}
        />
      </main>
    );
  }
}

export default AdminActivities;