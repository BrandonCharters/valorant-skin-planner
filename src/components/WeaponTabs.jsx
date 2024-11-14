import { skinsData } from '../data';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { FixedSizeList as List } from 'react-window';

export default function WeaponTabs({ onSkinSelect }) {
    const [activeWeapon, setActiveWeapon] = useState(Object.keys(skinsData)[0]);
    const [selectedSkins, setSelectedSkins] = useState(new Set());

    const handleSkinToggle = (skin) => {
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
                        className={`tab-button ${activeWeapon === weapon ? 'active' : ''}`}
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
                height={400}
                itemCount={skins.length}
                itemSize={70} // Adjusted to give more space for styled buttons
                width="100%"
            >
                {({ index, style }) => {
                    const skin = skins[index];
                    const isSelected = selectedSkins.has(skin);

                    return (
                        <button
                            key={skin.id}
                            style={style}
                            className={`skin-button ${isSelected ? 'selected' : ''}`}
                            onClick={() => handleSkinToggle(skin)}
                        >
                            <div className="skin-content">
                                <h3>{skin.name}</h3>
                                <p>{skin.cost} VP</p>
                            </div>
                        </button>
                    );
                }}
            </List>
        </div>
    );
}

WeaponTabs.propTypes = {
    onSkinSelect: PropTypes.func.isRequired,
};
