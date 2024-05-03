import React from 'react';
import { FaUser } from 'react-icons/fa';

function RecipeListComponent({ youtubers, isPressed1 }) {
  return (
    <div className="youtuber_recipe" style={{ display: isPressed1 ? 'block' : 'none' }}>
      {youtubers.map((youtuber, index) => (
        <div key={index} className="recipe_list">
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
      ))}
    </div>
  );
}

export default RecipeListComponent;
