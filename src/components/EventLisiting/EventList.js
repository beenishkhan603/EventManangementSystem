import React from 'react';
import { IconButton, Grid } from '@mui/material';
import moment from 'moment';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

function EventList({ events, deleteEvent, handleEdit }) {
	return (
		<>
			<Grid container justifyContent={'center'}>
				<h2>Event List</h2>
			</Grid>
			<Grid container justifyContent={'center'}>
				<ul>
					{events && events.length > 0 ? (
						events.map((event, index) => (
							<li key={index}>
								<>
									{event.title} -{' '}
									{moment(event.startDate).format('DD-MM-YYYY HH:mm')} to{' '}
									{moment(event.endDate).format('DD-MM-YYYY HH:mm')}
									<IconButton
										edge="end"
										aria-label="edit"
										onClick={() => handleEdit(event._id)}
									>
										<EditIcon sx={{ color: '#2EFD32' }} />
									</IconButton>{' '}
									&nbsp;&nbsp;
									<IconButton
										edge="end"
										aria-label="delete"
										onClick={() => deleteEvent(index, event._id)}
									>
										<DeleteIcon sx={{ color: '#D22B2B' }} />
									</IconButton>
								</>
							</li>
						))
					) : (
						<p>Currently no events are available</p>
					)}
				</ul>
			</Grid>
		</>
	);
}
export default EventList;
