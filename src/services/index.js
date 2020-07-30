import axios from "axios";
import runtimeEnv from "@mars/heroku-js-runtime-env";
const API_ROOT = runtimeEnv().REACT_APP_API_URL;
const token = localStorage.getItem("token");
// const API_ROOT = "https://my-dear-watson.herokuapp.com/api/v1";

axios.defaults.baseURL = API_ROOT;

function handleErrors(error) {
  if (error.response) {
    alert(error.response.data.error);
    console.log(error.response.status);
    console.log(error.response.headers);
  } else if (error.request) {
    console.log(error.request);
  } else {
    console.log("Error", error.message);
  }
}

export function fetchChannelAttribute(channelId, attribute) {
  if (token) {
    return axios
      .get("/channel/" + channelId + "/" + attribute, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch(handleErrors);
  }
}

export function fetchKeywords(id) {
  // 5572
  if (token) {
    return axios
      .get(`/channel/${id}/keywords`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch(handleErrors);
  }
}

export function fetchTopChannels() {
  if (token) {
    return axios
      .get("/slack/topchannels", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch(handleErrors);
  }
}

export function fetchChannels() {
  if (token) {
    return axios
      .get("/channels", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch(handleErrors);
  }
}

export function fetchMetadata(attribute) {
  if (token) {
    return axios
      .get("/analysis_metadata/" + attribute, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch(handleErrors);
  }
}

export function fetchAccountAttributeAndMetadata(channelId, attribute) {
  let finalRes = {};
  return fetchChannelAttribute(channelId, attribute)
    .then((res) => {
      // debugger;
      if (res) {
        finalRes.attributeAnalysis = res.data;
      }
    })
    .then(() =>
      fetchMetadata(attribute).then(
        (res) => (finalRes.analysisMetadata = res.data)
      )
    )
    .then(() => finalRes);
}

export function fetchAndUpdateChannels() {
  if (token) {
    return axios
      .get("/channels/update", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch(handleErrors);
  }
}

export function fetchTopChannelAttributes() {
  let finalRes = {};
  if (token) {
    return fetchTopChannels()
      .then((res) => {
        // debugger;
        if (res) {
          finalRes.topChannels = res.data.top_channels;
        }
      })

      .then(() => finalRes)
      .catch(handleErrors);
  }
}

export function fetchChannelKeywords(id) {
  let finalRes = {};

  return fetchKeywords(id)
    .then((res) => {
      finalRes.keywords = res.data.keywords;
      finalRes.entities = res.data.entities;
    })

    .then(() => finalRes);
}

export function isLoggedIn() {
  const token = localStorage.getItem("token");
  if (token) {
    console.log("TOKEN TRUE", token);
    return true;
  }
  console.log("TOKEN false", token);
  return false;
}

export function deleteAccout(id) {
  if (token) {
    return axios
      .delete(`/employees/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch(handleErrors);
  }
}
