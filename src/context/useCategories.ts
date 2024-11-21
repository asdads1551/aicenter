import { Category, CategoryTree } from "@/type";
import { useEffect, useState } from "react";

export const useCategories = (): {
  categories: Category[];
  categoryMap: Map<string, Category>;
  categoryTree: CategoryTree[];
} => {
  const [categories, setCategories] = useState<Category[]>([]);
  const categoryMap = new Map<string, Category>();
  const categoryIdToSubCategories = new Map<string, Category[]>();
  categories.forEach((category) => {
    categoryMap.set(category._id, category);
    if (category?.parentCategoryId) {
      const arr =
        categoryIdToSubCategories.get(category?.parentCategoryId) || [];
      categoryIdToSubCategories.set(
        category?.parentCategoryId,
        [...arr, category].sort((a, b) => b.ranking - a.ranking)
      );
    }
  });

  const getSubCategoryTree = (id: string): CategoryTree[] => {
    const subCategories = categoryIdToSubCategories.get(id);
    if (!subCategories) {
      return [];
    }
    return subCategories.map((subCategory) => ({
      ...subCategory,
      subCategories: getSubCategoryTree(subCategory._id) || [],
    }));
  };

  const categoryTree: CategoryTree[] = categories
    .sort((a, b) => b.ranking - a.ranking)
    .filter((category) => category.parentCategoryId === null)
    .map((category) => ({
      ...category,
      subCategories: getSubCategoryTree(category._id),
    }));

  useEffect(() => {
    (async () => {
      const res = await fetch("https://api.aicenter.tw/category");
      const categories = await res.json();
      console.debug({ categories });
      setCategories(categories);
    })();
  }, []);
  console.debug({ categoryTree });

  return {
    categories,
    categoryMap,
    categoryTree,
  };
};
