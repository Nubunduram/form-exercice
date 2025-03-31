import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Button, Form } from 'react-bootstrap';
import { useState } from 'react';

function App() {

  const [task, setTask] = useState({
    name: '',
    dueDate: '',
    priority: 'Basse',
    isCompleted: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setTask(({
      ...task,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(task);
  };

  return (
    <Container className="mt-5">
      <h2>Ajouter une tâche</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="taskName">
          <Form.Label>Nom</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nom de la tâche"
            name="name"
            value={task.name}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="taskDueDate">
          <Form.Label>Date de rendue</Form.Label>
          <Form.Control
            type="date"
            name="dueDate"
            value={task.dueDate}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="taskPriority">
          <Form.Label>Priorité</Form.Label>
          <Form.Control
            as="select"
            name="priority"
            value={task.priority}
            onChange={handleChange}
          >
            <option value="Basse">Basse</option>
            <option value="Moyenne">Moyenne</option>
            <option value="Elevée">Elevée</option>
          </Form.Control>
        </Form.Group>

        <Form.Group className="mb-3" controlId="taskIsCompleted">
          <Form.Check
            type="checkbox"
            label="Complétée"
            name="isCompleted"
            checked={task.isCompleted}
            onChange={handleChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Ajouter la tâche
        </Button>
      </Form>
    </Container>
  );
}

export default App;
