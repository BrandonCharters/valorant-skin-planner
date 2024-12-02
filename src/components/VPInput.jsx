import PropTypes from 'prop-types';
import '../Styles/VPInput.css';
import VPIcon from './VPIcon';

// This component allows users to input their current VP balance and handles updates to the state.

export default function VPInput({ currentVP, setCurrentVP }) {
	return (
		<div className="vp-input-container">
			<h2>
				Current VP <VPIcon />
			</h2>
			<input
				type="text"
				className="vp-input"
				value={currentVP || ''}
				onChange={(e) => setCurrentVP(Number(e.target.value) || 0)}
				placeholder="Enter your current VP balance"
			/>
		</div>
	);
}

// These aren't needed but ESLint gets mad if you ont have them.
VPInput.propTypes = {
	currentVP: PropTypes.number.isRequired, // Ensures `currentVP` is a number
	setCurrentVP: PropTypes.func.isRequired, // // Ensures `setCurrentVP` is a function
};
