import React from 'react';

function Membership() {
  const myMembershipElement = (
  <main>
		<h1>Welcome To Membership Page</h1>

		<div className="membership_form">
			<p>Please signup to become a member of our Hiker Club</p><br />
			<form>
				<label htmlFor="name">Name:</label>
				<input type="text" id="name" name="name" minLength="2" maxLength="30" required />
				<label>Email:</label>
				<input type="email" id="email" name="email" minLength="10" maxLength="30" required />
				<label>Password:</label>
				<input type="password" id="password" name="password" minLength="5" maxLength="10" required /><br />
				<label htmlFor="exp">Hiking Experience:</label>
				<select id="exp" name="exp">
					<option value="just started">Just Started</option>
					<option value="5month">less than 6 month</option>
					<option value="1year">More than 1 year</option>
					<option value="5year">less than 5 year</option>
				</select>
				<label htmlFor="comments">Comments:</label>
				<textarea name="message" rows="10" cols="30">
            </textarea>
				<input type="button" id="signUp" value="Sign Me Up" />
			</form>
		</div>
	</main>
);
  return myMembershipElement;
}
export default Membership;