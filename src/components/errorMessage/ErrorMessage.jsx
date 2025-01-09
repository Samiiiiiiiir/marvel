import error from './error.gif';
import './errorMessage.scss';

const ErrorMessage = () => {
    return (
        <img class="error-img" src={error} loading='lazy' alt="error"/>
    )
}

export default ErrorMessage;