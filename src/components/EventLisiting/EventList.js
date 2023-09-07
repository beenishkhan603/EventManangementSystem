import React from 'react';
import { IconButton, Grid } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
function EventList({ events, deleteEvent, handleEdit }) {
	return (
		<>
			<Grid container>
				<h2>Event List</h2>
			</Grid>
			<Grid container>
				<ul>
					{events && events.length > 0 ? (
						events.map((event, index) => (
							<li key={index}>
								<>
									{event.title} - {event.startDate} to {event.endDate}
									<IconButton
										edge="end"
										aria-label="edit"
										onClick={() => handleEdit(event._id)}
									>
										<EditIcon />
									</IconButton>{' '}
									&nbsp;&nbsp;
									<IconButton
										edge="end"
										aria-label="delete"
										onClick={() => deleteEvent(index, event._id)}
									>
										<DeleteIcon />
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
