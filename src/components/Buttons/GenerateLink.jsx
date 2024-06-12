
import { Button, Overlay, Tooltip } from 'react-bootstrap';
import { useRef, useState } from "react";
import { FaLink } from "react-icons/fa6";

export default function GenerateLink({quote, cte}) {
    const [url, setUrl] = useState('');
    const [show, setshow] = useState(false);
    const target = useRef(null);
    const domain = window.location.origin;

const GenerateLinkCopy = () =>{
    setUrl(`${domain}/quote/${quote}/${cte}`)
    
    setshow(!show)
}



  return (
    <>
      <Button
       variant="danger"
       ref={target} onClick={() => GenerateLinkCopy()}>
        <FaLink />
      </Button>
      <Overlay target={target.current} show={show} placement="right">
        {(props) => (
          <Tooltip id="overlay-example" {...props}>
            {url}
          </Tooltip>
        )}
      </Overlay>
    </>
  )
}
