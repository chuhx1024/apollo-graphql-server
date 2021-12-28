const express = require('express')
const { ApolloServer, gql } = require('apollo-server-express')

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

const app = express()

let apolloServer = null;
async function startServer() {
    apolloServer = new ApolloServer({ typeDefs, resolvers });
    await apolloServer.start();
    // 应用中间件 将 apollo-serve 和 express 集合起来
    apolloServer.applyMiddleware({ app });


    app.use( (req, res) => {
        res.status(200)
        res.send('Hello')
        res.end()
    })
    
    
    app.listen({ port: 4000 }, () => {
      console.log(`🚀  Server ready at http://localhost:4000${apolloServer.graphqlPath}`)
    })
}
startServer();





  
  
