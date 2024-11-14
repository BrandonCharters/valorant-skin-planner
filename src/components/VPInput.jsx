import PropTypes from 'prop-types';

export default function VPInput({ currentVP, setCurrentVP }) {
	return (
		<div className="vp-input-container">
			<h2>Current VP</h2>
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

VPInput.propTypes = {
	currentVP: PropTypes.number.isRequired,
	setCurrentVP: PropTypes.func.isRequired,
};
