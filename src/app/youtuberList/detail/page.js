// DetailPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function DetailPage({ match }) {
  const [youtuber, setYoutuber] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`/api/youtubers/${match.params.id}`);
        setYoutuber(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, [match.params.id]);

  if (!youtuber) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{youtuber.name}</h2>
      <img src={youtuber.img_url} alt={youtuber.name} />
      <p>{youtuber.content_name}</p>
      <p>Views: {youtuber.views}</p>
    </div>
  );
}

export default DetailPage;