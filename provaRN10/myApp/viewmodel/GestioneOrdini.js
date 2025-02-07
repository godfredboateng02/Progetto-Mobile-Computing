import CommunicationController from "../model/CommunicationController";
import osCall from "../model/osCall";


export default class GestioneOrdini{
    static async effettuaOrdine(mid, setScreen){
        console.log("Acquisto effettuato");
        let posizione = await osCall.posizione()
        let ordine = await CommunicationController.postOrder(mid, posizione)
        let oid = ordine.oid
        console.log("\n\n\n", oid, "\n\n\n");
        //await dbMAnaager.salvaOrdine(oid)
        setScreen('Homepage');

    }
}