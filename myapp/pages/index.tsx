
import { Header } from '../components/HeadComponent';
import React, { useEffect } from 'react';
import { useRouter } from 'next/router.js';
import FooterComponent from '../components/FooterComponent';
export default function Home() {
  const router = useRouter();

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

  return (
    <article>
      <Header user="Abdelhaq" />
      <section>
        <div id="img-voiture"></div>
        <div id="paragraphe"><p id="paragraphe_p">▷ Depuis 2008, RIDE, agence de location de voitures de luxe propose ses services partout en France (Paris, Monaco, Nice, Cannes, Saint-Tropez, Courchevel, Saint-Moritz...).<br></br>
          Notre expérience est à votre service pour répondre à toutes vos demandes</p>
        </div>
        <hr></hr>
        <div id="group-form">
          <form id="formulaire">
            <div className="form-group">
              <h2 id="INSCRIPTION"><strong>INSCRIPTION</strong></h2>
              <p>Je suis :</p>
              <input type="radio" id="entreprise" name="entre_particu" value="entreprise" />
              <label htmlFor="entreprise">une entreprise</label>
              <input type="radio" id="particulier" name="entre_particu" value="particulier" />
              <label htmlFor="particulier">un particulier</label><br></br>

              <div id="super_div_nom_prenom">
                {/* nom  */}
                <div className="nom-ou-prenom" id='div_nom'>
                  <label htmlFor="nom" id="name_label">Nom</label>
                  <input type="text" id="name_input" name="name" required />
                </div>
                <div className="nom-ou-prenom" id='div_prenom'>
                  {/* prenom  */}
                  <label htmlFor="prenom" id="prenom_label">Prénom</label>
                  <input type="text" id="prenom_input" name="prenom" />
                </div>
              </div>
              <div className="form-group">
                <div className='mail_phonenumber' id="email_div">
                  <label htmlFor="email" id="email_label">E-mail</label><br />
                  <input type="email" className="form-control" id="input_email" aria-describedby="emailHelp" placeholder="" />
                </div>
                <div className='mail_phonenumber' id="phone_number_div">
                  <label id="phone_number_label" htmlFor="phone_number">Numéro de téléphone</label>
                  <input type="tel" id="phone_number_input" name="phone_number" required />
                </div>
              </div>
              <div id="select_nationalite_div">
                <label id='select_nationalite_label' form="nationalite_select">Nationalité</label>
                <select name="nationalite" id="nationalite_select">
                  <option value="">Selectionner une valeur</option>
                  <option value="Française">Française</option>
                  <option value="Marocaine">Marocaine</option>
                  <option value="Italienne">Italienne</option>
                  <option value="Algérienne">Algérienne</option>
                  <option value="Tunisienne">Tunisienne</option>
                </select>
              </div>
              <div id="checkbox">
                <input type="checkbox" id="case_a_coche" />
                <label form="case_a_coche">     j’atteste que je possède un permis de conduire valide.</label>
              </div>
            </div>


            <button id="button_demande_inscription" type="submit" onClick={() => router.push("/inscription_ok")} > <strong>Demander mon inscription </strong></button>
          </form>
        </div>
        <div id='footer'><FooterComponent /></div>

      </section>
    </article>

  )
}
