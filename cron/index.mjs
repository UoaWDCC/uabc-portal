export const handler = async () => {
  if (!process.env.APP_URL)
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "APP_URL is not set" }),
    };

  if (!process.env.API_KEY)
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "API_KEY is not set" }),
    };

  const endpointUrl = `${process.env.APP_URL}/api/cron/generate-sessions`;

  try {
    const res = await fetch(endpointUrl, {
      method: "POST",
      headers: {
        "x-api-key": process.env.API_KEY,
      },
    });

    const body = await res.text();

    return {
      statusCode: res.status,
      body,
    };
  } catch {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to call endpoint" }),
    };
  }
};
