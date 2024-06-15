document.addEventListener('DOMContentLoaded', (event) => {
    const novaTarefa = document.getElementById('novaTarefa');
    const adicionarTarefa = document.getElementById('adicionarTarefa');
    const listaTarefa = document.getElementById('listaTarefa');

    // carregar tarefas
    const loadtarefas = () => {
        const tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
        tarefas.forEach(task => {
            addTaskToDOM(task.text, task.completed);
        });
    };

    // salvar tarefas
    const savetarefas = () => {
        const tarefas = [];
        document.querySelectorAll('#listaTarefa li').forEach(task => {
            tarefas.push({
                text: task.querySelector('span').textContent,
                completed: task.classList.contains('completed')
            });
        });
        localStorage.setItem('tarefas', JSON.stringify(tarefas));
    };

    // adicionar tarefa
    const addTaskToDOM = (taskText, completed = false) => {
        const li = document.createElement('li');
        const span = document.createElement('span');
        span.textContent = taskText;
        li.appendChild(span);

        const completeButton = document.createElement('button');
        completeButton.textContent = '✔';
        completeButton.addEventListener('click', () => {
            li.classList.toggle('completed');
            savetarefas();
        });
        li.appendChild(completeButton);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = '✖';
        deleteButton.classList.add('delete');
        deleteButton.addEventListener('click', () => {
            listaTarefa.removeChild(li);
            savetarefas();
        });
        li.appendChild(deleteButton);

        if (completed) {
            li.classList.add('completed');
        }

        listaTarefa.appendChild(li);
    };

    // Adicionar nova tarefa
    adicionarTarefa.addEventListener('click', () => {
        const taskText = novaTarefa.value.trim();
        if (taskText) {
            addTaskToDOM(taskText);
            savetarefas();
            novaTarefa.value = '';
            novaTarefa.focus();
        }
    });

    // Carregar tarefas ao carregar a página
    loadtarefas();
});