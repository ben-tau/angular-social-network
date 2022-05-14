// à refactoriser pour plus tard (intégrér le plusage '+')

export class ReworkDate {
  static toString(timestamp:number,obj:any,dateProp:string){
    timestamp = obj[dateProp]

        var date = new Date(timestamp);
        var hours = date.getHours();
        var minutes = "0" + date.getMinutes();
        var seconds = "0" + date.getSeconds();
        var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

        obj[dateProp] = 'le ' + date.toLocaleDateString('fr-FR') + ' à ' + formattedTime

        return obj;
  }
}
