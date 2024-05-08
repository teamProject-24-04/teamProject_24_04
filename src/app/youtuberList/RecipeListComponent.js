import React, { useState, useEffect } from 'react';
import { FaUser } from 'react-icons/fa';
import axios from 'axios';
import { Link } from 'react-router-dom';
import BottomNavigationComponent from '../BottomNavigationComponent';

function RecipeListComponent({ isPressed1, isPressed2 }) {
  const [youtubers, setYoutubers] = useState([]);
  const [members, setMembers] = useState([]);
  const [bottomValue, setBottomValue] = React.useState(0);

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

  useEffect(() => {
    async function fetchMembers() {
      try {
        const response = await axios.get('/api/members');
        setMembers(response.data);
      } catch (error) {
        console.error('Error fetching members:', error);
      }
    }
    fetchMembers();
  }, []);

  return (
    <>
      <div className="youtuber_recipe" style={{ display: isPressed1 ? 'block' : 'none' }}>
        {youtubers.map((youtuber, index) => (
          <Link to={`/YoutubersDetail/${youtuber.id}`} key={index} className="recipe_list">
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
      <div className="member_recipe" style={{ display: isPressed1 ? 'none' : 'block' }}>
        {members.map((member, index) => (
          <Link to={`/MembersDetail/${member.id}`} key={index} className="recipe_list">
            <div className="recipe_list">
              <img
                src="data:image/png;base64,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"
                alt=""
              />
              <div className="recipe_info">
                <p>{member.nickname}</p>

                <div className="views">
                  <FaUser />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}

export default RecipeListComponent;
