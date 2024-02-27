//  eslint-disable 
import axios from 'axios';
export const createThread = async (question, description) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/threads/createThread',
      data: {
       question,
       description
      }
    });

  } catch (err) {
    console.log(err.response.data.message);
  }
};


