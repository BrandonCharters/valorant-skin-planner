import { weapons } from '../data/data';
import { useState } from 'react';
import PropTypes from 'prop-types';
import '../Styles/WeaponTabs.css';
import '../Styles/Skins.css';
import SkinList from './SkinList';
import WeaponTypeFilter from './WeaponTypeFilter';

export default function WeaponTabs({ onSkinSelect }) {
	const [activeWeaponId, setActiveWeaponId] = useState(weapons[0].id);
	const [selectedType, setSelectedType] = useState('All');

	// Get unique weapon types
	const weaponTypes = [...new Set(weapons.map((weapon) => weapon.type))];

	// Filter weapons based on the selected type
	const filteredWeapons = weapons.filter(
		(weapon) => selectedType === 'All' || weapon.type === selectedType
	);

	return (
		<div>
			<h2>Weapons</h2>
			<WeaponTypeFilter
				weaponTypes={weaponTypes}
				selectedType={selectedType}
				onTypeChange={setSelectedType}
			/>
			<div className="tabs">
				{filteredWeapons.map((weapon) => (
					<button
						key={weapon.id}
						className={activeWeaponId === weapon.id ? 'active' : ''}
						onClick={() => setActiveWeaponId(weapon.id)}
					>
						<div className="tab-content">
							<h3>{weapon.name}</h3>
							<img
								src={weapon.image}
								alt={`${weapon.name} base`}
								className="weapon-image"
							/>
						</div>
					</button>
				))}
			</div>
			<SkinList activeWeaponId={activeWeaponId} onSkinSelect={onSkinSelect} />
		</div>
	);
}

WeaponTabs.propTypes = {
	onSkinSelect: PropTypes.func.isRequired,
};
