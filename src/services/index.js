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
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    //
    // console.log(error.request);
  } else {
    // Something happened in setting up the request that triggered an Error
    //
    // console.log("Error", error.message);
  }
  // console.log(error.config);
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

export function fetchAllAttribute(attribute) {
  return axios.get("/" + attribute).catch(handleErrors);
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
