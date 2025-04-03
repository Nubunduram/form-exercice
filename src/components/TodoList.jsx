import { useSelector } from "react-redux";
import { selectTodos, selectCompletedTodos } from "../redux/selectors";


const TodoList = () => {
    const todos = useSelector(selectTodos);
    const completedTodos = useSelector(selectCompletedTodos);
    return (
        <div>
            <h1>Liste des tâches</h1>
            <ul>
                {todos.map((todo) => (
                    <li key={todo.id}>
                        {todo.texte}
                    </li>
                ))}
            </ul>
            <h2>Tâches terminées</h2>
            <ul>
                {completedTodos.map((todo) => (
                    <li key={todo.id}>{todo.texte}</li>
                ))}
            </ul>
        </div>
    );
};
export default TodoList;