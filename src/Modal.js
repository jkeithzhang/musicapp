import React from 'react';

export default function Modal(props) {
	return (
		<div>
			<div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
				<div className="modal-dialog" role="document">
					<div className="modal-content">
						<div className="modal-header">
							<p className="modal-title" id="exampleModalLabel"><b>{props.data.name}</b></p>
							<button type="button" className="close" data-dismiss="modal" aria-label="Close">
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<div className="modal-body row">
							<div className="col-md-2">
								<img alt="avatar" src={props.data.pic} />
							</div>
							<div className="col-md-2">
								<div className="modal-item"><b>nickname:</b></div>
								<div className="modal-item"><b>birthday:</b></div>
								<div className="modal-item"><b>address:</b></div>
							</div>
							<div className="col-md-8">
								<div className="modal-item"> {props.data.nickname}</div>
								<div className="modal-item"> {props.data.dob}</div>
								<div className="modal-item"> {props.data.location}</div>
							</div>
						</div>
						<div className="modal-footer">
							<button type="button" className="btn btn-primary" data-dismiss="modal">Close</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}