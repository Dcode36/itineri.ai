import React, { useState } from 'react';
import axios from 'axios';
import '../landingpage/css/Chatbot.css'; // Ensure you have the CSS file
import Navbar from '../landingpage/Navbar';

const Recommendations = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');

  const formatText = (text) => {
    // Function to format the text with headings and bold
    return text
      .split('\n')
      .map((line, index) => {
        if (line.startsWith('##') && line.endsWith(':')) {
          // Heading
          return <h3 key={index}>{line.slice(2, -1)}</h3>;
        } else if (line.includes('**')) {
          // Bold
          const parts = line.split('**');
          return parts.map((part, i) =>
            i % 2 === 1 ? <strong key={i}>{part}</strong> : part
          );
        } else {
          return <p key={index}>{line}</p>;
        }
      });
  };

  const handleSendMessage = async () => {
    if (userInput.trim() === '') return;

    // Add user message to chat
    const newMessages = [
      ...messages,
      { sender: 'user', text: userInput }
    ];

    setMessages(newMessages);
    setUserInput('');

    try {
      // Send user message to API
      const response = await axios.post('https://node-api-z9nr.onrender.com/chat', {
        message: userInput
      });

      // Update bot response with formatted text
      const {
        geographicalOverview,
        culturalAndHistoricalSignificance,
        majorAttractions,
        localCuisineAndDiningOptions,
        activitiesAndExperiences,
        practicalInformation,
        additionalInsights
      } = response.data;

      // Construct bot response
      let botResponse = '';
      if (geographicalOverview) botResponse += geographicalOverview + '\n';
      if (culturalAndHistoricalSignificance) botResponse += culturalAndHistoricalSignificance + '\n';
      if (majorAttractions) botResponse += majorAttractions + '\n';
      if (localCuisineAndDiningOptions) botResponse += localCuisineAndDiningOptions + '\n';
      if (activitiesAndExperiences) botResponse += activitiesAndExperiences + '\n';
      if (practicalInformation) botResponse += practicalInformation + '\n';
      if (additionalInsights) botResponse += additionalInsights + '\n';

      // Add bot response to chat
      setMessages([
        ...newMessages,
        { sender: 'bot', text: botResponse || 'No response from bot' }
      ]);
    } catch (error) {
      console.error('Error fetching response from API:', error);
      setMessages([
        ...newMessages,
        { sender: 'bot', text: 'Sorry, something went wrong.' }
      ]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent default behavior of Enter key (e.g., form submission)
      handleSendMessage();
    }
  };

  return (
    <div className="chatbot-container">
      <Navbar />
      <div className="chat-window">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message-bubble fs-5 ${message.sender}`}
          >
            {message.sender === 'bot' ? formatText(message.text) : message.text}
          </div>
        ))}
      </div>
      <div className="input-container">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Recommendations;
