const axios = require('axios');

exports.handler = async function(event, context) {
  const { text } = JSON.parse(event.body);

  if (!text) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Text is required' }),
    };
  }

  try {
    const response = await axios.post(
      'https://api-inference.huggingface.co/models/facebook/bart-large-cnn',
      { inputs: text },
      {
        headers: {
          Authorization: `Bearer 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`,
          'Content-Type': 'application/json',
        }
      }
    );

    const summary = response.data[0].summary_text;
    return {
      statusCode: 200,
      body: JSON.stringify({ summary }),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to summarize text' }),
    };
  }
};
