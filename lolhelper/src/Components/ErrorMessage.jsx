const ErrorMessage = ({ message }) => {
    return (
      <div style={{ color: 'red', marginLeft: '0.5rem', position:'absolute'}}>
        {message}
      </div>
    );
  };

export default ErrorMessage;