import axios from 'axios';

export default axios.create({
	baseURL: 'https://firestore.googleapis.com/v1/projects/daily-quest-43108/databases/(default)/documents/projectslist/projects'
})