import { LightningElement,track,api } from 'lwc';
import teams from '@salesforce/apex/RestCallFiFA.teams';
export default class TeamList extends LightningElement {

    jsonObj;
    data=[]
   // columns = columns;
    showSpinner = false;
    showError = false;
    errorMessage;
    @track showspin=true
    @api league
    @api l
    //sorting
    sortBy;
    sortDirection;

    connectedCallback(){
        this.showSpinner = true;
        this.getData();
    }

    //get getCovidSummaryData
    getData(){
        teams({le:this.l})
            .then(result => {
                
                if(result) { 
                    this.showSpinner = false;
                    this.data = [];
                    this.jsonObj = JSON.parse(result); 
                    this.data=[...this.jsonObj.teams]
                    console.log(this.jsonObj)
                }})}


}