import { SendEventOnLoad } from "$store/components/Analytics.tsx";
import { Layout as CardLayout } from "$store/components/product/ProductCard.tsx";
import Filters from "$store/components/search/Filters.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import SearchControls from "$store/islands/SearchControls.tsx";
import { useOffer } from "$store/sdk/useOffer.ts";
import type { ProductListingPage } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import ProductGalleryBF, { Columns } from "./ProductGalleryBF.tsx";

export interface Layout {
    /**
     * @description Use drawer for mobile like behavior on desktop. Aside for rendering the filters alongside the products
     */
    variant?: "aside" | "drawer";
    /**
     * @description Number of products per line on grid
     */
    columns?: Columns;
}

export interface BlackFridayLayout {
    // Changes made by us start here
    /**
     * @title text color
     * @format color
     */
    flagTextColor?: string;
    /**
     * @title background color
     * @format color
     */
    flagColor?: string;
    // Changes made by us end here
}

export interface BlackFridayCountdownProd {
    /**
     * @title Product BlackFriday timer
     * @format datetime
     */
    countdown: string;
    /**
     * @title Product ID
     * @description Insert the ID of the product to have a countdown
     */
    prodID: string;
}

export interface BlackFriday {
    /**
     * @title Product ID
     * @description Insert the ID of the product to active the flag
     */
    layout?: BlackFridayLayout;
    /**
     * @title Global BlackFriday timer
     * @format datetime
     */
    countdown?: string;
    /**
     * @title Countdown Modal Product Time
     * @description Define a limit to show products that will expire in hours
     */
    countdownModalThreshold?: number;
    /**
     * @title Countdown per product
     * @description if product doesnt have a countdown it will get from global blackfriday timer
     */
    countdownProd?: BlackFridayCountdownProd[];
}

export interface Props {
    blackFriday?: BlackFriday;
    /** @title Integration */
    page: ProductListingPage | null;
    layout?: Layout;
    cardLayout?: CardLayout;
}

function NotFound() {
    return (
        <div class="w-full flex justify-center items-center py-10">
            <span>Not Found!</span>
        </div>
    );
}

function Result({
    page,
    layout,
    cardLayout,
    blackFriday,
}: Omit<Props, "page"> & { page: ProductListingPage }) {
    const { products, filters, breadcrumb, pageInfo, sortOptions } = page;
    const perPage = pageInfo.recordPerPage || products.length;
    const offset = pageInfo.currentPage * perPage;

    return (
        <>
            <div class="container px-4 sm:py-10">
                <SearchControls
                    sortOptions={sortOptions}
                    filters={filters}
                    breadcrumb={breadcrumb}
                    displayFilter={layout?.variant === "drawer"}
                />

                <div class="flex flex-row">
                    {layout?.variant === "aside" && filters.length > 0 && (
                        <aside class="hidden sm:block w-min min-w-[250px]">
                            <Filters filters={filters} />
                        </aside>
                    )}
                    <div class="flex-grow">
                        <ProductGalleryBF
                            products={products}
                            offset={offset}
                            layout={{
                                card: cardLayout,
                                columns: layout?.columns,
                                // changes starts here
                                flagTextColor:
                                    blackFriday?.layout?.flagTextColor,
                                flagColor: blackFriday?.layout?.flagColor,
                                // changes ends here
                            }}
                            countdown={blackFriday?.countdown}
                            countdownProd={blackFriday?.countdownProd}
                            countdownModalThreshold={
                                blackFriday?.countdownModalThreshold
                            }
                        />
                    </div>
                </div>

                <div class="flex justify-center my-4">
                    <div class="join">
                        <a
                            aria-label="previous page link"
                            rel="prev"
                            href={pageInfo.previousPage ?? "#"}
                            class="btn btn-ghost join-item"
                        >
                            <Icon id="ChevronLeft" size={24} strokeWidth={2} />
                        </a>
                        <span class="btn btn-ghost join-item">
                            Page {pageInfo.currentPage + 1}
                        </span>
                        <a
                            aria-label="next page link"
                            rel="next"
                            href={pageInfo.nextPage ?? "#"}
                            class="btn btn-ghost join-item"
                        >
                            <Icon id="ChevronRight" size={24} strokeWidth={2} />
                        </a>
                    </div>
                </div>
            </div>
            <SendEventOnLoad
                event={{
                    name: "view_item_list",
                    params: {
                        // TODO: get category name from search or cms setting
                        item_list_name: "",
                        item_list_id: "",
                        items: page.products?.map((product, index) =>
                            mapProductToAnalyticsItem({
                                ...useOffer(product.offers),
                                index: offset + index,
                                product,
                                breadcrumbList: page.breadcrumb,
                            })
                        ),
                    },
                }}
            />
        </>
    );
}

function SearchResult({ page, ...props }: Props) {
    if (!page) {
        return <NotFound />;
    }

    return <Result {...props} page={page} />;
}

export default SearchResult;
