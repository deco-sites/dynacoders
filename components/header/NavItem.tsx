import type { SiteNavigationElement } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";
import { headerHeight } from "./constants.ts";

function NavItem({ item }: { item: SiteNavigationElement }) {
    const { url, name, children, identifier } = item;
    const image = item?.image?.[0];

    return (
        <li className="group flex items-center relative">
            <a href={url} className="px-4 py-3">
                <span className="group-hover:underline">{name}</span>
                {/* Change */}
                {/* Check if the navItem have the blackFriday identifier to add the discount tag */}
                {identifier && identifier == "blackFriday" && (
                    <svg
                        className={"absolute top-1/3 -right-2"}
                        xmlns="http://www.w3.org/2000/svg"
                        width="20px"
                        height="20px"
                        viewBox="0 0 64 64"
                    >
                        <title />
                        <g id="price-down">
                            <path
                                class="fill-[#414042]"
                                d="M60.76,34.1A3.28,3.28,0,0,0,57.69,32H54V10a5,5,0,0,0-5-5H15a5,5,0,0,0-5,5V32H6.3a3.29,3.29,0,0,0-2.24,5.71L27.08,59A7.08,7.08,0,0,0,32,61h0a7,7,0,0,0,4.88-2l23-21.34A3.28,3.28,0,0,0,60.76,34.1Z"
                            />
                            <path
                                class="fill-[#231f20]"
                                d="M59.93,37.72l-23,21.34A7,7,0,0,1,32,61h0V5H49a5,5,0,0,1,5,5V32h3.69a3.3,3.3,0,0,1,2.24,5.72Z"
                            />
                            <path
                                class="fill-[#fff200]"
                                d="M38,33v1a6,6,0,0,1-6,6v1a2,2,0,0,1-4,0V40H27a2,2,0,0,1,0-4h5a2,2,0,0,0,2-2V33a2,2,0,0,0-2-2H30a6,6,0,0,1,0-12V18a2,2,0,0,1,4,0v1h1a2,2,0,0,1,0,4H30a2,2,0,0,0,0,4h2A6,6,0,0,1,38,33Z"
                            />
                            <path
                                class="fill-[#ffbe00]"
                                d="M37,21a2,2,0,0,0-2-2H34V18a2,2,0,0,0-2-2v7h3A2,2,0,0,0,37,21Z"
                            />
                            <path
                                class="fill-[#ffbe00]"
                                d="M32,27v4a2,2,0,0,1,2,2v1a2,2,0,0,1-2,2v4a6,6,0,0,0,6-6V33A6,6,0,0,0,32,27Z"
                            />
                        </g>
                    </svg>
                )}
                {/* changes end here */}
            </a>

            {children && children.length > 0 && (
                <div
                    className="fixed hidden hover:flex group-hover:flex bg-base-100 z-50 items-start justify-center gap-6 border-t border-b-2 border-base-200 w-screen"
                    style={{ top: "0px", left: "0px", marginTop: headerHeight }}
                >
                    {image?.url && (
                        <Image
                            className="p-6"
                            src={image.url}
                            alt={image.alternateName}
                            width={300}
                            height={332}
                            loading="lazy"
                        />
                    )}
                    <ul className="flex items-start justify-center gap-6">
                        {children.map((node) => (
                            <li className="p-6">
                                <a className="hover:underline" href={node.url}>
                                    <span>{node.name}</span>
                                </a>

                                <ul className="flex flex-col gap-1 mt-4">
                                    {node.children?.map((leaf) => (
                                        <li>
                                            <a
                                                className="hover:underline"
                                                href={leaf.url}
                                            >
                                                <span className="text-xs">
                                                    {leaf.name}
                                                </span>
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </li>
    );
}

export default NavItem;
