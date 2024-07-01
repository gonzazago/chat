import moduleAlias from 'module-alias'
moduleAlias.addAliases({
    "@routes": `${__dirname}/routes`,
    "@config": `${__dirname}/config/`,
    "@domain": `${__dirname}/domain/entities/`,
    "@services": `${__dirname}/domain/services/`,
    "@repositories": `${__dirname}/infrastructure/repositories/`
})
import server from './server';
import connect from '@repositories/mongo';
const PORT = process.env.PORT || 3000


//connect to db
connect();
process.on("uncaughtException", (error: Error) => {
    console.error(`API has "uncaughtException" ${JSON.stringify(error)}`);
    process.exit(1);
})
process.on("unhandleRejection", (error: Error) => {
    console.error(`API has "unhandleRejection" ${JSON.stringify(error)}`);
    process.exit(1);
});
(async () => {
    try {

        server.listen(PORT, () => { console.log(`APP listen in http://localhost:${PORT}`) })
            .on("error", (error: Error & { code: string }) => {
                if (error.code === "EADDRINUSE") {
                    console.error(`API can't listen in the ${PORT}. The port is already in use`);
                } else {
                    console.error(`API can't start - ${JSON.stringify(error)}`);
                }
                process.exit(1)
            })
    } catch (error) {
        console.error(`API can't start - ${(error as Error).message}`);
    }

})();
