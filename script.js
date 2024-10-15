let todos = [];

function addTodo() {
    const todoInput = document.getElementById("todoInput");
    const todoText = todoInput.value.trim();

    if (todoText === "") {
        alert("Masukkan tugas terlebih dahulu!");
        return;
    }

    todos.push({ text: todoText, isEditing: false });
    todoInput.value = ""; // Clear input after adding
    renderTodoList(); // Render the updated list
}

function renderTodoList() {
    const todoList = document.getElementById("todoList");
    todoList.innerHTML = ""; // Clear the list before rendering

    todos.forEach((todo, index) => {
        const li = document.createElement("li");

        if (todo.isEditing) {
            const input = document.createElement("input");
            input.type = "text";
            input.value = todo.text;
            input.onblur = () => saveEdit(index, input.value);
            input.onkeypress = (e) => {
                if (e.key === 'Enter') {
                    saveEdit(index, input.value);
                }
            };
            li.appendChild(input);
            input.focus(); // Focus on the input for editing
        } else {
            const span = document.createElement("span");
            span.textContent = todo.text;
            li.appendChild(span);
        }

        const editButton = document.createElement("button");
        editButton.textContent = todo.isEditing ? "Simpan" : "Edit";
        editButton.onclick = () => editTodo(index);
        li.appendChild(editButton);

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Hapus";
        deleteButton.className = "delete";
        deleteButton.onclick = () => deleteTodo(index);
        li.appendChild(deleteButton);

        todoList.appendChild(li); // Append the list item to the todo list
    });
}

function editTodo(index) {
    todos[index].isEditing = !todos[index].isEditing; // Toggle editing state
    renderTodoList(); // Re-render the list
}

function saveEdit(index, newText) {
    if (newText.trim() === "") {
        alert("Teks tidak boleh kosong!"); // Prevent empty task
        return;
    }
    todos[index].text = newText; // Update todo text
    todos[index].isEditing = false; // Exit editing mode
    renderTodoList(); // Re-render the list
}

function deleteTodo(index) {
    todos.splice(index, 1); // Remove the todo from the array
    renderTodoList(); // Re-render the list
}
