<script>
  export let task;
  export let onDelete;
  export let onUpdate;
</script>

<div class="task {task.isComplete ? 'completed' : ''}">
  <h2 class="task_title">{task.title}</h2>
  <p>{task.description}</p>
  <div class="task_buttons" >
  {#if !task.isComplete}
    <button on:click={() => onUpdate(task.id)}>Marcar como realizada</button>
  {/if}
  <button on:click={() => onDelete(task.id)}>Eliminar</button>
</div>
</div>

<style>
  /* Contenedor de las tareas */
  .task-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 16px;
    padding: 20px;
  }

  .task {
    background-color: #ffffff;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 20px;
    transition: background-color 0.3s ease, box-shadow 0.3s ease;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 250px; 
    overflow: hidden; 
  }

  .task h2 {
    margin: 0 0 8px;
    font-size: 1.25rem;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .task p {
    margin: 0 0 16px;
    color: #666;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .task_buttons {
    display: flex;
    flex-direction: column;
  }
  .task button {
    background-color: #007bff;
    border: none;
    color: white;
    padding: 8px 12px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.875rem;
    margin-top: auto;
    transition: background-color 0.3s ease;
    width: 100%;
  }


  .task button:hover {
    background-color: #0056b3;
  }

  .completed {
    background-color: #d4edda;
    border-color: #c3e6cb;
    color: #155724;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }

  .completed button {
    background-color: #6c757d;
  }

  .completed button:hover {
    background-color: #5a6268;
  }
</style>