export default class WalletAppService {

  data = [
    {id: 1, label: 'VISA1024', value: 20143},
    {id: 2, label: 'Наличные', value: 218},
    {id: 3, label: 'ИИС', value: 3019.2},
  ];

  getWallets() {
    return new Promise((resolve, reject)=>{
      setTimeout(()=> {
        resolve(this.data)
        // reject(new Error('Bad!'))
      }, 500);
    });
  }

}