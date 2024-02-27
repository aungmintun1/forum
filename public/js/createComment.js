//  eslint-disable 
import axios from 'axios';
export const createComment = async (text,threadId) => {
  try {
    const res = await axios({
      method: 'POST',
      url: `/threads/${threadId}/comments/createComment`,
      data: {
       text
      }
    });

  } catch (err) {
    console.log(err.response.data.message);
  }
};


