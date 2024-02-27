//  eslint-disable 
import axios from 'axios';
export const addThreadLike = async (threadId) => {
  try {
    const res = await axios({
      method: 'POST',
      url: `/threads/${threadId}/likes/addLike`,
      data: {
       
      }
    });

  } catch (err) {
    console.log(err.response.data.message);
  }
};


