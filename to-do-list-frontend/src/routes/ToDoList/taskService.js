import API from "../shared/AxiosHelper";

const getAll = async () => {
  return API.get("/task");
};
const getById = async (id) => {
  throw new Error("Not Implemented");
};
const save = async (task) => {
  throw new Error("Not Implemented");
};
const update = async (id, task) => {
  return API.put(`/task/${id}`, task);
};
const deleteById = async (id) => {
  throw new Error("Not Implemented");
};

const taskService = {
  getAll,
  getById,
  save,
  update,
  deleteById,
};

export default taskService;
