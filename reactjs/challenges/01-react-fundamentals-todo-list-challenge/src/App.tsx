import { PlusCircledIcon } from "@radix-ui/react-icons"
import { Header } from "./components/Header"
import { FormEvent, ChangeEvent, useState, InvalidEvent } from "react"
import { Task } from "./components/Task";
import { v4 as uuidv4 } from 'uuid';

import clipboard from './assets/clipboard.svg';
import { TaskType } from "./@types/Task";

function App() {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [checkedTaskCount, setCheckedTaskCount] = useState(0);
  const [taskCount, setTaskCount] = useState(0);

  const [newTaskText, setNewTaskText] = useState('');

  function handleNewTask(event: FormEvent) {
    event.preventDefault();

    setTasks([...tasks, { 
      id: uuidv4(), 
      content: newTaskText, 
      isChecked: false,
    }]);
    setTaskCount((prevState) => prevState + 1);
    setNewTaskText('');
  }

  function handleNewTaskTextChange(event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity('');
    setNewTaskText(event.target.value);
  }

  function handleValidateTextInput(event: InvalidEvent<HTMLInputElement>) {
    event.target.setCustomValidity('Esse campo é o obrigatório.')
  }

  function handleDeleteTask(taskToDelete: TaskType) {
    const tasksExceptTheDeleteOne = tasks.filter(task => 
      task.id !== taskToDelete.id
    );

    setTasks(tasksExceptTheDeleteOne);
    setTaskCount((prevState) => prevState - 1);
  }

  function handleCheckTask(id: string) {
    const checkedTasks = tasks.map(task => 
      task.id === id && !task.isChecked
      ? { ...task, isChecked: true } 
      : (
        task.id === id && task.isChecked 
        ? { ...task, isChecked: false }
        : task
      )
    );

    const filteredTasks = checkedTasks.filter(task => 
      task.isChecked === true
    );

    setCheckedTaskCount(filteredTasks.length);
    
    setTasks(checkedTasks);
  }

  const isTaskFormFieldEmpty = newTaskText.length === 0;
  const areTasksExists = tasks.length > 0;

  return (
    <>
      <Header />
      
      <div className="w-full h-full flex items-center justify-center flex-col">
        <div className="w-full max-w-[736px]">
          <form onSubmit={handleNewTask} className="-mt-7 px-4">
            <div className="flex w-full gap-2">
              <input 
                type="text" 
                name="task"
                value={newTaskText}
                placeholder="Adicione uma nova tarefa" 
                className="w-full p-4 bg-gray-500 rounded-lg border-2 border-gray-700 placeholder:text-gray-300 outline-none text-gray-300"
                onChange={handleNewTaskTextChange}
                onInvalid={handleValidateTextInput}
                required
              />
              <button 
                type="submit" 
                className="text-white flex items-center gap-2 bg-blue-300 enabled:hover:bg-blue-100 rounded-lg p-4 disabled:cursor-not-allowed disabled:opacity-[0.7] transition-colors"
                disabled={isTaskFormFieldEmpty}
              >
                Criar
                <PlusCircledIcon />
              </button>
            </div>
          </form>

          <div className="mt-16 px-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-blue-100">Tarefas criadas</span>
                <small className="px-2 rounded-full text-gray-200 bg-gray-400">{taskCount}</small>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-purple-100">Concluídas</span>
                <small className="px-2 rounded-full text-gray-200 bg-gray-400">{checkedTaskCount} de {taskCount}</small>
              </div>
            </div>

            {!areTasksExists && (
              <div className="border-t-[1px] border-gray-400 rounded-lg pt-16 mt-6 flex flex-col space-y-4 items-center justify-center">
                <img src={clipboard} alt="Nenhuma tarefa cadastrada" />

                <div className="text-center">
                  <strong className="block text-gray-300">Você ainda não tem tarefas cadastradas</strong>
                  <span className="block text-gray-300">Crie tarefas e organize seus itens a fazer</span>
                </div>
              </div>
            )}

            {areTasksExists && (
              <div className="mt-6 space-y-3">
                {tasks.map(task => (
                  <Task 
                    key={task.id} 
                    task={task}
                    onDeleteTask={handleDeleteTask}
                    onCheckTask={handleCheckTask}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default App
