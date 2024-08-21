<script>
  export let task;
  export let onDelete;
  export let onUpdate;
  export let index;

  const colors = ["#E6E6FA", "#d5ffd5", "#ADD8E6", "#FFB6C1", "#FFFACD"];
  const colorClass = colors[index % colors.length]; // Alternar entre los colores
</script>

<div class="task" style="background-color: {task.isComplete ? '#b9b9b9' : colorClass}">
  <h2 class="task_title">{task.title}</h2>
  <p>{task.description}</p>
  <div class="button-container">
    {#if !task.isComplete}
      <button class="icon-button" on:click={() => onUpdate(task.id)} title="Marcar como realizada">
        ✓
      </button>
    {/if}
    <button class="icon-button delete-button" on:click={() => onDelete(task.id)} title="Eliminar tarea">
      ✖
    </button>
  </div>
</div>

<style>
  .task {
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

  .task h2, .task p {
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .button-container {
    display: flex;
    justify-content: space-between;
    margin-top: auto;
  }

  .icon-button {
    background-color: transparent;
    border: none;
    color: #007bff;
    font-size: 1.5rem;
    cursor: pointer;
    transition: color 0.3s ease;
  }

  .icon-button:hover {
    color: #0056b3;
  }

  .delete-button {
    color: #dc3545;
  }

  .delete-button:hover {
    color: #c82333;
  }
</style>

