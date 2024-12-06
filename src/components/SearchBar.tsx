import React, { useEffect, useState } from 'react';
import { UserOutlined } from '@ant-design/icons';
import { AutoComplete, Flex, Input } from 'antd';
import { API_HOST } from '@/constant';

const Title: React.FC<Readonly<{ title?: string }>> = (props) => (
  <Flex align="center" justify="space-between">
    {props.title}
    <a href="https://www.google.com/search?q=antd" target="_blank" rel="noopener noreferrer">
      more
    </a>
  </Flex>
);

const SearchBar: React.FC = () => {
  const [options, setOptions] = useState([]);
  const [allOptions, setAllOptions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_HOST}/Tool`);
        const data = await response.json();
        const formattedOptions = data.map((item: any) => ({
          value: item.title,
          label: (
            <Flex align="center" justify="space-between">
              {item.title}
              <span>
                <UserOutlined /> {item.count}
              </span>
            </Flex>
          ),
        }));
        setAllOptions(formattedOptions);
        setOptions(formattedOptions);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (value: string) => {
    const filteredOptions = allOptions.filter((option: { value: string }) =>
      option.value.toLowerCase().startsWith(value.toLowerCase())
    );
    setOptions(filteredOptions);
  };

  return (
    <AutoComplete
      popupClassName="certain-category-search-dropdown"
      popupMatchSelectWidth={500}
      style={{ width: 250 }}
      options={options}
      size="large"
      onSearch={handleSearch}
    >
      <Input.Search size="large" placeholder="找AI工具" />
    </AutoComplete>
  );
};

export default SearchBar;
