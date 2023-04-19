//Normally Alpine.js is used inside the .html file, but for the sake of
//Clear reading and organizarion the entire logic is here in that file.

const task = () => {
  //The project uses localStorage and Alpine.js $stores to keep the
  //data in memory even after closing the window or refreshing the page.
  return {
    updateStorage: function () {
      //Refreshes the localStorage whenever a change (add, complete, delete) occurs.

      //There are two references for 'tasks':
      //tasks -> Alpine.js $store name
      //tasks -> The localStorage name containing the persistent tasks/todos

      localStorage.setItem("tasks", JSON.stringify(tasks));
    },

    loadTasks: function () {
      //Loads all tasks (completed or not) from localStorage and
      //adds them to Alpine.js $store to handle the changes in the DOM.

      const currentTasks = localStorage.getItem("tasks");
      tasks = JSON.parse(currentTasks) || [];

      Alpine.store("tasks", tasks);
    },

    addTask: function (taskName, taskDesc = "") {
      //Checks if the input is not empty and adds a task
      //to the localStorage and Alpine.js $store.

      if (taskName.trim() === "") {
        return;
      } else {
        Alpine.store("tasks").push({
          name: taskName,
          done: false, //It is false by default.
          date: new Date().toDateString(),
          desc: taskDesc,
        });
        this.updateStorage();
      }
    },

    deleteTask: function (taskIndex) {
      //Deletes the task from the localStorage (searches by the index inside the Object Array)
      //and Alpine.js $store and refreshes it.

      Alpine.store("tasks").splice(taskIndex, 1);
      this.updateStorage();
    },

    completeTask: function (taskIndex, status) {
      //Change the task 'done' attribute to true (searches by the index inside the Object Array),
      //modifying it's style and updates the localStorage.

      Alpine.store("tasks")[taskIndex].done = true ? status === false : false;
      this.updateStorage();
    },
  };
};

document.addEventListener("alpine:init", () => {
  //Alpine.js init event
  task();
});
