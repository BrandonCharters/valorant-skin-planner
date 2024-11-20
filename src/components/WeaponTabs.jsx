import { weapons } from '../data/data';
import { useState } from 'react';
import PropTypes from 'prop-types';
import '../Styles/WeaponTabs.css';
import '../Styles/Skins.css';
import SkinList from './SkinList';
import WeaponTypeFilter from './WeaponTypeFilter';

export default function WeaponTabs({ onSkinSelect }) {
	// Get unique weapon types
	const weaponTypes = [...new Set(weapons.map((weapon) => weapon.type))];

	const [activeWeaponId, setActiveWeaponId] = useState(weapons[0].id);
	const [selectedType, setSelectedType] = useState(weaponTypes[0]);

	// Filter weapons based on the selected type
	const filteredWeapons = weapons.filter(
		(weapon) => weapon.type === selectedType
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
							<div className="tab-weapon-image">
								<img
									src={weapon.image}
									alt={`${weapon.name} base`}
									className="weapon-image"
								/>
							</div>
							<div className="tab-weapon-name">
								<h3>{weapon.name}</h3>
							</div>
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
