import React, { useRef, useEffect, useState, useCallback } from "react";
import "./Readerboard.css";

function Readerboard({ events }) {
  const scrollContainerRef = useRef(null);
  const animationFrameRef = useRef(null);
  const [titleBarContent, setTitleBarContent] = useState({ text: "", position: 100 });
  const lastScrollPosition = useRef(0);
  const SCROLL_SPEED = 1;

  const updateScroll = useCallback(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    lastScrollPosition.current += SCROLL_SPEED;
    
    const containerHeight = scrollContainer.clientHeight;
    const scrollHeight = scrollContainer.scrollHeight;
    
    if (lastScrollPosition.current >= scrollHeight - containerHeight) {
      lastScrollPosition.current = containerHeight;
    }
    
    scrollContainer.scrollTop = lastScrollPosition.current;

    const eventGroups = scrollContainer.querySelectorAll('.event-group');
    let nextTitle = { text: "", position: 100 };

    eventGroups.forEach(group => {
      const rect = group.getBoundingClientRect();
      const titleElement = group.querySelector('.event-title');
      const eventTitle = group.getAttribute('data-event-name');
      
      if (titleElement) {
        const titleRect = titleElement.getBoundingClientRect();
       

        if (titleRect.top <= 10 && titleRect.top >= -30) {  
          const progress = (10 - titleRect.top) / 50; 
          nextTitle = { text: eventTitle, position: 100 - (progress * 100) };
        }
 
        else if (titleRect.top < -30 && rect.bottom > 90) { 
          nextTitle = { text: eventTitle, position: 0 };
        }

        else if (rect.bottom <= 90 && rect.bottom > 40 && nextTitle.text === "") {
          const exitProgress = (90 - rect.bottom) / 50;
          nextTitle = { text: eventTitle, position: -100 * exitProgress };
        }
      }
    });

    setTitleBarContent(nextTitle);
    animationFrameRef.current = requestAnimationFrame(updateScroll);
  }, []);

  useEffect(() => {
    if (events.length > 0) {
      const scrollContainer = scrollContainerRef.current;
      if (scrollContainer) {
        const tripleContent = document.createElement('div');
        tripleContent.className = 'scroll-content';
        
        const content = events.map((event, eventIndex) => (
          `<div class="event-group" data-event-name="${event.eventName}">
            <div class="event-title">
              <span class="event-title-text">${event.eventName}</span>
            </div>
            ${event.rooms.map((room, roomIndex) => `
              <div class="room">
                <div class="room-time">
                  <span class="time-text">${room.timeRange}</span>
                </div>
                <div class="room-name">
                  <span class="meeting-text">${room.meetingName}</span>
                </div>
                <div class="room-location">
                  <span class="location-text">${room.roomName}</span>
                </div>
              </div>
            `).join('')}
          </div>`
        )).join('');
        
        tripleContent.innerHTML = content + content + content;
        scrollContainer.innerHTML = '';
        scrollContainer.appendChild(tripleContent);
        
        lastScrollPosition.current = scrollContainer.clientHeight;
        scrollContainer.scrollTop = lastScrollPosition.current;
      }
      
      animationFrameRef.current = requestAnimationFrame(updateScroll);
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [events, updateScroll]);

  return (
    <div className="readerboard-container">
      <div className="fixed-event-title">
        <div 
          className="title-content"
          style={{
            transform: `translateY(${titleBarContent.position}%)`
          }}
        >
          {titleBarContent.text}
        </div>
      </div>
      <div className="readerboard" ref={scrollContainerRef}>
        {/* Content will be injected via JavaScript */}
      </div>
    </div>
  );
}

export default Readerboard;