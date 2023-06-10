import { discussionDetailGql, discussionGql } from './gql';

const API_URL = 'https://api.github.com/graphql';
const access_token = process.env.GH_ACCESS_TOKEN;
const discussion_category_id = process.env.DISCUSSION_CATEGORY_ID;
export async function getBlogs() {
  const response = await fetch(API_URL, {
    next: { revalidate: 60 },
    method: 'POST',
    headers: {
      Authorization: `token ${access_token}`,
      'Content-type': 'application/json',
    },
    body: JSON.stringify({ query: discussionGql(discussion_category_id) }),
  });

  let res = await response.json();

  const discussions = res.data.repository.discussions.nodes;
  console.log(discussions);
  const posts = discussions.map((discussion) => {
    const {
      title,
      author,
      createdAt,
      lastEditedAt: lastEdited,
      number: id,
      bodyHTML: html,
      bodyText,
      labels,
      url: discussionUrl,
    } = discussion;
    const url = `/blog/${id}`;
    const authorUrl = author.url; //author la object gom login ten, url, avatar url;

    const authorName = author.login;
    const authorAvatar = author.avatarUrl;
    const tags = labels.nodes.map((tag) => {
      return tag.name;
    });
    const post = {
      id,
      url,
      discussionUrl,
      title,
      html,
      bodyText,
      tags,
      createdAt,
      lastEdited,
      author: { url: authorUrl, name: authorName, avatar: authorAvatar },
    };
    return post;
  });
  return posts;
}

export async function getBlogDetail(blogId) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      Authorization: `token ${access_token}`,
      'Content-type': 'application/json',
    },
    body: JSON.stringify({ query: discussionDetailGql(blogId) }),
  });

  let res = await response.json();
  let discussion = res.data.repository.discussion;
  const {
    author: { url: authorUrl, login: authorName, avatarUrl: authorAvatar },
    createdAt,
    title: title,
    bodyHTML: html,
  } = discussion;

  const detail = {
    author: { url: authorUrl, name: authorName, avatar: authorAvatar },
    createdAt,
    title,
    bodyHTML: html,
  };
  return detail;
}
