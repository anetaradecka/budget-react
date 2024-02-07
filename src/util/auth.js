import { redirect } from "react-router-dom";

export function getTokenDuration() {
  const storedExpirationDate = localStorage.getItem("expiration");
  const expirationDate = new Date(storedExpirationDate);
  const now = new Date();
  const duration = expirationDate.getTime() - now.getTime();

  return duration;
}

export function getAuthToken() {
  const token = localStorage.getItem("token");

  if (!token) {
    return null;
  }

  const tokenDuration = getTokenDuration();

  if (tokenDuration < 0) {
    return "EXPIRED";
  }

  return token;
}

export function checkAuthLoader() {
  const token = getAuthToken();

  if (!token) {
    return redirect("/");
  }

  return null;
}

export function getCSRFToken() {
  fetch("http://localhost:8080/getCSRFToken")
    .then((res) => {
      console.log(res.json());
      return res.json();
    })
    .then((data) => {
      console.log(data);
      const csrf = data.CSRFToken;
      console.log(csrf);
      return csrf;
    })
    .catch((err) => {
      console.log(err);
    });

  // const responseJSON =  response.json();

  // const csrfToken =  responseJSON.CSRFToken;

  // console.log(`csrfToken: ${csrfToken}`);

  // return csrfToken;
}
