const { ApolloServer, gql } = require('apollo-server');

// 定义 schema
const typeDefs = gql`
  type Book {
    title: String
    author: String
  }

  type Query {
    books: [Book]
  }
`

// 定义数据集
const books = [
    {
      title: 'The Awakening',
      author: 'Kate Chopin',
    },
    {
      title: 'City of Glass',
      author: 'Paul Auster',
    },
]

// 定义 resolvers(查询 schema 时会调用 resolvers)
const resolvers = {
    // 所有的 query 都走这里
    Query: {
      books: () => books,
    },
}

// 创建服务实例 启动项目 默认监听 4000 端口

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});

  
  
