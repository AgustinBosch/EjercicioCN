import API from "../shared/AxiosHelper";

const getAll = async () => {
  return API.get("/task");
};
const getById = async (id) => {
  throw new Error("Not Implemented");
};
const save = async (task) => {
  return API.post(`/task`, task);
};
const update = async (id, task) => {
  return API.put(`/task/${id}`, task);
};
const deleteById = async (id) => {
  return API.deleteRequest(`/task/${id}`);
};

const taskService = {
  getAll,
  getById,
  save,
  update,
  deleteById,
};

export default taskService;
