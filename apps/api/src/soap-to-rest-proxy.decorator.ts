import { Post, Body } from '@nestjs/common';
import * as soap from 'soap';
import { IOptions } from 'soap';

export interface SoapToRestProxyMethodInterface {
    methodName: string;
    methodDecorators?: MethodDecorator[];
}

export const SoapToRestProxy = (wsdl: string, names: SoapToRestProxyMethodInterface[], wsdlOptions?: IOptions) => (constructor) => {
    names.forEach((name) => {
        name.methodDecorators = name.methodDecorators || [];
        constructor.prototype[name.methodName] = (data) => {
            return soap.createClientAsync(wsdl, wsdlOptions).then(
                (client) => {
                    return client[name.methodName+'Async'](data).then(
                        (serviceResponse) => {
                            return serviceResponse[0];
                        },
                        (requestError) => {
                            console.log('requestError', requestError.message);
                            if(typeof requestError.Root.Envelope.Body !== 'undefined'){
                                return requestError.Root.Envelope.Body;
                            }
                        }
                    );
                },
                (clientError) => {
                    console.log('clientError', clientError.message);
                }
            );
        };
        try {
            const bodyDecorator = Body();
            bodyDecorator(constructor.prototype, name.methodName, 0);

            const methodDescriptor = Object.getOwnPropertyDescriptor(constructor.prototype,name.methodName);
            const decoratorPost = [Post(name.methodName)];
        
            Reflect.decorate(name.methodDecorators.concat(decoratorPost), constructor.prototype, name.methodName, methodDescriptor);
        } catch (error) {
            console.log(error);
        }
    });
}
