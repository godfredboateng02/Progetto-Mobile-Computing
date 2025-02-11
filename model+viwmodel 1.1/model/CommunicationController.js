import storage from "./storage";
import location from "./location";

export default class CommunicationController {
    static BASE_URL = "https://develop.ewlab.di.unimi.it/mc/2425/";    
  
    static async genericRequest(endpoint, verb, queryParams, bodyParams) {
      console.log("genericRequest called");
  
      const queryParamsFormatted = new URLSearchParams(queryParams).toString();
      const url = this.BASE_URL + endpoint + "?" + queryParamsFormatted;
  
      console.log("Sending " + verb + " request to: " + url);
  
      let fetchData = {
        method: verb,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      };

      if (verb !== "GET") {
        fetchData.body = JSON.stringify(bodyParams);
      }
  
      let httpResponse;
      try {
        httpResponse = await fetch(url, fetchData);
      } catch (error) {
        // This means that the fetch request failed.
        // The request could not be sent or the server did not respond.
        console.error("Error during fetch request: ", error);
        throw error;
      }
  
      const status = httpResponse.status;
      console.log("HTTP response status: ", status);
      if (status === 200) {
        // 200 means that the request was successful.
        // The server responded with the data requested in JSON format.
        let deserializedObject = await httpResponse.json();
        return deserializedObject;
      } else if (status === 204) {
        // 204 means that the server has successfully processed the request
        // but that there is no content to send back.
        return null;
      } else {
        // The server responded with an error status.
        const errorObject = await httpResponse.json();
        console.error("Error message from the server:", errorObject);
        throw errorObject;
      }
    }
  
    static async genericGetRequest(endpoint, queryParams) {
      console.log("genericGetRequest called");
      return await this.genericRequest(endpoint, "GET", queryParams, {});
    }

    static async signUp(){
      let endpoint = "user"
      return await this.genericRequest(endpoint, "POST", {}, {})
    }
  
    static async getUserInfo(){
        let endpoint = "user/" + await storage.getUid();
        let queryParams = { sid: await storage.getSid() };
        //console.log("getUserInfo called with endpoint: ",endpoint, " and queryParams: ", queryParams);
        return await this.genericGetRequest(endpoint, queryParams);
    }

    static async putUserInfo(bodyParams){
        let endpoint = "user/" + await storage.getUid();
        let queryParams = {sid: await storage.getSid(), firstName: bodyParams.firstName, lastName: bodyParams.lastName, cardFullName: bodyParams.cardFullName, cardNumber: bodyParams.cardNumber, cardExpireMonth: bodyParams.cardExpireMonth, cardExpireYear: bodyParams.cardExpireYear, cardCVV: bodyParams.cardCVV, orderStatus: bodyParams.orderStatus};
        //console.log("putUserInfo called with endpoint: ",endpoint, " and queryParams: ", queryParams);
        return await this.genericRequest(endpoint, "PUT", queryParams, bodyParams);
    }

    static async getMenus(){
        let endpoint = "menu";
        let queryParams = { sid: await storage.getSid(), lat: location.getLat(), lng: location.getLng() };
        //console.log("getMenus called with endpoint: ",endpoint, " and queryParams: ", queryParams);
        return await this.genericGetRequest(endpoint, queryParams);
    }

    static async getMenuImage(mid){
        let endpoint = "menu/" + mid + "/image";
        let queryParams = { sid: await storage.getSid(), mid: mid };
        //console.log("getMenuImage called with endpoint: ",endpoint, " and queryParams: ", queryParams);
        return await this.genericGetRequest(endpoint, queryParams);
    }

    static async getMenuDetails(mid){
      let endpoint = "menu/"+mid
      let queryParams = {sid: await storage.getSid(), lat: location.getLat(), lng: location.getLng() , mid: this.mid }
      //console.log("getMenuDetails called with endpoint: ",endpoint," and queryParams: ",queryParams);
      return await this.genericGetRequest(endpoint,queryParams)
    }

    static async postOrder(mid){
      let endpoint = "menu/"+mid+"/buy"
      let queryParams = {mid}
      let bodyParams = {sid: await storage.getSid(), deliveryLocation: {lat: location.getLat(true), lng: location.getLng(true)}}
      return await this.genericRequest(endpoint, "POST", queryParams, bodyParams)
    }
    static async getOrderStatus(oid){
      let endpoint = "order/" + oid 
      let queryParams = { sid: await storage.getSid(), oid: oid };
     // console.log("getMenuImage called with endpoint: ",endpoint, " and queryParams: ", queryParams);
      return await this.genericGetRequest(endpoint, queryParams);
  }


  }

  
  