import React, { useState, useEffect } from 'react';
import './Notes.css';
import axios from 'axios';

const Note = () => {
  const [text, setText] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const userId = localStorage.getItem('id');
      try {
        const response = await axios.get(`http://localhost:3001/note/${userId}`);
        if (response.data && response.data.text) {
          setText(response.data.text);
        }
      } catch (error) {
        console.error('Error fetching note:', error);
      }
    };

    fetchData();
  }, []);

  const handleChange = async (e) => {
    const newText = e.target.value;
    setText(newText);
    const userId = localStorage.getItem('id');
    try {
      await axios.post(`http://localhost:3001/note/${userId}`, { text: newText });
      console.log('Note saved successfully');
    } catch (error) {
      console.error('Error saving note:', error);
    }
  };

  return (
    <div className="note-container">
      <textarea
        className="note-textarea"
        value={text}
        onChange={handleChange}
        placeholder="Write your note here..."
      />
    </div>
  );
};

export default Note;
