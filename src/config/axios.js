import {testUrl} from './env'
import axios from 'axios'

export default async (url = '',data={},type = '') => {
    url = testUrl + url;

    //POST
    if(type==='post'){
        let json=null;
        await axios
            .post(url,data)
            .then(function (response){
                json=response.data;
            });
        return json;
    }






    //GET
    if (data!=={}) {
        let dataStr = ''; //数据拼接字符串
        Object.keys(data).forEach(key => {
            dataStr += data[key]+'/';
        })

        if (dataStr !== '') {
            dataStr = dataStr.substr(0, dataStr.lastIndexOf('/'));
            url = url + '/' + dataStr;
        }
    }
    // axios.defaults.withCredentials = true

    var json=null;
    await axios
        .get(url)
        .then(function (response){
            json=response.data;
        });

   // console.log(json);
    return json;



}
