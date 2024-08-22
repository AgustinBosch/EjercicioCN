<script>
  import { onMount } from "svelte";
  import Task from "./Task.svelte";
  import taskService from "./taskService";

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

  const addTask = async () => {
    try {
      const newTask = {
        title: newTaskTitle,
        description: newTaskDescription,
      };
      const response = await taskService.save(newTask);
      console.log("Tarea creada:", response);
      await cargarInformacion();
      newTaskTitle = "";
      newTaskDescription = "";
    } catch (error) {
      console.error("Error añadiendo la tarea", error);
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

<div class="container-encabezado">
  <div class="container-titulo">
    <h1>To Do List</h1>
  </div>
  <div class="input-container">
    <div class="input-titulo">
      <label class="input-label" for="title">Título:</label>
      <input
        id="title"
        type="text"
        bind:value={newTaskTitle}
        placeholder="Título de la tarea"
        maxlength="50"
      />
    </div>

    <div class="input-descripcion">
      <label class="input-label" for="description">Descripción:</label>
      <textarea
        id="description"
        bind:value={newTaskDescription}
        placeholder="Descripción de la tarea"
        maxlength="150"
      ></textarea>
    </div>

    <div class="input-boton">
      <button class="button" on:click={addTask}>Añadir Tarea</button>
    </div>
  </div>
</div>
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
  .container-encabezado {
    display: flex;
    justify-content: center;
    width: 100%;
  }
  .container-titulo {
    display: flex;
    justify-content: center;
    width: 100%;
    font-family: "Calligraffitti", cursive;
    font-weight: 700;
    font-size: 2.5rem;
    text-shadow: -15px 5px 20px #ced0d3;
    top: 50%;
    left: 50%;
    letter-spacing: 0em;
    text-align: center;
    color: #f9f1cc;
    text-shadow:
      3px 5px 0px #ffb650,
      5px 7px 0px #ef5097,
      7px 9px 0px #90b1e0;
  }

  .input-container {
    gap: 10px;
    padding: 30px;
    width: 100%;
    font-family: "Calligraffitti", cursive;
  }
  
  .input-boton {
    flex: 1;
    padding: 10px;
    font-size: 1rem;
    color: #555;
    text-align: center;
  }
  .input-descripcion {
    background: transparent;
  border: 0;
  box-sizing: border-box;
  font-size: 20px;
  height: 40px;
  margin-top: 20px;
  outline: none !important;
  position: relative;
  width: 300px;
  }
  .input-titulo {
    background: transparent;
  border: 0;
  box-sizing: border-box;
  font-size: 20px;
  height: 40px;
  margin-top: 20px;
  outline: none !important;
  position: relative;
  width: 300px;
  }
  .input-label {
    flex: 5;
    font-size: 1rem;
    color: #555;
    text-align: center;
    padding-left: 10px;
  }

  input,
  textarea {
    flex: 2;
    padding: 0, 7rem;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    font-size: 1rem;
    transition: border-color 0.3s ease;
    font-family: "Calligraffitti", cursive;
  }

  .button {
    flex: 4;
    background-color: #54a6ff;
    color: white;
    padding: 5px 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1rem;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    transition:
      background-color 0.3s ease,
      box-shadow 0.3s ease;
    font-family: "Calligraffitti", cursive;
  }

  .button:hover {
    background-color: #0056b3;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  }
</style>
