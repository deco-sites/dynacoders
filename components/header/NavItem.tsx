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
