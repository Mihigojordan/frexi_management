// services/contactService.js
import axios from "axios";

import { API_URL } from '../api/api'; // Adjust the import path as needed

const sendMessage = async(data) => {
    try {
        const response = await axios.post(`${API_URL}/contact-messages`, data);
        return response.data;
    } catch (error) {
        console.error("Error sending message:", error);
        throw error;
    }
};
const GetMessage = async() => {
    try {
        const response = await axios.get(`${API_URL}/contact-messages`);
        return response.data;
    } catch (error) {
        console.error("Error sending message:", error);
        throw error;
    }
};

export default {
    sendMessage,
    GetMessage
};