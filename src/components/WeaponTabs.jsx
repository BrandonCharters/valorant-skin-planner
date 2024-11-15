import { weapons } from '../data';
import { useState } from 'react';
import PropTypes from 'prop-types';
import '../Styles/WeaponTabs.css';
import SkinList from './SkinList';

// This component displays a list of weapons as tabs.

export default function WeaponTabs({ onSkinSelect }) {
	// Local state for the active weapon ID.
	const [activeWeaponId, setActiveWeaponId] = useState(weapons[0].id);

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
			<SkinList activeWeaponId={activeWeaponId} onSkinSelect={onSkinSelect} />
		</div>
	);
}

WeaponTabs.propTypes = {
	onSkinSelect: PropTypes.func.isRequired,
};
