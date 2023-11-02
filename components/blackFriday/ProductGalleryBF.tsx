import ProductCardBF from "$store/islands/ProductCardBF.tsx";
import { Layout as CardLayout } from "./ProductCardBF.tsx";
import { usePlatform } from "$store/sdk/usePlatform.tsx";
import { Product } from "apps/commerce/types.ts";

export interface Columns {
    mobile?: 1 | 2;
    desktop?: 2 | 3 | 4 | 5;
}

export interface Props {
    products: Product[] | null;
    offset: number;
    layout?: {
        card?: CardLayout;
        columns?: Columns;
        // Changes
        flagText?: string;
        flagTextColor?: string;
        flagColor?: string;
        // end of changes
    };
}

const MOBILE_COLUMNS = {
    1: "grid-cols-1",
    2: "grid-cols-2",
};

const DESKTOP_COLUMNS = {
    2: "sm:grid-cols-2",
    3: "sm:grid-cols-3",
    4: "sm:grid-cols-4",
    5: "sm:grid-cols-5",
};

function ProductGalleryBF({ products, layout, offset }: Props) {
    const platform = usePlatform();
    const mobile = MOBILE_COLUMNS[layout?.columns?.mobile ?? 2];
    const desktop = DESKTOP_COLUMNS[layout?.columns?.desktop ?? 4];

    return (
        <div class={`grid ${mobile} gap-2 items-center ${desktop} sm:gap-10`}>
            {products?.map((product, index) => (
                <ProductCardBF
                    // Changes
                    flagOn={true} // Active or not the flags. By default on in every product included on blackFriday promotion.
                    flagColor={layout?.flagColor} // Flag background color
                    flagText={layout?.flagText} // Flag text content
                    flagTextColor={layout?.flagTextColor} // Flag text color
                    // End of changes
                    product={product}
                    preload={index === 0}
                    index={offset + index}
                    layout={layout?.card}
                    platform={platform}
                />
            ))}
        </div>
    );
}

export default ProductGalleryBF;
