import axios from "axios";

export default axios.create({
  baseURL:
    "https://firestore.googleapis.com/v1/projects/daily-quest-255801/databases/(default)/documents/project-list/projects"
});
