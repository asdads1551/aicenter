import React, { useState } from 'react';

interface FilterOptionProps {
  category: string;
  value: string;
  onChange: (value: string) => void;
}

interface FilterState {
  categoryA: string;
  categoryB: string;
  categoryC: string;
  categoryD: string;
}

const FilterOption: React.FC<FilterOptionProps> = ({ category, value, onChange }) => {
  const [filters, setFilters] = useState<FilterState>({
    categoryA: '',
    categoryB: '',
    categoryC: '',
    categoryD: ''
  });

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    onChange(value);
  };

  function onClear(event: React.MouseEvent<HTMLButtonElement>): void {
    setFilters({
      categoryA: '',
      categoryB: '', 
      categoryC: '',
      categoryD: ''
    });
    onChange('');
  }

  return (
    <div className="filter-container">
      <select
        name="categoryA"
        value={filters.categoryA}
        onChange={handleFilterChange}
        className="filter-select"
      >
        <option value="">分類名稱：AAA</option>
        <option value="a1">選項 A1</option>
        <option value="a2">選項 A2</option>
      </select>

      <select
        name="categoryB"
        value={filters.categoryB}
        onChange={handleFilterChange}
        className="filter-select"
      >
        <option value="">分類名稱：BBB</option>
        <option value="b1">選項 B1</option>
        <option value="b2">選項 B2</option>
      </select>

      <select
        name="categoryC"
        value={filters.categoryC}
        onChange={handleFilterChange}
        className="filter-select"
      >
        <option value="">分類名稱：CCC</option>
        <option value="c1">選項 C1</option>
        <option value="c2">選項 C2</option>
      </select>

      <select
        name="categoryD"
        value={filters.categoryD}
        onChange={handleFilterChange}
        className="filter-select"
      >
        <option value="">分類名稱：DDD</option>
        <option value="d1">選項 D1</option>
        <option value="d2">選項 D2</option>
      </select>

      <button onClick={onClear} className="clear-button">
        清除
      </button>
    </div>
  );
};

export default FilterOption;
