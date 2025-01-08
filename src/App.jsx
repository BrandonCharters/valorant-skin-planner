import { useState } from 'react';
import './App.css';
import './Styles/global.css';
import Header from './components/Header';
import VPInput from './components/VPInput';
import WeaponTabs from './components/WeaponTabs';
import TotalVP from './components/TotalVP';
import BundleSuggestion from './components/BundleSuggestion';

// This is the main component of the app, functioning as the central controller for other components.
// It initializes and manages the app's primary state.

export default function App() {
	// React's `useState` enables centralized state management.
	const [currentVP, setCurrentVP] = useState(0); // Tracks the user's current VP balance.
	const [selectedSkins, setSelectedSkins] = useState([]); // Tracks skins selected by the user.

	// Calculates the total VP cost dynamically based on selected skins.
	const totalVP = selectedSkins.reduce((sum, skin) => sum + skin.cost, 0);

	// React's declarative rendering ensures all child components automatically update when state changes.
	return (
		<div className="app">
			<Header />
			<VPInput currentVP={currentVP} setCurrentVP={setCurrentVP} />
			<WeaponTabs onSkinSelect={setSelectedSkins} />
			<TotalVP selectedSkins={selectedSkins} currentVP={currentVP} />
			<BundleSuggestion totalVP={totalVP} currentVP={currentVP} />
		</div>
	);
}
