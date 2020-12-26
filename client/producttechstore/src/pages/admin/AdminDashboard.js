import React from 'react';
import AdminNav from '../../components/nav/AdminNav';
export default function AdminDashboard() {
	return (
		<div>
			<div className="container-fluid">
				<div className="row">
					<div className="col-md-2">
						<AdminNav />
					</div>
					<div className="col text-center">Admin dashboard page</div>
				</div>
			</div>
		</div>
	);
}
