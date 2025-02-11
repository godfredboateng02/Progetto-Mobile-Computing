import CommunicationController from "../model/CommunicationController";
import storage from "../model/storage";
import formattazione from "./formattazione";

export default class gestioneAccount {

    static async getUserData(){
        let risposta = await CommunicationController.getUserInfo();
        let userData = {};
        userData.Nome = risposta.firstName;
        userData.Cognome = risposta.lastName;
        if (risposta.cardFullName == null) {
            userData.Carta = null;
        } else {
            userData.Carta.Titolare = risposta.cardFullName;
            userData.Carta.Numero = risposta.cardNumber.slice(-4);
            userData.Carta.Mese = risposta.cardExpireMonth;
            userData.Carta.Anno = risposta.cardExpireYear;
        }

        return userData;
    }

    static async updateUserCard(card){
        let identity = await this.getUserData();
        let bodyParams = {
            cardFullName: card.Titolare,
            cardNumber: card.Numero,
            cardExpireMonth: card.Mese,
            cardExpireYear: card.Anno,
            cardCVV: card.Cvv,
            firstName: identity.Nome,
            lastName: identity.Cognome,
        }
        CommunicationController.putUserInfo(bodyParams);
    }

    static async updateUserName(identity){
        let dati = await CommunicationController.getUserInfo();
        let bodyParams = {
            cardFullName: dati.cardFullName,
            cardNumber: dati.cardNumber,
            cardExpireMonth: dati.cardExpireMonth,
            cardExpireYear: dati.cardExpireYear,
            cardCVV: dati.cardCVV,
            firstName: identity.Nome,
            lastName: identity.Cognome,
        }
        CommunicationController.putUserInfo(bodyParams);
    }



    static async lastOrderTime(){
        let oid = await storage.getOid();
        let risposta = await CommunicationController.getOrderStatus(oid);
        return formattazione.extractTime(risposta.creationTimestamp);
    }


}