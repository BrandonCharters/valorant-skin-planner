import PropTypes from 'prop-types';
import VPIcon from './VPIcon';
import '../Styles/BundleDisplay.css';

// This component displays bundles in a grid format (Matching how it is displayed in Valorant)

export default function BundleDisplay({ bundles, highlightedBundles }) {
	return (
		<div className="bundle-grid">
			{bundles.map((bundle) => {
				const highlight = highlightedBundles.find(
					(highlighted) => highlighted.id === bundle.id
				);
				return (
					<div
						key={bundle.id}
						className={`bundle-block ${highlight ? 'highlighted' : ''}`}
					>
						{/* Top-right corner for cost */}
						<span className="bundle-cost">${bundle.cost.toFixed(2)}</span>
						{/* Center content */}
						<div className="bundle-content">
							<VPIcon />
							<div className="total-vp">{bundle.totalVP} VP</div>
						</div>
						{/* Bottom info */}
						<div className="bundle-info">
							<div className="base-vp">{bundle.baseVP} Base VP</div>
							<div className="bonus-vp">{bundle.bonusVP} Bonus VP</div>
						</div>
						{/* Highlight count */}
						{highlight && (
							<div className="bundle-multiplier">x{highlight.count}</div>
						)}
					</div>
				);
			})}
		</div>
	);
}

BundleDisplay.propTypes = {
	bundles: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.number.isRequired,
			cost: PropTypes.number.isRequired,
			baseVP: PropTypes.number.isRequired,
			bonusVP: PropTypes.number.isRequired,
			totalVP: PropTypes.number.isRequired,
		})
	).isRequired,
	highlightedBundles: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.number.isRequired,
			count: PropTypes.number.isRequired,
		})
	),
};
