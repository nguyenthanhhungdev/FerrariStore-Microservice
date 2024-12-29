import app  from './app';
import config from './configs/config.app';
import logger from './utils/logger';


if(process.env.NODE_ENV === 'production') {
    require('dotenv').config({ path: 'product.env' });
} else {
    require('dotenv').config({ path: 'developer.env' });
}

const server = app.listen(config.server.port, () => {
    logger.info(`Server listening on ${config.server.port}`)
});

process.on("SIGINT", () => {
    server.close(() => {
        logger.info("Server closed");
        process.exit(0);
    })
})

export default server;
