import React, { Component } from 'react';
import UserNav from '../../components/nav/UserNav';
export default class Password extends Component {
	render() {
		return (
			<div className="container-fluid">
				<div className="row">
					<div className="col-md-2">
						<UserNav />
					</div>
					<div className="col text-center">user wishlist page</div>
				</div>
			</div>
		);
	}
}
