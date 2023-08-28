import React, { useEffect, useState } from 'react'
import AwesomeIcon from '../../components/FontAwesomeIcon'
import { faCircleLeft, faEnvelopeCircleCheck } from '@fortawesome/free-solid-svg-icons'
import { Label, Input, Button, HelperText } from '@windmill/react-ui'
import fetchData from '../../funtions/fetchData'
import { ResetActivationLinkUrl } from '../../funtions/config'
import ErrorModal from './ErrorModal'
import SuccessModal from './SuccessModal'
import { useHistory } from 'react-router-dom'

const ActivateAccountAlert = ({email}) => {
    const [showErrorModal, setShowErrorModal] = useState(false)
    const [showSuccessModal, setShowSuccessModal] = useState(false)
    const [isDisabled, setIsDisabled] = useState(false);
    const [remainingTime, setRemainingTime] = useState(5);

    const history = useHistory();

    const handleResentLink = () => {
        const headers = {
        Accept: 'application/json',    
        'Content-Type': 'application/json'
        }

        fetchData(`${ResetActivationLinkUrl}/`, "POST", {email: email}, headers).then(d => {
            if(d.error){
                setShowErrorModal(true)
            } else {
                setIsDisabled(true);      
                // Establecer la última vez que se hizo clic en el botón en el almacenamiento local
                localStorage.setItem('lastClickTime', Date.now());
                setShowSuccessModal(true)
            }    
        })    

    }      


  const handleCloseErrorModal = () => setShowErrorModal(false);

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false)
    history.push("/login/")
  }

  useEffect(() => {
    // Obtener la última vez que se hizo clic en el botón del almacenamiento local
    const lastClickTime = localStorage.getItem('lastClickTime');

    if (lastClickTime) {
      // Calcular el tiempo transcurrido desde el último clic
      const currentTime = Date.now();
      const differenceInMinutes = (currentTime - parseInt(lastClickTime, 10)) / (1000 * 60);

      // Si ha pasado menos de 5 minutos desde el último clic, deshabilitar el botón
      if (differenceInMinutes < 5) {
        setRemainingTime(5 - Math.floor(differenceInMinutes));
        setIsDisabled(true);

        // Establecer un temporizador para habilitar el botón después del tiempo restante
        const timer = setInterval(() => {
          setRemainingTime((prevTime) => prevTime - 1);
        }, 60000);

        // Limpiar el temporizador cuando el componente se desmonte o cambie de página
        return () => clearInterval(timer);
      } else {
        setIsDisabled(false);
        setRemainingTime(0);
        // Limpiar el valor de la última vez que se hizo clic en el botón si han pasado más de 5 minutos
        localStorage.removeItem('lastClickTime');
      }
    }
  }, []);
  return (
    <div className='items-center justify-center'>
        <ErrorModal isOpen={showErrorModal} onClose={handleCloseErrorModal}/>
        <SuccessModal isOpen={showSuccessModal} onClose={handleCloseSuccessModal}/>
        <Button block><AwesomeIcon icon={faCircleLeft} className="mr-4"/> Regresar</Button>
        <AwesomeIcon icon={faEnvelopeCircleCheck} className="w-40 h-40 text-green-800 dark:text-green-400"/>
        <Label className="text-lg">
            Para completar el proceso de registro y disfrutar de todas las funcionalidades, es necesario que verifiques tu dirección de correo electrónico. 
            <br/>
            <br/>
            Hemos enviado un mensaje a tu cuenta de correo electrónico con un enlace de verificación.
            <br/>
            <br/>
            Si aún no recibes el correo electrónico de verificación, puedes solicitar que te enviemos otro pulsando el botón a continuación:
        </Label>
        {isDisabled ? (<Button disabled className="mt-3 ">Reenviar</Button>) : <Button className="mt-3 " onClick={handleResentLink}>Reenviar</Button>}
        <br/>
        {isDisabled && <HelperText valid={false}>Espera {remainingTime} minutos para reenviar</HelperText>}
        

    </div>
  )
}

export default ActivateAccountAlert