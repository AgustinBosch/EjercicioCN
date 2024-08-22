<script>
  export let task;
  export let onDelete;
  export let onUpdate;
  export let onSave;
  export let index;

  let isEditing = false;
  let editedTitle = task.title;
  let editedDescription = task.description;

  const titleMaxLength = 50; 
  const descriptionMaxLength = 200; 

  const colors = ["#E6E6FA", "#d5ffd5", "#ADD8E6", "#FFB6C1", "#FFFACD"];
  const colorClass = colors[index % colors.length];

  const startEditing = () => {
    if (!task.isComplete) {
      isEditing = true;
    }
  };

  const saveChanges = () => {
    isEditing = false;
    onSave(task.id, editedTitle, editedDescription);
  };

  const cancelEditing = () => {
    isEditing = false;
    editedTitle = task.title;
    editedDescription = task.description;
  };

  const handleTitleInput = (event) => {
    if (event.target.value.length <= titleMaxLength) {
      editedTitle = event.target.value;
    }
  };

  const handleDescriptionInput = (event) => {
    if (event.target.value.length <= descriptionMaxLength) {
      editedDescription = event.target.value;
    }
  };
</script>

<div class="task" style="background-color: {task.isComplete ? '#b9b9b9' : colorClass}">
  {#if isEditing}
    <input 
      class="task-title-edit" 
      type="text" 
      bind:value={editedTitle} 
      on:input={handleTitleInput}
      placeholder="Título de la tarea (máx {titleMaxLength} caracteres)"
    />
    <textarea 
      class="task-desc-edit" 
      bind:value={editedDescription} 
      on:input={handleDescriptionInput}
      placeholder="Descripción de la tarea (máx {descriptionMaxLength} caracteres)"
    ></textarea>
    <div class="button-container">
      <button class="icon-button save-button" on:click={saveChanges} title="Guardar cambios">
        💾
      </button>
      <button class="icon-button cancel-button" on:click={cancelEditing} title="Cancelar">
        ✖
      </button>
    </div>
  {:else}
    <h2 class="task_title">{task.title}</h2>
    <p>{task.description}</p>
    <div class="button-container">
      {#if !task.isComplete}
        <button class="icon-button" on:click={() => onUpdate(task.id)} title="Marcar como realizada">
          ✓
        </button>
        <button class="icon-button edit-button" on:click={startEditing} title="Editar tarea">
          ✎
        </button>
      {/if}
      <button class="icon-button delete-button" on:click={() => onDelete(task.id)} title="Eliminar tarea">
        ✖
      </button>
    </div>
  {/if}
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
    min-height: 170px; 
    overflow: hidden;
    word-wrap: break-word;
  }

  .task h2, .task p {
    text-align: center;
    overflow: hidden;
    white-space: normal;
    text-overflow: ellipsis;
    font-family: 'Calligraffitti', cursive;
  }

  .task p {
    flex-grow: 1; 
    margin-top: 10px;
  }

  .task-title-edit {
    width: 100%;
    font-size: 1.5rem;
    margin-bottom: 10px;
    padding: 5px;
  }

  .task-desc-edit {
    width: 100%;
    height: 100px;
    font-size: 1rem;
    padding: 5px;
    margin-bottom: 10px;
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
    font-size: 1.2rem;
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

  .save-button {
    color: #28a745;
  }

  .save-button:hover {
    color: #218838;
  }

  .cancel-button {
    color: #dc3545;
  }

  .cancel-button:hover {
    color: #c82333;
  }

  .edit-button {
    color: #ffc107;
  }

</style>
