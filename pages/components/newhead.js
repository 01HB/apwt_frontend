import Head from "next/head";

export default function NewHead(props) {
    return (
        <>
            <Head>
                <title>{props.title}</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
        </>
    );
}
