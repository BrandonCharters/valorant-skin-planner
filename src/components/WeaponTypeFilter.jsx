import PropTypes from 'prop-types';
import '../Styles/WeaponTypeFilter.css';

export default function WeaponTypeFilter({
	weaponTypes,
	selectedType,
	onTypeChange,
}) {
	return (
		<div className="weapon-filter">
			<h3>Filter by Type:</h3>
			<select
				value={selectedType}
				onChange={(e) => onTypeChange(e.target.value)}
				className="filter-select"
			>
				{weaponTypes.map((type) => (
					<option key={type} value={type}>
						{type}
					</option>
				))}
			</select>
		</div>
	);
}

WeaponTypeFilter.propTypes = {
	weaponTypes: PropTypes.arrayOf(PropTypes.string).isRequired,
	selectedType: PropTypes.string.isRequired,
	onTypeChange: PropTypes.func.isRequired,
};
