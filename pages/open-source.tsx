/* eslint-disable react/jsx-no-comment-textnodes */
import style from "../styles/Project.module.scss";
import { motion } from "framer-motion";

import {
  ApolloClient,
  InMemoryCache,
  gql,
  createHttpLink,
} from "@apollo/client";

import { setContext } from "@apollo/client/link/context";

import { NextSeo } from "next-seo";

import { GITHUB_API_TOKEN } from "lib/constants";

const OpenSource = ({ pinnedItems }) => {
  return (
    <>
    <NextSeo
      title="Johnny's Place - Open-Source"
      description="Homepage for Johnny Dunn. Open-source works here."
    />
    <div className={style.project}>
      <div className={style.project_container}>
      <h1 className="text-1xl md:text-2xl lg:text-3xl font-bold tracking-tighter leading-tight md:pr-8">
      <span className="text-2xl md:text-2xl lg:text-3xl red-400 inline
      tracking-tighter leading-tight md:leading-none mb-12 text-center
      text-gray-400 mr-2">
      // 
      </span>Top Open-Source Projects on GitHub
      </h1>
        <div className={style.project_card_container}>
          {pinnedItems.map((item) => {
            return (
              <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {
                    scale: 0.8,
                    opacity: 0,
                  },
                  visible: {
                    scale: 1,
                    opacity: 1,
                    transition: {
                      delay: 0.2,
                    },
                  },
                }}
                className={style.project_card}
                whileHover={{
                  // transition: {
                  //   duration: 0.5,
                  // },
                  // filter: [
                  //   "hue-rotate(0)",
                  //   "hue-rotate(360deg)",
                  //   "hue-rotate(45deg)",
                  //   "hue-rotate(0)",
                  // ],
                }}
                key={item.id}
              >
                <div className={style.project_card_top}>
                  <div className={style.project_card_head}>
                    <div>
                      <p>{item.name}</p>
                    </div>
                    <div>
                      <span>⭐{item.stargazerCount}</span>
                    </div>
                  </div>
                  <div className={style.project_card_body}>
                    <p>{item.description}</p>
                  </div>
                </div>
                <div className={style.project_card_bottom}>
                  <div>
                    <a href={item.url} rel="noreferrer" target="_blank">
                      View on Github
                    </a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
    </>
  );
};

export async function getStaticProps() {
  const httpLink = createHttpLink({
    uri: "https://api.github.com/graphql",
  });

  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization: `Bearer ` + GITHUB_API_TOKEN,
      },
    };
  });

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

  const { data } = await client.query({
    query: gql`
      {
        user(login: "jddunn") {
          pinnedItems(first: 6) {
            totalCount
            edges {
              node {
                ... on Repository {
                  id
                  name
                  url
                  stargazerCount
                  description
                  forkCount
                }
              }
            }
          }
        }
      }
    `,
  });

  const { user } = data;
  const pinnedItems = user.pinnedItems.edges.map((edge) => edge.node);

  return {
    props: { pinnedItems },
  };
}

export default OpenSource;
