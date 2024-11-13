'use client'

import { useState } from 'react'
import FilterOption from '@/components/FilterOption'
import CardWithDisplay from '@/components/CardWithDisplay'

export default function FilterPage() {
  const [filters, setFilters] = useState({
    AAA: '',
    BBB: '', 
    CCC: '',
    DDD: ''
  })

  const handleFilterChange = (category: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [category]: value
    }))
  }

  const handleClear = () => {
    setFilters({
      AAA: '',
      BBB: '',
      CCC: '',
      DDD: ''
    })
  }

  return (
    <div className="p-4">
      <div className="flex flex-wrap gap-4 mb-6">
        <FilterOption 
          category="AAA"
          value={filters.AAA}
          onChange={(value) => handleFilterChange('AAA', value)}
        />
        <FilterOption 
          category="BBB"
          value={filters.BBB}
          onChange={(value) => handleFilterChange('BBB', value)}
        />
        <FilterOption 
          category="CCC"
          value={filters.CCC}
          onChange={(value) => handleFilterChange('CCC', value)}
        />
        <FilterOption 
          category="DDD"
          value={filters.DDD}
          onChange={(value) => handleFilterChange('DDD', value)}
        />
        <button 
          onClick={handleClear}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          清除
        </button>
      </div>

      {/* 卡片顯示區域 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <CardWithDisplay _id={''} title={''} description={''} imageUrl={''} saveCount={0} commentCount={0} onLoginRequired={function (): void {
          throw new Error('Function not implemented.')
        }} isLoggedIn={false} />
        {/* ... 更多卡片 ... */}
      </div>
    </div>
  )
}
