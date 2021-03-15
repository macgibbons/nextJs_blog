import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import { getSortedPostsData } from '../lib/posts'
import Link from 'next/link'
import Date from '../components/date'
import { GetStaticProps } from 'next'

interface HomeProps {
    allPostsData: {
        date: string
        title: string
        id: string
      }[], 
      catData: {
          data: [ {
              fact: string,
              length: string
          }]
      }
}

export default function Home({
    allPostsData, 
    catData
  }: HomeProps) {
    const catFact = catData.data[0];
    return (
        <Layout home>
            <Head>
                <title>{siteTitle}</title>
            </Head>
            <section className={utilStyles.headingMd}>
                <p>This is an introduction</p>
                <p>
                    (This is a sample website - you’ll be building a site like this on{" "}
                    <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
                </p>
            </section>
            <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
                <h2 className={utilStyles.headingLg}>Cat Fact</h2>
                <ul className={utilStyles.list}>
                    <div>{catFact.fact}</div>
                </ul>
            </section>
            <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
                <h2 className={utilStyles.headingLg}>Blog</h2>
                <ul className={utilStyles.list}>
                    {allPostsData.map(({ id, date, title }) => (
                        <li className={utilStyles.listItem} key={id}>
                            <Link href={`/posts/${id}`}>
                                <a>{title}</a>
                            </Link>
                            <br />
                            <small className={utilStyles.lightText}>
                                <Date dateString={date} />
                            </small>
                        </li>
                    ))}
                </ul>
            </section>
        </Layout>
    );
}

async function getCatFact() {
    const res = await fetch("https://catfact.ninja/facts?limit=1&max_length=140");
    return res.json();
}

export const getStaticProps: GetStaticProps = async () => {
    const catData = await getCatFact();
    const allPostsData = getSortedPostsData()
    return {
      props: {
        allPostsData,
        catData,
      }
    }
  }