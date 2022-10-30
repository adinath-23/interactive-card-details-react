import { useState } from "react";
import Form from "./components/Form/Form";
import Front from "./components/Card/Front";
import Back from "./components/Card/Back";
import Complete from "./components/Complete/Complete";

function App() {
  const [isComplete, setIsComplete] = useState(false)
  const [cardDetails, setCardDetails] = useState({
    username: 'jane',
    cardNumber: '0000 0000 0000 0000',
    expMonth: '00',
    expYear: '00',
    cvc: '000'
  })

  const handleCompletion = (value) => {
    setIsComplete(value)
  }

  const formDataHandler = data => {
    setCardDetails(data)
  }

  return (
    <main>
      <div className="card-container">
        <Front data={cardDetails} />
        <Back data={cardDetails.cvc} />
      </div>
      <div className="form-container">
        {
          isComplete ?
            <Complete onCompletion={handleCompletion} /> :
            <Form onCompletion={handleCompletion} submitData={formDataHandler} />
        }</div>
    </main>
  );
}

export default App;
