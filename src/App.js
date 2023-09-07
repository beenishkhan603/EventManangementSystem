import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import EventForm from './components/EventForm/EventFrom';
import EventList from './components/EventLisiting/EventList';
import axios from './utils/axiosInterceptor';

function App() {
	const [events, setEvents] = useState([]);
	const [isEdit, setIsEdit] = useState(false);
	const [event, setEvent] = useState({
		title: '',
		startDate: '',
		endDate: '',
		notes: '',
	});
	const addEvent = (eventData) => {
		// TODO: Add event to the backend and update state
		const startDate = new Date(eventData.startDate);
		const endDate = new Date(eventData.endDate);

		if (startDate >= endDate) {
			toast.error('Start date and time must be before end date and time.');
		} else {
			if (!isEdit) {
				axios
					.post('/', eventData)
					.then((response) => {
						if (response?.data) {
							setEvents([...events, eventData]);
							setEvent({
								title: '',
								startDate: '',
								endDate: '',
								notes: '',
							}); // Clear the selected event
							toast.success('Event successfully added');
						} else {
							toast.error('Something went worng. Please try again later');
						}
					})
					.catch((error) => {
						console.log(error);
						if (error.response.status === 400) {
							toast.error(error?.response?.data?.error);
						}
					});
			} else {
				// If event is not null, it means we are editing an existing event
				axios
					.put(`/${event._id}`, eventData)
					.then((response) => {
						console.log('Event edited successfully:', response.data);
						// Update the events array with the edited event
						const updatedEvents = events.map((e) =>
							e._id === event._id ? response.data : e
						);
						setEvents(updatedEvents);
						setEvent({
							title: '',
							startDate: '',
							endDate: '',
							notes: '',
						}); // Clear the selected event
					})
					.catch((error) => {
						console.log('Error editing event:', error);
					});
			}
		}
	};
	const deleteEvent = (index, id) => {
		axios
			.delete(`/${id}`)
			.then((response) => {
				if (response.status === 204) {
					toast.success('Event deleted successfully');
				}
			})
			.catch((error) => {
				console.log(error);
			});
		const temp = [...events];
		temp.splice(index, 1);
		setEvents(temp);
	};
	const getEvents = () => {
		axios
			.get('/')
			.then((response) => {
				const { data } = response;
				setEvents(data);
			})
			.catch((error) => {
				console.log(error);
			});
	};
	const handleEdit = (id) => {
		setEvent(events.find((e) => e._id === id));
		setIsEdit(true);
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setEvent({ ...event, [name]: value });
	};
	const handleCancel = () => {
		setIsEdit(false);
		setEvent({
			title: '',
			startDate: '',
			endDate: '',
			notes: '',
		}); // Clear the selected event
	};

	useEffect(() => {
		getEvents(); // to fetch the events from databse
	}, []);
	return (
		<div>
			<ToastContainer />
			<h1 style={{ textAlign: 'center' }}>Calendar Event Management</h1>
			<EventForm
				onSubmit={addEvent}
				event={event}
				isEdit={isEdit}
				handleChange={handleChange}
				handleCancel={handleCancel}
			/>
			<EventList
				events={events}
				deleteEvent={deleteEvent}
				handleEdit={handleEdit}
			/>
		</div>
	);
}

export default App;
