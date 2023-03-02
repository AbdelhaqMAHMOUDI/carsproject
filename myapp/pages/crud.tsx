import React, { useState, useEffect } from "react";
import axios from "axios";

interface Car {
    id?: number;
    nom: string;
    prix: number | string;
    image: string;
}

function App() {
    const [car, setCar] = useState<Car[]>([]);
    const [nom, setNom] = useState("");
    const [prix, setPrix] = useState("");
    const [image, setImage] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        fetchItems();
    }, []);

    async function fetchItems() {
        try {
            const response = await axios.get<Car[]>("http://localhost:5000/car");
            setCar(response.data);
        } catch (error) {
            console.error(error);
            setError("Impossible de récupérer les éléments.");
        }
    }

    async function addItem() {
        try {
            const newCar = {
                nom,
                prix,
                image
            };
            await axios.post("http://localhost:5000/car/add", newCar);
            setCar([...car, newCar]);
            setNom("");
            setPrix("");
            setImage("");
            setError("");
        } catch (error) {
            console.error(error);
            setError("Impossible d'ajouter l'élément.");
        }
    }

    async function deleteItem(id?: number) {
        try {
            await axios.delete(`http://localhost:5000/car/${id}`);
            setCar(car.filter((item) => item.id !== id));
            setError("");
        } catch (error) {
            console.error(error);
            setError("Impossible de supprimer l'élément.");
        }
    }

    return (
        <div>
            <h1>Liste des éléments</h1>
            {error && <div>{error}</div>}
            <ul>
                {car.map((car) => (
                    <li key={car.id}>
                        <div>{car.nom}</div>
                        <div>{car.prix}</div>
                        <div>{car.image}</div>
                        <button onClick={() => deleteItem(car.id)}>Supprimer</button>
                    </li>
                ))}
            </ul>
            <h2>Ajouter un élément</h2>
            <div>
                <label>Nom:</label>
                <input type="text" value={nom} onChange={(e) => setNom(e.target.value)} />
            </div>
            <div>
                <label>Prix:</label>
                <input type="text" value={prix} onChange={(e) => setPrix(e.target.value)} />
            </div>
            <div>
                <label>Image:</label>
                <input type="text" value={image} onChange={(e) => setImage(e.target.value)} />
            </div>
            <button onClick={addItem}>Ajouter</button>
        </div>
    );
}
export default App;