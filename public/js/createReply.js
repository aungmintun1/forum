//  eslint-disable 
import axios from 'axios';
export const createReply = async (text,threadId,commentId) => {
  try {
    const res = await axios({
      method: 'POST',
      url: `/threads/${threadId}/comments/reply/${commentId}`,
      data: {
       text
      }
    });

  } catch (err) {
    console.log(err.response.data.message);
  }
};


