import { LightningElement,api,track, wire } from 'lwc';
import getFix from '@salesforce/apex/RestCallFiFA.getFix';
//import getAcc from '@salesforce/apex/RestCallFiFA.getAcc';
//import getContactList from '@salesforce/apex/RestCallFiFA.getContactList';
const monthNames =["Jan","Feb","Mar","Apr",
"May","Jun","Jul","Aug",
"Sep", "Oct","Nov","Dec"];
export default class Fixtures extends LightningElement {

   
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

    connectedCallback(){
        this.showSpinner = true;
        this.getData();
        
        
    }
   
    
    getData(){
        getFix({le:this.l})
            .then(result => {
                this.showSpinner = false;
                    this.jsonObj = JSON.parse(result); 
                    console.log('daaaataaaaa'+this.jsonObj.matches[0].id)
                    let finalObj = {}
                    this.jsonObj.matches.forEach((games) => {
                        const date1 = games.utcDate.split('T')[0]
                        const time=games.utcDate.split('T')[1]
                        const timeof=`${time.substring(0,time.length-4)} UTC `
                        let add={t:timeof}
                        let mer={...games,...add}
                        let d=date1.split('-')
                        let mon=d[1]
                        let date=`${d[2]}-${monthNames[+mon-1]}-${d[0].substring(2)}`

                        if (finalObj[date]) {
                        finalObj[date].push(mer);
                        } else {
                        finalObj[date] = [mer];
                        }
                    })
                    console.log(finalObj)
                     this.groupArrays = Object.keys(finalObj).map((date) => {
                        return {
                          date,
                          games: finalObj[date]
                        };
                      });
                     
                      console.log(this.groupArrays);
                      let ob={groupArrays}
                    // this gives an object with dates as keys
              /*  const groups = this.jsonObj.matches((groups, game) => {
                    const date = game.utcDate.split('T')[0];
                    if (!groups[date]) {
                    groups[date] = [];
                    }
                    groups[date].push(game);
                    return groups;
                }, {});
                
                // Edit: to add it in the array format instead
                const groupArrays = Object.keys(groups).map((date) => {
                    return {
                    date,
                    games: groups[date]
                    };
                });
                
                console.log(groupArrays);
                  */ 
            })
            .catch(error => {
                this.showError = true;
                console.log('daaaataaaaa'+this.jsonObj)
                this.error = errorMessage;
            });
            
    }}