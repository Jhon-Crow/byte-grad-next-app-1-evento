import {ImageResponse} from "next/og";
import H1 from "@/components/h1";

export const alt = "Evento";
export const size = {width: 1200, height: 630};
export const contentType = "image/png";

export default async function Image({params}: { params: { slug: string } }) {
    return new ImageResponse(
        <section>
            <H1>{params.slug}</H1>
            <p>Evento - Browse more than 10,000 events around you</p>
        </section>
    )
}