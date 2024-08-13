<h2>this is a task</h2>

<script>
    export let task;
    export let onDelete;
    export let onUpdate;
</script>

<div class="task">
    <p>{task.name}</p>
    <button on:click={() => onUpdate(task.id)}>Update</button>
    <button on:click={() => onDelete(task.id)}>Delete</button>
  </div>

  <style>
    .task {
      border: 1px solid #ccc;
      padding: 10px;
      margin-bottom: 10px;
    }
  </style>