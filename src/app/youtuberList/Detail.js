import React, { useState, useEffect } from 'react';
import { FaUser } from 'react-icons/fa';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function Detail() {
  const { id } = useParams();
  const [youtuber, setYoutuber] = useState(null);

  useEffect(() => {
    async function fetchYoutuberDetail() {
      try {
        const response = await axios.post('/api/youtuberDetail', { id }); // Send ID in request body
        setYoutuber(response.data);
      } catch (error) {
        console.error('Error fetching youtuber detail:', error);
      }
    }
    fetchYoutuberDetail();
  }, [id]);

  if (!youtuber) {
    return <div>Loading...</div>;
  }

  return (
    <div className="youtuber_detail">
      <img src={youtuber.img_url} alt={youtuber.name} />
      <div className="detail_info">
        <p>{youtuber.name}</p>
        <p>{youtuber.content_name}</p>
        <div className="views">
          <FaUser />
          <span>{youtuber.views}</span>
        </div>
        {/* Display additional detail information here */}
      </div>
    </div>
  );
}

export default Detail;
