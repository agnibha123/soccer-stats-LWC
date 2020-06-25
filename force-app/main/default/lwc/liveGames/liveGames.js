import { LightningElement,track,api } from 'lwc';
import getLive from '@salesforce/apex/RestCallFiFA.getLiveGame';
export default class LiveGames extends LightningElement {
         jsonObj;
        data=[];
        
        showSpinner = false;
        showError = false;
        errorMessage;
        @track showspin=true
         league
        @api l
        defaultSortDirection = 'asc';
        sortDirection = 'asc';
        sortedBy;
        contacts;
        groupArrays
        dummy=true
    
        connectedCallback(){
            this.showSpinner = true;
            this.getData();
            
            
        }
       a=setInterval(() => {
        this.getData()
       }, 300000);
        
        getData(){
            getLive({le:this.l})
                .then(result => {
                    
                        this.jsonObj = JSON.parse(result); 
                        console.log('daaaataaaaa'+this.jsonObj.matches[0])
                        this.data=[...this.jsonObj.matches]
                        this.showSpinner = false
                        if(this.jsonObj.count===0)
                        {
                            this.dummy=false
                        }
                        
                })

            }













}