import React from 'react';
import { Select, Button } from 'antd'; // Correcting the import to use 'antd' instead of '@ant-design/react'

interface FavoritesFilterProps {
  onFilterChange: (filters: FilterValues) => void;
}

interface FilterValues {
  period: string;
  mainCategory: string;
  subCategory: string;
}

const FavoritesFilter: React.FC<FavoritesFilterProps> = ({ onFilterChange }) => {
  const [filters, setFilters] = React.useState<FilterValues>({
    period: '順序：全部',
    mainCategory: '新到舊',
    subCategory: '舊到新',
  });

  const handleFilterChange = (key: keyof FilterValues, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleReset = () => {
    const defaultFilters = {
        period: '分類：全部',
        mainCategory: '新到舊',
        subCategory: '舊到新',
    };
    setFilters(defaultFilters);
    onFilterChange(defaultFilters);
  };

  return (
    <div className="favorites-filter">
      <Select<string>
        value={filters.period}
        onChange={(value: string) => handleFilterChange('period', value)}
        style={{ width: 150 }}
        bordered={false}
        suffixIcon={<span style={{ fontSize: '12px' }}>▼</span>}
      >
        <Select.Option value="新到舊">新到舊</Select.Option>
        <Select.Option value="舊到新">舊到新</Select.Option>
      </Select>

      <Select<string>
        value={filters.mainCategory}
        onChange={(value: string) => handleFilterChange('mainCategory', value)}
        style={{ width: 150, marginLeft: 8 }}
        bordered={false}
        suffixIcon={<span style={{ fontSize: '12px' }}>▼</span>}
      >
        <Select.Option value="全部">全部</Select.Option>
        <Select.Option value="金部">金部</Select.Option>
        {/* Add more options as needed */}
      </Select>

      <Select<string>
        value={filters.subCategory}
        onChange={(value: string) => handleFilterChange('subCategory', value)}
        style={{ width: 150, marginLeft: 8 }}
        bordered={false}
        suffixIcon={<span style={{ fontSize: '12px' }}>▼</span>}
      >
        <Select.Option value="全部">全部</Select.Option>
        <Select.Option value="金部">金部</Select.Option>
        {/* Add more options as needed */}
      </Select>

      <Button 
        type="link" 
        onClick={handleReset}
        style={{ marginLeft: 8 }}
      >
        恢復預設
      </Button>
    </div>
  );
};

export default FavoritesFilter;
