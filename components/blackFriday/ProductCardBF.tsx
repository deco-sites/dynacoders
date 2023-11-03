import type { Platform } from "$store/apps/site.ts";
import { SendEventOnClick } from "$store/components/Analytics.tsx";
import Avatar from "$store/components/ui/Avatar.tsx";
import WishlistButton from "$store/islands/WishlistButton.tsx";
import { formatPrice } from "$store/sdk/format.ts";
import { useOffer } from "$store/sdk/useOffer.ts";
import { useVariantPossibilities } from "$store/sdk/useVariantPossiblities.ts";
import type { Product } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import Image from "apps/website/components/Image.tsx";
import ProductCountdownBF from "$store/islands/ProductCountdownBF.tsx";
import { BlackFridayCountdownProd } from "./SearchResultBF.tsx";

export interface Layout {
    basics?: {
        contentAlignment?: "Left" | "Center";
        oldPriceSize?: "Small" | "Normal";
        ctaText?: string;
    };
    elementsPositions?: {
        skuSelector?: "Top" | "Bottom";
        favoriteIcon?: "Top right" | "Top left";
    };
    hide?: {
        productName?: boolean;
        productDescription?: boolean;
        allPrices?: boolean;
        installments?: boolean;
        skuSelector?: boolean;
        cta?: boolean;
    };
    onMouseOver?: {
        image?: "Change image" | "Zoom image";
        card?: "None" | "Move up";
        showFavoriteIcon?: boolean;
        showSkuSelector?: boolean;
        showCardShadow?: boolean;
        showCta?: boolean;
    };
}

interface Props {
    product: Product;
    /** Preload card image */
    preload?: boolean;

    /** @description used for analytics event */
    itemListName?: string;

    /** @description index of the product card in the list */
    index?: number;

    layout?: Layout;
    platform?: Platform;
    // Changes
    flagColor?: string;
    flagTextColor?: string;
    countdown?: string;
    countdownDefaultColor?: string;
    countdownLessDay?: string;
    countdownLessHour?: string;
    countdownProd?: BlackFridayCountdownProd[];
    // end of changes
}

const relative = (url: string) => {
    const link = new URL(url);
    return `${link.pathname}${link.search}`;
};

const WIDTH = 200;
const HEIGHT = 279;

function ProductCardBF({
    product,
    preload,
    itemListName,
    layout,
    platform,
    index,
    // Changes
    flagColor,
    flagTextColor,
    countdown,
    countdownDefaultColor,
    countdownLessDay,
    countdownLessHour,
    countdownProd,
}: // end of hanges
Props) {
    const {
        url,
        productID,
        name,
        image: images,
        offers,
        isVariantOf,
    } = product;
    const id = `product-card-${productID}`;
    const hasVariant = isVariantOf?.hasVariant ?? [];
    const productGroupID = isVariantOf?.productGroupID;
    const description = product.description || isVariantOf?.description;
    const [front, back] = images ?? [];
    const { listPrice, price, installments } = useOffer(offers);
    const possibilities = useVariantPossibilities(hasVariant, product);
    const variants = Object.entries(Object.values(possibilities)[0] ?? {});

    const l = layout;
    const align =
        !l?.basics?.contentAlignment || l?.basics?.contentAlignment == "Left"
            ? "left"
            : "center";
    const skuSelector = variants.map(([value, link]) => (
        <li>
            <a href={link}>
                <Avatar
                    variant={
                        link === url ? "active" : link ? "default" : "disabled"
                    }
                    content={value}
                />
            </a>
        </li>
    ));
    const cta = (
        <a
            href={url && relative(url)}
            aria-label="view product"
            class="btn border-0 bg-orange-400 text-white hover:bg-orange-500"
        >
            {l?.basics?.ctaText || "Ver produto"}
        </a>
    );

    const productCountdown =
        countdownProd &&
        countdownProd.find(
            (el: BlackFridayCountdownProd) => el.prodID == productID
        )
            ? countdownProd.find(
                  (el: BlackFridayCountdownProd) => el.prodID == productID
              )?.countdown
            : countdown;

    return (
        <div
            id={id}
            class={`card card-compact overflow-hidden group w-full xl:w-3/4 ${
                align === "center" ? "text-center" : "text-start"
            } ${l?.onMouseOver?.showCardShadow ? "lg:hover:card-bordered" : ""}
        ${
            l?.onMouseOver?.card === "Move up" &&
            "duration-500 transition-translate ease-in-out md:hover:-translate-y-2"
        }
      `}
            data-deco="view-product"
        >
            <div className="flex items-center text-xs sm:text-sm bg-orange-400 font-bold text-white px-3 py-1 rounded-full absolute z-10 top-1 left-1">
                <span>
                    {/* Print out the discount percentage, using math.round to avoid long numbers */}
                    {listPrice &&
                        price &&
                        `- ${Math.round(
                            ((listPrice - price) * 100) / listPrice
                        )}% `}
                </span>
            </div>
            <div
                style={{
                    background: flagColor ?? "#0F0F0F",
                    color: flagTextColor ?? "#FFFFFF",
                }}
                class={`absolute left-[29%] top-[8%] z-[1] flex h-fit w-full rotate-45 items-center justify-center`}
            >
                <div class="flex w-full justify-center py-1">
                    {/* Display the text based on the discount percentage */}
                    {/* {formatPrice(listPrice, offers?.priceCurrency)} */}
                    {/* {formatPrice(price, offers?.priceCurrency)} */}
                    {listPrice && price && (
                        <div class="flex items-end text-[0.60rem] gap-1 2xl:text-[0.65rem] tracking-wide font-semibold">
                            <span>BLACK FRIDAY</span>
                            <svg
                                width="13"
                                height="13"
                                viewBox="0 0 16 16"
                                fill="white"
                                xmlns="https://www.w3.org/2000/svg"
                            >
                                <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M2 1C1.73478 1 1.48043 1.10536 1.29289 1.29289C1.10536 1.48043 1 1.73478 1 2V6.586C1.00006 6.8512 1.10545 7.10551 1.293 7.293L8.293 14.293C8.48053 14.4805 8.73484 14.5858 9 14.5858C9.26517 14.5858 9.51947 14.4805 9.707 14.293L14.293 9.707C14.4805 9.51947 14.5858 9.26517 14.5858 9C14.5858 8.73484 14.4805 8.48053 14.293 8.293L7.293 1.293C7.10551 1.10545 6.8512 1.00006 6.586 1H2ZM6 4.5C6 4.89783 5.84197 5.27936 5.56066 5.56066C5.27936 5.84197 4.89783 6 4.5 6C4.10218 6 3.72064 5.84197 3.43934 5.56066C3.15804 5.27936 3 4.89783 3 4.5C3 4.10218 3.15804 3.72064 3.43934 3.43934C3.72064 3.15804 4.10218 3 4.5 3C4.89783 3 5.27936 3.15804 5.56066 3.43934C5.84197 3.72064 6 4.10218 6 4.5Z"
                                    className={"fill-yellow-300"}
                                ></path>
                            </svg>
                        </div>
                    )}
                </div>
            </div>
            <SendEventOnClick
                id={id}
                event={{
                    name: "select_item" as const,
                    params: {
                        item_list_name: itemListName,
                        items: [
                            mapProductToAnalyticsItem({
                                product,
                                price,
                                listPrice,
                                index,
                            }),
                        ],
                    },
                }}
            />
            <figure
                class="relative overflow-hidden"
                style={{ aspectRatio: `${WIDTH} / ${HEIGHT}` }}
            >
                {/* Product Images */}
                <a
                    href={url && relative(url)}
                    aria-label="view product"
                    class="grid grid-cols-1 grid-rows-1 w-full"
                >
                    <Image
                        src={front.url!}
                        alt={front.alternateName}
                        width={WIDTH}
                        height={HEIGHT}
                        class={`bg-base-100 col-span-full row-span-full rounded w-full ${
                            l?.onMouseOver?.image == "Zoom image"
                                ? "duration-100 transition-scale scale-100 lg:group-hover:scale-110"
                                : ""
                        }`}
                        sizes="(max-width: 640px) 50vw, 20vw"
                        preload={preload}
                        loading={preload ? "eager" : "lazy"}
                        decoding="async"
                    />
                    {(!l?.onMouseOver?.image ||
                        l?.onMouseOver?.image == "Change image") && (
                        <Image
                            src={back?.url ?? front.url!}
                            alt={back?.alternateName ?? front.alternateName}
                            width={WIDTH}
                            height={HEIGHT}
                            class="bg-base-100 col-span-full row-span-full transition-opacity rounded w-full opacity-0 lg:group-hover:opacity-100"
                            sizes="(max-width: 640px) 50vw, 20vw"
                            loading="lazy"
                            decoding="async"
                        />
                    )}
                </a>
                <figcaption
                    class={`
          absolute bottom-1 left-0 w-full flex flex-col gap-3 p-2 ${
              l?.onMouseOver?.showSkuSelector || l?.onMouseOver?.showCta
                  ? "transition-opacity opacity-0 lg:group-hover:opacity-100"
                  : "lg:hidden"
          }`}
                >
                    {/* SKU Selector */}
                    {l?.onMouseOver?.showSkuSelector && (
                        <ul class="flex justify-center items-center gap-2 w-full">
                            {skuSelector}
                        </ul>
                    )}
                    {l?.onMouseOver?.showCta && cta}
                </figcaption>
            </figure>
            {/* Prices & Name */}
            <div class="flex-auto flex flex-col p-2 gap-3 lg:gap-4">
                {/* SKU Selector */}
                {(!l?.elementsPositions?.skuSelector ||
                    l?.elementsPositions?.skuSelector === "Top") && (
                    <>
                        {l?.hide?.skuSelector ? (
                            ""
                        ) : (
                            <ul
                                class={`flex items-center gap-2 w-full overflow-auto p-3 ${
                                    align === "center"
                                        ? "justify-center"
                                        : "justify-start"
                                } ${
                                    l?.onMouseOver?.showSkuSelector
                                        ? "lg:hidden"
                                        : ""
                                }`}
                            >
                                {skuSelector}
                            </ul>
                        )}
                    </>
                )}

                {l?.hide?.productName && l?.hide?.productDescription ? (
                    ""
                ) : (
                    <div class="flex flex-col gap-0">
                        {l?.hide?.productName ? (
                            ""
                        ) : (
                            <h2
                                class="truncate text-base lg:text-lg text-base-content"
                                dangerouslySetInnerHTML={{ __html: name ?? "" }}
                            />
                        )}
                        {l?.hide?.productDescription ? (
                            ""
                        ) : (
                            <div
                                class="truncate text-sm lg:text-sm text-neutral"
                                dangerouslySetInnerHTML={{
                                    __html: `${productID} ${description}` ?? "",
                                }}
                            />
                        )}
                    </div>
                )}
                {l?.hide?.allPrices ? (
                    ""
                ) : (
                    <div class="flex flex-col gap-2">
                        <div
                            class={`flex flex-col gap-0 ${
                                l?.basics?.oldPriceSize === "Normal"
                                    ? "lg:flex-row lg:gap-2"
                                    : ""
                            } ${
                                align === "center"
                                    ? "justify-center"
                                    : "justify-start"
                            }`}
                        >
                            <div
                                class={`line-through text-base-300 text-xs ${
                                    l?.basics?.oldPriceSize === "Normal"
                                        ? "lg:text-xl"
                                        : ""
                                }`}
                            >
                                {formatPrice(listPrice, offers?.priceCurrency)}
                            </div>
                            <div class="text-base text-orange-700 lg:text-xl">
                                {formatPrice(price, offers?.priceCurrency)}
                            </div>
                        </div>
                        {l?.hide?.installments ? (
                            ""
                        ) : (
                            <div class="text-base-300 text-sm lg:text-base truncate">
                                ou {installments}
                            </div>
                        )}
                    </div>
                )}

                {/* SKU Selector */}
                {l?.elementsPositions?.skuSelector === "Bottom" && (
                    <>
                        {l?.hide?.skuSelector ? (
                            ""
                        ) : (
                            <ul
                                class={`flex items-center gap-2 w-full ${
                                    align === "center"
                                        ? "justify-center"
                                        : "justify-start"
                                } ${
                                    l?.onMouseOver?.showSkuSelector
                                        ? "lg:hidden"
                                        : ""
                                }`}
                            >
                                {skuSelector}
                            </ul>
                        )}
                    </>
                )}
                {countdown && (
                    <ProductCountdownBF
                        countdown={productCountdown ?? countdown}
                        countdownDefaultColor={countdownDefaultColor}
                        countdownLessDay={countdownLessDay}
                        countdownLessHour={countdownLessHour}
                    />
                )}

                {!l?.hide?.cta ? (
                    <div
                        class={`flex-auto flex items-end ${
                            l?.onMouseOver?.showCta ? "lg:hidden" : ""
                        }`}
                    >
                        {cta}
                    </div>
                ) : (
                    ""
                )}
            </div>
        </div>
    );
}

export default ProductCardBF;
