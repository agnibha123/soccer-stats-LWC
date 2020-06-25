import { LightningElement,track,api } from 'lwc';
import getStanding from '@salesforce/apex/RestCallFiFA.makeGetCallout';

const columns = [
   // { label: 'Icon', fieldName: 'icon', type: 'SVG', cellAttributes: { alignment: 'left' } },
    {
        label: 'Team',
        fieldName: 'Team',
        type: 'text',
        sortable: "true",
        cellAttributes: { class: { fieldName: 'fvtColorCSSClass'}}
       
    },
    {
        label: 'Games Played',
        fieldName: 'GamesPlayed',
        type: 'number',
        sortable: "true",
        cellAttributes: { alignment: 'left' }
       
    },
    {
        label: 'Won',
        fieldName: 'Won',
        type: 'number',
        sortable: "true",
        cellAttributes: { alignment: 'left' }
       
    },
    {
        label: 'Draw',
        fieldName: 'Draw',
        type: 'number',
        sortable: "true",
        cellAttributes: { alignment: 'left' }
       
    },
    {
        label: 'Lost',
        fieldName: 'Lost',
        type: 'number',
        sortable: "true",
        cellAttributes: { alignment: 'left' }
       
    },
    {
        label: 'GF',
        fieldName: 'GF',
        type: 'number',
        sortable: "true",
        cellAttributes: { alignment: 'left' }
       
    },
    {
        label: 'GA',
        fieldName: 'GA',
        type: 'number',
        sortable: "true",
        cellAttributes: { alignment: 'left' }
       
    },
    {
        label: 'GD',
        fieldName: 'GD',
        type: 'number',
        sortable: "true",
        cellAttributes: { alignment: 'left' }
       
    }, {
        label: 'Points',
        fieldName: 'Points',
        type: 'number',
        sortable: "true",
        cellAttributes: { alignment: 'left' }
        
    }, {
        label: 'Position',
        fieldName: 'Position',
        type: 'number',
        sortable: "true",
        cellAttributes: { alignment: 'left' }
       
    },/*{ label: 'Crest',
         fieldName: 'Crest' ,
         type:'image'
}*/
];
export default class FootballStandings extends LightningElement {
    jsonObj;
    data;
    columns = columns;
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
        getStanding({le:this.l})
            .then(result => {
                
                if(result) { 
                    this.showspin=false
                    this.data = [];
                    this.jsonObj = JSON.parse(result); 
                    console.log(this.jsonObj)
                    for(let i = 0; i < this.jsonObj.standings[0].table.length; i++){
                       // let Res = this.jsonObj.Countries[i];

                        //let covidStatusVal = 'slds-text-color_success';
                       
                        //format each row & push it into the data
                        let row = {
                            Team : this.jsonObj.standings[0].table[i].team.name,
                            Points : this.jsonObj.standings[0].table[i].points,
                            Position : this.jsonObj.standings[0].table[i].position,
                            GamesPlayed:this.jsonObj.standings[0].table[i].playedGames,
                            Won:this.jsonObj.standings[0].table[i].won,
                            Draw:this.jsonObj.standings[0].table[i].draw,
                            Lost:this.jsonObj.standings[0].table[i].lost,
                            GF:this.jsonObj.standings[0].table[i].goalsFor,
                            GA:this.jsonObj.standings[0].table[i].goalsAgainst,
                            GD:this.jsonObj.standings[0].table[i].goalDifference,
                            fvtColorCSSClass : i<3?'slds-icon-custom-custom18 slds-text-color--default':''||i>this.jsonObj.standings[0].table.length-4?'slds-icon-custom-custom15 slds-text-color--default':''||i==3?'slds-icon-custom-custom4 slds-text-color--default':'',
                            
                        //    icon:this.jsonObj.standings[0].table[i].team.crestURI
                            //Crest:this.jsonObj.standings[0].table[i].team.crestURI
                        }
                        console.log('crest--->'+this.jsonObj.standings[0].table[0].team.crestURI)
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
}