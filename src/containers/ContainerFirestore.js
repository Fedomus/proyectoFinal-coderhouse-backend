import * as admin from 'firebase-admin'
import { FIRESTORE_FILE } from '../../config/globals.js'
import * as FIRESTORE_PATH_FILE from FIRESTORE_FILE

admin.initializeApp({
  credential: admin.credential.cert(FIRESTORE_PATH_FILE)
});

const db = admin.firestore()

export class ContainerFirestore{

    constructor(collection){
      this.collection = db.collection(collection)
      console.log(`Base conectada con la colección ${collection}`)
    }

    async getAll(){
      let result = await this.collection.get()
      result = result.docs.map(doc => 
        { return doc.data() }
      )
      return result
    }

    async getById(id) {
      let doc = this.collection.doc(`${id}`)
      const item = await doc.get()
      const response = item.data()
      return response
    }

    async deleteById(id){
      let doc = this.collection.doc(`${id}`)
      let item = await doc.delete()
      return item
    }
  
    async updateById(id, content){
      let doc = this.collection.doc(`${id}`)
      let item = await doc.update(content)
      return item
    }

}

