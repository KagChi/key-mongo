### key-mongo 
Easy to use mongodb wrapper, keyvalue usage.

### Installing
```
Yarn: yarn add key-mongo
Npm: npm install key-mongo
```

### Example usage:
```js
const { KeyMongo } = require('key-mongo');
const KeyClient = new KeyMongo({
    dbName: 'test',
    dbUrl: 'yOuR nIcE mOnGoDbUrL',
})
/** when already connected to database you can remove timeout */
setTimeout(() => {
    KeyClient.set('collection', 'user_1', { money: 20, premium: true } )
}, 3000)

```

