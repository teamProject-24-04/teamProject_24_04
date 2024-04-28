import React from 'react';
import YouTube from 'react-youtube';

const YouTubePlayer = ({ videoId }) => {
  return (
    <div>
      <h2>YouTube Video</h2>
      <YouTube videoId={videoId} />
    </div>
  );
};

export default YouTubePlayer;
