import { useState, useEffect, useRef } from "react";
import {Container, Row, Col} from "react-bootstrap"
import { ArrowRightCircle } from 'react-bootstrap-icons';
import lottie from "lottie-web"
import { Player } from '@lottiefiles/react-lottie-player';

export const Banner = () => {
    const [loopNum, setLoopNum] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [text, setText] = useState('');
    const [delta, setDelta] = useState(300 - Math.random() * 100);
    const [index, setIndex] = useState(1);
    const toRotate = [ " Developer", " Designer" ];
    const period = 1500;
    const animationContainer = useRef(null);
    const [isAnimationLoaded, setIsAnimationLoaded] = useState(false);

    useEffect(() => {
        if (animationContainer.current && !isAnimationLoaded) {
            lottie.loadAnimation({
                container: animationContainer.current,
                renderer: "svg",
                loop: true,
                autoplay: true,
                animationData: require('../assets/img/office1.json'),
                onComplete: () => setIsAnimationLoaded(true)
            });
        }
    }, [isAnimationLoaded]);

    useEffect(() => {
        let ticker = setInterval(() => {
            tick();
        },delta);
        return () => {clearInterval(ticker)};
    },[text])
    
    const tick = () => {
        let i = loopNum % toRotate.length;
        let fullText = toRotate[i];
        let updatedText = isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1);
    
        setText(updatedText);
    
        if (isDeleting) {
          setDelta(prevDelta => prevDelta / 2);
        }
    
        if (!isDeleting && updatedText === fullText) {
          setIsDeleting(true);
          setIndex(prevIndex => prevIndex - 1);
          setDelta(period);
        } else if (isDeleting && updatedText === '') {
          setIsDeleting(false);
          setLoopNum(loopNum + 1);
          setIndex(1);
          setDelta(500);
        } else {
          setIndex(prevIndex => prevIndex + 1);
        }
      }
    return(
        <section className="banner" id="home">
            <Container>
                <Row className="align-items-center">
             <Col xs={12} md={6} xl={7}>
                <span className="tagline"> Good to have you here!</span>
                <h1>{`Hi I'm Remco Horbach and I'm a Web`}<span className="wrap">{text}</span></h1>
                <p></p>
                <button onClick={()=> console.log('connect')}>Let's Connect<ArrowRightCircle size={25}></ArrowRightCircle></button>
             </Col>
             <Col xs={12} md={6} xl={5}>
             <Player
                src='https://assets8.lottiefiles.com/private_files/lf30_WdTEui.json'
                className="player"
                loop
                autoplay
              />
                </Col>  
             </Row>
            </Container>
        </section>
    )
}
