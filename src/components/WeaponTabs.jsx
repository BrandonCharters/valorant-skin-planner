import { skinsData } from '../data';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { FixedSizeList as List } from 'react-window';

export default function WeaponTabs({ onSkinSelect }) {
	const [activeWeapon, setActiveWeapon] = useState(Object.keys(skinsData)[0]);
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

	const skins = skinsData[activeWeapon].skins;

	return (
		<div>
			<h2>Weapons</h2>
			<div className="tabs">
				{Object.keys(skinsData).map((weapon) => (
					<button
						key={weapon}
						className={activeWeapon === weapon ? 'active' : ''}
						onClick={() => setActiveWeapon(weapon)}
					>
						<div className="tab-content">
							<h3>{weapon}</h3>
							<img
								src={skinsData[weapon].image}
								alt={`${weapon} base`}
								className="weapon-image"
							/>
						</div>
					</button>
				))}
			</div>

			<List
				className="weapon-list-container"
				height={400} // Adjust to fit your design
				itemCount={skins.length}
				itemSize={50} // Height of each item
				width="100%"
			>
				{({ index, style }) => {
					const skin = skins[index];
					return (
						<div key={skin.id} style={style}>
							<label>
								<input
									type="checkbox"
									checked={selectedSkins.has(skin)}
									onChange={() => handleSkinSelect(skin)}
								/>
								{skin.name} - {skin.cost} VP
							</label>
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
