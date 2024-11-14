import PropTypes from 'prop-types';

export default function TotalVP({ selectedSkins }) {
	const totalVP = selectedSkins.reduce((sum, skin) => sum + skin.cost, 0);

	return (
		<div>
			<h2>Total VP</h2>
			<p>{totalVP} VP</p>
		</div>
	);
}

TotalVP.propTypes = {
	selectedSkins: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.number.isRequired,
			name: PropTypes.string.isRequired,
			cost: PropTypes.number.isRequired,
		})
	).isRequired,
};
