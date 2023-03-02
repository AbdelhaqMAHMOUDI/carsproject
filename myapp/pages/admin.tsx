import React, { useState, useEffect } from "react";
import axios from "axios";

interface Car {
    id?: number;
    name: string;
    price: number | string;
    image: string;
}

function App() {
    const [car, setCar] = useState<Car[]>([]);
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState("");
    const [error, setError] = useState("");
    const [creatingCar, setCreatingCar] = useState({
        name: undefined,
        price: undefined,
        image: undefined
    })

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

    const getAllCar = () => {

        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        }
        fetch('http://localhost:5000/car', options)
            .then(response => response.json())
            .then(response => {
                //setUsers(response)
            })
            .catch(err => console.error(err));
    }


    async function addItem() {
        try {
            const newCar = {
                name,
                price,
                image
            };
            await axios.post("http://localhost:5000/car/add", newCar);
            setCar([...car, newCar]);
            setName("");
            setPrice("");
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
                {car.map((car, n) => (
                    <li key={n}>
                        <div>{car.name}</div>
                        <div>{car.price}</div>
                        <div>{car.image}</div>
                        <button onClick={() => deleteItem(car.id)}>Supprimer</button>
                    </li>
                ))}
            </ul>
            <h2>Ajouter un élément</h2>
            <div>
                <label>Nom:</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
                <label>Prix:</label>
                <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
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