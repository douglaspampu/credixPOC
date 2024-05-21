import React, { useState } from 'react';
import axios from 'axios';
import AWS from 'aws-sdk'
import './ChatWidget.css'; // Add your custom styles
import Product from '../catalog/product'
import Recipe from '../receitas/recipe';

function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('')
  const [elements, setElements] = useState([])

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };


    //access key AKIAXIAZXQQTTYVMPFXD
    //secret 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

  const sendQuestion = async() => {

    const credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: "" // for example, us-east-1:1sample4-5678-90ef-aaaa-1234abcd56ef
     });

     console.log(credentials)


     const lex = new AWS.LexRuntimeV2({})

     const lexparams = {};

     console.log(lex)

     const response = await lex.recognizeText(lexparams, (error, data)=>{
        console.log(data.messages[0])

        setElements([...elements, myMessage(message), getComponents(data.messages[0])])
     })

     console.log(response.response)

     //setElements(getComponents(response.response.data.messages))
  }

  const myMessage = (message) => {
    return <div style={{width:"100%", display:"flex", justifyContent:"end"}}>
        <div style={{
        maxWidth:"60%",
        backgroundColor:"#E8E8E8", 
        borderRadius:"10px",
        paddingLeft:"10px",
        paddingRight:"20px",
        paddingTop:"5px",
        paddingBottom:"5px",
      }}>{message}</div>
    </div>
  }

  const getComponents = (data) => {

    const contents = JSON.parse(data.content)

    const components = Object.keys(contents).map((c)=>{
      switch(c){
        case 'filterProducts':
        //case 'getAllProducts':
          return <div style={{width:"100%", display:"flex", justifyContent:"start", flexWrap:"wrap"}}>
            {contents[c].data.ingredients.map((p)=>{
              return <div class="chat-small-card"> <Product  props={p} /></div>
            })}
          </div>
        case 'filterRecipe':
        //case 'getAllRecipes':
          return <div style={{width:"100%", display:"flex", justifyContent:"start"}}>
            {contents[c].data.map((r)=>{
              return <div class="chat-big-card"> <Recipe recipe={r} /></div>
            })}
          </div>
        default:
          return <></>
      }
    })

    return (<div class="chat-body catalog wrap">{components}</div>)
  }

  return (
    <>
      <button onClick={toggleChat} className="chat-toggle-button">
        Chat
      </button>
      <div className={`chat-widget ${isOpen ? 'open' : 'closed'}`}>
        {isOpen && (
          <>
            <div className="chat-content">
                <div >{elements}</div>
            </div>
            <div class="question-box">
              <input class="input" value={message} onInput={e => setMessage(e.target.value)} type="text" placeholder="How can I help you today?"/>
              <button onClick={sendQuestion}>Ask!</button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default ChatWidget;