const credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: "eu-central-1:f6bdb18e-6483-4ead-b10d-05ad0b93149d" // for example, us-east-1:1sample4-5678-90ef-aaaa-1234abcd56ef
     });

     console.log(credentials)


     const lex = new AWS.LexRuntimeV2({
        region:'eu-central-1',
        credentials:new AWS.Credentials({
            accessKeyId:"AKIAXIAZXQQTTYVMPFXD",
            secretAccessKey:"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"
        })
    })

     const lexparams = {
        "botAliasId": "TSTALIASID",   // Enter the botAliasId
        "botId": "LTRFN7KSZM",         // Enter the botId
        "localeId": "en_US",
        "text": message,
        "sessionId": "498270176132411"
      };

     console.log(lex)

     const response = await lex.recognizeText(lexparams, (error, data)=>{
        console.log(data.messages[0])

        setElements([...elements, myMessage(message), getComponents(data.messages[0])])
     })