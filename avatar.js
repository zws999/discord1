export default async (client) => {
  try {
    await client.user.setAvatar("https://i.imgur.com/9CF61rq.gif");
    console.log("Avatar setat!");
  } catch (err) {
    console.error(err);
  }
};