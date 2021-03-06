import Head from "next/head";
import Link from "next/link";
import Layout from "../../components/layout";

const FirstPost = () => (
    <Layout>
        <Head>
            <title>First Post</title>
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <h1>First Post</h1>
        <h2>
            <Link href="/">
                <a>Back to Home</a>
            </Link>
        </h2>
    </Layout>
);

export default FirstPost;
