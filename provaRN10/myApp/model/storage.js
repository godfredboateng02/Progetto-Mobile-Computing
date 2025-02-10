import { AsyncStorage } from 'react-native';
import CommunicationController from './CommunicationController';
import DB from './DB';
export default class Storage {
    static sid = null
    static uid = null
    static oid = null
    

    static async getSid(){
        if (this.sid != null){
            return this.sid
        }
        let sid = await AsyncStorage.getItem('sid')
        if (sid != null){
            this.sid = sid
            return this.sid
        }
        await registrazione()
        await getSid()
    }

    static async getUid(){
        if (this.uid != null){
            return this.uid
        }
        let uid = await AsyncStorage.getItem('uid')
        if (uid != null){
            this.uid = uid
            return this.uid
        }
        await registrazione()
        await getUid()
    }

    static async registrazione(){
        let credenziali = await CommunicationController.signUp()
        this.sid = credensiali.sid
        this.uid = credenziali.uid
        await AsyncStorage.setItem('sid', this.sid)
        await AsyncStorage.setItem('uid', this.uid)
    }

    static async getOid(){
        if (this.oid == null){
            this.oid = await AsyncStorage.getItem('oid')
        }
        return this.oid
    }

    static async getImage(mid, version) {
        let image = await DB.getImage(mid, version)
        if (image == "NOT_FOUND"){
            // image = await CommunicationController.getMenuImage(mid)
            image = await this.immagine(mid)    
            console.log("presa da rete")   
            await DB.addImage(mid, version, image)
        }else if (image == "VERSION_MISMATCH"){
            // image = await CommunicationController.getMenuImage(mid)
            image = await this.immagine(mid)    
            console.log("presa da rete")   
            await DB.updateImage(mid, version, image)
        }
        return image
    }
    static async immagine(mid) {return "ciaone"}
}