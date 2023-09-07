import React, { useState, useEffect } from 'react';
import { Button, TextField, TextareaAutosize, Grid } from '@mui/material';
import moment from 'moment';

function EventForm({ onSubmit, event, handleChange, isEdit, handleCancel }) {
	console.log(event);
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
					label="Start Date/Time"
					fullWidth
					required
					margin="normal"
					InputLabelProps={{
						shrink: true,
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
				/>
				<TextareaAutosize
					name="notes"
					value={event.notes}
					onChange={handleChange}
					label="Event Notes"
					placeholder="Event Notes"
					fullWidth
					minRows={3}
					margin="normal"
				/>
				<br />
				<br />
				<Button variant="contained" color="primary" type="submit">
					{isEdit ? 'Save' : 'Submit'}
				</Button>
				&nbsp;&nbsp;
				{isEdit ? (
					<Button
						variant="contained"
						color="secondary"
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
