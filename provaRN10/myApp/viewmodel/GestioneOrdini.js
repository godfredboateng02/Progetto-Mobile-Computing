import DetailMenuView from "../components/DetailMenuView";
import CommunicationController from "../model/CommunicationController";
import osCall from "../model/osCall";
import App from "../App";


export default class GestioneOrdini{
    static async effettuaOrdine(mid){
        console.log("Acquisto effettuato");
        let posizione = await osCall.posizione()
        let ordine = await CommunicationController.postOrder(mid, posizione)
        let oid = ordine.oid
        console.log("\n\n\n", oid, "\n\n\n");
        //await dbMAnaager.salvaOrdine(oid)
        App.changePage('Homepage');

    }
}