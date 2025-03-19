import { useState, useRef } from "react";
import "./App.css";

function App() {
  const [videoUrl, setVideoUrl] = useState("");
  const [captions, setCaptions] = useState([]);
  const [currentCaption, setCurrentCaption] = useState({
    text: "",
    timestamp: "",
  });
  const [currentTime, setCurrentTime] = useState(0);
  const videoRef = useRef(null);

  const handleAddCaption = () => {
    if (currentCaption.text && currentCaption.timestamp) {
      // Convert timestamp to seconds for easier comparison
      const [hours, minutes, seconds] = currentCaption.timestamp
        .split(":")
        .map(Number);
      const timestampInSeconds = hours * 3600 + minutes * 60 + seconds;

      setCaptions([...captions, { ...currentCaption, timestampInSeconds }]);
      setCurrentCaption({ text: "", timestamp: "" });
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const getCurrentCaption = () => {
    return captions.find(
      (caption) => currentTime >= caption.timestampInSeconds // Show caption for 5 seconds
    );
  };

  return (
    <div className="app-container">
      <h1>Video Caption Creator</h1>

      <div className="input-section">
        <input
          type="text"
          placeholder="Enter video URL"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          className="url-input"
        />
      </div>

      <div className="video-section">
        {videoUrl && (
          <div className="video-container">
            <video
              ref={videoRef}
              controls
              className="video-player"
              src={videoUrl}
              onTimeUpdate={handleTimeUpdate}
            >
              Your browser does not support the video tag.
            </video>
            <div className="caption-overlay">{getCurrentCaption()?.text}</div>
          </div>
        )}
      </div>

      <div className="caption-section">
        <div className="caption-input">
          <textarea
            placeholder="Enter caption text"
            value={currentCaption.text}
            onChange={(e) =>
              setCurrentCaption({ ...currentCaption, text: e.target.value })
            }
            className="caption-text"
          />
          <input
            type="text"
            placeholder="Timestamp (e.g., 00:00:00)"
            value={currentCaption.timestamp}
            onChange={(e) =>
              setCurrentCaption({
                ...currentCaption,
                timestamp: e.target.value,
              })
            }
            className="timestamp-input"
          />
          <button onClick={handleAddCaption} className="add-button">
            Add Caption
          </button>
        </div>

        <div className="captions-list">
          <h3>Added Captions:</h3>
          {captions.map((caption, index) => (
            <div key={index} className="caption-item">
              <span className="timestamp">{caption.timestamp}</span>
              <span className="text">{caption.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
