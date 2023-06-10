export function discussionGql(categoryId) {
  return `{
      repository(name: "minhthuong-blog", owner: "minhthuong031103") {
        discussions(first: 100, categoryId: "${categoryId}") {
          nodes {
            title
            url
        number
            bodyHTML
            bodyText
            createdAt
            lastEditedAt
            author {
              login
              url
              avatarUrl
            }
    labels(first:100){
    nodes {
    name
    }
    }
          }
        }
      }
    }`;
}

export function discussionDetailGql(postId) {
  return `{
          repository(owner: "minhthuong031103", name: "minhthuong-blog"){
              discussion(number: ${postId}){
                  title
                  bodyHTML
                  createdAt
                  author {
                      login
                      url 
                      avatarUrl
                  }
              }
          }
  
      }`;
}
