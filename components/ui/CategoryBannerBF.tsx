import { Picture, Source } from "apps/website/components/Picture.tsx";
import CountdownBanner from "$store/islands/CountdownBanner.tsx";
import type { SectionProps } from "deco/types.ts";
import type { ImageWidget } from "apps/admin/widgets.ts";

/**
 * @titleBy matcher
 */
export interface Banner {
    /** @description RegExp to enable this banner on the current URL. Use /feminino/* to display this banner on feminino category  */
    matcher: string;
    /** @description text to be rendered on top of the image */
    title?: string;
    /** @description text to be rendered on top of the image */
    subtitle?: string;
    image: {
        /** @description Image for big screens */
        desktop: ImageWidget;
        /** @description Image for small screens */
        mobile: ImageWidget;
        /** @description image alt text */
        alt?: string;
    };
}

const DEFAULT_PROPS = {
    banners: [
        {
            image: {
                mobile: "https://images.unsplash.com/photo-1651833826115-7530e72ce504?auto=format&fit=crop&q=80&w=2160&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                desktop:
                    "https://images.unsplash.com/photo-1651833826115-7530e72ce504?auto=format&fit=crop&q=80&w=2160&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                alt: "a",
            },
            title: "Black Friday",
            matcher: "/blackfriday",
            subtitle: "Descontos imperdíveis!",
        },
    ],
};

function Banner(props: SectionProps<ReturnType<typeof loader>>) {
    const { banner } = props;
    const { countdown, timer } = props.props;

    if (!banner) {
        return null;
    }

    const { title, subtitle, image } = banner;

    return (
        <div class="grid grid-cols-1 grid-rows-1">
            <Picture
                preload
                class="col-start-1 col-span-1 row-start-1 row-span-1"
            >
                <Source
                    src={image.mobile}
                    width={360}
                    height={120}
                    media="(max-width: 767px)"
                />
                <Source
                    src={image.desktop}
                    width={1440}
                    height={200}
                    media="(min-width: 767px)"
                />
                <img
                    class="w-full"
                    src={image.desktop}
                    alt={image.alt ?? title}
                />
            </Picture>

            <div class="container flex flex-col items-center justify-center sm:items-start col-start-1 col-span-1 row-start-1 row-span-1 w-full">
                <h1>
                    <span class="text-5xl font-medium text-base-100">
                        {title}
                    </span>
                </h1>
                <h2>
                    <span class="text-xl font-medium text-base-100">
                        {subtitle}
                    </span>
                </h2>
                {timer && countdown && (
                    <CountdownBanner timer={timer} initialDate={countdown} />
                )}
            </div>
        </div>
    );
}

export interface Props {
    banners?: Banner[];
    /**
     * @title Expires at date
     * @format datetime
     */
    countdown?: string;
    timer?: boolean;
}

export const loader = (props: Props, req: Request) => {
    const { banners } = { ...DEFAULT_PROPS, ...props };

    const banner = banners.find(({ matcher }) =>
        new URLPattern({ pathname: matcher }).test(req.url)
    );
    return { banner, props };
};

export default Banner;
