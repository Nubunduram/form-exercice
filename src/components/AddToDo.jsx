import { useDispatch } from "react-redux";

const AddTodo = () => {
    const dispatch = useDispatch();
    const handleAddTodo = () => {
        dispatch({ type: "todos/todoAdd", payload: { id: 1, texte: "Learn Redux" } });
    };
    return <button onClick={handleAddTodo}>Ajouter une tâche</button>;
};

export default AddTodo;