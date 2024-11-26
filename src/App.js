import React, { useEffect, useState } from "react";
import Readerboard from "./readerboard";
import "./App.css";

function App() {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        console.log("Starting to load events");
        const response = await fetch('/data/readerboard_demo.json');
        const data = await response.json();
        console.log("Loaded data:", data);
       
        const formattedData = data.reduce((acc, item) => {
          const {
            "Event Name": eventName,
            "Room Name": roomName,
            "Time Range": timeRange,
            "Meeting Name": meetingName,
          } = item;
         
          const event = acc.find((e) => e.eventName === eventName);
          if (event) {
            event.rooms.push({ roomName, timeRange, meetingName });
          } else {
            acc.push({
              eventName,
              rooms: [{ roomName, timeRange, meetingName }],
            });
          }
          return acc;
        }, []);

        formattedData.forEach(event => {
          event.rooms.sort((a, b) => {
            const timeA = a.timeRange.split(' - ')[0];
            const timeB = b.timeRange.split(' - ')[0];
            return timeA.localeCompare(timeB);
          });
        });

        console.log("Formatted data:", formattedData);
        setEvents(formattedData);
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading event data:', error);
        setIsLoading(false);
      }
    };

    loadEvents();
  }, []);

  return (
    <div className="App">
      {isLoading ? (
        <div className="loading-screen">
          <div className="loading-spinner"></div>
          <div className="loading-text">Loading Events...</div>
        </div>
      ) : (
        <Readerboard events={events} />
      )}
    </div>
  );
}

export default App;