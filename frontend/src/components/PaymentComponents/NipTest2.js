import { useState, useEffect } from 'react';

function WarningMessage({ deadline }) {
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    const now = new Date();
    const diffInMs = deadline - now;
    const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));
    if (diffInDays <= 5) {
      setShowWarning(true);
    }
  }, [deadline]);

  return (
    <>
      {showWarning && (
        <div className="warning">
          Deadline approaching! Please complete your task soon.
        </div>
      )}
    </>
  );
}

function App() {
  const [deadline, setDeadline] = useState('');

  const handleInputChange = (event) => {
    setDeadline(event.target.value);
  };

  return (
    <div>
      <h1>Task Deadline Checker</h1>
      <label htmlFor="deadline">Enter task deadline:</label>
      <input type="date" id="deadline" name="deadline" onChange={handleInputChange} />
      <WarningMessage deadline={new Date(deadline)} />
    </div>
  );
}

export default App;