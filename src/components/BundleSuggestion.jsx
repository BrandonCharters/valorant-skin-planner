import { bundles } from '../data/data';
import PropTypes from 'prop-types';
import BundleDisplay from './BundleDisplay';
import '../Styles/BundleSuggestion.css';

// This component calculates and displays the best bundles to meet the VP requirement.

export default function BundleSuggestion({ totalVP, currentVP }) {

    // Calculate how much more VP is needed.
	const vpNeeded = Math.max(totalVP - currentVP, 0);

    // Function to calculate the cheapest combination of bundles to meet the VP need.
	const calculateBestBundles = (vpNeeded) => {
		const memo = {};

        // Recursive function to find the best combination of bundles for the given VP requirement.
		const findCombination = (remainingVP) => {
			if (remainingVP <= 0) return { cost: 0, bundles: [] }; // Base case: If no more VP is needed, cost is 0, and no bundles are required.
			if (memo[remainingVP]) return memo[remainingVP]; // Return cached result if already calculated.

			let minCost = Infinity;
			let bestCombination = [];

            // Loop through each bundle to find the optimal choice.
			for (const bundle of bundles) {
				const result = findCombination(remainingVP - bundle.totalVP);
				const currentCost = result.cost + bundle.cost;

				if (currentCost < minCost) {
					minCost = currentCost;
					bestCombination = [...result.bundles, bundle];
				}
			}

            // Store the calculated result in the memo object to avoid recalculating.
			memo[remainingVP] = { cost: minCost, bundles: bestCombination };
			return memo[remainingVP];
		};

		// Start the recursive calculation with the exact VP needed.
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

    // Calculate the best bundle combination and group them for display.
	const { minCost, bestCombination } = calculateBestBundles(vpNeeded);
	const groupedBundles = groupBundles(bestCombination);

    // Render the bundle suggestion UI.
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
