import PropTypes from 'prop-types';

function Header({ text }) { //props are attributes of the components which make them dynamic
  return (
    <header>
        <div className="container">
            <h2>{text}</h2>
        </div>
    </header>
  )
}
Header.defaultProps = {
    text: 'Feedback UI',
}
//Dont need to use prop types, 
Header.propTypes = {
    text: PropTypes.string
}

export default Header