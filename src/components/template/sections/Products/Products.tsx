import type { ProductsSectionConfig } from "@/types/site-config";
import ProductsVariant0 from "./ProductsVariant0";
import ProductsVariant1 from "./ProductsVariant1";

interface Props {
  config: ProductsSectionConfig;
}

/** Dispatcher — picks the right Products variant */
export default function Products({ config }: Props) {
  switch (config.variant) {
    case 0:
      return <ProductsVariant0 config={config} />;
    case 1:
      return <ProductsVariant1 config={config} />;
    default:
      return <ProductsVariant0 config={config} />;
  }
}
