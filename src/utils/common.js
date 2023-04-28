import axios from "axios";

export const getTutor = async (token, callback) => {
  const response = await axios.get(
    `${process.env.REACT_APP_API_URL}/api/tutor_form/tutor/data`,
    {
      headers: {
        Authorization: `Bearer ${token.replace(/['"]+/g, "")}`,
      },
    }
  );
  callback(response.data?.tutor);
};
export const getCurrentUser = async (callback) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/auth/user/profile`,
      {
        headers: {
          Authorization: `Bearer ${JSON.parse(
            localStorage.getItem("token")
          )}`,
        },
      }
    );
    callback(response.data.user);
  } catch (err) {
    console.error(err);
  }
};