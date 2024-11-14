import PropTypes from 'prop-types';

export default function VPInput({ currentVP, setCurrentVP }) {
	return (
		<div>
			<h2>Current VP</h2>
			<input
				type="number"
				value={currentVP}
				onChange={(e) => setCurrentVP(Number(e.target.value))}
				placeholder="Enter your current VP balance"
			/>
		</div>
	);
}

VPInput.propTypes = {
	currentVP: PropTypes.number.isRequired,
	setCurrentVP: PropTypes.func.isRequired,
};
