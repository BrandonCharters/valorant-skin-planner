import PropTypes from 'prop-types';
import { weapons } from '../data/data';
import '../Styles/WeaponTypeFilter.css';

// Extract unique weapon types
const getWeaponTypes = () => {
	const types = weapons.map((weapon) => weapon.type);
	return [...new Set(types)];
};

export default function WeaponTypeFilter({ selectedType, onTypeSelect }) {
	const weaponTypes = getWeaponTypes();

	return (
		<div className="weapon-type-filter">
			<h2>Filter by Type</h2>
			<div className="filter-buttons">
				{weaponTypes.map((type) => (
					<button
						key={type}
						className={selectedType === type ? 'active' : ''}
						onClick={() => onTypeSelect(type)}
					>
						{type}
					</button>
				))}
				<button
					className={!selectedType ? 'active' : ''}
					onClick={() => onTypeSelect(null)}
				>
					All
				</button>
			</div>
		</div>
	);
}

WeaponTypeFilter.propTypes = {
	selectedType: PropTypes.string,
	onTypeSelect: PropTypes.func.isRequired,
};
