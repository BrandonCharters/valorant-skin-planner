import { skins } from '../data/data';
import { useState, useMemo } from 'react';
import { FixedSizeList as List } from 'react-window';
import PropTypes from 'prop-types';
import SkinListFilter from './SkinListFilter';
import '../Styles/WeaponTabs.css';
import '../Styles/Skins.css';

// This component displays the list of skins for a selected weapon.
export default function SkinList({ activeWeaponId, onSkinSelect }) {
	// Local state for selected skins and sort option
	const [selectedSkins, setSelectedSkins] = useState(new Set());
	const [sortOption, setSortOption] = useState('highest'); // Default sorting: Highest price

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

	// Sorts the filtered skins based on the selected sort option.
	const sortedSkins = useMemo(() => {
		return [...filteredSkins].sort((a, b) => {
			if (sortOption === 'highest') return b.cost - a.cost;
			return a.cost - b.cost;
		});
	}, [filteredSkins, sortOption]);

	return (
		<div>
			{/* Include the filter and sort component */}
			<SkinListFilter onSort={setSortOption} defaultSort="highest" />

			{/* Render the sorted and filtered list */}
			<List
				className="weapon-list-container"
				height={400}
				itemCount={sortedSkins.length}
				itemSize={50}
				width="100%"
			>
				{({ index, style }) => {
					const skin = sortedSkins[index];
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

SkinList.propTypes = {
	activeWeaponId: PropTypes.number.isRequired,
	onSkinSelect: PropTypes.func.isRequired,
};
