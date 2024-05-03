// DetailPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function DetailPage({ match }) {
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    async function fetchRecipe() {
      try {
        const response = await axios.get(`/api/youtubers/${match.params.id}`);
        setRecipe(response.data);
      } catch (error) {
        console.error('Error fetching recipe:', error);
      }
    }

    fetchRecipe();
  }, [match.params.id]);

  if (!recipe) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{recipe.name}</h2>
      <img src={recipe.img_url} alt={recipe.name} />
      <p>{recipe.content_name}</p>
      <p>Views: {recipe.views}</p>
      {/* Additional YouTuber information to display */}
    </div>
  );
}

export default DetailPage;
