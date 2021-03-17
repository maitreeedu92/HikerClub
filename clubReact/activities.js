import React from 'react';
//import events from "./eventData1.json";

class Activities extends React.Component {
  constructor(props) {
    super(props);
    this.state = { activities: [] };
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

  render() {
    // Create table rows with array map method
    let tableRows = this.state.activities.map(function (event) {
      return (
        <tr>
          <td>{event.name}</td>
          <td>{event.dates}</td>
		  <td>{event.description}</td>
        </tr>
      );
    });
    
    return (
      <main>
		<h1>Welcome To Activity Page</h1>
		<svg height="21" viewBox="0 0 21 21" width="21" xmlns="http://www.w3.org/2000/svg">
			<g fill="none" fillRule="evenodd" transform="translate(2 3)">
				<path d="m9.45405845.95405845h3.58578645c1.1045695 0 2 .8954305 2 2v3.58578644c0 .26521649-.1053568.5195704-.2928932.70710678l-7.29289325 7.29289323c-.78104858.7810486-2.04737854.7810486-2.82842712 0l-3.17157288-3.1715729c-.78104858-.7810486-.78104858-2.04737852 0-2.82842711l7.29289322-7.29289322c.18753638-.18753638.44189029-.29289322.70710678-.29289322z" stroke="#2a2e3b" strokeLinecap="round" strokeLinejoin="round" />
				<rect fill="#2a2e3b" height="2" rx="1" width="2" x="11.54" y="2.454" />
			</g>
		</svg>
		<svg height="21" viewBox="0 0 21 21" width="21" xmlns="http://www.w3.org/2000/svg">
			<g fill="none" fillRule="evenodd" stroke="#2a2e3b" strokeLinecap="round" strokeLinejoin="round" transform="translate(2 2)">
				<path d="m2.5.5h12c1.1045695 0 2 .8954305 2 2v12c0 1.1045695-.8954305 2-2 2h-12c-1.1045695 0-2-.8954305-2-2v-12c0-1.1045695.8954305-2 2-2z" />
				<path d="m.5 4.5h16" />
			</g>
		</svg>
		<svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21">
			<g fill="none" fillRule="evenodd" stroke="#2A2E3B" strokeLinecap="round" strokeLinejoin="round" transform="translate(2 2)">
				<circle cx="8.5" cy="8.5" r="8" />
				<polygon points="8.5 3.5 10.5 8.5 8.5 13.5 6.5 8.5" transform="rotate(30 8.5 8.5)" />
			</g>
		</svg>
		<table>
			<caption>Activity Schedule</caption>
			<thead>
				<tr>
					<th>Name</th>
					<th>Date(s)</th>
					<th>Description</th>
				</tr>
			</thead>
			<tbody id="tablebody">{tableRows}</tbody>
		</table>
	</main>
    );
  }
}

export default Activities;