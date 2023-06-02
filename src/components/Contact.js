import { useState} from "react";
import { Container, Col, Row } from "react-bootstrap";
import { Player } from '@lottiefiles/react-lottie-player';

export const Contact = () => {
  const formInitialDetails = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  };
  const [formDetails, setFormDetails] = useState(formInitialDetails);
  const [buttonText, setButtonText] = useState('Send');
  const [status, setStatus] = useState({});

  const onFormUpdate = (category, value) => {
    setFormDetails({
      ...formDetails,
      [category]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setButtonText('Sending...');
  
    // Validate form fields
    if (validateForm()) {
      try {
        let response = await fetch("http://localhost:3000/contact", {
          method: 'POST',
          headers: {
            "Content-Type": "application/json;charset=utf-8",
          },
          body: JSON.stringify(formDetails)
        });
  
        setButtonText("Send");
        let result = await response.json(); // Wait for the response to be parsed
        setFormDetails(formInitialDetails);
        if (result.code === 200) {
          setStatus({ success: true, message: 'Message sent successfully' });
        } else {
          setStatus({ success: false, message: 'Something went wrong, please try again' });
        }
      } catch (error) {
        setButtonText("Send");
        setStatus({ success: false, message: 'Something went wrong, please try again' });
      }
    } else {
      setButtonText("Send");
    }
  };

  const validateForm = () => {
    const { firstName, lastName, email, phone, message } = formDetails;
    if (firstName.trim() === '' || lastName.trim() === '' || email.trim() === '' || phone.trim() === '' || message.trim() === '') {
      setStatus({ success: false, message: 'Please fill in all required fields' });
      return false;
    }
    return true;
  };
  return (
    <section className="contact" id="connect">
      <Container>
        <Row className="align-items-center">
          <Col md={6}>
            <Player
              src='https://assets1.lottiefiles.com/packages/lf20_gssu2dkm.json'
              className="player"
              loop
              autoplay
            />
          </Col>
          <Col md={6}>
            <h2>Get in touch</h2>
            <form>
              <Row>
                <Col sm={6} className="px-1">
                  <input type="text" value={formDetails.firstName} placeholder="First Name" onChange={(e) => onFormUpdate('firstName', e.target.value)} required />
                </Col>
                <Col sm={6} className="px-1">
                  <input type="text" value={formDetails.lastName} placeholder="Last Name" onChange={(e) => onFormUpdate('lastName', e.target.value)} required />
                </Col>
                <Col sm={6} className="px-1">
                  <input type="email" value={formDetails.email} placeholder="Email Address" onChange={(e) => onFormUpdate('email', e.target.value)} required />
                </Col>
                <Col sm={6} className="px-1">
                  <input type="tel" value={formDetails.phone} placeholder="Phone Number" onChange={(e) => onFormUpdate('phone', e.target.value)} required />
                </Col>
                <Col>
                  <textarea rows="6" value={formDetails.message} placeholder="Type your message here" onChange={(e) => onFormUpdate('message', e.target.value)} required />
                  <button type="submit" onClick={handleSubmit}><span>{buttonText}</span></button>
                </Col>
                {status.message && (
                  <Col>
                    <p className={status.success === false ? "danger" : "success"}>{status.message}</p>
                  </Col>
                )}
              </Row>
            </form>
          </Col>
        </Row>
      </Container>
    </section>
  );
}