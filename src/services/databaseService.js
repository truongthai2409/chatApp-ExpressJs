const uri = `mongodb+srv://khnguyen0211:khnguyen0211@nguyencluster.9jtxhap.mongodb.net/?retryWrites=true&w=majority`
const { MongoClient, ServerApiVersion, Db, Collection } = require('mongodb')

class DatabaseService {
    client
    db
    constructor() {
        this.client = new MongoClient(uri, {
            serverApi: {
                version: ServerApiVersion.v1,
                strict: false,
                deprecationErrors: true
            }
        })
        this.db = this.client.db('ChatApp') //create database instance to connect
    }

    async connect() {
        try {
            await this.db.command({ ping: 1 })
            console.log('Pinged your deployment. You successfully connected to MongoDB!')
        } catch (err) {
            console.log('An error occurred', err)
            throw err
        }
    }

    get users() {
        return this.db.collection('users')
    }
}

module.exports = {
    dbService: new DatabaseService()
}
