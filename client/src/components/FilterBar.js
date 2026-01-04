function FilterBar({ value, onChange }) {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)}>
      <option value="">All Sports</option>
      <option value="Cricket">Cricket</option>
      <option value="Football">Football</option>
      <option value="Tennis">Tennis</option>
    </select>
  );
}

export default FilterBar;
