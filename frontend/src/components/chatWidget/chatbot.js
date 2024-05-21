const credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: "" // for example, us-east-1:1sample4-5678-90ef-aaaa-1234abcd56ef
     });

     console.log(credentials)


     const lex = new AWS.LexRuntimeV2({
        region:'eu-central-1',
        credentials:new AWS.Credentials()
    })

     const lexparams = {};

     console.log(lex)

     const response = await lex.recognizeText(lexparams, (error, data)=>{
        console.log(data.messages[0])

        setElements([...elements, myMessage(message), getComponents(data.messages[0])])
     })