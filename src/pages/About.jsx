import React, {useEffect} from 'react';
import aboutimg from '../img/about.jpg'
import Alin from '../img/Angelin.jpg'
import Lina from '../img/Lina.jpg'
import style from 'styled-components'
import Accordion from 'react-bootstrap/Accordion'
import '../Styles/about.css'
import arrowdown from '../img/arrow-down.svg'
import line from '../img/line.svg'

export default function About() {

  useEffect(() => {
    document.title = "About us - AlinDesign";
   }, []);

  return (
    <>
      <ContenedorSection>
        <h2>About us</h2>
        <ContenedorAbout>
          <img src={aboutimg} alt="" />
          <ContenedorTexto>
            <p>In Alin Designs we create pieces with the inspiration  so that we can find our own style balance and reflect the best of our essence in each one of them.</p>
            <p>Angellin Rodríguez is the artist behind Alin, a site created to share her work and inspiration with the world.</p>
            <p>We reflect inspiration, life and color with each piece, accessories, handbags and limited edition items, giving them and artistic and unique touch.</p>
            <p>She began her creative journey with a set of watercolors, pencils and oils combined with a sense of imagination. Fashion, faces and nature have been spying on her mind and the blank pages of her drawings, sketches, paintings and each of her pieces. Using 100% ecological materials that help preserve the environment.</p>
            <p>Alin is based in the city of Ede Netherland and originates from Caracas Venezuela.</p>
          </ContenedorTexto>
        </ContenedorAbout>
      </ContenedorSection>
      <ConetendorMeet>
        <h2>Meet the Team</h2>
        <img src={line} alt="" />
        <ContenedorImg>
          <ContenedorAlin>
            <img src={Alin} alt="" />
            <h4>Angelin Rodriguez</h4>
            <p>Artist, Founder & Product Designer</p>
          </ContenedorAlin>
          <ContenedorLina>
            <img src={Lina} alt="" />
            <h4>Lina Rodriguez</h4>
            <p>Creative Designer</p>
          </ContenedorLina>
        </ContenedorImg>
        <hr />
      </ConetendorMeet>
      <ContenedorAcordion>
        <h2 className='h2'>Frequently asked questions</h2>
        <Accordion defaultActiveKey="0">
          <Accordion.Item eventKey="0">
            <Accordion.Header bsPrefix='accordion-header'>Sends</Accordion.Header>
            <Accordion.Body>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
              veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
              commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
              velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
              cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
              est laborum.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header bsPrefix='accordion-header'>Repair Service & Wash</Accordion.Header>
            <Accordion.Body bsPrefix='accordion-body'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
              veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
              commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
              velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
              cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
              est laborum.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2">
            <Accordion.Header bsPrefix='accordion-header'>Privacy Policy</Accordion.Header>
            <Accordion.Body>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
              veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
              commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
              velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
              cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
              est laborum.
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </ContenedorAcordion>
    </>
  );
}
const ContenedorAbout = style.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  img{
    width: 100%;
  }
`

const ContenedorTexto = style.div`
  margin-left: 25px;
  text-align: left;
`
const ContenedorSection = style.section`
 width: 73%;
 margin: 0 auto;
 padding: 100px 0 0;
 h2{
  text-align: center;
  font-size: 30px;
  margin: 0 0 20px 0
 }
`

const ConetendorMeet = style.div`
 width: 100%;
 margin: 40px auto;
 display: flex;
 flex-direction: column;
 background-color: #fff;
 justify-content: center;
 align-items: center;
 h2{
   text-align: center;
   font-size: 30px;
   margin: 20px 0 0;
 }
 hr{
   margin: 30px 0;
 }
 img{
   width: 40px;
 }
`

const ContenedorImg = style.div`
 display: grid;
 grid-template-columns: repeat(2, 1fr); 
 justify-content: center;
 align-items: center;
`

const ContenedorAlin = style.div`
 width: 100%;
 margin: 0 auto;
 text-align: center;
 padding-right: 100px;
 h4{
  font-size: 25px;
  margin: 20px 0 7px;
 }
 img{
  width: 330px;
  height: 330px;
  border-radius: 50%;
  object-fit: cover;
  display: block;
  margin: 0 auto;
 }
`
const ContenedorLina = style.div`
width: 100%;
margin: 0 auto;
text-align: center;
padding-left: 100px;
 h4{
   font-size: 25px;
   margin: 20px 0 7px;
 }
 img{
    width: 330px;
    height: 330px;
    border-radius: 50%;
    object-fit: cover;
    display: block;
    margin: 0 auto;
}
`
const ContenedorAcordion = style.div`
 width: 65%;
 margin: 50px auto;
 .h2{
   text-align: center;
   font-size: 25px;
   margin: 30px 0;
 }
 .accordion-button:not(.collapsed)::after{
  background-image: url(${arrowdown});
  background-size: 100%;
 }
 .accordion-header .accordion-button::after{
  background-image: url(${arrowdown});
  background-size: 100%;
 }
`