import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Button, Form } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  name: yup
    .string()
    .min(8, "Le nom doit contenir au moins 8 caractères")
    .max(15, "Le nom ne doit pas dépasser 15 caractères")
    .required("Le nom est obligatoire"),
  dueDate: yup
    .string()
    .matches(/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/, "Format attendu : jj/mm/AAAA")
    .test("date-valid", "La date ne doit pas être antérieure à aujourd'hui", (value) => {
      if (!value) return false;
      const [day, month, year] = value.split("/").map(Number);
      const inputDate = new Date(year, month - 1, day);
      return inputDate >= new Date().setHours(0, 0, 0, 0);
    })
    .required("La date est obligatoire"),
  priority: yup
    .string()
    .oneOf(["Basse", "Moyenne", "Elevée"], "Priorité invalide")
    .required("La priorité est obligatoire"),
  isCompleted: yup.boolean()
});

function App() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      dueDate: "",
      priority: "Moyenne",
      isCompleted: false
    }
  });

  const onSubmit = (data) => {
    console.log("Données soumises :", data);
    reset();
  };

  return (
    <Container className="mt-5">
      <h2>Ajouter une tâche</h2>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3" controlId="taskName">
          <Form.Label>Nom</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nom de la tâche"
            {...register("name")}
          />
          {errors.name && <p className="text-danger">{errors.name.message}</p>}
        </Form.Group>

        <Form.Group className="mb-3" controlId="taskDueDate">
          <Form.Label>Date de rendu</Form.Label>
          <Form.Control
            type="text"
            placeholder="jj/mm/AAAA"
            {...register("dueDate")}
          />
          {errors.dueDate && <p className="text-danger">{errors.dueDate.message}</p>}
        </Form.Group>

        <Form.Group className="mb-3" controlId="taskPriority">
          <Form.Label>Priorité</Form.Label>
          <Form.Control as="select" {...register("priority")}>
            <option value="Basse">Basse</option>
            <option value="Moyenne">Moyenne</option>
            <option value="Elevée">Élevée</option>
          </Form.Control>
          {errors.priority && <p className="text-danger">{errors.priority.message}</p>}
        </Form.Group>

        <Form.Group className="mb-3" controlId="taskIsCompleted">
          <Form.Check
            type="checkbox"
            label="Complétée"
            {...register("isCompleted")}
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