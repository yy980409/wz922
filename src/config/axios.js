import {testUrl} from './env'
import axios from 'axios'

export default async (url = '',data={}) => {
    url = testUrl + url;

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
    // console.log(url);




    axios.defaults.withCredentials = true

    var json=null;
    await axios
        .get(url)
        .then(function (response){
            json=response.data;
        });

   // console.log(json);
    return json;



}
