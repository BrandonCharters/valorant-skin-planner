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

		const MAX_BUNDLES = 3; // Limit the number of bundles
		const VALUE_THRESHOLD = 0.05; // Define a small threshold for better value

		// Recursive function to find the best combination of bundles for the given VP requirement.
		const findCombination = (remainingVP, bundleCount = 0) => {
			if (remainingVP <= 0) return { cost: 0, bundles: [] }; // Base case: If no more VP is needed, cost is 0, and no bundles are required.
			if (bundleCount > MAX_BUNDLES) return { cost: Infinity, bundles: [] }; // If the number of bundles exceeds the allowed maximum, return an invalid result.
			if (memo[remainingVP]) return memo[remainingVP]; // Return cached result if already calculated for this VP amount.

			let minCost = Infinity;
			let bestCombination = [];

			for (const bundle of bundles) {
				const result = findCombination(
					remainingVP - bundle.totalVP,
					bundleCount + 1
				);
				const currentCost = result.cost + bundle.cost;

				if (currentCost < minCost) {
					minCost = currentCost;
					bestCombination = [...result.bundles, bundle];
				}
			}

			memo[remainingVP] = { cost: minCost, bundles: bestCombination };
			return memo[remainingVP];
		};

		// Start with the exact VP needed.
		const exactResult = findCombination(vpNeeded);

		// Consider larger bundles for better value.
		const bestLargerOption = bundles
			.filter((bundle) => bundle.totalVP >= vpNeeded)
			.map((bundle) => ({
				bundle,
				cost: bundle.cost,
				extraVP: bundle.totalVP - vpNeeded,
				valuePerDollar: bundle.totalVP / bundle.cost,
			}))
			.sort((a, b) => a.valuePerDollar - b.valuePerDollar)[0]; // Get the best VP/$ larger bundle.

		// If a larger bundle offers better value within the threshold, use it.
		if (
			bestLargerOption &&
			bestLargerOption.cost <= exactResult.cost * (1 + VALUE_THRESHOLD)
		) {
			return {
				minCost: bestLargerOption.cost,
				bestCombination: [bestLargerOption.bundle],
			};
		}

		return {
			minCost: isFinite(exactResult.cost) ? exactResult.cost : 0,
			bestCombination: exactResult.bundles,
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
