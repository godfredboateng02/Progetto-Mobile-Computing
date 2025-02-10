import CommunicationController from "../model/CommunicationController";



export default class GestioneOrdini{
    static async effettuaOrdine(mid){
        console.log("Acquisto effettuato");
        let ordine = await CommunicationController.postOrder(mid)
        let oid = ordine.oid
        console.log("\n\n\n", oid, "\n\n\n");
    }
}