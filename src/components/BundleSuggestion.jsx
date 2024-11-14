import { bundles } from '../data';
import PropTypes from 'prop-types';

export default function BundleSuggestion({ totalVP, currentVP }) {
    const vpNeeded = Math.max(totalVP - currentVP, 0);

    const calculateBestBundles = (vpNeeded) => {
        const memo = {};

        const findCombination = (remainingVP) => {
            if (remainingVP <= 0) return { cost: 0, bundles: [] };
            if (memo[remainingVP]) return memo[remainingVP];

            let minCost = Infinity;
            let bestCombination = [];

            for (const bundle of bundles) {
                if (bundle.totalVP <= remainingVP) {
                    const result = findCombination(remainingVP - bundle.totalVP);
                    const currentCost = result.cost + bundle.cost;

                    if (currentCost < minCost) {
                        minCost = currentCost;
                        bestCombination = [...result.bundles, bundle];
                    }
                }
            }

            memo[remainingVP] = { cost: minCost, bundles: bestCombination };
            return memo[remainingVP];
        };

        const result = findCombination(vpNeeded);
        return { minCost: result.cost, bestCombination: result.bundles };
    };

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

    return (
        <div className="bundle-suggestion">
            <h2>Suggested Bundles</h2>
            {vpNeeded > 0 ? (
                <div>
                    <p>Best Cost: ${minCost.toFixed(2)}</p>
                    <ul>
                        {groupedBundles.map((bundle) => (
                            <li key={bundle.id}>
                                {bundle.totalVP} VP bundle for ${bundle.cost} x{bundle.count}
                            </li>
                        ))}
                    </ul>
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
