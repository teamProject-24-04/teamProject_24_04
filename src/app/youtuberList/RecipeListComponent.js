import React, { useState, useEffect } from 'react';
import { FaUser } from 'react-icons/fa';
import axios from 'axios';
import { Link } from 'react-router-dom';

function RecipeListComponent({ isPressed1 }) {
  const [youtubers, setYoutubers] = useState([]);

  useEffect(() => {
    async function fetchYoutubers() {
      try {
        const response = await axios.get('/api/youtubers');
        setYoutubers(response.data);
      } catch (error) {
        console.error('Error fetching youtubers:', error);
      }
    }
    fetchYoutubers();
  }, []);

  return (
    <div className="youtuber_recipe" style={{ display: isPressed1 ? 'block' : 'none' }}>
      {youtubers.map((youtuber, index) => (
        <Link to={`/detail/${youtuber.id}`} key={index} className="recipe_list">
          <div className="recipe_list">
            <img src={youtuber.img_url} alt={youtuber.name} />
            <div className="recipe_info">
              <p>{youtuber.name}</p>
              <p>{youtuber.content_name}</p>
              <div className="views">
                <FaUser />
                <span>{youtuber.views}</span>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default RecipeListComponent;
