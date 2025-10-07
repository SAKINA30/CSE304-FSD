import React, { useState } from 'react';
import './App.css';
import { FaEdit, FaTrash, FaMicrophone, FaCheckCircle } from 'react-icons/fa';

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  // Add or update task
  const addTask = () => {
    if (input.trim() === '') return;

    if (editIndex !== null) {
      const updatedTasks = [...tasks];
      updatedTasks[editIndex].text = input;
      setTasks(updatedTasks);
      setEditIndex(null);
    } else {
      setTasks([...tasks, { text: input, completed: false }]);
    }

    setInput('');
  };

  // Edit task
  const editTask = (index) => {
    setInput(tasks[index].text);
    setEditIndex(index);
  };

  // Delete task
  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  // Complete task and auto-delete after 3 seconds
  const completeTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = true;
    setTasks(updatedTasks);

    setTimeout(() => {
      deleteTask(index);
    }, 3000); // Auto-delete after 3 seconds
  };

  // Voice input
  const startListening = () => {
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.start();

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;

      if (editIndex !== null) {
        const updatedTasks = [...tasks];
        updatedTasks[editIndex].text = transcript;
        setTasks(updatedTasks);
        setEditIndex(null);
      } else {
        setTasks([...tasks, { text: transcript, completed: false }]);
      }

      setInput('');
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
    };
  };

  return (
    <div className="container">
      <h2>Get Things Done!</h2>

      <div className="main-content">
        <div className="input-section">
          <input
            type="text"
            placeholder="What is the task today?"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button onClick={addTask}>
            {editIndex !== null ? 'Update' : 'Add Task'}
          </button>
          <button onClick={startListening} title="Speak to add task">
            <FaMicrophone />
          </button>
        </div>

        <div className="task-list">
          {tasks.map((task, index) => (
            <div
              className={`task ${task.completed ? 'completed' : ''}`}
              key={index}
              >
              <span>{task.text}</span>
              <div className="actions">
                <button onClick={() => completeTask(index)} title="Mark as Complete">
                  <FaCheckCircle />
                </button>
                <button onClick={() => editTask(index)} title="Edit Task">
                  <FaEdit />
                </button>
                <button onClick={() => deleteTask(index)} title="Delete Task">
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;