import { Input, Button, Box, InputGroup } from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { SERVER_ENDPOINTS } from "../config";

function URLShortenerForm() {
  const [destination, setDestination] = useState<any>();
  const [shortUrl, setShortUrl] = useState<{
    shortId: string;
  } | null>(null);

  const [error, setError] = useState('')

  const inputRef = React.useRef<any>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
     setDestination('')
    if(!destination){
      setError('Please input a url')
      inputRef && inputRef.current && inputRef.current.focus()
      inputRef.current.style.outline = '1px solid red';
      return
    }
    if(!validateUrl(destination)){
      setError('Invalid URL')
      return 
    }
   
    setShortUrl(null);
    const result = await axios
      .post(`${SERVER_ENDPOINTS}/api/url`, {
        destination,
      })
      .then((resp) => {
       
        setShortUrl(resp.data);
      })
      .catch((e) => {
        setError(e.message)
      })
       
  }

  function validateUrl(value: any) {
    
    return /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(value);
  }
  
  return (
    <Box display='flex' flexDirection="column">
    <h3 style={{alignItems: 'center',
     marginLeft: '84px',
     paddingBottom:'20px',
     color: 'blue',
    fontSize: '14px'}}>STORD URL SHORTENER </h3>
    <Box pos="relative" zIndex="2" backgroundColor="white" padding="6" border='1px solid gray' height='300px' display="flex"   flexDirection="column" justifyContent={'center'} borderRadius={'8px'}>
      <form onSubmit={handleSubmit}>
        <p style={{ paddingBottom: '10px',
            fontSize: '14px',
            color: 'blue'}}>    
          Please submit your Url 
        </p>
        <InputGroup>
          <Input
            onChange={(e: any) => setDestination(e.target.value)}
            placeholder="https://example.com"
            ref={inputRef}
          />
          <Button type="submit" marginLeft={'10px'} color={'blue'} border={'1px solid gray'} fontSize={'12px'}>CREATE</Button>
        </InputGroup>
      </form>
      {shortUrl && (
        <a href={`/${shortUrl?.shortId}`} style={{color: 'blue', paddingTop: '10px'}}>
          {window.location.origin}/{shortUrl?.shortId}
        </a>
      )}
     <p style={{color: 'red', paddingTop: '10px',  fontSize: '14px'}}>{error}</p>
    </Box>
    </Box>
    
  );
}

export default URLShortenerForm;
