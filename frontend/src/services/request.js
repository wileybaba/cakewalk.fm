export default async function request(url, { body, ...customConfig } = {}) {
  const config = {
    method: body ? "POST" : "GET",
    ...customConfig,
    headers: {
      ...customConfig.headers,
    },
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  const response = await fetch(url, config);

  const data = await response.json();

  if (response.ok) {
    return data;
  }

  return Promise.reject(data);
}
