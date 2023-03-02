import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router'
import Loader from "../components/loader";


const Login = () => {

    const router = useRouter()

    const [error, setError] = useState(false)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('');


    //handle email input change
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }

    //handle password input change
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }

    // check user role
    const checkRole = (token: string) => {
        console.log(token)

        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`

            },
        };

        fetch('http://localhost:8000/api/admin', options)
            .then(response => response.json())
            .then(response => {
                console.log(response)
                if (response.status === 403) {
                    router.push('/')
                    console.log('user is not admin')
                } else {
                    router.push('/admin')
                    console.log('user is admin')
                }
            })
            .catch(err => console.error(err));

    }


    // const handleSubmit = () => {
    //   fetch("http://localhost:8000/api/.user/login", {
    //     body: JSON.stringify({ username: "admin@myapp.com", password: "admin" }),
    //     method: "POST",
    // headers: {
    //   'Content-Type': 'application/json'
    // }
    //   }).then((response) => response.json()).then((response) => {
    //console.log(response)
    // localStorage.setItem("token", response.token);
    // })
    // }
    // }

    //catch form submit
    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: '{"username": "' + email + '", "password": "' + password + '"}'
        };

        fetch("http://localhost:8000/api/.user/login", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: email, password: password }),
        }).then((response) => response.json()).then((response) => {
            console.log(response)
            localStorage.setItem("token", response.token)
            checkRole(response.token)
        });




        // .then((response) => response.json()).then((response) => {
        // console.log(response)
        // localStorage.setItem("token", response.token);
        // console.log(checkRole(response.token))
        // checkRole(response.token) })
    }


    return (
        <main className="loginPage">
            <div className='loginPage__link'>
                <link href="/" aria-label="retour" />
            </div>
            <div className="loginPage__center">
                <h1 className="loginPage__center__title">Connexion</h1>
                <form className="loginPage__center__form" onSubmit={(e) => { handleFormSubmit(e) }} >
                    <input
                        type='text'
                        aria-label="identifiant"
                        value={email}
                        onChange={(e: any) => { handleEmailChange(e) }}
                        required
                    />
                    <input
                        type='password'
                        aria-label='mot de passe'
                        value={password}
                        onChange={(e: any) => { handlePasswordChange(e) }}
                        required
                    />
                    <button type="submit" onSubmit={(e: any) => { handleFormSubmit(e) }}><strong>Connexion</strong></button>
                </form>
                {error ? <p className="loginPage__center__error">Identifiant ou mot de passe incorrect</p> : null}
            </div>

        </main>
    )
}
export default Login
