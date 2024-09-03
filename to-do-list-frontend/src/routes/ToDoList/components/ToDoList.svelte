<script>
  import { onMount } from "svelte";
  import Task from "./Task.svelte";
  import taskService from "../services/taskService";
  import AddTask from "./AddTask.svelte";
  import Footer from "./Footer.svelte";

  let tasks = [];
  let newTaskTitle = "";
  let newTaskDescription = "";
  let editingTaskId = null;

  onMount(async () => {
    await cargarInformacion();
  });

  const cargarInformacion = async () => {
    try {
      const response = await taskService.getAll();

      if (Array.isArray(response)) {
        tasks = response;
      } else {
        tasks = [];
      }
    } catch (error) {
      console.error("Error cargando las tareas", error);
      tasks = [];
    }
  };



  const deleteTask = async (id) => {
    try {
      await taskService.deleteById(id);
      await cargarInformacion();
    } catch (error) {
      console.error("Error eliminando la tarea", error);
    }
  };

  const updateTask = async (id) => {
    try {
      const taskToUpdate = tasks.find((task) => task.id === id);
      if (taskToUpdate) {
        taskToUpdate.isComplete = true;
        await taskService.update(id, taskToUpdate);
        await cargarInformacion();
      }
    } catch (error) {
      console.error("Error actualizando la tarea", error);
    }
  };
  const editTask = (id) => {
    const taskToEdit = tasks.find((task) => task.id === id);
    if (taskToEdit) {
      newTaskTitle = taskToEdit.title;
      newTaskDescription = taskToEdit.description;
      editingTaskId = id;
    }
  };
  const saveTask = async (id, title, description) => {
    try {
      const taskToSave = tasks.find((task) => task.id === id);
      if (taskToSave) {
        taskToSave.title = title;
        taskToSave.description = description;
        await taskService.update(id, taskToSave);
        await cargarInformacion();
      }
    } catch (error) {
      console.error("Error guardando los cambios en la tarea", error);
    }
  };
</script>

<AddTask {cargarInformacion}/>

<div class="task-container">
  {#if tasks.length > 0}
    {#each tasks as task, index (task.id)}
      <Task
        {task}
        {index}
        onDelete={deleteTask}
        onUpdate={updateTask}
        onEdit={editTask}
        onSave={saveTask}
      />
    {/each}
  {:else}
    <p>No hay tareas disponibles.</p>
  {/if}
</div>

<style>
  .task-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 30px;
    padding: 20px;
    grid-auto-rows: minmax(250px, auto);
    align-items: start;
  }
  

</style>
