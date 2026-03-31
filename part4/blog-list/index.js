const http = require('http')
const config = require('./utils/config')
const logger = require('./utils/logger')

// 这一行有必要，因为它会执行 utils/config.js 中的代码，连接到 MongoDB 数据库
require('./utils/config')
require('./models/blog')
const app = require('./app')
const server = http.createServer(app)

server.listen(config.PORT, () => {
    logger.info(`Server running on port ${config.PORT}`)
})