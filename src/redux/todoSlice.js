import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    todos: [],
};

const todoSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {

        addTodo: (state, action) => {
            return {
                ...state,
                todos: [
                    ...state.todos,
                    { id: Date.now(), texte: action.payload, completed: false },
                ],
            };
        },

        toggleTodo: (state, action) => {
            return {
                ...state,
                todos: state.todos.map((todo) =>
                    todo.id === action.payload
                        ? { ...todo, completed: !todo.completed }
                        : todo
                ),
            };
        },
    },
});

export const { addTodo, toggleTodo } = todoSlice.actions;
export default todoSlice.reducer;