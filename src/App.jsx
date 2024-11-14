import { useState } from 'react';
import './App.css';
import Header from './components/Header';
import VPInput from './components/VPInput';
import WeaponTabs from './components/WeaponTabs';
import TotalVP from './components/TotalVP';
import BundleSuggestion from './components/BundleSuggestion';

function App() {
	const [currentVP, setCurrentVP] = useState(0);
	const [selectedSkins, setSelectedSkins] = useState([]);

	const totalVP = selectedSkins.reduce((sum, skin) => sum + skin.cost, 0);

	return (
		<div className="app">
			<Header />
			<VPInput currentVP={currentVP} setCurrentVP={setCurrentVP} />
			<WeaponTabs onSkinSelect={setSelectedSkins} />
			<TotalVP selectedSkins={selectedSkins} />
			<BundleSuggestion totalVP={totalVP} currentVP={currentVP} />
		</div>
	);
}

export default App;
