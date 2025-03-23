import axios from "axios";

const API_URL = "http://localhost:8000/api";

export const fetchLevels = async () => {
    const response = await axios.get(`${API_URL}/levels/`);
    return response.data;
};

export const submitAnswer = async (levelNumber, answer) => {
    const response = await axios.post(`${API_URL}/submit/`, { level_number: levelNumber, answer });
    return response.data;
};

export const fetchLeaderboard = async () => {
    const response = await axios.get(`${API_URL}/leaderboard/`);
    return response.data;
};
