import { Controller, Get, HttpCode } from '@nestjs/common';

import { Message } from '@soap-to-rest-proxy/api-interfaces';

import { AppService } from './app.service';
import { SoapToRestProxy } from '../soap-to-rest-proxy.decorator';
import { SoapClient } from '../SoapClient';

@Controller()
@SoapToRestProxy(
  'https://graphical.weather.gov/xml/SOAP_server/ndfdXMLserver.php?wsdl',
  [
   {
     methodName: 'LatLonListCityNames',
     methodDecorators: [
       HttpCode(200)
      ]
   }
  ]
)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('proxy-object-test')
  getData() {
    const soapClient = new SoapClient();
    return soapClient.LatLonListCityNames({ "displayLevel" : 1 });
  }
}
