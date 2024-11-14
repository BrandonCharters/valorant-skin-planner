import { weapons, skins } from '../data';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { FixedSizeList as List } from 'react-window';
import '../Styles/WeaponTabs.css';

// This component displays a list of weapons as tabs and allows users to select skins.

export default function WeaponTabs({ onSkinSelect }) {
    // Local state for the active weapon and selected skins.
	const [activeWeaponId, setActiveWeaponId] = useState(weapons[0].id);
	const [selectedSkins, setSelectedSkins] = useState(new Set());

    // Handles toggling skin selection.
	const handleSkinSelect = (skin) => {
		const updatedSkins = new Set(selectedSkins);
		if (updatedSkins.has(skin)) {
			updatedSkins.delete(skin);
		} else {
			updatedSkins.add(skin);
		}
		setSelectedSkins(updatedSkins); // Update local state.
		onSkinSelect(Array.from(updatedSkins)); // Notify parent of changes.
	};

	// Filters skins based on the active weapon ID.
	const filteredSkins = skins.filter(
		(skin) => skin.weaponId === activeWeaponId
	);

    // React enables efficient rendering of the UI, ensuring performance even with large data sets.
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

            {/* `react-window` optimizes the rendering of long lists */}
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
