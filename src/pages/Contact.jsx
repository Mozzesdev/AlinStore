import React, {useEffect} from 'react';
import style from 'styled-components'
import ubicacion from '../img/Ubicacion.png'
import arrowRight from '../img/arrow-right-alt.svg'
import face from '../img/facebookwhite.svg'
import inst from '../img/instawhite.svg'
import twit from '../img/twitwhite.svg'
import AOS from 'aos';
import 'aos/dist/aos.css';
AOS.init({
  duration: 800
});

export default function Contact() {

  useEffect(() => {
    document.title = "Contact - AlinDesign";
   }, []);

  return (
    <>
      <div style={{paddingTop: '100px'}}>
        <ContenedorContacto data-aos="zoom-in">
          <ContenedorTexto>
            <h2>Contact us</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt consectetur aut iure incidunt cumque?</p>
            <ContenedorTextoLink>
              <ContenedorTextoLink1>
                <p>E-mail</p>
                <a href="!#">correo@correo.com</a>
              </ContenedorTextoLink1>
              <ContenedorTextoLink2>
                <p>Phone</p>
                <a href="!#">+58 4248234666</a>
              </ContenedorTextoLink2>
            </ContenedorTextoLink>
            <ContenedorHorario>
              <h4>Business Hours</h4>
              <ContenedorLista>
                <li>Monday to Saturday / <b>8:00 am</b> to <b>17:00pm</b></li><b></b>
                <li>We are available at your request</li>
              </ContenedorLista>
              <img src={ubicacion} alt="" />
            </ContenedorHorario>
          </ContenedorTexto>
          <ContenedorFormContacto autoComplete='off'>

            <label htmlFor="name">First Name</label>
            <input type="text" id='name' name='name' />

            <label htmlFor="email">Your E-mail</label>
            <input type="email" id='email' name='email' />

            <label htmlFor="description">Message</label>
            <textarea name="description" id="description" ></textarea>
            <Enviar>
              <button>Send Message</button>
              <img className='arrow' src={arrowRight} alt="" />
            </Enviar>
            <DivContactImg>
              <a href="https://twitter.com/" target='_blank' rel="noreferrer"><img src={twit} alt="" /></a>
              <a href='https://www.instagram.com/alindesignstore/' target='_blank' rel="noreferrer"><img src={inst} alt="" /></a>
              <a href='https://www.facebook.com/' target='_blank' rel="noreferrer"><img src={face} alt="" /></a>
            </DivContactImg>
          </ContenedorFormContacto>
        </ContenedorContacto>
      </div>
    </>
  );
}

const ContenedorContacto = style.div`
  width: 76%;
  margin: 0 auto 5rem;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 70px;
  border-radius: 8px;
  box-shadow: 0px 0px 14px -2px rgba(0,0,0,0.4);
`;

const ContenedorTextoLink = style.div`
  display: flex;
  margin: 30px 0;
`;
const ContenedorTextoLink1 = style.div`
  margin: 0 150px 0 0;
  a{
    font-size: 14px;
  }
`;
const ContenedorTextoLink2 = style.div`
  margin-right: 0;
  a{
    font-size: 14px;
  }
`;

const ContenedorTexto = style.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  margin: 40px 0 40px 70px;
  h2{
    font-size: 40px;
  }
  a{
    margin-right: 5px;
    color: black;
  }
  p:first-child{
    line-height: 1.5;
    font-size: 15px;
  }
`;

const ContenedorHorario = style.div`
  margin-bottom: 20px;
  img{
    display: block;
    margin: 0 auto;
    width: 90%;
    height: 210px
    
  }
`;
const ContenedorLista = style.ul`
  margin-bottom: 40px;
  li{
    font-size: 14px;
    margin-left: 20px;
  }
`;

const ContenedorFormContacto = style.form`
margin: auto 70px;
font-size: 15px;
display: block;
  label,input{
    display: block;
  }
  input{
    width: 100%;
    border: none;
    background-color: unset;
    padding: 5px;
    border-bottom: 1px solid black;
    margin-bottom: 20px;
    font-size: 15px;
  }
  input:focus{
    outline: none;
  }
  textarea{
    width: 100%;
    padding: 5px;
    background-color: unset;
    height: 80px;
    margin-top: 5px;
    font-size: 15px;
    border: none;
    resize: none;
    border-bottom: 1px solid black;
    margin-bottom: 20px;
    &:focus{
      outline: none;
    }
  }
`;

const Enviar = style.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 40px 0 0;
  padding: 10px 20px 10px 75px;
  border: 1px solid white;
  background-color: black;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color .5s;
  
  &:hover{
    background-color: #121212;
    transition: background-color .5s;
  }

   button{
    font-size: 14px;
    background: none;
    color: white;
    border: none;
    text-transform: uppercase;
    letter-spacing: 1.2px;
    font-weight: bold;
  }

  img{
    margin-right: 50px;
    width: 24px;
  }

`;

const DivContactImg = style.div`
  display: flex;
  justify-content: space-evenly;
  margin-top: 40px;
  a{
    img{
      width: 36px;
    }
  }
`