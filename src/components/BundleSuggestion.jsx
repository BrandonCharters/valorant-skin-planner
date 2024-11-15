import { bundles } from '../data';
import PropTypes from 'prop-types';
import BundleDisplay from './BundleDisplay';
import '../Styles/BundleSuggestion.css';

// This component calculates and displays the best bundles to meet the VP requirement.

export default function BundleSuggestion({ totalVP, currentVP }) {

    // React calculates the VP needed dynamically using props.
	const vpNeeded = Math.max(totalVP - currentVP, 0);

    // Encapsulated logic for calculating the best bundles (reusable and testable).
	const calculateBestBundles = (vpNeeded) => {
		const memo = {};

		const findCombination = (remainingVP) => {
			if (remainingVP <= 0) return { cost: 0, bundles: [] };
			if (memo[remainingVP]) return memo[remainingVP];

			let minCost = Infinity;
			let bestCombination = [];

            // Loop through bundles to find the best cost combination.
			for (const bundle of bundles) {
				const result = findCombination(remainingVP - bundle.totalVP);
				const currentCost = result.cost + bundle.cost;

				if (currentCost < minCost) {
					minCost = currentCost;
					bestCombination = [...result.bundles, bundle];
				}
			}

            // Store result in memo for optimization.
			memo[remainingVP] = { cost: minCost, bundles: bestCombination };
			return memo[remainingVP];
		};

		// Start calculation from the exact VP needed.
		const result = findCombination(vpNeeded);
		return {
			minCost: isFinite(result.cost) ? result.cost : 0,
			bestCombination: result.bundles,
		};
	};

    // Helper function to group bundles by ID for cleaner UI display.
	const groupBundles = (bundles) => {
		const grouped = {};
		bundles.forEach((bundle) => {
			if (grouped[bundle.id]) {
				grouped[bundle.id].count += 1;
			} else {
				grouped[bundle.id] = { ...bundle, count: 1 };
			}
		});
		return Object.values(grouped);
	};

	const { minCost, bestCombination } = calculateBestBundles(vpNeeded);
	const groupedBundles = groupBundles(bestCombination);

    // React ensures the UI re-renders when `vpNeeded` or calculations change.
	return (
		<div className="bundle-suggestion">
			<h2>Suggested Bundles</h2>
			{vpNeeded > 0 ? (
				<div>
					<p>Best Cost: ${minCost.toFixed(2)}</p>
					<BundleDisplay
						bundles={bundles}
						highlightedBundles={groupedBundles}
					/>
				</div>
			) : (
				<p>You have enough VP!</p>
			)}
		</div>
	);
}

BundleSuggestion.propTypes = {
	totalVP: PropTypes.number.isRequired,
	currentVP: PropTypes.number.isRequired,
};
