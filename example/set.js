const { KeyMongo } = require('key-mongo');
const KeyClient = new KeyMongo({
    dbName: 'test',
    dbUrl: 'yOuR nIcE mOnGoDbUrL',
})
/** when already connected to database you can remove timeout */
setTimeout(() => {
    KeyClient.set('currency', 'user_1', { money: 20, premium: true } )
}, 3000)

