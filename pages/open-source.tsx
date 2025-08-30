/* eslint-disable react/jsx-no-comment-textnodes */
import style from "../styles/Project.module.scss";
import repoStyles from "../styles/GitHubRepo.module.scss";
import { motion } from "framer-motion";
import GitHubRepoCard from "../components/GitHubRepoCard";

import {
  ApolloClient,
  InMemoryCache,
  gql,
  createHttpLink,
} from "@apollo/client";

import { setContext } from "@apollo/client/link/context";

import { NextSeo } from "next-seo";

import { GH_API_TOKEN } from "lib/constants";

const OpenSource = ({ pinnedItems, error }) => {
  return (
    <>
    <NextSeo
      title="Johnny's Place - Open-Source"
      description="Homepage for Johnny Dunn. Open-source works here."
    />
    <div className={style.project}>
      <div className={style.project_container}>
      <section className={style.introSection}>
        <h1 className={style.pageTitle}>
          <span className={style.firstLetter} data-letter="O">O</span>pen-Source
        </h1>
        <p className={style.subtitle}>
          Top Projects on GitHub
        </p>
      </section>
        
        {/* API Info Card */}
        {!error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className={repoStyles.apiInfoCard}
          >
            <div className={repoStyles.apiInfoIcon}>🔄</div>
            <div className={repoStyles.apiInfoContent}>
              <p className={repoStyles.apiInfoText}>
                This page content is automatically fetched from the GitHub API using GraphQL and Apollo Client.
                Data is refreshed every time the site is updated.
              </p>
            </div>
          </motion.div>
        )}
        
        {error ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={repoStyles.errorContainer}
          >
            <div className={repoStyles.errorCard}>
              <div className={repoStyles.errorIcon}>🔗</div>
              <h2 className={repoStyles.errorTitle}>GitHub Integration Not Connected</h2>
              <p className={repoStyles.errorMessage}>
                GitHub repositories are not available at build time. 
                To enable this feature, please set the GH_API_TOKEN environment variable.
              </p>
              <div className={repoStyles.errorHelp}>
                <p>You can create a GitHub personal access token at:</p>
                <a 
                  href="https://github.com/settings/tokens" 
                  target="_blank" 
                  rel="noreferrer"
                  className={repoStyles.errorLink}
                >
                  GitHub Settings → Personal Access Tokens
                  <span className={repoStyles.external}>↗</span>
                </a>
              </div>
            </div>
          </motion.div>
        ) : (
          <>
            {/* Repository Statistics Overview */}
            {pinnedItems && pinnedItems.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={repoStyles.statsOverview}
              >
                <h2 className={repoStyles.statsTitle}>
                  <span className={repoStyles.statsIcon}>📊</span>
                  Repository Overview
                </h2>
                <div className={repoStyles.statsGrid}>
                  <div className={repoStyles.overviewCard}>
                    <span className={repoStyles.overviewLabel}>Total Repositories</span>
                    <span className={repoStyles.overviewValue}>{pinnedItems.length}</span>
                  </div>
                  <div className={repoStyles.overviewCard}>
                    <span className={repoStyles.overviewLabel}>Total Stars</span>
                    <span className={repoStyles.overviewValue}>
                      {pinnedItems.reduce((sum, repo) => sum + repo.stargazerCount, 0)}
                    </span>
                  </div>
                  <div className={repoStyles.overviewCard}>
                    <span className={repoStyles.overviewLabel}>Total Forks</span>
                    <span className={repoStyles.overviewValue}>
                      {pinnedItems.reduce((sum, repo) => sum + repo.forkCount, 0)}
                    </span>
                  </div>
                  <div className={repoStyles.overviewCard}>
                    <span className={repoStyles.overviewLabel}>Primary Languages</span>
                    <span className={repoStyles.overviewValue}>
                      {new Set(pinnedItems.map(repo => repo.primaryLanguage?.name).filter(Boolean)).size}
                    </span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Repository Cards Grid */}
            <div className={repoStyles.repoGrid}>
              {pinnedItems.map((repo, index) => (
                <GitHubRepoCard key={repo.id} repo={repo} index={index} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
    </>
  );
};

export async function getStaticProps() {
  // Check if GitHub token is available
  if (!GH_API_TOKEN || GH_API_TOKEN.length === 0) {
    console.log('No GitHub API token found, returning empty pinnedItems');
    return {
      props: { 
        pinnedItems: [],
        error: 'No GitHub API token configured'
      },
    };
  }

  try {
    const httpLink = createHttpLink({
      uri: "https://api.github.com/graphql",
    });

    const authLink = setContext((_, { headers }) => {
      return {
        headers: {
          ...headers,
          authorization: `Bearer ` + GH_API_TOKEN,
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
                    primaryLanguage {
                      name
                      color
                    }
                    languages(first: 5) {
                      edges {
                        node {
                          name
                          color
                        }
                        size
                      }
                      totalSize
                    }
                    createdAt
                    updatedAt
                    homepageUrl
                    openGraphImageUrl
                    isArchived
                    topics: repositoryTopics(first: 5) {
                      nodes {
                        topic {
                          name
                        }
                      }
                    }
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
      props: { pinnedItems, error: null },
    };
  } catch (error) {
    console.error('Error fetching GitHub data:', error);
    return {
      props: { 
        pinnedItems: [],
        error: 'Failed to fetch GitHub repositories'
      },
    };
  }
}

export default OpenSource;