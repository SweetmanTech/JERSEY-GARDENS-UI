import { Button } from 'degen'
import { useState } from 'react'

const Accordion = ({ buttonText, content }) => {
  const [open, setOpen] = useState(false)

  const handleClick = () => {
    setOpen(!open)
  }

  return (
    <>
      <Button width="full" variant="secondary" onClick={handleClick}>
        {buttonText}
      </Button>
      {open && content}
    </>
  )
}

export default Accordion
