import { SoapToRestProxy } from './soap-to-rest-proxy.decorator';

@SoapToRestProxy(
    'https://graphical.weather.gov/xml/SOAP_server/ndfdXMLserver.php?wsdl',
    [
     {
       methodName: 'LatLonListCityNames'
     }
    ]
  )
export class SoapClient {
    public constructor(){}
}