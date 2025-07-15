export const generateDummyMessages = (count = 100) => {
  const messages = [];

  for (let i = 0; i < count; i++) {
    messages.push({
      text: i % 2 === 0 ? `User message #${i + 1}` : `AI reply #${i + 1}`,
      sender: i % 2 === 0 ? "user" : "ai",
      ts: Date.now() - (count - i) * 1000 * 60,
    });
  }

  return messages;
};
