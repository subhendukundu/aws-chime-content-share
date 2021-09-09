export const SERVER_URL = process.env.REACT_APP_SERVER_URL;

export async function createMeetingRequest(data) {
  console.log("data", data);
  const body = JSON.stringify(data);
  console.log(body);
  const response = await fetch(SERVER_URL, {
    method: "post",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
    body,
  });
  const res = await response.json();
  console.log(res);
  return res;
}
