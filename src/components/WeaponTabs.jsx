import { weapons, skins } from '../data';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { FixedSizeList as List } from 'react-window';
import '../Styles/WeaponTabs.css';

export default function WeaponTabs({ onSkinSelect }) {
	const [activeWeaponId, setActiveWeaponId] = useState(weapons[0].id); // Default to the first weapon
	const [selectedSkins, setSelectedSkins] = useState(new Set());

	const handleSkinSelect = (skin) => {
		const updatedSkins = new Set(selectedSkins);
		if (updatedSkins.has(skin)) {
			updatedSkins.delete(skin);
		} else {
			updatedSkins.add(skin);
		}
		setSelectedSkins(updatedSkins);
		onSkinSelect(Array.from(updatedSkins));
	};

	// Filter skins for the active weapon
	const filteredSkins = skins.filter(
		(skin) => skin.weaponId === activeWeaponId
	);

	return (
		<div>
			<h2>Weapons</h2>
			<div className="tabs">
				{weapons.map((weapon) => (
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

			<List
				className="weapon-list-container"
				height={400}
				itemCount={filteredSkins.length}
				itemSize={50}
				width="100%"
			>
				{({ index, style }) => {
					const skin = filteredSkins[index];
					return (
						<div key={skin.id} style={style}>
							<button
								className={`skin-button ${
									selectedSkins.has(skin) ? 'selected' : ''
								}`}
								onClick={() => handleSkinSelect(skin)}
							>
								{skin.name} - {skin.cost} VP
							</button>
						</div>
					);
				}}
			</List>
		</div>
	);
}

WeaponTabs.propTypes = {
	onSkinSelect: PropTypes.func.isRequired,
};
