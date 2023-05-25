const SeparateMessage = (message) => {
  let message_text;
  let message_link = "";

  try {
    if (message.includes("|")) {
      [message_link, message_text] = message.split("|");
    } else {
      message_text = message
    }
  } catch (e) {
    console.log(e);
    message_text = message;
  }

  return { message: message_text, message_img: message_link };
};

export default SeparateMessage;