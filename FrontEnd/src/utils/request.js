import axios from "axios";

const urlBase = "http://localhost:3001/";

const selectAllUser = () => {
  return axios.get(urlBase + `selectAll`);
};

const selectUser = url => {
  return axios.get(urlBase + url);
};

const insertUser = item => {
  return axios.post(urlBase + `insert`, { item });
};

const updateUser = item => {
  return axios.post(urlBase + `update`, { item });
};

const deleteUser = item => {
  return axios.post(urlBase + "delete", { item });
};

export { selectAllUser, selectUser, insertUser, updateUser, deleteUser };
