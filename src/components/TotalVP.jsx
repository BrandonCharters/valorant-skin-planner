import PropTypes from 'prop-types';
import '../Styles/TotalVP.css';
import VPIcon from './VPIcon';

// This component calculates and displays the true total VP required for the selected skins.
export default function TotalVP({ selectedSkins, currentVP }) {
	const totalSkinCost = selectedSkins.reduce((sum, skin) => sum + skin.cost, 0);
	const trueTotalVPNeeded = Math.max(totalSkinCost - currentVP, 0); // Ensure it doesn't go negative.

	return (
		<div>
			<h2>Total VP <VPIcon/></h2>
			<p>{trueTotalVPNeeded} VP</p>
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
	currentVP: PropTypes.number.isRequired, // New PropType for currentVP.
};
