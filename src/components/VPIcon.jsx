import PropTypes from 'prop-types';
import VPIconImage from '../assets/VPIcon.svg'; // Adjust the path as needed
import '../Styles/VPIcon.css';

// Displays an icon for Valorant Points.

const VPIcon = ({ altText = "VP" }) => {
    return (
        <span className="vp-icon-container">
            <img 
                src={VPIconImage} 
                alt={altText} 
                className="vp-icon" 
            />
        </span>
    );
};

VPIcon.propTypes = {
    altText: PropTypes.string,
};

export default VPIcon;
