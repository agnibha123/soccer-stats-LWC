import { LightningElement,track,api } from 'lwc';
import getScorrer from '@salesforce/apex/RestCallFiFA.getScorer';

const columns = [
    // { label: 'Icon', fieldName: 'icon', type: 'SVG', cellAttributes: { alignment: 'left' } },
     {
         label: 'Team',
         fieldName: 'Team',
         type: 'text',
        
        
     },
     {
         label: 'Player',
         fieldName: 'Player',
         type: 'text',
         
         cellAttributes: { alignment: 'left' }
        
     },
     {
         label: 'Goals',
         fieldName: 'Goals',
         type: 'number',
         sortable: "true",
         cellAttributes: { alignment: 'left' }
        
     }
    ]

export default class TopScorrer extends LightningElement {

    jsonObj;
    data;
    columns = columns;
    showSpinner = false;
    showError = false;
    errorMessage;
    @track showspin=true
     league
    @api l
    defaultSortDirection = 'asc';
    sortDirection = 'asc';
    sortedBy;


    connectedCallback(){
        this.showSpinner = true;
        this.getData();
    }


    getData(){
        getScorrer({le:this.l})
            .then(result => {
                this.showSpinner =false;
                if(result) { 
                    this.showSpinner =false;
                    this.data = [];
                    this.jsonObj = JSON.parse(result); 
                    console.log(this.jsonObj.scorers.length)
                    for(let i = 0; i < this.jsonObj.scorers.length; i++){
                       // let Res = this.jsonObj.Countries[i];

                        //let covidStatusVal = 'slds-text-color_success';
                       
                        //format each row & push it into the data
                        let row = {
                            Team : this.jsonObj.scorers[i].team.name,
                            Player : this.jsonObj.scorers[i].player.name,
                            Goals : this.jsonObj.scorers[i].numberOfGoals,
                           
                        //    icon:this.jsonObj.standings[0].table[i].team.crestURI
                            //Crest:this.jsonObj.standings[0].table[i].team.crestURI
                        }
                        //console.log('crest--->'+this.jsonObj.standings[0].table[0].team.crestURI)
                            this.data.push(row); // Summary Table data values
                        
                    }
                    this.showSpinner = false;
                    this.showError = false;
                } else {
                    this.showError = true;
                    this.error = 'Live data - Not Found';
                }
            })
            .catch(error => {
                this.showError = true;
                this.error = errorMessage;
            });
            
    }

    sortBy(field, reverse, primer) {
        const key = primer
            ? function(x) {
                  return primer(x[field]);
              }
            : function(x) {
                  return x[field];
              };

        return function(a, b) {
            a = key(a);
            b = key(b);
            return reverse * ((a > b) - (b > a));
        };
    }

    onHandleSort(event) {
        const { fieldName: sortedBy, sortDirection } = event.detail;
        const cloneData = [...this.data];

        cloneData.sort(this.sortBy(sortedBy, sortDirection === 'asc' ? 1 : -1));
        this.data = cloneData;
        this.sortDirection = sortDirection;
        this.sortedBy = sortedBy;
    }









}