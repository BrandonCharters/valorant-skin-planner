import PropTypes from 'prop-types';
import '../Styles/SkinListFilter.css';

export default function SkinListFilter({ onSort, defaultSort }) {
	// Set the default value of the dropdown to `defaultSort`
	const handleSortChange = (e) => {
		const sortOption = e.target.value;
		onSort(sortOption); // Pass the sort option back to the parent
	};

	return (
		<div className="skin-list-filter">
			<div className="filter-group">
				<label htmlFor="sort">Sort by: </label>
				<select
					id="sort"
					onChange={handleSortChange}
					defaultValue={defaultSort}
				>
					<option value="highest">Highest Price</option>
					<option value="lowest">Lowest Price</option>
				</select>
			</div>
		</div>
	);
}

SkinListFilter.propTypes = {
	onSort: PropTypes.func.isRequired, // Required: Function to handle sort logic
	defaultSort: PropTypes.string, // Optional: Default sort option
};
