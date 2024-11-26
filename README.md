# Readerboard Demo

A React-based readerboard display component that smoothly scrolls through event information with an elegant title transition effect.

## Features

- Smooth vertical scrolling of event information
- Seamless title transitions
- Infinite scroll functionality
- Responsive layout optimized for vertical displays (1080px width)
- Clean, modern UI with customizable styling

## Installation

```bash
# Clone the repository
git clone https://github.com/dsj7419/readerboard-demo.git

# Navigate to project directory
cd readerboard-demo

# Install dependencies
npm install
```

## Usage

```bash
# Run the development server
npm start
```

The application expects event data in the following format:

```javascript
const events = [
  {
    eventName: "Event Title",
    rooms: [
      {
        timeRange: "9:00 AM",
        meetingName: "Meeting Name",
        roomName: "Room Location"
      },
      // ... more rooms
    ]
  },
  // ... more events
]
```

## Configuration

Key customizable parameters in the Readerboard component:

- `SCROLL_SPEED`: Controls the speed of the vertical scroll
- Title transition timings and animations can be adjusted in the updateScroll function
- Styling can be modified through the Readerboard.css file

## License

MIT License
