
export const getAvatar = async (username) => {
  const response = await fetch(`http://localhost:9999/api/userinfo/${username}`);
  const { picture } = await response.json();
  return picture;
};
