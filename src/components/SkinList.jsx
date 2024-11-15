import { skins } from '../data/data';
import { useState } from 'react';
import { FixedSizeList as List } from 'react-window';
import PropTypes from 'prop-types';
import '../Styles/WeaponTabs.css';

// This component displays the list of skins for a selected weapon.

export default function SkinList({ activeWeaponId, onSkinSelect }) {
	// Local state for selected skins.
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

	return (
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
	);
}

SkinList.propTypes = {
	activeWeaponId: PropTypes.number.isRequired,
	onSkinSelect: PropTypes.func.isRequired,
};
