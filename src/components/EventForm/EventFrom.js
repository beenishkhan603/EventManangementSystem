import React from 'react';
import { Button, TextField, TextareaAutosize, Grid } from '@mui/material';

function EventForm({ onSubmit, event, handleChange, isEdit, handleCancel }) {
	const currentDateAndTime = new Date().toISOString().slice(0, 16);
	const handleSubmit = (e) => {
		e.preventDefault();
		onSubmit(event);
	};
	// to convert the date in acceptable format for datetime picker
	const formatToDateTimeLocal = (isoDate) => {
		if (!isoDate) {
			return '';
		}
		const date = new Date(isoDate);
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, '0');
		const day = String(date.getDate()).padStart(2, '0');
		const hours = String(date.getHours()).padStart(2, '0');
		const minutes = String(date.getMinutes()).padStart(2, '0');
		return `${year}-${month}-${day}T${hours}:${minutes}`;
	};

	return (
		<Grid container justifyContent={'center'}>
			<form onSubmit={handleSubmit}>
				<TextField
					type="text"
					name="title"
					value={event.title}
					onChange={handleChange}
					label="Event Title"
					placeholder="Event Title"
					fullWidth
					required
					margin="normal"
				/>
				<TextField
					type="datetime-local"
					name="startDate"
					value={formatToDateTimeLocal(event.startDate)}
					onChange={handleChange}
					min={new Date()}
					label="Start Date/Time"
					fullWidth
					required
					margin="normal"
					InputLabelProps={{
						shrink: true,
					}}
					inputProps={{
						min: currentDateAndTime, // Set the minimum date value
					}}
				/>
				<TextField
					type="datetime-local"
					name="endDate"
					value={formatToDateTimeLocal(event.endDate)}
					onChange={handleChange}
					label="End Date/Time"
					fullWidth
					required
					margin="normal"
					InputLabelProps={{
						shrink: true,
					}}
					inputProps={{
						min: currentDateAndTime, // Set the minimum date value
					}}
				/>
				<TextareaAutosize
					name="notes"
					value={event.notes}
					onChange={handleChange}
					label="Event Notes"
					placeholder="Event Notes"
					sx={{ width: '100%' }}
					minRows={3}
					margin="normal"
				/>
				<br />
				<br />
				<Button
					variant="contained"
					sx={{
						background: '#4CBB17',
						'&:hover': {
							background: '#228B22',
						},
					}}
					type="submit"
				>
					{isEdit ? 'Save' : 'Submit'}
				</Button>
				&nbsp;&nbsp;
				{isEdit ? (
					<Button
						variant="contained"
						sx={{
							background: '#A9A9A9',
							'&:hover': {
								background: '#808080',
							},
						}}
						onClick={() => handleCancel()}
					>
						Cancel
					</Button>
				) : (
					''
				)}
			</form>
		</Grid>
	);
}

export default EventForm;
