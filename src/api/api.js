import axios from "axios";

/////////////////////////////////////////////////////////////////////////////
export const loginApi = {
  post: (user) => {
    const url = "https://quangnh.xyz/v1/authentication/login";
    return axios.post(url, {
      email: user.email,
      password: user.password,
    });
  },
};
/////////////////////////////////////////////////////////////////////////////

export const forgotApi = {
  post: (user) => {
    const url = "https://quangnh.xyz/v1/authentication/forgot-password";
    return axios.post(url, {
      email: user.email,
    });
  },
};
/////////////////////////////////////////////////////////////////////////////

export const registerApi = {
  post: (user) => {
    const url = "https://quangnh.xyz/v1/authentication/register";
    return axios.post(url, {
      email: user.email,
      name: user.name,
      password: user.password,
    });
  },
};
/////////////////////////////////////////////////////////////////////////////

export const questionApi = {
  getQuestionsPlay: (number) => {
    const url = "https://quangnh.xyz/v1/questions/play";
    return axios.get(url, {
      headers: {
        Authorization: `bearer ${localStorage.getItem("ACCESS_TOKEN")}`,
      },
      params: {
        total: number,
      },
    });
  },

  submitQuestionsPlay: (listQuestionsSubmit) => {
    const url = "https://quangnh.xyz/v1/questions/submit";
    return axios.post(url, {
      headers: {
        Authorization: `bearer ${localStorage.getItem("ACCESS_TOKEN")}`,
      },
    });
  },

  getAllQuestion: (filterQuestions) => {
    const url = "https://quangnh.xyz/v1/questions";
    return axios.get(url, {
      headers: {
        Authorization: `bearer ${localStorage.getItem("ACCESS_TOKEN")}`,
      },
      params: {
        sortField: filterQuestions.sortField,
        keyWord: filterQuestions.keyWord,
        order: filterQuestions.order,
        size: filterQuestions.size,
        page: filterQuestions.page,
      },
    });
  },
};
